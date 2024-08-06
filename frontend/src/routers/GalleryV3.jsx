import styles from "../styles/Gallery.module.css";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import useHover2 from "../utils/useHover2";
import useFullscreen from "../utils/useFullscreen4";

const Gallery2 = ({ type, category, BASE_URL }) => {
  const [infoBoxHovered, setInfoBoxHovered] = useState(false);
  const outerDivRef = useRef();
  const infoBoxRef = useRef();
  const { isFullscreen, triggerFull, exitFull } = useFullscreen(outerDivRef);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1); // 1페이지부터 시작
  const [pageLength, setPageLength] = useState(2);
  const [currentHeight, setCurrentHeight] = useState(window.innerHeight - 80);
  const [galleries, setGalleries] = useState([]);
  const [totalPageCount, setTotalPageCount] = useState(2);

  useEffect(() => {
    const handleResize = () => {
      setCurrentHeight(window.innerHeight - (isFullscreen ? 0 : 80));
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // 컴포넌트 마운트 시에도 호출
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullscreen]);

  useEffect(() => {
    const wheelHandler = (e) => {
      e.preventDefault();
      const { deltaY } = e;
      const scrollTop = outerDivRef.current.scrollTop;
      const maxScrollTop = galleries.length * currentHeight - currentHeight;

      if (scrollTop <= 0 && deltaY < 0) {
        changePage(true);
      } else if (scrollTop >= maxScrollTop && deltaY > 0) {
        changePage(false);
      } else {
        setCurrentIndex(Math.round(scrollTop / currentHeight));
        outerDivRef.current.scrollTo({
          top: currentHeight * currentIndex,
          left: 0,
          behavior: "smooth",
        });
      }
    };
    const outerDivRefCurrent = outerDivRef.current;
    outerDivRefCurrent.addEventListener("wheel", wheelHandler);
    return () => {
      outerDivRefCurrent.removeEventListener("wheel", wheelHandler);
    };
  }, [currentIndex, currentPage, galleries, isFullscreen, currentHeight]);

  const fetchNewPage = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}api/galleries?type=${type}&category=${category}&page=${currentPage}`
      );
      if (Array.isArray(response.data)) {
        if (response.data.length === 0) {
          // No more data available, set totalPageCount
          setTotalPageCount(currentPage);
        } else {
          console.log(response.data);
          setGalleries(response.data);
        }
      } else {
        console.error("응답이 배열이 아닙니다:", response.data);
      }
    } catch (error) {
      console.error("Error fetching Gallery data:", error);
    }
  };

  useEffect(() => {
    fetchNewPage();
  }, [currentPage]);

  const changePage = (isUpping) => {
    if (isUpping) {
      if (currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
        outerDivRef.current.scrollTo({
          top: (currentHeight * (currentPage - 2)),
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Handle when at the first page
        outerDivRef.current.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      }
    } else {
      if (currentPage < totalPageCount) {
        setCurrentPage((prev) => prev + 1);
        outerDivRef.current.scrollTo({
          top: (currentHeight * currentPage),
          left: 0,
          behavior: "smooth",
        });
      } else {
        // Handle when at the last page
        console.log("마지막 페이지에 도달했습니다.");
        outerDivRef.current.scrollTo({
          top: (currentHeight * (totalPageCount - 1)),
          left: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <div
      className={styles.outer}
      ref={outerDivRef}
      style={{ height: isFullscreen ? "100vh" : "calc(100vh - 80px)" }}
    >
      {galleries.map((gallery, index) => (
        <div className={styles.inner} key={index}>
          <div className={styles.bgImg}>
            <img src={gallery.background_image} alt="배경 이미지" />
          </div>
          <div className={styles.mainPhoto}>
            <img src={gallery.image} alt="메인 사진" />
          </div>
          <div
            ref={infoBoxRef}
            className={`${styles.infoBox} ${
              infoBoxHovered ? styles.hovered : ""
            }`}
          >
            <div className={styles.userImage}>
              <img src={gallery.profile_img} alt="User Profile Image" />
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
            <RoundButton
              onClick={triggerFull}
              imageSrc={likeBlackIcon}
              alt="Like Button"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Gallery2;
