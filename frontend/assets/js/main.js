
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-WHHM4FTNHG');
    


        // --- Modal Logic ---
        function openModal(modalId) {
            const overlay = document.getElementById('modal-overlay');
            const contents = document.querySelectorAll('.modal-content');
            contents.forEach(el => el.style.display = 'none');

            const target = document.getElementById(modalId);
            if (target) {
                target.style.display = 'block';
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }

        function closeModal() {
            const overlay = document.getElementById('modal-overlay');
            overlay.classList.remove('active');
            setTimeout(() => {
                document.body.style.overflow = 'auto';
            }, 300);
        }

        document.addEventListener('keydown', function (event) {
            if (event.key === "Escape") closeModal();
        });

        // --- Mobile Menu Logic ---
        function toggleMenu() {
            const navLinks = document.getElementById('nav-links');
            const lines = document.querySelectorAll('.hamburger-line');
            navLinks.classList.toggle('active');

            lines.forEach(line => line.classList.toggle('active'));

            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }

        // --- Auth State Check ---
        const token = localStorage.getItem("IAT_TOKEN");

        function updateButtons() {
            const container = document.getElementById("auth-buttons-container");
            if (!container) return;

            if (token) {
                container.innerHTML = `
                    <a href="/mock_test/full_mock_test_homepage.html" class="btn btn-primary" style="padding: 0.5rem 1rem;">Dashboard</a>
                    <button onclick="logout()" class="btn btn-outline" style="border:none; color: var(--text-muted);">Logout</button>
                `;
            }
        }

        updateButtons();

        function logout() {
            localStorage.clear();
            window.location.href = '/index.html';
        }

        // --- Scroll Animations ---
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -20px 0px" // Trigger slightly earlier for smoother feel
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in-up').forEach(el => {
            observer.observe(el);
        });

        // --- AI Tutor Access Logic ---
        function checkAIProAccess() {
            const token = localStorage.getItem("IAT_TOKEN");
            const plan = localStorage.getItem("IAT_PLAN");

            if (token && plan === "PRO") {
                window.location.href = '/ai_tutor.html';
            } else {
                // Redirect to pricing section for non-logged in or non-pro users
                closeModal();
                window.location.href = "#pricing";
            }
        }

        function checkSmartNotesAccess() {
            const token = localStorage.getItem("IAT_TOKEN");
            const plan = localStorage.getItem("IAT_PLAN");

            if (!token) {
                // User not logged in, redirect to login page
                window.location.href = '/login.html';
            } else if (plan !== "PRO") {
                // User logged in but not PRO, scroll to pricing
                const pricingSection = document.getElementById("pricing");
                if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = "#pricing";
                }
            } else {
                // User logged in and PRO
                window.location.href = '/smart_notes/smart_notes_home.html';
            }
        }

        function checkProgressAnalyticsAccess() {
            const token = localStorage.getItem("IAT_TOKEN");
            const plan = localStorage.getItem("IAT_PLAN");

            if (!token) {
                // User not logged in, redirect to login page
                window.location.href = '/login.html';
            } else if (plan !== "PRO") {
                // User logged in but not PRO, scroll to pricing
                const pricingSection = document.getElementById("pricing");
                if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    window.location.href = "#pricing";
                }
            } else {
                // User logged in and PRO
                window.location.href = '/iat-planner-pro.html';
            }
        }

        // --- Scroll Header Transformation (Optimized with RAF) ---
        const header = document.querySelector('header');
        let isScrolled = false;
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const shouldBeScrolled = window.scrollY > 20;
                    if (shouldBeScrolled !== isScrolled) {
                        isScrolled = shouldBeScrolled;
                        header.classList.toggle('scrolled', isScrolled);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });

        // --- Mock AI Preview Animation ---
        setInterval(() => {
            const preview = document.querySelector('.ai-preview');
            if (preview && Math.random() > 0.7) {
                preview.style.animation = 'none';
                setTimeout(() => {
                    preview.style.animation = 'float 6s ease-in-out infinite';
                }, 10);
            }
        }, 5000);
    


        // --- Blog Articles Toggle ---
        function toggleExtraArticles() {
            var cards = document.querySelectorAll('.blog-extra-card');
            var btn = document.getElementById('toggle-articles-btn');
            if (!cards.length) return;

            var isHidden = cards[0].style.display === 'none';

            for (var i = 0; i < cards.length; i++) {
                cards[i].style.display = isHidden ? 'flex' : 'none';
            }

            btn.textContent = isHidden ? 'Show Less' : 'View All Articles';
        }
        // --- Exam Countdown Timer ---
        (function () {
            const examDate = new Date('2026-06-15T09:30:00+05:30').getTime();
            function updateCountdown() {
                const now = new Date().getTime();
                const diff = examDate - now;
                if (diff <= 0) {
                    document.getElementById('cd-days').textContent = '0';
                    document.getElementById('cd-hours').textContent = '0';
                    document.getElementById('cd-mins').textContent = '0';
                    document.getElementById('cd-secs').textContent = '0';
                    return;
                }
                document.getElementById('cd-days').textContent = Math.floor(diff / 86400000);
                document.getElementById('cd-hours').textContent = Math.floor((diff % 86400000) / 3600000);
                document.getElementById('cd-mins').textContent = Math.floor((diff % 3600000) / 60000);
                document.getElementById('cd-secs').textContent = Math.floor((diff % 60000) / 1000);
            }
            updateCountdown();
            setInterval(updateCountdown, 1000);
        })();

        // --- Interactive Demo Question ---
        function selectDemoOption(btn, isCorrect) {
            var opts = document.querySelectorAll('.demo-option');
            for (var i = 0; i < opts.length; i++) {
                opts[i].disabled = true;
                opts[i].classList.remove('selected', 'correct', 'wrong');
            }
            if (isCorrect) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('wrong');
                for (var i = 0; i < opts.length; i++) {
                    if (opts[i].getAttribute('onclick') && opts[i].getAttribute('onclick').indexOf('true') > -1) {
                        opts[i].classList.add('correct');
                    }
                }
            }
            document.getElementById('demo-explanation').style.display = 'block';
        }



    


        const activities = [
            "Rahul from Delhi just purchased IAT Pass",
            "Priya scored 92% in Mock Test #7",
            "Arjun improved rank by 400 points",
            "Sneha asked AI Tutor about Thermodynamics",
            "Vikram from Mumbai just started a free trial",
            "Anjali analyzed her weak areas in Organic Chem",
            "Rohan from Kolkata scored 180/240 in Full Mock",
            "Divya from Pune downloaded the Master Formula Sheet",
            "Karthik just unlocked the 2024 PYQ Paper",
            "Meera from Hyderabad asked about Rotational Motion",
            "Arav improved his Chemistry score by 25%",
            "Ishita from Bangalore purchased the Crash Course",
            "Varun just completed the 'Quick Mock' in 12 mins",
            "Kavya from Chennai got AIR 152 in Rank Predictor",
            "Aditya from Jaipur asked AI to explain 'Chirality'",
            "Riya from Bhopal analyzed her time management stats",
            "Aryan scored 55/60 in Mathematics section",
            "Diya from Lucknow unlocked the PlannerPro",
            "Vihaan just finished the Biology Chapter Test",
            "Ananya from Mohali asked for a revision plan",
            "Dev from Patna purchased the IAT 2026 Pass",
            "Saanvi from Thiruvananthapuram scored 95% in Logic",
            "Aarav from Noida improved from Rank 1200 to 850",
            "Myra just solved 50 Physics PYQs",
            "Reyansh from Gurgaon asked about 'Coordination Compounds'",
            "Aadhya from Indore purchased the Test Series",
            "Krishna scored full marks in Biology section",
            "Pari from Surat just started IAT Mock #4",
            "Ishan from Vadodara analyzed his negative marking",
            "Hazel from Bhubaneswar asked about 'Limits and Derivatives'",
            "Dhruv just upgraded to the Pro Plan",
            "Shanaya from Nagpur completed the Daily Challenge",
            "Kabir from Kanpur scored 88% in Mock #9",
            "Zoya from Kochi asked AI about 'Genetics'",
            "Vivaan from Visakhapatnam purchased the Combo Pack",
            "Amaira just downloaded the Physics Cheat Sheet",
            "Advik from Ludhiana improved his accuracy to 90%",
            "Kyra from Agra asked about 'Electrostatics'",
            "Muhammed from Calicut scored 160/240 in Mock #2",
            "Navya from Nashik analyzed her Chemistry weak spots",
            "Sai from Tirupati just started the Free Trial",
            "Ayesha from Aligarh asked AI to simplify 'Integration'",
            "Om from Varanasi purchased the IAT Pass",
            "Siya from Meerut improved her Biology rank",
            "Atharv from Rajkot completed 100 questions today",
            "Sarah from Guwahati asked about 'Plant Physiology'",
            "Vedant from Jodhpur scored 98% in the Quick Mock",
            "Urvi from Raipur unlocked the 2023 PYQ Paper",
            "Shaurya from Dehradun asked about 'Complex Numbers'",
            "Jhanvi from Ranchi analyzed her Physics performance",
            "Yash from Gwalior purchased the Full Access Plan",
            "Mahika from Jabalpur improved her mock score by 30 marks"
        ];

        const ticker = document.getElementById('floating-ticker');
        const textElem = document.getElementById('live-activity-text');

        // Show after 3 seconds
        setTimeout(() => {
            ticker.style.display = 'inline-flex';
            rotateActivity();
        }, 3000);

        function rotateActivity() {
            const activity = activities[Math.floor(Math.random() * activities.length)];
            textElem.textContent = activity;
            textElem.style.animation = 'none';
            textElem.offsetHeight; /* trigger reflow */
            textElem.style.animation = 'fade-in-up 0.5s ease';

            // Random interval between 4-8 seconds
            setTimeout(rotateActivity, Math.random() * 4000 + 4000);
        }
    


        // Exit Intent Logic
        document.addEventListener('mouseout', (e) => {
            if (e.clientY < 10 && !localStorage.getItem('exitModalShown')) {
                document.getElementById('exit-modal').style.display = 'flex';
                localStorage.setItem('exitModalShown', 'true');
            }
        });

        function closeExitModal() {
            document.getElementById('exit-modal').style.display = 'none';
        }

        // Mobile Fallback (Show after 30s if not shown)
        setTimeout(() => {
            if (!localStorage.getItem('exitModalShown')) {
                document.getElementById('exit-modal').style.display = 'flex';
                localStorage.setItem('exitModalShown', 'true');
            }
        }, 30000);
    