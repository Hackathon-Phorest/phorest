import styles from "../styles/Navbar.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";

import Logo from "../assets/nav_logo";
import SearchIcon from "../assets/nav_search_icon";
import RankingIcon from "../assets/nav_ranking_icon";
import GoodsIcon from "../assets/nav_goods_icon";
import ProfileImgDefault from "../assets/default_profile_image.png";
import IconWithTooltip from "./IconWithTooltip";

const Navbar = ({
  isLoggedIn,
  colorTheme,
  currentType,
  setCurrentType,
  currentCategory,
  displayCategory,
  displayTheme,
  displayDivider,
}) => {
  const isNormalTheme = colorTheme === "normal";

  return (
    <div
      className={styles.navbarContainer}
      style={{
        background: isNormalTheme ? "white" : "transparent",
        borderBottom: isNormalTheme
          ? "2px solid #2D2D2D29"
          : "2px solid #FFFFFF3D",
      }}
    >
      <div className={styles.logo}>
        <Link to="/">
          <Logo color={isNormalTheme ? "black" : "white"} />
        </Link>
      </div>
      <div className={styles.typesBox} style={{ display: displayTheme }}>
        <div
          className={styles.typePhoto}
          onClick={() => setCurrentType("사진")}
          style={{
            color: `${isNormalTheme ? "black" : "white"}`,
            borderBottom:
              currentType === "사진"
                ? isNormalTheme
                  ? "3px solid #000000"
                  : "3px solid #FFFFFF"
                : "none",
          }}
        >
          사진
        </div>
        <div
          className={styles.typeIllustration}
          onClick={() => setCurrentType("일러스트")}
          style={{
            color: `${isNormalTheme ? "black" : "white"}`,
            borderBottom:
              currentType === "일러스트"
                ? isNormalTheme
                  ? "3px solid #000000"
                  : "3px solid #FFFFFF"
                : "none",
          }}
        >
          일러스트
        </div>
      </div>
      <div
        className={styles.divider}
        style={{
          backgroundColor: isNormalTheme ? "#00000033" : "#FFFFFF33",
          display: displayDivider,
        }}
      />
      <div className={styles.categoryBox} style={{ display: displayCategory }}>
        <div
          className={styles.recommend}
          style={{ color: `${isNormalTheme ? "#00000066" : "#FFFFFF52"}` }}
        >
          추천
        </div>
        <div
          className={styles.category}
          style={{ color: `${isNormalTheme ? "black" : "white"}` }}
        >
          {currentCategory}
        </div>
      </div>
      <div className={styles.iconsBox}>
        <Link to="/search">
          <IconWithTooltip
            IconComponent={SearchIcon}
            color={isNormalTheme ? "black" : "white"}
            tooltipText="검색"
          />
        </Link>
        <Link to="/ranking">
          <IconWithTooltip
            IconComponent={RankingIcon}
            color={isNormalTheme ? "black" : "white"}
            tooltipText="랭킹"
          />
        </Link>
        <Link to="/goods">
          <IconWithTooltip
            IconComponent={GoodsIcon}
            color={isNormalTheme ? "black" : "white"}
            tooltipText="굿즈"
          />
        </Link>
      </div>
      <div className={styles.personalBox}>
        {isLoggedIn ? ( // 로그인 됐을 때 박스
          <div className={styles.loggedInBox}>
            <div className={styles.profileImg}>
              <Link to="/mypage">
                <button>
                  <img src={ProfileImgDefault} alt=""></img>
                </button>
              </Link>
            </div>
            <div className={styles.toGoUploadBox}>
              <Link to="/upload">
                <button
                  style={{
                    color: `${isNormalTheme ? "black" : "white"}`,
                    border: `${
                      isNormalTheme ? "2px solid #2D2D2D" : "2px solid #FFFFFF"
                    }`,
                  }}
                >
                  갤러리 업로드
                </button>
              </Link>
            </div>
          </div>
        ) : (
          // 로그인 안 됐을 때 박스
          <div className={styles.notLoggedInBox}>
            <div className={styles.toGoLoginBox}>
              <Link to="/login">
                <button
                  style={{ color: `${isNormalTheme ? "black" : "white"}` }}
                >
                  로그인
                </button>
              </Link>
            </div>
            <div className={styles.toGoSignupBox}>
              <Link to="/signup">
                <button
                  style={{
                    color: `${isNormalTheme ? "white" : "black"}`,
                    backgroundColor: `${isNormalTheme ? "#2d2d2d" : "white"}`,
                  }}
                >
                  회원가입
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
