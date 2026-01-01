import React from 'react';
import './AboutSection.css';

const AboutSection = ({ translations, lang }) => {
    const t = translations[lang];

    return (
        <section className="page-section" id="about-section">
            <div className="about-text">
                <h2>{t.aboutTitle}</h2>
                <p>{t.aboutDesc}</p>
                <p>{t.aboutDesc2}</p>
                <div className="est">{t.est}</div>
            </div>
        </section>
    );
};

export default AboutSection;
