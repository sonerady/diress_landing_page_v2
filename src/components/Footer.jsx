import React, { useState } from 'react';
import './Footer.css';

const Footer = ({ translations, lang, setLang, currentStep, setCurrentStep, steps }) => {

    return (
        <>
            {/* Vertical Step Slider on Left */}
            <div className="vertical-slider-container">
                <div className="vertical-slider">
                    {steps.map((label, index) => (
                        <React.Fragment key={index}>
                            <div
                                className={`step-item ${currentStep === index ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                                onClick={() => setCurrentStep(index)}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span className="step-dot"></span>
                                <span className="step-label">{label}</span>
                            </div>
                            {index < steps.length - 1 && (
                                <div
                                    className={`step-line ${index < currentStep ? 'completed' : ''}`}
                                    style={{ animationDelay: `${index * 0.1 + 0.05}s` }}
                                ></div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <footer>
                <div className="socials">
                    <i className="fab fa-instagram"></i>
                    <i className="fab fa-twitter"></i>
                    <i className="fab fa-linkedin-in"></i>
                    <a href="/privacy-policy" className="legal-link">Privacy Policy</a>
                    <span className="legal-separator">|</span>
                    <a href="/terms" className="legal-link">Terms of Service</a>
                </div>

                <div className="footer-right">
                    {/* <div className="lang-switch">
                        <span
                            onClick={() => setLang('en')}
                            className={lang === 'en' ? 'active-lang' : ''}
                        >
                            EN
                        </span>
                        <span className="separator">/</span>
                        <span
                            onClick={() => setLang('tr')}
                            className={lang === 'tr' ? 'active-lang' : ''}
                        >
                            TR
                        </span>
                    </div> */}

                    <div className="store-badges">
                        <a href="#" className="store-btn">
                            <i className="fab fa-apple"></i>
                            <div className="btn-text">
                                <span>Download on the</span>
                                <strong>App Store</strong>
                            </div>
                        </a>
                        <a href="#" className="store-btn">
                            <i className="fab fa-google-play"></i>
                            <div className="btn-text">
                                <span>GET IT ON</span>
                                <strong>Google Play</strong>
                            </div>
                        </a>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
