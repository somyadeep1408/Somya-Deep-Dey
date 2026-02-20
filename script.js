document.addEventListener('DOMContentLoaded', () => {

    // ── 1. SCROLL-REVEAL (IntersectionObserver) ──
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Auto-add reveal to cards that don't have it
    document.querySelectorAll('.card, .glass-card, .timeline-item, .featured-pane, .gallery-item, .milestone, .action-card').forEach((el, i) => {
        if (!el.classList.contains('reveal')) {
            el.classList.add('reveal');
            el.style.transitionDelay = `${(i % 4) * 0.08}s`;
            revealObserver.observe(el);
        }
    });

    // ── 2. SMOOTH 3D TILT ON SCROLL ──
    const cards3d = document.querySelectorAll('.scroll-3d-item');

    const update3D = () => {
        const vh = window.innerHeight / 2;
        cards3d.forEach(card => {
            const rect = card.getBoundingClientRect();
            const center = rect.top + rect.height / 2;
            const dist = center - vh;
            let rotX = dist * 0.04;
            rotX = Math.max(-12, Math.min(12, rotX));
            const scale = Math.max(0.92, 1 - Math.abs(dist) * 0.0004);
            const opacity = Math.max(0.25, 1 - Math.abs(dist) * 0.0012);
            card.style.transform = `perspective(1100px) rotateX(${-rotX}deg) scale(${scale})`;
            card.style.opacity = opacity;
        });
    };

    window.addEventListener('scroll', () => requestAnimationFrame(update3D), { passive: true });
    update3D();

    // ── 3. NAV ACTIVE LINK HIGHLIGHT ──
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(link => {
        if (link.getAttribute('href') === currentPage) link.classList.add('active');
    });

    // ── 4. CURSOR GLOW (subtle, desktop only) ──
    if (window.innerWidth > 768) {
        const glow = document.createElement('div');
        glow.style.cssText = `
            position:fixed; width:320px; height:320px; border-radius:50%;
            background:radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%);
            pointer-events:none; z-index:9999; transform:translate(-50%,-50%);
            transition: left 0.12s ease, top 0.12s ease;
        `;
        document.body.appendChild(glow);
        window.addEventListener('mousemove', e => {
            glow.style.left = e.clientX + 'px';
            glow.style.top  = e.clientY + 'px';
        }, { passive: true });
    }

});

