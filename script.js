document.addEventListener('DOMContentLoaded', () => {
    
    // Select all elements with the 3D class
    const cards = document.querySelectorAll('.card, .timeline-item, .hero-content');

    // Add the identifier class to them automatically
    cards.forEach(el => el.classList.add('scroll-3d-item'));

    const update3D = () => {
        const viewportCenter = window.innerHeight / 2;

        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.top + (rect.height / 2);
            
            // Calculate distance from center (Positive = below center, Negative = above)
            const distanceFromCenter = cardCenter - viewportCenter;
            
            // 1. TILT EFFECT: Rotate X axis based on scroll position
            // Limits rotation to +/- 15 degrees to keep text readable
            let rotationX = distanceFromCenter * 0.05;
            
            // Clamp the values so they don't flip too far
            if (rotationX > 15) rotationX = 15;
            if (rotationX < -15) rotationX = -15;

            // 2. DEPTH EFFECT: Scale down slightly when at edges of screen
            // Abs() makes it work for both top and bottom
            const scale = 1 - Math.abs(distanceFromCenter * 0.0005);
            const clampedScale = Math.max(scale, 0.9); // Don't shrink below 90%

            // Apply the Transform
            // perspective(1000px) gives it the 3D depth
            // rotateX tilts it forward/back
            card.style.transform = `
                perspective(1000px) 
                rotateX(${-rotationX}deg) 
                scale(${clampedScale})
            `;
            
            // Adjust opacity for a "fade in" effect at edges
            let opacity = 1 - Math.abs(distanceFromCenter * 0.0015);
            card.style.opacity = Math.max(opacity, 0.2); // Never go fully invisible
        });
    };

    // Run on scroll
    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(update3D);
    });

    // Run once on load to set initial positions
    update3D();
});
