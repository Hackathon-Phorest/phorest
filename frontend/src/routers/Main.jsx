import styles from "../styles/Main.module.css";
import { useState, useEffect } from "react";
import useHover2 from "../utils/useHover2";
import axios from "axios";

import ArrowButton from "../components/ArrowButton";
import leftArrowBtnImg from "../assets/btn_left_white.png";
import rightArrowBtnImg from "../assets/btn_right_white.png";
import gradationFilterImg from "../assets/gradationFilter.png";

import enterButtonNormal from "../assets/btn_enter_normal.png";
import enterButtonHover from "../assets/btn_enter_hover.png";

import imgPet from "../assets/imgPet.png";
import imgSea from "../assets/imgSea.png";
import imgMountain from "../assets/imgMountain.png";
import imgCharacter from "../assets/imgCharacter.png";
import imgSeason from "../assets/imgSeason.png";
import imgCamping from "../assets/imgCamping.png";
import imgAnimal from "../assets/imgAnimal.png";
import imgView from "../assets/imgView.png";
import imgETC from "../assets/imgETC.png";

const Main = ({
  BASE_URL,
  currentType,
  photoCategories,
  illustCategories,
  currentCategory,
  setCurrentCategory,
}) => {
  const imageMap = {
    반려동물: imgPet,
    바다: imgSea,
    산: imgMountain,
    계절: imgSeason,
    캠핑: imgCamping,
    캐릭터: imgCharacter,
    동물: imgAnimal,
    풍경: imgView,
    기타: imgETC,
  };

  useEffect(() => {
    const fetchRecommend = async () => {
      try {
        const response1 = await axios.get(
          `${BASE_URL}api/categories/recommend?type=사진`
        );
        //response2
        if (Array.isArray(response1.data.categories)) {
          console.log(response1.data);
        } else {
          console.error("응답이 Array가 아닙니다:", response1.data);
        }
      } catch (error) {
        console.error("Error fetching recommend data:", error);
      }
    };
    fetchRecommend();
  }, []);

  const [currentPhotoCategory, setCurrentPhotoCategory] = useState("");
  const [currentIllustCategory, setCurrentIllustCategory] = useState("");
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentIllustIndex, setCurrentIllustIndex] = useState(0);
  const [enterBtnHovered, setEnterBtnHovered] = useState(false);

  const enterOnHover = () => {
    setEnterBtnHovered(true);
  };
  const enterOnHoverOut = () => {
    setEnterBtnHovered(false);
  };
  const refEnterBtn = useHover2(enterOnHover, enterOnHoverOut);

  const leftButtonHandler = () => {
    if (currentType === "사진") {
      setCurrentPhotoIndex(
        (prev) => (prev - 1 + photoCategories.length) % photoCategories.length
      );
    } else if (currentType === "일러스트") {
      setCurrentIllustIndex(
        (prev) => (prev - 1 + illustCategories.length) % illustCategories.length
      );
    }
  };

  const rightButtonHandler = () => {
    if (currentType === "사진") {
      setCurrentPhotoIndex((prev) => (prev + 1) % photoCategories.length);
    } else if (currentType === "일러스트") {
      setCurrentIllustIndex((prev) => (prev + 1) % illustCategories.length);
    }
  };

  const enterClickHandler = () => {
    alert(`${currentType},${currentCategory}`);
  };

  return (
    <div className={styles.containerMain}>
      {currentType === "사진" &&
        photoCategories.map((item, index) => {
          if (index === currentPhotoIndex) {
            const imageUrl = imageMap[item];
            setCurrentCategory(item);
            return (
              <div
                key={item}
                className={styles.bgImg}
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            );
          } else {
            return null;
          }
        })}
      {currentType === "일러스트" &&
        illustCategories.map((item, index) => {
          if (index === currentIllustIndex) {
            const imageUrl = imageMap[item];
            setCurrentCategory(item);
            return (
              <div
                key={item}
                className={styles.bgImg}
                style={{ backgroundImage: `url(${imageUrl})` }}
              />
            );
          } else {
            return null;
          }
        })}
      <div
        className={styles.bgGradationFilter}
        style={{ backgroundImage: `url(${gradationFilterImg})` }}
      />
      <div className={styles.bigLetterLogo}></div>
      <div className={styles.ArrowButtonsBox}>
        <ArrowButton
          onClick={leftButtonHandler}
          imageSrc={leftArrowBtnImg}
          alt="left arrow button"
        />
        <ArrowButton
          onClick={rightButtonHandler}
          imageSrc={rightArrowBtnImg}
          alt="right arrow button"
        />
      </div>
      <button
        className={styles.enterButton}
        ref={refEnterBtn}
        onClick={enterClickHandler}
      >
        {enterBtnHovered ? (
          <img src={enterButtonHover} alt="입장하기" />
        ) : (
          <img src={enterButtonNormal} alt="입장하기" />
        )}
      </button>
    </div>
  );
};

export default Main;
