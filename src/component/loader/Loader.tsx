import React from 'react';


type Props = {
    loadingMessage: string,
}

export function Loader({loadingMessage}: Props) {
    return (
        <div className="loader">
            <div className="spinner"></div>
            <p>{loadingMessage}</p>
        </div>
    );
};

