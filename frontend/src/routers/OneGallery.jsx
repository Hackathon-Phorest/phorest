import styles from "../styles/Gallery.module.css";
import { useState, useRef, useEffect } from "react";
import RoundButton from "../components/RoundButton";
import zoomInIcon from "../assets/icon_zoom_in.png";
import zoomOutIcon from "../assets/icon_zoom_out.png";
import likeBlackIcon from "../assets/icon_like_black.png";
import { useLocation } from "react-router-dom"; // useLocation 추가
import axios from "axios";

const BASE_URL = "http://localhost:8000";

const OneGallery = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [getData, setGetData] = useState([]);
  const outerDivRef = useRef();
  const location = useLocation(); // useLocation 사용

  // location.state에서 전달된 데이터 얻기
  const { id } = location.state || {};
  console.log(id);
  const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/galleries/${id}`);
            if (Array.isArray(response.data)) { 
                setGetData(response.data);
                console.log(response.data);
            } else {
                console.error("응답이 배열이 아닙니다:", response.data);
            }
        } catch (error) {
            console.error("Error fetching goods data:", error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [])

  const handleFullscreen = () => {
    if (outerDivRef.current) {
      outerDivRef.current.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  const handleFullscreenExit = () => {
    document.exitFullscreen();
    setIsFullscreen(false);
  };

  return (
    <div
      className={styles.outer}
      ref={outerDivRef}
      style={{ height: isFullscreen ? "100vh" : "calc(100vh - 80px)" }}
    >
      <div className={styles.inner}>
      <img src={`http://${getData.background_image}`} alt="배경 사진" />
        <div className={styles.mainPhoto}>
          <img src={`http://${getData.image}`} alt="메인 사진" /> {/* 전달된 이미지 사용 */}
        </div>
        <div className={styles.infoBox}>
          <div className={styles.userImage}>
            <img src={`http://${getData.profile_image}`} alt="User Profile Image" />
          </div>
          <div className={styles.textContent}>
            <div className={styles.title}>{getData.title || "제목이 없습니다."}</div> {/* 전달된 제목 사용 */}
            <div className={styles.date}>{getData.upload_date || "날짜 정보가 없습니다."}</div> {/* 전달된 날짜 사용 */}
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
            onClick={() => alert("Liked!")}
            imageSrc={likeBlackIcon}
            alt="Like Button"
          />
        </div>
      </div>
    </div>
  );
};

export default OneGallery;
