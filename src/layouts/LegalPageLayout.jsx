import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Spotlight from '../components/Spotlight';
import Thumbnail from '../components/Thumbnail';
import './LegalPageLayout.css';

// Import images
import diressImg from '../assets/diress.png';
import diressArt from '../assets/diress_art.png';
import wearupImg from '../assets/wearup.png';
import wearupArt from '../assets/wearup_art.png';
import producterImg from '../assets/producter.png';
import producterArt from '../assets/producter_art.png';
import minipiImg from '../assets/minipi.png';
import minipiArt from '../assets/minipi_art.png';

const LegalPageLayout = ({ children, title, translations, lang, setLang }) => {
    const navigate = useNavigate();
    const t = translations[lang];

    // Navigation handler for Header
    const handleSlideChange = (index) => {
        // Navigate to home and pass the target slide index via state
        navigate('/', { state: { targetSlide: index } });
    };

    return (
        <div className="main-container">
            <Spotlight active={false} /> {/* Spotlight disabled on legal pages or maybe enabled if desired? User said "like home" */}

            <Header
                currentSlide={-1} // No active slide in header
                setSlide={handleSlideChange}
                lang={lang}
                setLang={setLang}
                translations={translations}
            />

            <main className="content-mask legal-layout">
                {/* Left Column - Icons */}
                <div className="col-side left-side">
                    <Thumbnail
                        title="Diress"
                        desc={t.diressDesc}
                        imgSrc={diressImg}
                        artSrc={diressArt}
                        storesText="Available on App Store & Play Store"
                        linkText="App Store & Play Store"
                        rotate={-4}
                        delay={0}
                    />
                    <Thumbnail
                        title="Wearup"
                        desc={t.wearupDesc}
                        imgSrc={wearupImg}
                        artSrc={wearupArt}
                        storesText="Available on App Store & Play Store"
                        linkText="App Store & Play Store"
                        rotate={5}
                        delay={3}
                    />
                </div>

                {/* Center Column - Content */}
                <div className="col-center legal-content-wrapper">
                    <div className="legal-paper">
                        {children}
                    </div>
                </div>

                {/* Right Column - Icons */}
                <div className="col-side right-side">
                    <Thumbnail
                        title="Producter"
                        desc={t.producterDesc}
                        imgSrc={producterImg}
                        artSrc={producterArt}
                        storesText="Available on App Store & Play Store"
                        linkText="App Store & Play Store"
                        rotate={3}
                        delay={1.5}
                    />
                    <Thumbnail
                        title="Minipi"
                        desc={t.minipiDesc}
                        imgSrc={minipiImg}
                        artSrc={minipiArt}
                        storesText="Available on App Store & Play Store"
                        linkText="App Store & Play Store"
                        rotate={-6}
                        delay={4.5}
                    />
                </div>
            </main>

            <Footer
                currentSlide={-1}
                setSlide={handleSlideChange}
                totalPages={3}
                translations={translations}
                lang={lang}
            />
        </div>
    );
};

export default LegalPageLayout;
