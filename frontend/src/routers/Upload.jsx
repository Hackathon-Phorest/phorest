import styles from "../styles/Upload.module.css";
import { useState, useEffect } from "react";
import axios from "axios";
import UploadDetailModal from "../components/UploadDetailModal";

import useHover2 from "../utils/useHover2";
import useInput2 from "../utils/useInput2";
import useDate from "../utils/useDate";
import PhotoGrid from "../components/PhotoGrid";
import UploadChangeButton from "../components/UploadChangeButton";
import PhotoMiniscreen from "../components/PhotoMiniscreen";
import BgMiniscreen from "../components/BgMiniscreen";
import HashtagInput from "../components/HashtagInput";

import squareBg from "../assets/square-empty-bg.png";
import bgImg from "../assets/bgImg1.png";
import backButton from "../assets/btn_back_black.png";
import profileImg from "../assets/profileImg.png";
import uploadIcon from "../assets/icon_upload.png";

const Upload = ({BASE_URL}) => {
  const [infoBoxHovered, setInfoBoxHovered] = useState(false);
  const [bgImgHovered, setBgImgHovered] = useState(false);
  const [photoHovered, setPhotoHovered] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const maxLength = 20;
  const title = useInput2("(제목을 지어주세요)", null, maxLength);
  const currentDate = useDate();
  const [hashtags, setHashtags] = useState([]);
  const [selectedPhotoType, setSelectedPhotoType] = useState("photo");
  const [customPageIndex, setCustomPageIndex] = useState(0);
  const [uploadImage, setUploadImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [bgPreview, setBgPreview] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [isBgImg, setIsBgImg] = useState(false);
  const [backgrounds, setBackgronds] = useState([]);

  const fetchBgImgs = async () => {
    try {
      const response = await axios.get(`${BASE_URL}api/backgrounds`);
      if (Array.isArray(response.data)) {
        console.log(response.data);
        setBackgronds(response.data);
      } else {
        console.error("응답이 배열이 아닙니다:", response.data);
      }
    } catch (error) {
      console.error("Error fetching bgImg data:", error);
    }
  };
  useEffect(() => {
    fetchBgImgs();
  }, []);

  const handleInfoBoxHover = () => {
    setInfoBoxHovered(true);
    setBgImgHovered(false);
    setPhotoHovered(false);
  };
  const handleInfoBoxHoverOut = () => {
    setInfoBoxHovered(false);
    setBgImgHovered(true);
  };
  const handleBgImgHover = () => {
    setBgImgHovered(true);
  };
  const handleBgImgHoverOut = () => {
    setBgImgHovered(false);
  };
  const handleBgImgClick = () => {
    setSelectedPhotoType("bg");
    setCustomPageIndex(0);
  };
  const handlePhotoHover = () => {
    setPhotoHovered(true);
    setBgImgHovered(false);
  };
  const handlePhotoHoverOut = () => {
    setPhotoHovered(false);
    setBgImgHovered(true);
  };
  const handlePhotoClick = (e) => {
    e.stopPropagation(); // 배경까지 선택되었다고 하지 않기 위함
    setSelectedPhotoType("photo");
    setCustomPageIndex(0);
  };
  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };
  const handleTitleBlur = () => {
    setIsEditingTitle(false);
  };
  const handleChangePhotoClick = () => {
    setCustomPageIndex(1);
  };
  const handleBackButtonClick = () => {
    setCustomPageIndex(0);
  };
  const handleChangeBgClick = () => {
    setIsBgImg(true);
  };
  const handleUploadFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setUploadImage(selectedFile);
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setImagePreview(event.target.result);
    };
    reader.readAsDataURL(selectedFile);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const handleUpload = (selectedOption, hashtags) => {
      // 서버에 전송할 데이터
      const payload = {
        image: `${uploadImage}`,
        title: `${title}`,
        category: selectedOption,
        common_background: `${selectedPhotoId}`,
        // hashtags: hashtags, 문자열로 바꾸고 띄어쓰기 해서 보내기 TODO
      };

      // 서버에 데이터 전송
      axios
        .post("/api/upload", payload)
        .then((response) => {
          console.log("업로드 성공:", response.data);
          // 성공 시 추가 작업
        })
        .catch((error) => {
          console.error("업로드 실패:", error);
          // 실패 시 추가 작업
        });
      // 모달 닫기
      setModalShow(false);
    };
    // 게시글과 해시태그 제출하는 로직 작성하기. TODO
    console.log("Post submitted with hashtags:", hashtags);
  };

  const bgImgRef = useHover2(handleBgImgHover, handleBgImgHoverOut);
  const photoRef = useHover2(handlePhotoHover, handlePhotoHoverOut);
  const infoBoxRef = useHover2(handleInfoBoxHover, handleInfoBoxHoverOut);

  const [selectedPhotoId, setSelectedPhotoId] = useState(null);
  const handleCellClick = (index, url) => {
    setSelectedPhotoId(index);
    setBgPreview(url);
  };

  return (
    <>
      <UploadDetailModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSubmit={handleSubmit}
      />
      <div className={styles.containerUpload}>
        <div className={styles.previewBox}>
          <div className={styles.previewContainer}>
            <div
              ref={bgImgRef}
              className={`${styles.bgImg} ${
                bgImgHovered ? styles.bgImgHovered : ""
              }`}
              onClick={handleBgImgClick}
              style={{
                backgroundImage: isBgImg ? `url(${bgPreview})` : "none",
              }}
            >
              {!isBgImg ? (
                <p className={styles.bgComment}>
                  배경을 클릭하여 변경을 시작하세요.
                </p>
              ) : null}
              <div
                ref={photoRef}
                className={`${styles.mainPhoto} ${
                  photoHovered ? styles.mainPhotoHovered : ""
                }`}
                onClick={handlePhotoClick}
              >
                {imagePreview === "" ? (
                  <div className={styles.emptyPhoto}>
                    <p>
                      작품 변경하기 버튼을 클릭하여
                      <br />
                      이미지를 추가하세요.
                    </p>
                  </div>
                ) : (
                  <img src={imagePreview} alt="Main Photo" />
                )}
              </div>
              <div
                ref={infoBoxRef}
                className={`${styles.infoBox} ${
                  infoBoxHovered ? styles.hovered : ""
                }`}
                onClick={handleTitleClick}
              >
                <div className={styles.userImage}>
                  <img src={profileImg} alt="User" />
                </div>
                <div className={styles.textContent}>
                  {isEditingTitle ? (
                    <input
                      type="text"
                      value={title.value}
                      onChange={title.onChange}
                      onKeyDown={title.onKeyDown}
                      onBlur={handleTitleBlur}
                      className={styles.titleInput}
                      autoFocus
                    />
                  ) : (
                    <div className={styles.title}>{title.value}</div>
                  )}
                  {title.error && (
                    <div className={styles.error}>{title.error}</div>
                  )}
                  <div className={styles.date}>{currentDate}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {customPageIndex === 0 && (
          <div className={styles.customBox}>
            <div className={styles.custom_head}>
              {selectedPhotoType === "photo" ? (
                <p>작품 커스텀</p>
              ) : (
                <p>배경 커스텀</p>
              )}
            </div>
            <div className={styles.custom_body}>
              {selectedPhotoType === "photo" ? (
                <>
                  {imagePreview !== "" ? (
                    <PhotoMiniscreen src={imagePreview} />
                  ) : null}
                  <UploadChangeButton
                    text="작품 변경하기"
                    onClick={handleChangePhotoClick}
                  />
                </>
              ) : (
                <>
                  {isBgImg && bgPreview !== "" && selectedPhotoId !== 0 ? (
                    <BgMiniscreen src={bgPreview} />
                  ) : null}
                  <UploadChangeButton
                    text="배경 변경하기"
                    onClick={handleChangeBgClick}
                  />
                  <div
                    style={{
                      width: "90%",
                      height: "0px",
                      borderTop: "2px solid #00000029",
                    }}
                  />
                </>
              )}
            </div>
            <div className={styles.custom_foot}>
              {selectedPhotoType === "bg" && (
                <PhotoGrid
                  photos={backgrounds}
                  selectedPhotoIndex={selectedPhotoId}
                  onPhotoClick={handleCellClick}
                />
              )}
            </div>
            <div className={styles.nextButton}>
              <button onClick={() => setModalShow(true)}>다음</button>
            </div>
          </div>
        )}

        {customPageIndex === 1 && selectedPhotoType === "photo" && (
          <div className={styles.customBox}>
            <div className={styles.custom_head}>
              <button
                className={styles.backButton}
                onClick={handleBackButtonClick}
              >
                <img src={backButton} alt="Back" />
              </button>
              <p>작품 커스텀</p>
            </div>
            <div className={styles.custom_body_upload}>
              <div>
                <input
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  onChange={handleUploadFileChange}
                  className={styles.fileInput}
                />
                <label htmlFor="fileInput" className={styles.customFileInput}>
                  <img
                    src={uploadIcon}
                    alt="업로드 아이콘"
                    className={styles.uploadIcon}
                  />
                  <p>이미지 업로드</p>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Upload;
