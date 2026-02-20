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

    // Form Submission (WhatsApp Redirect)
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').options[document.getElementById('service').selectedIndex].text;
            const message = document.getElementById('message').value;

            // WhatsApp Number
            const phoneNumber = "27782179380"; // No + or spaces for the link

            // Construct the message
            const waMessage = `Hello Royal Makhosi team! I have a new project request:
            
*Name:* ${name}
*Email:* ${email}
*Service:* ${service}
*Details:* ${message}`;

            // Encode and Redirect
            const encodedMessage = encodeURIComponent(waMessage);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

            // Visual feedback before redirect
            const btn = quoteForm.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Redirecting to WhatsApp...';
            btn.disabled = true;

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                btn.textContent = originalText;
                btn.disabled = false;
                quoteForm.reset();
            }, 1000);
        });
    }

    // Timeline Observer
    const timelineSteps = document.querySelectorAll('.timeline-step');
    if (timelineSteps.length > 0) {
        const observerOptions = {
            threshold: 0.6,
            rootMargin: '0px 0px -20% 0px'
        };

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    // Optional: remove class to replay animation
                    // entry.target.classList.remove('active');
                }
            });
        }, observerOptions);

        timelineSteps.forEach(step => timelineObserver.observe(step));
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
