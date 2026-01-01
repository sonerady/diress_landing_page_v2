import React, { useEffect, useRef } from 'react';
import './Spotlight.css';

const Spotlight = ({ active }) => {
    const spotlightRef = useRef(null);
    const timeoutRef = useRef(null);

    useEffect(() => {
        const mainContainer = document.querySelector('.main-container');
        const spotlight = spotlightRef.current;

        if (!mainContainer || !spotlight) return;

        const handleMouseMove = (e) => {
            // Only active on desktop and when active prop is true (Home section)
            if (window.innerWidth > 768 && active) {
                spotlight.style.display = 'block';
                requestAnimationFrame(() => {
                    spotlight.style.opacity = '0.6';
                });

                // Clear previous timeout
                if (timeoutRef.current) {
                    clearTimeout(timeoutRef.current);
                }

                // Auto fade out after 1 second
                timeoutRef.current = setTimeout(() => {
                    spotlight.style.opacity = '0';
                }, 1000);

                const rect = mainContainer.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                spotlight.style.setProperty('--x', x + 'px');
                spotlight.style.setProperty('--y', y + 'px');

                // Check distance for interactive elements
                const interactiveElements = document.querySelectorAll('nav a, .logo, .lang-switch, .socials i, .main-info p, .legal-link');
                interactiveElements.forEach(el => {
                    const elRect = el.getBoundingClientRect();
                    const elX = elRect.left + elRect.width / 2;
                    const elY = elRect.top + elRect.height / 2;

                    const dist = Math.sqrt(Math.pow(e.clientX - elX, 2) + Math.pow(e.clientY - elY, 2));

                    if (dist < 100) {
                        el.classList.add('spotlight-active');
                    } else {
                        el.classList.remove('spotlight-active');
                    }
                });
            } else {
                spotlight.style.display = 'none';
            }
        };

        const handleMouseLeave = () => {
            spotlight.style.display = 'none';
        };

        mainContainer.addEventListener('mousemove', handleMouseMove);
        mainContainer.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            mainContainer.removeEventListener('mousemove', handleMouseMove);
            mainContainer.removeEventListener('mouseleave', handleMouseLeave);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [active]);

    return <div className="mouse-spotlight" ref={spotlightRef}></div>;
};

export default Spotlight;
