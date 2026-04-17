document.addEventListener('DOMContentLoaded', () => {
    // 1. Interactive Navigation (Glassmorphism Scroll Effect)
    const nav = document.querySelector('.glass-nav');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // 2. Premium Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for lists and grids
                if (entry.target.classList.contains('timeline-card') || entry.target.classList.contains('b-tag')) {
                    entry.target.style.transitionDelay = `${(index % 3) * 0.1}s`;
                }
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    // Apply reveal to various elements
    const elementsToReveal = [
        'section h2', 
        'section p', 
        '.bento-item', 
        '.timeline-card', 
        '.b-tag', 
        '.areas-pills span',
        '.contact-split',
        '.metric-item',
        '.team-card',
        '.faq-item'
    ];

    elementsToReveal.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('reveal-hidden');
            observer.observe(el);
        });
    });

    // 3. Form Submission with Feedback
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerHTML = '<span class="loading-dot">●</span> Enviando...';
            btn.style.opacity = '0.7';
            btn.disabled = true;

            setTimeout(() => {
                // Creative Success Message
                const successDiv = document.createElement('div');
                successDiv.innerHTML = `
                    <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid #10b981; padding: 1.5rem; border-radius: 12px; margin-top: 1.5rem; text-align: center;">
                        <h3 style="color: #10b981; margin-bottom: 0.5rem;">Solicitação Recebida!</h3>
                        <p style="color: var(--text-secondary); font-size: 0.95rem;">Nossa equipe técnica entrará em contato em breve para analisar sua economia em Miguel Calmon e região.</p>
                    </div>
                `;
                form.appendChild(successDiv);
                
                form.reset();
                btn.innerText = 'Enviado com Sucesso';
                btn.style.background = '#10b981';
                btn.style.color = '#fff';
                
                setTimeout(() => {
                    successDiv.remove();
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.color = '';
                    btn.disabled = false;
                    btn.style.opacity = '1';
                }, 5000);
            }, 1500);
        });
    }

    // 4. Parallax Hero Effect
    const hero = document.querySelector('header#home');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
        }
    });

    // 5. Mobile Accordion Toggle for Bento Cards
    const bentoHeaders = document.querySelectorAll('.bento-header');
    bentoHeaders.forEach(header => {
        header.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                const bentoItem = header.closest('.bento-item');
                bentoItem.classList.toggle('is-open');
            }
        });
    });

    // 6. Number Counter Animation for Metrics
    const counters = document.querySelectorAll('.counter');
    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps
                
                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCounter();
                observer.unobserve(entry.target);
            }
        });
    };

    const counterObserver = new IntersectionObserver(animateCounters, { threshold: 0.5 });
    counters.forEach(counter => counterObserver.observe(counter));

    // 7. FAQ Accordion Toggle
    const faqHeaders = document.querySelectorAll('.faq-header');
    faqHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.closest('.faq-item');
            const isActive = item.classList.contains('active');
            
            // Close all other FAQs
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });

            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 8. Mobile Navigation Hamburger
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        const navIcon = hamburger.querySelector('i');
        
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                navIcon.classList.replace('ph-list', 'ph-x');
            } else {
                navIcon.classList.replace('ph-x', 'ph-list');
            }
        });

        // Fechar ao clicar em algum link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navIcon.classList.replace('ph-x', 'ph-list');
            });
        });
    }
});
