import React from 'react';
import bgImage from '../../assets/bg-tft-zone.jpg'

export function HomePage() {
    return (
        <div className="home-page">
            <div className="home-page__background">
                <img src={bgImage}/>
            </div>
        </div>
    );
}

