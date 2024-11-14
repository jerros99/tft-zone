import React, {createContext} from 'react';
import './App.scss';
import {Header} from "./layout/header/header";
import {HomePage} from "./pages/home-page/HomePage";
import {useTFTData} from "./hooks/useTFTData";

interface TFTDataContextType {
    isLoading: boolean;
    analyzePlayerStatistic: (summonerName: string) => void;
    dataCounter: number;
    totalGameData: number;
}

export const TFTDataContext = createContext<TFTDataContextType>({
    isLoading: false,
    analyzePlayerStatistic: () => {},
    dataCounter: 0,
    totalGameData: 0,
});

function App() {
    const {isLoading, analyzePlayerStatistic, dataCounter, totalGameData} = useTFTData();
    return (
        <div className="app">
            <TFTDataContext.Provider value={{ isLoading, analyzePlayerStatistic, dataCounter, totalGameData }}>
                <Header/>
                <HomePage />
            </TFTDataContext.Provider>
        </div>
    );
}

export default App;
