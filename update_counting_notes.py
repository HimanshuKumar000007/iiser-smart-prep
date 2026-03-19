import sys

file_path = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\smart_notes\subjects\short-notes\math\iat-mathematics-basic-counting-techniques-short-notes.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

article_start = content.find('<article>')
article_end = content.find('</article>') + len('</article>')

if article_start != -1 and article_end != -1:
    new_article = """<article>
                <section id="core-concept" class="animate-in">
                    <h2>1. Core Concept</h2>
                    <div class="card">
                        <p><strong>Permutations & Combinations (P&C)</strong> is the mathematics of counting without actually listing every possibility. Permutations deal with arrangements (<strong>Order matters!</strong>), while Combinations deal with selections (<strong>Order does not matter!</strong>). The <strong>Binomial Theorem</strong> provides a powerful algebraic method to expand (x+y)<sup>n</sup> using combination formulas as coefficients.</p>
                    </div>
                </section>

                <section id="basics" class="animate-in">
                    <h2>2. Fundamental Principles & Factorials</h2>
                    <div class="card">
                        <h4>Fundamental Principles of Counting:</h4>
                        <ul>
                            <li><strong>Multiplication Principle (AND):</strong> If task A can be done in <em>m</em> ways and task B in <em>n</em> ways, then both tasks together occur in <code>m &times; n</code> ways.</li>
                            <li><strong>Addition Principle (OR):</strong> If task A or task B can be done (but not both, mutually exclusive), they occur in <code>m + n</code> ways.</li>
                        </ul>
                    </div>
                    <div class="card formula-box">
                        <div class="formula-content">n! = n &times; (n-1) &times; (n-2) &times; ... &times; 1</div>
                        <div class="formula-desc"><strong>Factorial Notation:</strong> Valid for non-negative integers. Note that <strong>0! = 1</strong>.</div>
                    </div>
                </section>

                <section id="p-and-c" class="animate-in">
                    <h2>3. Permutations and Combinations</h2>
                    <div class="card">
                        <h4>Derivation & Connections</h4>
                        <p><strong>Permutation (Arrangements):</strong> Number of ways to arrange <em>r</em> objects chosen from <em>n</em> distinct objects. Filling <em>r</em> positions: 1st position has <em>n</em> choices, 2nd has <em>(n-1)</em>... repeating down to <em>(n-r+1)</em>. Multiply them to get: <code>n(n-1)...(n-r+1) = n! / (n-r)!</code>.</p>
                        <p><strong>Combination (Selections):</strong> Choosing <em>r</em> objects out of <em>n</em> without regard to order. Since each group of <em>r</em> objects can be internally arranged in <em>r!</em> ways, we divide the permutations by <em>r!</em> to remove duplicates.</p>
                    </div>

                    <div class="card formula-box">
                        <div class="formula-content"><sup>n</sup>P<sub>r</sub> = n! / (n-r)!</div>
                        <div class="formula-desc"><strong>Permutations Formula:</strong> For linear arrangements.</div>
                    </div>

                    <div class="card formula-box">
                        <div class="formula-content"><sup>n</sup>C<sub>r</sub> = n! / (r!(n-r)!)</div>
                        <div class="formula-desc"><strong>Combinations Formula:</strong> For selections / choosing groups.</div>
                    </div>

                    <div class="card formula-box">
                        <div class="formula-content"><sup>n</sup>P<sub>r</sub> = <sup>n</sup>C<sub>r</sub> &times; r!</div>
                        <div class="formula-desc"><strong>The Connection:</strong> To arrange objects, first select them (<sup>n</sup>C<sub>r</sub>), then arrange the selected objects (r!).</div>
                    </div>
                    
                    <div class="card">
                        <h4>Important Properties & Applications</h4>
                        <ul>
                            <li><strong>Symmetry:</strong> <sup>n</sup>C<sub>r</sub> = <sup>n</sup>C<sub>n-r</sub> (Choosing <em>r</em> is the same as leaving behind <em>n-r</em>).</li>
                            <li><strong>Pascal’s Identity:</strong> <sup>n</sup>C<sub>r</sub> + <sup>n</sup>C<sub>r-1</sub> = <sup>n+1</sup>C<sub>r</sub>.</li>
                            <li><strong>Circular Permutations:</strong> Arranging <em>n</em> distinct objects in a circle = <code>(n-1)!</code>. If clockwise and anti-clockwise are identical (like a necklace): <code>(n-1)! / 2</code>.</li>
                            <li><strong>Grouping Objects:</strong> Dividing <code>m+n+p</code> distinct objects into 3 unequal groups of size m, n, p: <code>(m+n+p)! / (m!n!p!)</code>. If group sizes are equal (three groups of size m), divide by <code>3!</code> to remove identical group duplicates.</li>
                        </ul>
                    </div>
                </section>

                <section id="binomial-theorem" class="animate-in">
                    <h2>4. Binomial Theorem</h2>
                    
                    <div class="card">
                        <h4>For Positive Integral Indices</h4>
                        <p>The binomial theorem allows the expansion of a binomial power <code>(x + y)<sup>n</sup></code> into a sum involving terms of the form <code>ax<sup>b</sup>y<sup>c</sup></code>.</p>
                        <div style="overflow-x: auto; padding: 1rem; background: var(--bg-tertiary); border-radius: var(--radius-sm); margin: 1rem 0;">
                            <code>(x+y)<sup>n</sup> = <sup>n</sup>C<sub>0</sub> x<sup>n</sup> y<sup>0</sup> + <sup>n</sup>C<sub>1</sub> x<sup>n-1</sup> y<sup>1</sup> + ... + <sup>n</sup>C<sub>r</sub> x<sup>n-r</sup> y<sup>r</sup> + ... + <sup>n</sup>C<sub>n</sub> x<sup>0</sup> y<sup>n</sup></code>
                        </div>
                        <p><strong>Note:</strong> The total number of terms in the expansion is <code>n + 1</code>. The sum of the indices of x and y in any term is always <code>n</code>.</p>
                    </div>

                    <div class="card">
                        <h4>Pascal's Triangle</h4>
                        <p>Provides a quick geometric way to find binomial coefficients for small <em>n</em>. The <em>n</em>-th row contains the coefficients <sup>n</sup>C<sub>0</sub> to <sup>n</sup>C<sub>n</sub>. Each coefficient is generated by adding the two adjacent coefficients directly above it.</p>
                    </div>

                    <div class="card formula-box">
                        <div class="formula-content">T<sub>r+1</sub> = <sup>n</sup>C<sub>r</sub> x<sup>n-r</sup> y<sup>r</sup></div>
                        <div class="formula-desc"><strong>General Term:</strong> Used to find specific terms or coefficients without full expansion.</div>
                    </div>

                    <div class="card">
                        <h4>Middle Term(s) in (x+y)<sup>n</sup></h4>
                        <ul>
                            <li><strong>If n is Even:</strong> There is exactly <strong>one</strong> middle term: <code>T<sub>(n/2)+1</sub></code>.</li>
                            <li><strong>If n is Odd:</strong> There are <strong>two</strong> middle terms: <code>T<sub>(n+1)/2</sub></code> and <code>T<sub>(n+3)/2</sub></code>.</li>
                        </ul>
                    </div>
                </section>

                <section id="mistakes" class="animate-in">
                    <h2>5. Common Mistakes</h2>

                    <div class="card exam-tip">
                        <ul>
                            <li><strong>P vs C Confusion:</strong> Use Combinations (C) for selecting committees, teams, or hands of cards. Use Permutations (P) for passwords, seating arrangements, or words (where order alters the outcome).</li>
                            <li><strong>Index Trap in Binomial:</strong> The formula <code>T<sub>r+1</sub></code> gives the (r+1)<sup>th</sup> term, <strong>not</strong> the r<sup>th</sup> term. To find the 5th term, you must plug in <code>r=4</code>.</li>
                            <li><strong>Repeated Letters Arrangement:</strong> When arranging "BANANA", you must divide the total arrangements by the factorials of the repetitions: <code>6! / (3! &times; 2!)</code>.</li>
                        </ul>
                    </div>
                </section>

                <section id="exam-focus" class="animate-in">
                    <h2>6. IAT Exam Focus Points & Tricks</h2>

                    <div class="card">
                        <h4>High-Yield Applications:</h4>
                        <ul>
                            <li><strong>Term Independent of x:</strong> Find the generic term <code>T<sub>r+1</sub></code>, combine all x powers into <code>x<sup>k</sup></code>, and set <code>k = 0</code> to solve for r.</li>
                            <li><strong>Beggar's Method (Stars & Bars):</strong> Distributing <em>n</em> identical items among <em>r</em> distinct people = <code><sup>n+r-1</sup>C<sub>r-1</sub></code>. Be ready for variables with constraints like <code>x + y + z = 10 (x&ge;1, y&ge;2)</code>. <em>Trick: Distribute the minimums first!</em></li>
                            <li><strong>Dictionary Rank:</strong> Finding the rank of words (like "INDIA" or "MATH"). Calculate alphabetically systematically keeping repetition division rules in mind.</li>
                            <li><strong>Binomial Coefficient Series:</strong> Solving summations of <sup>n</sup>C<sub>r</sub>. Memorize <code><sup>n</sup>C<sub>0</sub> + <sup>n</sup>C<sub>1</sub> + ... = 2<sup>n</sup></code> and be comfortable using calculus (differentiation/integration) on <code>(1+x)<sup>n</sup></code> for complex series.</li>
                            <li><strong>Derangement (D<sub>n</sub>):</strong> Number of ways objects can occupy none of their original spots. <code>D<sub>n</sub> = n![1 - 1/1! + 1/2! - 1/3! + ... + (-1)<sup>n</sup>/n!]</code>.</li>
                        </ul>
                    </div>

                <section id="practice-mock" class="animate-in">
                    <h2>7. Practice Mock Test</h2>
                    <div class="card"
                        style="background: linear-gradient(135deg, rgb(var(--primary) / 0.1), rgb(var(--accent) / 0.1)); border: 1px solid rgb(var(--primary) / 0.2); text-align: center; padding: 3rem 2rem;">
                        <div
                            style="width: 80px; height: 80px; background: linear-gradient(135deg, rgb(var(--primary)), rgb(var(--accent))); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; box-shadow: var(--shadow-glow);">
                            <i class="fas fa-vial"></i>
                        </div>
                        <h3 style="margin-top: 0;">Ready to test your knowledge?</h3>
                        <p style="max-width: 500px; margin-left: auto; margin-right: auto; margin-bottom: 2.5rem;">Take a
                            quick 15-question assessment specifically designed for <b>P&C and Binomial Theorem</b>. Challenge
                            yourself with IAT-level questions.</p>
                        <a href="/mock_test/quick_mock_homepage.html" class="btn"
                            style="background: linear-gradient(90deg, rgb(var(--primary)), rgb(var(--accent))); color: white; padding: 1rem 2.5rem; font-size: 1.125rem; box-shadow: var(--shadow-lg); text-decoration: none; display: inline-flex; align-items: center; gap: 0.75rem;">
                            <i class="fas fa-play"></i> Start Practice Mock
                        </a>
                    </div>
                </section>

                <!-- Completion Indicator -->
                    <div
                        style="margin-top: 4rem; padding-top: 2rem; border-top: 2px solid var(--border-primary); text-align: center; color: var(--text-tertiary);">
                        <i class="fas fa-check-circle"
                            style="font-size: 2rem; color: rgb(var(--success)); margin-bottom: 0.5rem;"></i>
                        <p style="font-weight: 600; color: var(--text-primary);">End of Chapter</p>
                        <p style="font-size: 0.875rem;">Basic Counting Techniques & Binomial Theorem</p>
                    </div>
            </article>"""
    content = content[:article_start] + new_article + content[article_end:]
else:
    print("Could not find article markers.")
    sys.exit(1)

toc_start_marker = '<ul class="toc-list" id="tocList">'
toc_end_marker = '</ul>'
toc_start = content.find(toc_start_marker)
toc_end = content.find(toc_end_marker, toc_start) + len(toc_end_marker)

if toc_start != -1 and toc_end != -1:
    new_toc = """<ul class="toc-list" id="tocList">
                    <li><a href="#core-concept" class="toc-link">Core Concept</a></li>
                    <li><a href="#basics" class="toc-link">Principles & Factorials</a></li>
                    <li><a href="#p-and-c" class="toc-link">Permutations & Combinations</a></li>
                    <li><a href="#binomial-theorem" class="toc-link">Binomial Theorem</a></li>
                    <li><a href="#mistakes" class="toc-link">Common Mistakes</a></li>
                    <li><a href="#exam-focus" class="toc-link">IAT Exam Focus</a></li>
                    <li><a href="#practice-mock" class="toc-link">Practice Mock</a></li>
                </ul>"""
    content = content[:toc_start] + new_toc + content[toc_end:]
else:
    print("Could not find TOC markers.")
    sys.exit(1)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Success")
