import React, {createContext} from 'react';
import './App.scss';
import {Header} from "./layout/header/header";
import {HomePage} from "./pages/home-page/HomePage";
import {useTFTData} from "./hooks/useTFTData";
import {Footer} from "./layout/footer/Footer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Content} from "./layout/content/Content";
import {SummonersPage} from "./pages/summoners-page/SummonersPage";
import {summonerPath} from "./routes/Routes";

interface TFTDataContextType {
    isLoading: boolean;
    analyzePlayerStatistic: (summonerName: string) => void;
    dataCounter: number;
    totalGameData: number;
}

export const TFTDataContext = createContext<TFTDataContextType>({
    isLoading: false,
    analyzePlayerStatistic: () => {
    },
    dataCounter: 0,
    totalGameData: 0,
});

function App() {
    const {isLoading, analyzePlayerStatistic, dataCounter, totalGameData} = useTFTData();
    return (
        <div className="app">
            <TFTDataContext.Provider value={{isLoading, analyzePlayerStatistic, dataCounter, totalGameData}}>
                <BrowserRouter>
                    <Header/>
                    <Content>
                        <Routes>
                            <Route path={"/"} element={<HomePage/>}/>
                            <Route path={summonerPath(":summonersId")} element={<SummonersPage />}/>
                        </Routes>
                    </Content>
                    <Footer/>
                </BrowserRouter>
            </TFTDataContext.Provider>
        </div>
    );
}

export default App;
