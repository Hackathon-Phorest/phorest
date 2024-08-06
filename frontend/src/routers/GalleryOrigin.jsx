import styles from "../styles/Gallery.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useHover2 from "../utils/useHover2";
import useFullscreen from "../utils/useFullscreen4";
import useScroll from "../utils/useScroll";

import RoundButton from "../components/RoundButton";
import zoomInIcon from "../assets/icon_zoom_in.png";
import zoomOutIcon from "../assets/icon_zoom_out.png";
import likeRedIcon from "../assets/icon_like_red.png";
import likeBlackIcon from "../assets/icon_like_black.png";
import mainPhoto from "../assets/mainPhoto1.png";
import mainPhoto2 from "../assets/mainPhoto2.png";
import bgImg from "../assets/bgImg1.png";
import bgImg2 from "../assets/bgImg2.png";
import profileImg from "../assets/profileImg.png";

const Gallery = ({ type, category }) => {
  const [infoBoxHovered, setInfoBoxHovered] = useState(false);
  const outerDivRef = useRef();
  const { isFullscreen, triggerFull, exitFull } = useFullscreen(outerDivRef);
  const BASE_URL = "http://local:8000";
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); //1페이지부터 시작
  const [pageLength, setPageLength] = useState(2);

  const getPageData = async (page) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/galleries?type=${type}&category=${category}&page=${page}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    setPageLength(5);
  }, []);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const pageHeight = window.innerHeight;

      if (deltaY > 0) {
        // Case1: 스크롤을 내리면
        if (currentIndex === pageLength - 1) {
          // Case1-1: 페이지의 마지막 사진이면
          // 새로 데이터 불러오고
          setCurrentPage((current) => current + 1); // 페이지 증가
          setCurrentIndex(0); // 페이지의 첫 사진으로 index 이동
          outerDivRef.current.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else {
          // Case1-2: 그냥 다음 사진으로 내리기
          setCurrentIndex((current) => current + 1); //다음 사진으로 인덱스 이동
          outerDivRef.current.scrollTo({
            // 화면 이동
            top: pageHeight * (currentIndex + 1),
            left: 0,
            behavior: "smooth",
          });
        }
      } else {
        // Case2: 스크롤을 올리면
        if (currentIndex === 0 && currentPage === 1) {
          // Case2-1: 제일 첫 페이지 가장 첫 사진
          // 페이지와 사진 모두 그대로 유지
          outerDivRef.current.scrollTo({
            // 화면 이동을 현재 그대로
            top: 0,
            left: 0,
            behavior: "smooth",
          });
        } else if (currentIndex === 0) {
          // Case2-2: 이전 페이지로 돌아가기
          // 서버로부터 이전페이지 받아오고 페이지 길이 다시 측정
          setCurrentPage((current) => current - 1);
          setCurrentIndex(pageLength - 1);
          outerDivRef.current.scrollTo({
            // 화면 이동
            top: pageHeight * (pageLength - 1),
            left: 0,
            behavior: "smooth",
          });
        } else {
          // Case2-3: 그냥 이전 사진으로 올리기
          setCurrentIndex((current) => current - 1);
          outerDivRef.current.scrollTo({
            // 화면 이동
            top: pageHeight * (currentIndex - 1),
            left: 0,
            behavior: "smooth",
          });
        }
      }
    };

    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, [currentIndex, currentPage, pageLength, isFullscreen]);

  const handleInfoBoxHover = () => {
    setInfoBoxHovered(true);
  };
  const handleInfoBoxHoverOut = () => {
    setInfoBoxHovered(false);
  };
  const infoBoxRef = useHover2(handleInfoBoxHover, handleInfoBoxHoverOut);

  const handleFullscreen = () => {
    const { scrollTop } = outerDivRef.current;
    triggerFull(scrollTop);
    toggleFullscreenClass(true);
  };
  const handleFullscreenExit = () => {
    const { scrollTop } = outerDivRef.current;
    exitFull(scrollTop);
    toggleFullscreenClass(false);
  };

  const toggleFullscreenClass = (isFull) => {
    const bgImages = document.querySelectorAll(`.${styles.bgImg}`);
    bgImages.forEach((bgImage) => {
      if (isFull) {
        bgImage.classList.add(styles.fullscreen);
      } else {
        bgImage.classList.remove(styles.fullscreen);
      }
    });
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        // Fullscreen mode has been exited
        setTimeout(() => {
          outerDivRef.current.style.height = "calc(100vh - 80px)";
        }, 0); // Small delay to ensure the fullscreen exit is complete
      } else {
        // Entered fullscreen mode
        outerDivRef.current.style.height = "100vh";
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, [isFullscreen]);

  /////////RETURN/////////////////RETURN/////////////////RETURN/////////////////RETURN////////////////
  return (
    <div
      className={styles.outer}
      ref={outerDivRef}
      style={{ height: isFullscreen ? "100vh" : "calc(100vh - 80px)" }}
    >
      {/* 로딩이 끝났고 데이터가 있다면 개수에 맞게 컴포넌트 생성 */}
      <div className={styles.inner}>
        <div className={styles.bgImg}>
          <img src={bgImg} alt="배경 이미지" />
        </div>
        <div className={styles.mainPhoto}>
          <img src={mainPhoto} alt="메인 사진" />
        </div>
        <div
          ref={infoBoxRef}
          className={`${styles.infoBox} ${
            infoBoxHovered ? styles.hovered : ""
          }`}
        >
          <div className={styles.userImage}>
            <img src={profileImg} alt="User Profile Image" />
          </div>
          <div className={styles.textContent}>
            <div className={styles.title}>이곳은 제목입니다.</div>
            <div className={styles.date}>2024.04.4</div>
          </div>
        </div>
        <div className={styles.sideBtns}>
          {isFullscreen ? (
            <RoundButton
              onClick={handleFullscreenExit}
              imageSrc={zoomOutIcon}
              alt="Fullscreen Off Button"
            />
          ) : (
            <RoundButton
              onClick={handleFullscreen}
              imageSrc={zoomInIcon}
              alt="Fullscreen On Button"
            />
          )}
          <RoundButton
            onClick={triggerFull}
            imageSrc={likeBlackIcon}
            alt="Like Button"
          />
        </div>
      </div>
      <div className={styles.inner}>
        <div className={styles.bgImg}>
          <img src={bgImg2} alt="배경 이미지" />
        </div>
        <div className={styles.mainPhoto}>
          <img src={mainPhoto2} alt="메인 사진" />
        </div>
        <div ref={infoBoxRef} className={styles.infoBox}>
          <div className={styles.userImage}>
            <img src={profileImg} alt="User Profile Image" />
          </div>
          <div className={styles.textContent}>
            <div className={styles.title}>이곳은 제목입니다.</div>
            <div className={styles.date}>2024.04.4</div>
          </div>
        </div>
        <div className={styles.sideBtns}>
          {isFullscreen ? (
            <RoundButton
              onClick={exitFull}
              imageSrc={zoomOutIcon}
              alt="Fullscreen Off Button"
            />
          ) : (
            <RoundButton
              onClick={triggerFull}
              imageSrc={zoomInIcon}
              alt="Fullscreen On Button"
            />
          )}
          <RoundButton
            onClick={triggerFull}
            imageSrc={likeBlackIcon}
            alt="Like Button"
          />
        </div>
      </div>
    </div>
  );
};

export default Gallery;
