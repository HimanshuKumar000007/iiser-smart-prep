import sys

file_path = r'd:\IISER_MISSION_MILLIONAIRE_AT_THE_AGE_OF_22\frontend\smart_notes\subjects\short-notes\math\iat-matahematics-complex-numbers,-quadratic-equations-and-linear-inequalities-short-notes.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

article_start = content.find('<article>')
article_end = content.find('</article>') + len('</article>')

new_article = """<article>
                <section id="core-concept" class="animate-in">
                    <h2>1. Motivation & Core Concept</h2>

                    <div class="card">
                        <p><strong>Motivation for Complex Numbers:</strong> Real numbers cannot provide solutions to equations where the square of a number is negative (e.g., <code>x<sup>2</sup> + 1 = 0</code>). This necessitated extending the real number system by introducing the imaginary unit <code>i = &radic;-1</code>. <strong>Quadratic Equations</strong> deal with finding roots of degree-2 polynomials, while <strong>Linear Inequalities</strong> define ranges of valid solutions in one or more variables.</p>
                    </div>
                </section>

                <section id="complex-numbers" class="animate-in">
                    <h2>2. Complex Numbers</h2>

                    <div class="card">
                        <h4>Representation & Argand Plane</h4>
                        <p>Every complex number can be represented in two main ways:</p>
                        <ul>
                            <li><strong>Cartesian/Algebraic Form:</strong> <code>z = a + ib</code>, where <code>a</code> is the real part, Re(z), and <code>b</code> is the imaginary part, Im(z).</li>
                            <li><strong>Ordered Pair:</strong> In the <strong>Argand Plane</strong>, <code>z</code> is uniquely paired with a point <code>P(a, b)</code>, where the x-axis is real and the y-axis is imaginary.</li>
                            <li><strong>Polar Form:</strong> <code>z = r(cos &theta; + i sin &theta;)</code>, where <code>r = |z|</code> is the modulus (distance from origin) and <code>&theta;</code> is the argument (angle with positive real axis).</li>
                        </ul>
                    </div>

                    <div class="card">
                        <h4>Algebra of Complex Numbers</h4>
                        <ul>
                            <li><strong>Addition/Subtraction:</strong> <code>(a + ib) &plusmn; (c + id) = (a &plusmn; c) + i(b &plusmn; d)</code></li>
                            <li><strong>Multiplication:</strong> <code>(a + ib)(c + id) = (ac - bd) + i(ad + bc)</code></li>
                            <li><strong>Division:</strong> Multiply numerator and denominator by the conjugate of the denominator.</li>
                        </ul>
                    </div>
                    
                    <div class="card formula-box">
                        <div class="formula-content">|z| = &radic;(a<sup>2</sup> + b<sup>2</sup>)</div>
                        <div class="formula-desc"><strong>Modulus:</strong> Distance of the point (a, b) from the origin.</div>
                    </div>

                    <div class="card formula-box">
                        <div class="formula-content">z&#773; = a - ib</div>
                        <div class="formula-desc"><strong>Conjugate:</strong> Reflection of z across exactly the Real (x) axis. Property: <code>z &middot; z&#773; = |z|<sup>2</sup></code>.</div>
                    </div>

                    <div class="card">
                        <h4>Fundamental Theorem of Algebra</h4>
                        <p><strong>Statement:</strong> Every polynomial equation having complex coefficients and degree <code>n &ge; 1</code> has at least one complex root. Consequently, a polynomial equation of degree <code>n</code> has exactly <code>n</code> roots (counting multiplicities).</p>
                    </div>
                </section>

                <section id="quadratics" class="animate-in">
                    <h2>3. Quadratic Equations</h2>

                    <div class="card formula-box">
                        <div class="formula-content">x = [-b &plusmn; &radic;(b<sup>2</sup> - 4ac)] / 2a</div>
                        <div class="formula-desc">Quadratic Formula for <code>ax<sup>2</sup> + bx + c = 0</code>. Discriminant <code>D = b<sup>2</sup> - 4ac</code>.</div>
                    </div>

                    <div class="card">
                        <p><strong>Roots Relations:</strong></p>
                        <ul>
                            <li>Sum of roots (&alpha; + &beta;) = -b/a</li>
                            <li>Product of roots (&alpha;&beta;) = c/a</li>
                            <li>Difference of roots (|&alpha; - &beta;|) = &radic;D / |a|</li>
                        </ul>
                    </div>

                    <div class="card">
                        <h4>Nature of Roots (for real coefficients):</h4>
                        <ul>
                            <li>D > 0: Roots are real & distinct.</li>
                            <li>D = 0: Roots are real & equal (each root is -b/2a).</li>
                            <li>D < 0: Roots are complex conjugate pairs (p &plusmn; iq).</li>
                        </ul>
                    </div>
                </section>

                <section id="inequalities" class="animate-in">
                    <h2>4. Linear Inequalities</h2>

                    <div class="card">
                        <h4>Algebraic Solution</h4>
                        <p>Rules for solving linear inequalities in one variable (e.g., <code>ax + b < 0</code>):</p>
                        <ul>
                            <li>Equal numbers may be added to (or subtracted from) both sides of an inequality without affecting the sign.</li>
                            <li><strong>Golden Rule:</strong> Multiplying/dividing both sides by a <strong>negative</strong> number <strong>reverses</strong> the inequality sign (<code><</code> becomes <code>></code>).</li>
                        </ul>
                    </div>

                    <div class="card">
                        <h4>Graphical Representation</h4>
                        <p>Linear inequalities can be represented on a number line:</p>
                        <ul>
                            <li><strong>Strict Inequality (&lt;, &gt;):</strong> Represented by an open circle <code>&#9675;</code> (endpoint not included).</li>
                            <li><strong>Slack Inequality (&le;, &ge;):</strong> Represented by a closed, solid circle <code>&#9679;</code> (endpoint included).</li>
                            <li>A thickened line extending towards positive or negative infinity represents the solution set.</li>
                        </ul>
                    </div>

                    <div class="card professor-note">
                        <h4>Wavy Curve Method (Method of Intervals):</h4>
                        <p>For higher degree/rational inequalities like <code>(x-a)/(x-b) &le; 0</code>:</p>
                        <ol>
                            <li>Locate critical points (roots of numerator and denominator) on the number line.</li>
                            <li>Assign a positive sign to the rightmost interval.</li>
                            <li>Alternate signs across points. Keep the sign same if crossing a root with an even multiplicity.</li>
                        </ol>
                    </div>
                </section>

                <section id="insights" class="animate-in">
                    <h2>5. Conceptual Insights & Tricks</h2>

                    <div class="card">
                        <ul>
                            <li><strong>Geometry of i:</strong> Multiplying a complex number by <code>i</code> rotates its vector representation by 90&deg; counter-clockwise.</li>
                            <li><strong>Triangle Inequality:</strong> <code>||z<sub>1</sub>| - |z<sub>2</sub>|| &le; |z<sub>1</sub> &plusmn; z<sub>2</sub>| &le; |z<sub>1</sub>| + |z<sub>2</sub>|</code>.</li>
                            <li><strong>Cross-Multiplication Trap:</strong> Never cross-multiply an inequality variable unless you are 100% sure it is strictly positive. Instead, bring everything to one side and use the Wavy Curve method.</li>
                        </ul>
                    </div>
                </section>

                <section id="exam-focus" class="animate-in">
                    <h2>6. IAT Exam Focus Points</h2>

                    <div class="card">
                        <h4>Cube Roots of Unity (1, &omega;, &omega;<sup>2</sup>):</h4>
                        <p>Memorize identities: <code>1 + &omega; + &omega;<sup>2</sup> = 0</code> and <code>&omega;<sup>3</sup> = 1</code>. If you see <code>z<sup>2</sup>+z+1=0</code>, the roots are <code>&omega;</code> and <code>&omega;<sup>2</sup></code>.</p>
                    </div>

                    <div class="card">
                        <h4>Locus in Argand Plane:</h4>
                        <p><code>|z - z<sub>1</sub>| = |z - z<sub>2</sub>|</code> describes the <em>perpendicular bisector</em> of the line segment joining z<sub>1</sub> and z<sub>2</sub>. <code>|z - c| = r</code> represents a circle with center c and radius r.</p>
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
                            quick 15-question assessment specifically designed for <b>Complex Numbers, Quadratics & Inequalities</b>. Challenge
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
                        <p style="font-size: 0.875rem;">Complex Numbers, Quadratics & Inequalities</p>
                    </div>
            </article>"""

content = content[:article_start] + new_article + content[article_end:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Article updated.")
