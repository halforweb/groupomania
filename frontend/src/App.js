import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UseGlobalStyle from "./utils/GlobalStyle";

import Home from "./pages/Home.jsx";

function App() {
  return (
    <Router>
      <UseGlobalStyle />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <UseGlobalStyle />
    </Router>
  );
}

export default App;
