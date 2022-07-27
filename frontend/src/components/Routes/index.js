import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../../pages/Login";
import Home from "../../pages/Home";

//* We create the routes through the router, redirecting to the right page
const index = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            </Routes>
        </Router>
    );
};

export default index;