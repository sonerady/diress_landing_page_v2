import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Spotlight from './components/Spotlight';
import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import MannequinTips from './MannequinTips';
import RedirectToApp from './components/RedirectToApp';
import './styles/global.css';

const translations = {
    en: {
        home: "Home",
        about: "About",
        contacts: "Contacts",
        artist: "Crafting Intelligent Solutions with AI",
        aboutTitle: "About The Atelier",
        aboutDesc: "Monailisa Lab is an AI-focused software company that develops cutting-edge applications powered by artificial intelligence. While we create custom solutions for other businesses, our true passion lies in our own AI-driven products.",
        aboutDesc2: "We believe in the transformative power of AI technology, crafting intelligent applications that push the boundaries of what's possible in the digital realm.",
        contactTitle: "Correspondence",
        emailLabel: "Electronic Mail",
        phoneLabel: "Phone",
        est: "EST. MMXXIV",
        nextPage: "NEXT PAGE",
        prevPage: "PREV PAGE",
        diressDesc: "AI Mannequin Dressing App.",
        wearupDesc: "AI outfit combinations.",
        producterDesc: "AI product photography.",
        minipiDesc: "AI newborn templates."
    },
    tr: {
        home: "Anasayfa",
        about: "Hakkında",
        contacts: "İletişim",
        artist: "Yapay Zeka ile Akıllı Çözümler Üretiyoruz",
        aboutTitle: "Atölye Hakkında",
        aboutDesc: "Monailisa Lab, yapay zeka odaklı bir yazılım şirketidir ve yapay zeka ile güçlendirilmiş son teknoloji uygulamalar geliştirmektedir. Diğer işletmeler için özel çözümler üretirken, asıl tutkumuz kendi yapay zeka destekli ürünlerimizdir.",
        aboutDesc2: "Yapay zeka teknolojisinin dönüştürücü gücüne inanıyor, dijital alanda mümkün olanın sınırlarını zorlayan akıllı uygulamalar yaratıyoruz.",
        contactTitle: "İletişim",
        emailLabel: "Elektronik Posta",
        phoneLabel: "Telefon",
        est: "KURULUŞ: 2024",
        nextPage: "SONRAKİ",
        prevPage: "ÖNCEKİ",
        diressDesc: "AI Manken Giydirme Uygulaması.",
        wearupDesc: "AI kıyafet kombinleri.",
        producterDesc: "AI ürün fotoğrafçılığı.",
        minipiDesc: "AI yenidoğan şablonları."
    }
};

const MainContent = ({ lang, setLang }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const location = useLocation();
    const totalPages = 3;

    // Handle incoming navigation from other pages
    useEffect(() => {
        if (location.state && typeof location.state.targetSlide === 'number') {
            setCurrentSlide(location.state.targetSlide);
            // Clear state to prevent resetting on refresh (optional but good practice)
            window.history.replaceState({}, document.title);
        }
    }, [location]);

    // Handle slide transition
    const sliderStyle = {
        transform: `translateX(-${currentSlide * 33.333}%)`
    };

    return (
        <>
            <div className="main-container">
                <Spotlight active={currentSlide === 0} />

                <Header
                    currentSlide={currentSlide}
                    setSlide={setCurrentSlide}
                    lang={lang}
                    setLang={setLang}
                    translations={translations}
                />

                <main className="content-mask">
                    <div className="slider-track" style={sliderStyle}>
                        <HomeSection translations={translations} lang={lang} />
                        <AboutSection translations={translations} lang={lang} />
                        <ContactSection translations={translations} lang={lang} />
                    </div>
                </main>

                {/* Mobile Navigation Arrows */}
                <div
                    className={`mobile-nav-arrow left ${currentSlide === 0 ? 'disabled' : ''}`}
                    onClick={() => currentSlide > 0 && setCurrentSlide(prev => prev - 1)}
                >
                    <i className="fas fa-chevron-left"></i>
                </div>
                <div
                    className={`mobile-nav-arrow right ${currentSlide === totalPages - 1 ? 'disabled' : ''}`}
                    onClick={() => currentSlide < totalPages - 1 && setCurrentSlide(prev => prev + 1)}
                >
                    <i className="fas fa-chevron-right"></i>
                </div>

                <Footer
                    currentSlide={currentSlide}
                    setSlide={setCurrentSlide}
                    totalPages={totalPages}
                    translations={translations}
                    lang={lang}
                />
            </div>
            {/* Mobile Legal Links */}
            <div className="mobile-legal-links">
                <a href="/terms">Terms of Service</a>
                <span className="separator">•</span>
                <a href="/privacy-policy">Privacy Policy</a>
            </div>
        </>
    );
};

const App = () => {
    const [lang, setLang] = useState('en');

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainContent lang={lang} setLang={setLang} />} />
                <Route
                    path="/privacy-policy"
                    element={<PrivacyPolicy translations={translations} lang={lang} setLang={setLang} />}
                />
                <Route
                    path="/terms"
                    element={<TermsOfService translations={translations} lang={lang} setLang={setLang} />}
                />
                <Route
                    path="/mannequin-tips"
                    element={<MannequinTips lang={lang} />}
                />
                <Route
                    path="/diress-app"
                    element={<RedirectToApp />}
                />
                {/* Add other routes if needed */}
            </Routes>
        </Router>
    );
};

export default App;
