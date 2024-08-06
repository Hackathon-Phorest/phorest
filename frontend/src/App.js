import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import axios from "axios";

import Navbar from "./components/Navbar";
import SignUp from "./routers/SignUp";
import Gallery from "./routers/Gallery2";
import Ranking from "./routers/Ranking";
import Goods from "./routers/Goods";
import Main from "./routers/Main";
import Upload from "./routers/Upload";
import GoodsBuy from "./routers/GoodsBuy";
import Search from "./routers/Search";
import OneGallery from "./routers/OneGallery";
import Login from "./routers/Login";
import Mypage from "./routers/Mypage";
import PostWithHashtags from "./routers/Test";

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.css";

const BASE_URL = "http://3.39.26.152:8000/";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentType, setCurrentType] = useState("사진");
  const [currentCategory, setCurrentCategory] = useState("반려동물");
  const [photoCategories, setPhotoCategories] = useState([]);
  const [illustCategories, setIllustCategories] = useState([]);

  const fetchAllCategories = async () => {
    try {
      const response1 = await axios.get(`${BASE_URL}api/categories?type=사진`);
      const response2 = await axios.get(
        `${BASE_URL}api/categories?type=일러스트`
      );
      if (
        Array.isArray(response1.data.categories) &&
        Array.isArray(response2.data.categories)
      ) {
        setPhotoCategories(response1.data.categories);
        setIllustCategories(response2.data.categories);
      } else {
        console.error("응답이 배열이 아닙니다:", response1.data);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  useEffect(() => {
    fetchAllCategories();
  }, []);

  const NavbarSelector = () => {
    const location = useLocation();
    const navbarColorTheme =
      location.pathname === "/" ? "transparent" : "normal";
    const navbarCategory = location.pathname === "/" ? "flex" : "none";
    const navbarTheme = location.pathname === "/" ? "flex" : "none";
    const navbarShowDivider = location.pathname === "/" ? true : false;
    return (
      <Navbar
        isLoggedIn={isLoggedIn}
        colorTheme={navbarColorTheme}
        currentType={currentType}
        setCurrentType={setCurrentType}
        currentCategory={currentCategory}
        displayCategory={navbarCategory}
        displayTheme={navbarTheme}
        showDivier={navbarShowDivider}
      />
    );
  };

  return (
    <Router>
      <NavbarSelector />
      <Routes>
        <Route
          path="/"
          element={
            <Main
              BASE_URL={BASE_URL}
              currentType={currentType}
              photoCategories={photoCategories}
              illustCategories={illustCategories}
              currentCategory={currentCategory}
              setCurrentCategory={setCurrentCategory}
            />
          }
        />
        {/* <Route path="/navbar" element={<Navbar />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/ranking" element={<Ranking />} curr/>
        <Route path="/goods" element={<Goods />} />
        <Route path="/goodsbuy" element={<GoodsBuy />} />
        <Route path="/upload" element={<Upload BASE_URL={BASE_URL} />} />
        <Route
          path="/gallery"
          element={
            <Gallery
              BASE_URL={BASE_URL}
              currentType={currentType}
              currentCategory={currentCategory}
            />
          }
        />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/oneGallery" element={<OneGallery />} />
      </Routes>
    </Router>
  );
}
export default App;
