import React from "react";
import "./App.scss";

import HeaderComponent from './components/header/HeaderComponent';
import NewsComponent from './components/news/NewsComponent';

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <NewsComponent />
    </div>
  );
}

export default App;
