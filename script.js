document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    const header = document.querySelector('header');

    // Mobile Menu Toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = navToggle.querySelector('.hamburger');
            if (icon) {
                icon.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = navToggle.querySelector('.hamburger');
            if (icon) icon.textContent = '☰';
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.style.backgroundColor = 'rgba(20, 20, 20, 0.98)';
            header.style.padding = '0.4rem 0';
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        } else {
            header.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
            header.style.padding = '1rem 0';
            header.style.boxShadow = 'none';
        }
    });

    // Form Submission (Simulated)
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = quoteForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'Processing...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                alert('Success! Your request has been sent to the Royal Makhosi team. We will contact you shortly.');
                quoteForm.reset();
                btn.textContent = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
            }, 1800);
        });
    }

    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        revealElements.forEach(el => {
            const elTop = el.getBoundingClientRect().top;
            if (elTop < triggerBottom) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});
