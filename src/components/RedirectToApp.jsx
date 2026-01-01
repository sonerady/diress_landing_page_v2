import React, { useEffect } from 'react';

const RedirectToApp = () => {
    useEffect(() => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;
        const iosUrl = "https://apps.apple.com/app/ai-fashion-try-on-diress/id6738030797";
        const androidUrl = "https://play.google.com/store/apps/details?id=com.monalisa.diress.app";

        // iOS detection (iPhone, iPad, iPod)
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            window.location.href = iosUrl;
        }
        // Mac Desktop (often preferred to go to App Store preview)
        else if (/Mac/.test(userAgent) && !/iPhone/.test(userAgent)) {
            window.location.href = iosUrl;
        }
        // Android detection
        else if (/android/i.test(userAgent)) {
            window.location.href = androidUrl;
        }
        // Default fallback (Windows, Linux, others)
        else {
            window.location.href = androidUrl;
        }
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            fontFamily: "'Lato', sans-serif",
            color: '#666'
        }}>
            <p>Redirecting...</p>
        </div>
    );
};

export default RedirectToApp;
