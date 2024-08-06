import styles from "../styles/Gallery.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useHover2 from "../utils/useHover2";
import useFullscreen from "../utils/useFullscreen4";
import RoundButton from "../components/RoundButton";
import zoomInIcon from "../assets/icon_zoom_in.png";
import zoomOutIcon from "../assets/icon_zoom_out.png";
import likeRedIcon from "../assets/icon_like_red.png";
import likeBlackIcon from "../assets/icon_like_black.png";
import nextIndexBtn from "../assets/arrow_double_bottom.png";
import prevIndexBtn from "../assets/arrow_double_top.png";

const Gallery = ({ currentType, currentCategory, BASE_URL }) => {
  const [infoBoxHovered, setInfoBoxHovered] = useState(false);
  const outerDivRef = useRef();
  const infoBoxRef = useRef();
  const { isFullscreen, triggerFull, exitFull } = useFullscreen(outerDivRef);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 1페이지부터 시작
  const [pageLength, setPageLength] = useState(5);
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 80);
  const [galleries, setGalleries] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(1);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}api/galleries?type=${currentType}&category=${currentCategory}&page=${currentPage}`
        );
        if (Array.isArray(response.data)) {
          if (response.data.length === 0) {
            // No more data available, set totalPageCount
            setTotalPageCount(currentPage - 1);
          } else {
            // 데이터 잘 받아오면
            console.log(response.data);
            setGalleries(response.data);
            setPageLength(response.data.length);
          }
        } else {
          console.error("응답이 배열이 아닙니다:", response.data);
        }
      } catch (error) {
        console.error("Error fetching Gallery data:", error);
      }
    };

    fetchGalleries();

    return () => {
      // 여기에 정리 함수를 추가할 수 있습니다
      // 예: clearTimeout(timer);
    };
  }, [currentPage, currentType, currentCategory, BASE_URL]);

  const handleDownButtonClick = () => {
    if (currentIndex === pageLength - 1) {
      setCurrentPage((prev) => prev + 1);
      setCurrentIndex(0);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleUpButtonClick = () => {
    if (currentIndex === 0) {
      if (currentPage === 1) {
        setCurrentIndex(0);
      } else {
        setCurrentPage((prev) => prev - 1);
        setCurrentIndex(pageLength - 1);
      }
    } else {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // 화면 구성
  return (
    <div
      className={styles.outer}
      ref={outerDivRef}
      style={{ height: isFullscreen ? "100vh" : "calc(100vh - 80px)" }}
    >
      {galleries
        .filter((gallery, index) => index === currentIndex)
        .map((gallery, index) => (
          <div className={styles.inner} key={index}>
            <div className={styles.bgImg}>
              <img
                src={`http://${gallery.background_image}`}
                alt="배경 이미지"
              />
            </div>
            <div className={styles.mainPhoto}>
              <img src={`http://${gallery.image}`} alt="메인 사진" />
            </div>
            <div
              ref={infoBoxRef}
              className={`${styles.infoBox} ${
                infoBoxHovered ? styles.hovered : ""
              }`}
            >
              <div className={styles.userImage}>
                <img
                  src={`http://${gallery.profile_image}`}
                  alt="User Profile Image"
                />
              </div>
              <div className={styles.textContent}>
                <div className={styles.title}>{gallery.title}</div>
                <div className={styles.date}>{gallery.upload_date}</div>
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
              {gallery.like ? (
                <RoundButton
                  //   onClick={handleLikeButtonOn}
                  imageSrc={likeRedIcon}
                  alt="Liked Button"
                />
              ) : (
                <RoundButton
                  //   onClick={handleLikeButtonOn}
                  imageSrc={likeBlackIcon}
                  alt="Like Button"
                />
              )}
            </div>
          </div>
        ))}
      <button className={styles.upBtn} onClick={handleUpButtonClick}>
        <img src={prevIndexBtn} alt="이전" />
      </button>
      <button className={styles.dwnBtn} onClick={handleDownButtonClick}>
        <img src={nextIndexBtn} alt="다음" />
      </button>
    </div>
  );
};

export default Gallery;
