import React from 'react';
import './ContactSection.css';

const ContactSection = ({ translations, lang }) => {
    const t = translations[lang];

    return (
        <section className="page-section" id="contacts-section">
            <h2>{t.contactTitle}</h2>
            <div className="contact-info-box">
                <div className="contact-item">
                    <span className="contact-label">{t.emailLabel}</span>
                    <span className="contact-value">info@monailisa.com</span>
                </div>
                <div className="contact-item">
                    <span className="contact-label">{t.phoneLabel}</span>
                    <span className="contact-value">+90 553 677 8682</span>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
