import React from 'react';
import './HomeSection.css';

// Import images
import centerImage from '../assets/center_image.png';

const HomeSection = ({ translations, lang }) => {
    return (
        <section className="page-section active" id="home-section">
            <div className="col-center">
                <div className="art-wrapper">
                    <img src={centerImage} alt="Diress" className="main-portrait" />
                </div>
            </div>
        </section>
    );
};

export default HomeSection;
