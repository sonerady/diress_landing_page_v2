import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import HomeSection from './sections/HomeSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfService from './TermsOfService';
import MannequinTips from './MannequinTips';
import RedirectToApp from './components/RedirectToApp';
import Pricing from './Pricing';
import './styles/global.css';

const translations = {
    en: {
        home: "Home",
        about: "About",
        contacts: "Contacts",
        pricing: "Pricing",
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
        getStarted: "GET STARTED",
        diressDesc: "AI Mannequin Dressing App.",
        wearupDesc: "AI outfit combinations.",
        producterDesc: "AI product photography.",
        minipiDesc: "AI newborn templates."
    },
    tr: {
        home: "Anasayfa",
        about: "Hakkında",
        contacts: "İletişim",
        pricing: "Fiyatlar",
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
        getStarted: "BAŞLA",
        diressDesc: "AI Manken Giydirme Uygulaması.",
        wearupDesc: "AI kıyafet kombinleri.",
        producterDesc: "AI ürün fotoğrafçılığı.",
        minipiDesc: "AI yenidoğan şablonları."
    }
};

const MainContent = ({ lang, setLang }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [currentScene, setCurrentScene] = useState(0);
    const isScrollingRef = useRef(false);
    const touchStartRef = useRef(0);
    const location = useLocation();
    const totalPages = 3;
    const steps = [
        'Select Scene',
        'Ecommerce Kits',
        'Customize Model',
        'Retouch',
        'Change Color',
        'Change Pose',
        'Image to Video'
    ];
    const totalSteps = steps.length;

    // Intro animation sequence for steps
    useEffect(() => {
        const runIntro = async () => {
            // Wait for initial CSS staggered animation to finish
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Cycle through each step quickly
            for (let i = 0; i < totalSteps; i++) {
                setCurrentStep(i);
                await new Promise(resolve => setTimeout(resolve, 100)); // Quick 100ms per step
            }

            // Reset to first step
            setTimeout(() => {
                setCurrentStep(0);
            }, 300);
        };

        runIntro();
    }, [totalSteps]);

    // Handle wheel scroll for vertical steps and scenes
    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault();
            if (isScrollingRef.current) return;

            if (Math.abs(e.deltaY) > 15) {
                isScrollingRef.current = true;

                if (e.deltaY > 0) {
                    // Scrolling Down
                    if (currentStep === 0 && currentScene < 2) {
                        setCurrentScene(prev => prev + 1);
                    } else {
                        setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
                    }
                } else {
                    // Scrolling Up
                    if (currentStep === 1) {
                        setCurrentStep(0);
                        setCurrentScene(2);
                    } else if (currentStep === 0 && currentScene > 0) {
                        setCurrentScene(prev => prev - 1);
                    } else {
                        setCurrentStep(prev => Math.max(prev - 1, 0));
                    }
                }

                setTimeout(() => {
                    isScrollingRef.current = false;
                }, 600);
            }
        };

        const handleTouchStart = (e) => {
            touchStartRef.current = e.touches[0].clientY;
        };

        const handleTouchMove = (e) => {
            if (isScrollingRef.current) {
                e.preventDefault();
                return;
            }
            const touchEnd = e.touches[0].clientY;
            const diff = touchStartRef.current - touchEnd;

            if (Math.abs(diff) > 25) {
                e.preventDefault();
                isScrollingRef.current = true;

                if (diff > 0) {
                    // Swipe Up (Scroll Down)
                    if (currentStep === 0 && currentScene < 2) {
                        setCurrentScene(prev => prev + 1);
                    } else {
                        setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
                    }
                } else {
                    // Swipe Down (Scroll Up)
                    if (currentStep === 1) {
                        setCurrentStep(0);
                        setCurrentScene(2);
                    } else if (currentStep === 0 && currentScene > 0) {
                        setCurrentScene(prev => prev - 1);
                    } else {
                        setCurrentStep(prev => Math.max(prev - 1, 0));
                    }
                }

                touchStartRef.current = touchEnd;
                setTimeout(() => {
                    isScrollingRef.current = false;
                }, 600);
            }
        };

        // Use passive: false to allow preventDefault
        window.addEventListener('wheel', handleWheel, { passive: false });
        window.addEventListener('touchstart', handleTouchStart, { passive: false });
        window.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        };
    }, [totalSteps, currentStep, currentScene]);

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
            <div className={`main-container step-${currentStep} scene-${currentScene}`}>


                <Header
                    currentSlide={currentSlide}
                    setSlide={setCurrentSlide}
                    lang={lang}
                    setLang={setLang}
                    translations={translations}
                />

                <main className="content-mask">
                    <div className="slider-track" style={sliderStyle}>
                        <HomeSection translations={translations} lang={lang} currentScene={currentScene} />
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
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    steps={steps}
                    translations={translations}
                    lang={lang}
                    setLang={setLang}
                />

                {/* Scroll Indicator - Hidden after first scroll (step 0, scene 0) */}
                <div className={`scroll-indicator ${(currentStep > 0 || currentScene > 0) ? 'hidden' : ''}`}>
                    <div className="mouse"></div>
                    <span>Scroll</span>
                </div>
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
                <Route
                    path="/pricing"
                    element={<Pricing translations={translations} lang={lang} setLang={setLang} />}
                />
                {/* Add other routes if needed */}
            </Routes>
        </Router>
    );
};

export default App;
