import React, { useState, useRef } from 'react';
import './HomeSection.css';

// Import images
import scene1 from '../assets/center_image_scene_1.png';
import scene2 from '../assets/center_image_2.png';
import scene3 from '../assets/center_image.png';

const HomeSection = ({ translations, lang, currentScene }) => {
    const [magnifierStyle, setMagnifierStyle] = useState({ display: 'none' });
    const artWrapperRef = useRef(null);
    const scenes = [scene2, scene1, scene3];
    const activeImage = scenes[currentScene] || scene1;

    const handleMouseMove = (e) => {
        if (!artWrapperRef.current) return;

        const { top, left, width, height } = artWrapperRef.current.getBoundingClientRect();
        const x = e.pageX - left - window.scrollX;
        const y = e.pageY - top - window.scrollY;

        // Settings
        const zoom = 3.5;
        const offset = 90; // Cursor is now perfectly centered (magnifierSize / 2)

        if (x > 0 && y > 0 && x < width && y < height) {
            setMagnifierStyle({
                display: 'block',
                top: `${y - offset}px`,
                left: `${x - offset}px`,
                backgroundImage: `url(${activeImage})`,
                backgroundColor: '#fff',
                backgroundRepeat: 'no-repeat',
                backgroundSize: `${width * zoom}px ${height * zoom}px`,
                backgroundPosition: `-${x * zoom - offset}px -${y * zoom - offset}px`,
            });
        } else {
            setMagnifierStyle({ display: 'none' });
        }
    };

    const handleMouseLeave = () => {
        setMagnifierStyle({ display: 'none' });
    };

    return (
        <section className="page-section active" id="home-section">
            <div className="col-center">
                <div className="main-info">
                </div>
                <div
                    className="art-wrapper"
                    ref={artWrapperRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={activeImage}
                        alt="Home Portrait"
                        className="main-portrait"
                        key={currentScene} // Force re-render for transition if needed
                    />
                    <div className="magnifier" style={magnifierStyle}></div>
                </div>
            </div>
        </section>
    );
};

export default HomeSection;
