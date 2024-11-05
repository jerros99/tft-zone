import React from 'react';
import logo from './logo.svg';
import './App.scss';
import {Header} from "./layout/header/header";
import {HomePage} from "./pages/home-page/HomePage";

function App() {
  return (
    <div className="app">
      <Header />
        <HomePage />
    </div>
  );
}

export default App;
