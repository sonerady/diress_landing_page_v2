import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Header.css';

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
                Lab<span className="dot">.</span>
            </div>
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
                </ul>
            </nav>
            <div className="lang-switch">
                <span
                    onClick={() => setLang('en')}
                    className={lang === 'en' ? 'active-lang' : ''}
                >
                    EN
                </span> /
                <span
                    onClick={() => setLang('tr')}
                    className={lang === 'tr' ? 'active-lang' : ''}
                >
                    TR
                </span>
            </div>
        </header>
    );
};

export default Header;
