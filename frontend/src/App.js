import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import SignUp from "./routers/SignUp";
import Gallery from "./routers/Gallery";
import Ranking from "./routers/Ranking";
import Goods from "./routers/Goods";
import Main from "./routers/Main";
import Upload from "./routers/Upload";
import GoodsBuy from "./routers/GoodsBuy";
import Search from "./routers/Search";
import OneGallery from "./routers/OneGallery";
import Login from "./routers/Login";
import PostWithHashtags from "./routers/Test";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const NavbarSelector = () => {
    const location = useLocation();
    const navbarColorTheme =
      location.pathname === "/" ? "transparent" : "normal";
    return <Navbar isLoggedIn={isLoggedIn} colorTheme={navbarColorTheme} />;
  };

  return (
    <Router>
      <NavbarSelector />
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/navbar" element={<Navbar />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/goods" element={<Goods />} />
        <Route path="/goodsbuy" element={<GoodsBuy />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/oneGallery" element={<OneGallery />} />
      </Routes>
    </Router>
  );
}
export default App;
