import React from 'react';
import Thumbnail from '../components/Thumbnail';
import './HomeSection.css';

// Import images
import diressImg from '../assets/diress.png';
import diressArt from '../assets/diress_art.png';
import wearupImg from '../assets/wearup.png';
import wearupArt from '../assets/wearup_art.png';
import producterImg from '../assets/producter.png';
import producterArt from '../assets/producter_art.png';
import minipiImg from '../assets/minipi.png';
import minipiArt from '../assets/minipi_art.png';
import monalisaImg from '../assets/monalisa.png';

const HomeSection = ({ translations, lang }) => {
    const t = translations[lang];

    return (
        <section className="page-section active" id="home-section">
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

            <div className="col-center">
                <div className="art-wrapper">
                    <img src={monalisaImg} alt="Monailisa" className="main-portrait" />
                </div>
                <div className="main-info">
                    <h1>
                        Mon<span className="ai-red">ai</span>lisa Lab.
                    </h1>
                    <p>{t.artist}</p>
                </div>
            </div>

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
        </section>
    );
};

export default HomeSection;
