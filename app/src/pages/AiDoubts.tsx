import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Bot, Trash2, ShieldAlert, User } from 'lucide-react';
import DOMPurify from 'dompurify';
import { marked } from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css';

const API_URL = 'https://api.iisersmartprep.space/api/ai-chat';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AiDoubts() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [dailyRemaining, setDailyRemaining] = useState<number | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  // Syntax Highlighting
  useEffect(() => {
    document.querySelectorAll('pre code').forEach((block) => {
      // @ts-expect-error property might not exist on HTMLElement
      if (!block.dataset.highlighted) {
        hljs.highlightElement(block as HTMLElement);
      }
    });
  }, [messages]);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    if (textAreaRef.current) {
      textAreaRef.current.style.height = 'auto';
      textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 160)}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    const trimmed = inputValue.trim();
    if (!trimmed || isStreaming) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(newMessages);
    setInputValue('');
    if (textAreaRef.current) textAreaRef.current.style.height = 'auto';
    setIsStreaming(true);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok) {
        let errMsg = `Error ${res.status}`;
        try {
          const errData = await res.json();
          if (errData.error) errMsg = errData.error;
        } catch {
          // ignore error formatting failure
        }
        throw new Error(errMsg);
      }

      const rem = res.headers.get('X-Daily-Remaining');
      if (rem) setDailyRemaining(parseInt(rem));

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.trim() || line.trim() === 'data: [DONE]') continue;
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6));
              const delta = data.choices?.[0]?.delta?.content || '';
              assistantContent += delta;

              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1].content = assistantContent;
                return updated;
              });
            } catch {
              // ignore parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: `**Error**: ${msg}` },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat history?')) {
      setMessages([]);
    }
  };

  // Predefined queries to get started
  const predefinedQueries = [
    "Explain the concept of Hybridisation",
    "What is the difference between Mitosis and Meiosis?",
    "How to solve problems on Rotational Mechanics?",
    "State the fundamental theorem of calculus",
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-4xl mx-auto rounded-2xl overflow-hidden glass-card border border-white/5 bg-[#0e0f1d]/60 backdrop-blur-xl relative shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-glow">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg flex items-center gap-2">
              AI Tutor
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
            </h2>
            <p className="text-xs text-gray-400">Powered by advanced models for IISER prep</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {dailyRemaining !== null && (
            <div className={`px-3 py-1 rounded-full text-xs font-medium border ${dailyRemaining <= 5 ? 'bg-red-500/10 text-red-400 border-red-500/30' : dailyRemaining <= 10 ? 'bg-orange-500/10 text-orange-400 border-orange-500/30' : 'bg-white/5 text-gray-300 border-white/10'}`}>
              <ShieldAlert className="w-3 h-3 inline mr-1" />
              {dailyRemaining} queries left
            </div>
          )}
          {messages.length > 0 && (
            <button onClick={clearChat} className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-red-400 transition-colors" title="Clear Chat">
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 relative z-10">
        <AnimatePresence>
          {messages.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center h-full text-center space-y-6 py-10"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.35)] animate-bounce-slow">
                <Bot className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">How can I help you today?</h3>
                <p className="text-gray-400 max-w-sm mx-auto">Ask me any question from Physics, Chemistry, Mathematics, or Biology.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-lg mt-4">
                {predefinedQueries.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputValue(q);
                      if (textAreaRef.current) textAreaRef.current.focus();
                    }}
                    className="px-4 py-2 text-sm text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 rounded-full hover:bg-indigo-500/20 hover:border-indigo-500/60 transition-all font-medium"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            messages.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 md:gap-4 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mt-1 shadow-glow">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                )}
                
                <div
                  className={`relative max-w-[85%] md:max-w-[75%] px-4 animate-in ${
                    m.role === 'user'
                      ? 'py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-2xl rounded-tr-sm shadow-[0_4px_20px_rgba(79,70,229,0.3)]'
                      : 'py-4 bg-[#141529]/80 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-sm text-gray-200 shadow-xl'
                  } text-sm md:text-base leading-relaxed break-words`}
                >
                  {m.role === 'assistant' ? (
                    <div
                      className="prose prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-black/40 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-a:text-indigo-400"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(marked.parse(m.content || (isStreaming && idx === messages.length - 1 ? '...' : '')) as string),
                      }}
                    />
                  ) : (
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  )}
                  {isStreaming && idx === messages.length - 1 && m.role === 'assistant' && m.content.length > 0 && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-white animate-pulse" />
                  )}
                </div>

                {m.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-5 h-5 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))
          )}
          {isStreaming && messages[messages.length - 1]?.role !== 'assistant' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mt-1 shadow-glow">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="py-4 px-6 bg-[#141529]/80 backdrop-blur-md border border-white/10 rounded-2xl rounded-tl-sm flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </motion.div>
          )}
          <div ref={bottomRef} />
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-black/20 border-t border-white/10 backdrop-blur-lg z-10 relative">
        <div className="max-w-4xl mx-auto relative flex items-end gap-2 bg-[#141529] border border-white/10 rounded-2xl p-2 shadow-lg focus-within:border-indigo-500/50 focus-within:shadow-[0_0_15px_rgba(79,70,229,0.2)] transition-all">
          <textarea
            ref={textAreaRef}
            rows={1}
            value={inputValue}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Type your question here (e.g. solve this integration...)"
            className="flex-1 bg-transparent border-none resize-none focus:ring-0 text-white placeholder-gray-500 py-3 px-4 max-h-40 min-h-[48px] overflow-y-auto"
            style={{ paddingRight: '3rem' }}
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim() || isStreaming}
            className="absolute right-3 bottom-3 p-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:bg-white/5 disabled:text-gray-500 disabled:cursor-not-allowed text-white transition-all shadow-glow"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
        <div className="text-center mt-3">
          <p className="text-xs text-gray-500">AI can make mistakes. Verify important information from NCERT.</p>
        </div>
      </div>
    </div>
  );
}
