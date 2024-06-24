import React from "react";
import { Route, Routes as Router } from "react-router-dom";
import Main from "../views/pages/Dashboard";
import Home from "../views/pages/Home";

const Routes = () => {
    return (
        <Router>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Main />} />
        </Router>
    );
};

export default Routes;
