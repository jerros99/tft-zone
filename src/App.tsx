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

function App() {
    return (
        <div className="app">
                <BrowserRouter>
                    <Header/>
                    <Content>
                        <Routes>
                            <Route path={"/"} element={<HomePage/>}/>
                            <Route path={summonerPath(":summonerName")} element={<SummonersPage />}/>
                        </Routes>
                    </Content>
                    <Footer/>
                </BrowserRouter>
        </div>
    );
}

export default App;
