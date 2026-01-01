import React from 'react';
import './Thumbnail.css';

const Thumbnail = ({ title, desc, imgSrc, artSrc, storesText, linkText, linkUrl = "#", rotate = 0, delay = 0 }) => {
    return (
        <div className="thumbnail-group">
            <div className="thumb-img-wrapper">
                <img
                    src={artSrc}
                    className="thumb-img-layer thumb-img-art"
                    alt={`${title} App Art`}
                    style={{ animationDelay: `${delay}s`, transform: `rotate(${rotate}deg)` }}
                />
                <img
                    src={imgSrc}
                    className="thumb-img-layer thumb-img-original"
                    alt={`${title} App`}
                    style={{ transform: `rotate(${rotate}deg)` }}
                />
            </div>
            <div className="thumb-info">
                <h4>{title}</h4>
                <span>{desc}</span>
            </div>
            {/* Tooltip */}
            <div className="historical-tooltip">
                <div className="tooltip-title">{title}</div>
                <div className="tooltip-stores">{storesText}</div>
                <div className="tooltip-desc">{desc}</div>
                <a href={linkUrl} className="tooltip-link">{linkText}</a>
            </div>
        </div>
    );
};

export default Thumbnail;
