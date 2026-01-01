import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';
import logoIcon from '../icon.png';

const Header = ({ currentSlide, setSlide, lang, setLang, translations }) => {
    const t = translations[lang];
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavClick = (e, index) => {
        e.preventDefault();
        if (location.pathname !== '/') {
            navigate('/', { state: { targetSlide: index } });
        } else {
            setSlide(index);
        }
    };

    return (
        <header>
            <div className="logo">
                <img src={logoIcon} alt="Logo" className="logo-icon" />
                <span className="logo-text">diress<span className="dot">.</span></span>
            </div>
            <div className="header-right">
                <nav>
                    <ul>
                        <li>
                            <a
                                href="/"
                                onClick={(e) => handleNavClick(e, 0)}
                                className={currentSlide === 0 ? 'active' : ''}
                            >
                                {t.home}
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                onClick={(e) => handleNavClick(e, 1)}
                                className={currentSlide === 1 ? 'active' : ''}
                            >
                                {t.about}
                            </a>
                        </li>
                        <li>
                            <a
                                href="/"
                                onClick={(e) => handleNavClick(e, 2)}
                                className={currentSlide === 2 ? 'active' : ''}
                            >
                                {t.contacts}
                            </a>
                        </li>
                        <li>
                            <a
                                href="/pricing"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate('/pricing');
                                }}
                                className={location.pathname === '/pricing' ? 'active' : ''}
                            >
                                {t.pricing || 'Pricing'}
                            </a>
                        </li>
                    </ul>
                </nav>
                <button className="get-started-btn">
                    {t.getStarted}
                </button>
            </div>
        </header>
    );
};

export default Header;
