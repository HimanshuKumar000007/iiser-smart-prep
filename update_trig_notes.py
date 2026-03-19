import os

file_path = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\smart_notes\subjects\short-notes\math\iat-trignometric-function-short-notes.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

article_start = content.find('<article>')
article_end = content.find('</article>') + len('</article>')

new_article = """<article>
                <section id="measure-angles" class="animate-in">
                    <h2>1. Measures of Angles & Conversions</h2>

                    <div class="card">
                        <p>An angle is a measure of rotation of a given ray about its initial point.</p>
                        <ul>
                            <li><strong>Degree Measure:</strong> 1 degree (1&deg;) = 60 minutes (60'), 1 minute (1') = 60 seconds (60").</li>
                            <li><strong>Radian Measure:</strong> Angle subtended at the center by an arc of length 1 unit in a unit circle.</li>
                            <li><strong>Conversion:</strong> <code>&pi; radians = 180&deg;</code>. To convert degrees to radians: multiply by <code>&pi;/180</code>. To convert radians to degrees: multiply by <code>180/&pi;</code>.</li>
                            <li><strong>Arc Length Formula:</strong> <code>l = r&theta;</code>, where <code>l</code> is arc length, <code>r</code> is radius, and <code>&theta;</code> is the angle strictly in <strong>radians</strong>.</li>
                        </ul>
                    </div>
                </section>

                <section id="functions-identities" class="animate-in">
                    <h2>2. Trig Functions, Identities & Geometric Interpretations</h2>

                    <div class="card">
                        <h4>Geometric Interpretation (Unit Circle)</h4>
                        <p>On a unit circle (radius=1) centered at origin, a point at angle &theta; has coordinates <code>(cos &theta;, sin &theta;)</code>. <code>tan &theta;</code> geometrically represents the length of the segment on the tangent line at x=1.</p>
                        <ul>
                            <li><strong>ASTC Rule:</strong> Quadrant 1 (<strong>A</strong>ll +), Q2 (<strong>S</strong>in/Csc +), Q3 (<strong>T</strong>an/Cot +), Q4 (<strong>C</strong>os/Sec +).</li>
                        </ul>
                    </div>

                    <div class="card formula-box">
                        <div class="formula-content">sin<sup>2</sup>&theta; + cos<sup>2</sup>&theta; = 1<br>sec<sup>2</sup>&theta; - tan<sup>2</sup>&theta; = 1<br>csc<sup>2</sup>&theta; - cot<sup>2</sup>&theta; = 1</div>
                        <div class="formula-desc">Fundamental Pythagorean Identities</div>
                    </div>

                    <div class="card">
                        <h4>Compound & Multiple Angles:</h4>
                        <ul>
                            <li><code>sin(A&plusmn;B) = sinAcosB &plusmn; cosAsinB</code></li>
                            <li><code>cos(A&plusmn;B) = cosAcosB &#8723; sinAsinB</code></li>
                            <li><code>tan(A&plusmn;B) = (tanA &plusmn; tanB) / (1 &#8723; tanA tanB)</code></li>
                            <li><code>sin(2&theta;) = 2sin&theta;cos&theta; = 2tan&theta; / (1+tan<sup>2</sup>&theta;)</code></li>
                            <li><code>cos(2&theta;) = cos<sup>2</sup>&theta; - sin<sup>2</sup>&theta; = (1 - tan<sup>2</sup>&theta;) / (1 + tan<sup>2</sup>&theta;)</code></li>
                            <li><code>tan(2&theta;) = 2tan&theta; / (1 - tan<sup>2</sup>&theta;)</code></li>
                        </ul>
                    </div>
                </section>

                <section id="graphs" class="animate-in">
                    <h2>3. Graphs of Trigonometric Functions</h2>

                    <div class="card">
                        <p>Understanding the graphs is crucial for figuring out domains, ranges, and periodicity.</p>
                        <ul>
                            <li><strong>y = sin(x):</strong> Domain: &reals;, Range: [-1, 1], Period: 2&pi;. Passes through (0,0) like a typical wave.</li>
                            <li><strong>y = cos(x):</strong> Domain: &reals;, Range: [-1, 1], Period: 2&pi;. Starts at (0,1). It's sin(x) shifted left by &pi;/2.</li>
                            <li><strong>y = tan(x):</strong> Domain: &reals; - {(2n+1)&pi;/2}, Range: &reals;, Period: &pi;. Has vertical asymptotes at odd multiples of &pi;/2. Passes through (0,0).</li>
                        </ul>
                    </div>
                </section>

                <section id="trig-equations" class="animate-in">
                    <h2>4. Trigonometric Equations & Applications</h2>

                    <div class="card">
                        <p>Equations involving trigonometric functions of an unknown angle are trigonometric equations.</p>
                        <h4>General Solutions:</h4>
                        <ul>
                            <li><code>sin &theta; = 0 &implies; &theta; = n&pi;</code></li>
                            <li><code>cos &theta; = 0 &implies; &theta; = (2n+1)&pi;/2</code></li>
                            <li><code>sin &theta; = sin &alpha; &implies; &theta; = n&pi; + (-1)<sup>n</sup>&alpha;</code></li>
                            <li><code>cos &theta; = cos &alpha; &implies; &theta; = 2n&pi; &plusmn; &alpha;</code></li>
                            <li><code>tan &theta; = tan &alpha; &implies; &theta; = n&pi; + &alpha;</code></li>
                        </ul>
                    </div>
                    
                    <div class="card professor-note">
                        <h4>Applications:</h4>
                        <p>Solving equations of the form <code>a cos&theta; + b sin&theta; = c</code>. Divide by <code>&radic;(a<sup>2</sup>+b<sup>2</sup>)</code> to convert the LHS into a single sine or cosine compound angle formula. Solution exists only if <code>|c| &le; &radic;(a<sup>2</sup>+b<sup>2</sup>)</code>.</p>
                    </div>
                </section>

                <section id="inverse-trig" class="animate-in">
                    <h2>5. Inverse Trigonometric Functions</h2>

                    <div class="card">
                        <h4>Principal Value Branches</h4>
                        <p>To make trig functions invertible, their domains must be restricted.</p>
                        <ul>
                            <li><strong>sin<sup>-1</sup>x:</strong> Domain [-1, 1], Range [-&pi;/2, &pi;/2]</li>
                            <li><strong>cos<sup>-1</sup>x:</strong> Domain [-1, 1], Range [0, &pi;]</li>
                            <li><strong>tan<sup>-1</sup>x:</strong> Domain &reals;, Range (-&pi;/2, &pi;/2)</li>
                        </ul>
                    </div>

                    <div class="card">
                        <h4>Key Properties</h4>
                        <ul>
                            <li><code>sin<sup>-1</sup>(-x) = -sin<sup>-1</sup>(x)</code>, <code>tan<sup>-1</sup>(-x) = -tan<sup>-1</sup>(x)</code></li>
                            <li><code>cos<sup>-1</sup>(-x) = &pi; - cos<sup>-1</sup>(x)</code>, <code>cot<sup>-1</sup>(-x) = &pi; - cot<sup>-1</sup>(x)</code></li>
                            <li><code>sin<sup>-1</sup>(x) + cos<sup>-1</sup>(x) = &pi;/2</code> (for x &isin; [-1, 1])</li>
                            <li><code>tan<sup>-1</sup>(x) + cot<sup>-1</sup>(x) = &pi;/2</code> (for x &isin; &reals;)</li>
                            <li><code>tan<sup>-1</sup>x + tan<sup>-1</sup>y = tan<sup>-1</sup>[(x+y)/(1-xy)]</code> (Strictly if xy < 1)</li>
                        </ul>
                    </div>
                </section>

                <section id="mistakes" class="animate-in">
                    <h2>6. Common Mistakes</h2>

                    <div class="card exam-tip">
                        <ul>
                            <li><strong>The ITF Domain Trap:</strong> <code>sin<sup>-1</sup>(sin 2&pi;/3) &ne; 2&pi;/3</code>. You MUST reduce it to the principal branch: <code>sin<sup>-1</sup>(sin(&pi; - &pi;/3)) = &pi;/3</code>.</li>
                            <li><strong>Canceling Variables:</strong> Dividing <code>sin&theta; = sin2&theta;</code> by <code>sin&theta;</code> loses the roots where <code>sin&theta; = 0</code>. Always factor equations!</li>
                            <li><strong>Squaring Equations:</strong> Squaring sides often introduces extraneous solutions. Always verify final answers in the original equation.</li>
                        </ul>
                    </div>
                </section>

                <section id="exam-focus" class="animate-in">
                    <h2>7. IAT Exam Focus Points</h2>

                    <div class="card">
                        <h4>Key Exam Focus:</h4>
                        <ul>
                            <li><strong>Intersection Points:</strong> "How many solutions for f(x) = g(x)?" Graph both sides & count intersections. Example: <code>sin(x) = x/10</code>.</li>
                            <li><strong>Special Angles:</strong> Memorize values for 15&deg; (tan 15&deg; = 2 - &radic;3) and 18&deg; (sin 18&deg; = (&radic;5 - 1)/4).</li>
                            <li><strong>Substitution in ITF:</strong> Use <code>x = a sin&theta;</code> for <code>&radic;(a<sup>2</sup> - x<sup>2</sup>)</code> and <code>x = a tan&theta;</code> for <code>&radic;(a<sup>2</sup> + x<sup>2</sup>)</code> to simplify complex inverse trig expressions.</li>
                        </ul>
                    </div>

                <section id="practice-mock" class="animate-in">
                    <h2>8. Practice Mock Test</h2>
                    <div class="card"
                        style="background: linear-gradient(135deg, rgb(var(--primary) / 0.1), rgb(var(--accent) / 0.1)); border: 1px solid rgb(var(--primary) / 0.2); text-align: center; padding: 3rem 2rem;">
                        <div
                            style="width: 80px; height: 80px; background: linear-gradient(135deg, rgb(var(--primary)), rgb(var(--accent))); color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem; font-size: 2rem; box-shadow: var(--shadow-glow);">
                            <i class="fas fa-vial"></i>
                        </div>
                        <h3 style="margin-top: 0;">Ready to test your knowledge?</h3>
                        <p style="max-width: 500px; margin-left: auto; margin-right: auto; margin-bottom: 2.5rem;">Take a
                            quick 15-question assessment specifically designed for <b>Trigonometry</b>. Challenge
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
                        <p style="font-size: 0.875rem;">Trigonometric Functions and Inverse Trigonometry</p>
                    </div>
            </article>"""

