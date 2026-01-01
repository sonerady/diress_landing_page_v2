import React from 'react';
import './Footer.css';

const Footer = ({ currentSlide, setSlide, totalPages, translations, lang }) => {
    const t = translations[lang];

    const nextSlide = () => {
        let next = currentSlide + 1;
        if (next >= totalPages) next = 0;
        setSlide(next);
    };

    const prevSlide = () => {
        if (currentSlide > 0) {
            setSlide(currentSlide - 1);
        }
    };

    return (
        <footer>
            <div className="socials">
                <i className="fab fa-instagram"></i>
                <i className="fab fa-twitter"></i>
                <i className="fab fa-linkedin-in"></i>
                {/* Legal Links */}
                <a href="/privacy-policy" className="legal-link">Privacy Policy</a>
                <span className="legal-separator">|</span>
                <a href="/terms" className="legal-link">Terms of Service</a>
            </div>

            {/* Pagination Area */}
            <div className="pagination-container">
                {/* PREV BUTTON */}
                <div
                    className={`prev-page-btn ${currentSlide > 0 ? 'visible' : ''}`}
                    id="prevBtn"
                    onClick={prevSlide}
                >
                    <i className="fas fa-chevron-left"></i>
                    <span>{t.prevPage}</span>
                </div>

                {/* PAGE NUMBER */}
                <div className="page-number">
                    <span className="big-num" id="page-indicator">0{currentSlide + 1}</span>
                    <span className="small-num">0{totalPages}</span>
                </div>

                {/* NEXT BUTTON */}
                <div className="next-page-btn" onClick={nextSlide}>
                    <span>{t.nextPage}</span>
                    <i className="fas fa-chevron-right"></i>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