# Also update the table of contents list
target_toc = '<ul class="toc-list" id="tocList">'
end_target_toc = '</ul>'
toc_start = content.find(target_toc)
toc_end = content.find(end_target_toc, toc_start) + len(end_target_toc)

new_toc = '''<ul class="toc-list" id="tocList">
                    <li><a href="#measure-angles" class="toc-link">Angle Measures</a></li>
                    <li><a href="#functions-identities" class="toc-link">Functions & Identities</a></li>
                    <li><a href="#graphs" class="toc-link">Graphs</a></li>
                    <li><a href="#trig-equations" class="toc-link">Equations & Apps</a></li>
                    <li><a href="#inverse-trig" class="toc-link">Inverse Trig</a></li>
                    <li><a href="#mistakes" class="toc-link">Common Mistakes</a></li>
                    <li><a href="#exam-focus" class="toc-link">IAT Exam Focus</a></li>
                    <li><a href="#practice-mock" class="toc-link">Practice Mock</a></li>
                </ul>'''

content = content[:article_start] + new_article + content[article_end:]

# Re-evaluate indices because content changed length
toc_start = content.find(target_toc)
toc_end = content.find(end_target_toc, toc_start) + len(end_target_toc)

content = content[:toc_start] + new_toc + content[toc_end:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Article and TOC updated successfully.")
