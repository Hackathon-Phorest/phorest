import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import styled from "styled-components";
import checkedIcon from "../assets/radio_checked.png";
import uncheckedIcon from "../assets/radio_unchecked.png";
import HashTagInput from "./HashtagInput";

const BootstrapModalWrapper = styled.div`
  @import url("https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css");
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap; /* 여러 줄로 배치 */
  width: 100%; /* 전체 너비를 사용 */
  margin: auto;
  margin-left: 35px; /* 왼쪽 여백 조정 */
  padding: 10px 10px; /* 좌우 여백 조정 */
  box-sizing: border-box; /* 패딩과 보더를 너비에 포함 */
`;

const RadioItem = styled.label`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 17%; /* 각 행에 5개의 항목 배치 */
  box-sizing: border-box;
  padding: 5px;
  margin-bottom: 12px; /* 세로 간격 조정 */
  margin-right: 18px; /* 오른쪽 여백 조정 */
  div {
    margin-left: 5px;
    font-family: "Noto Sans KR";
    font-size: 24px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: -1px;
    text-align: left;
    white-space: nowrap;
  }
`;
const RadioInput = styled.input`
  display: none;
  &:checked + span > img {
    content: url(${checkedIcon});
  }
`;

const CustomRadio = styled.span`
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    content: url(${uncheckedIcon});
  }
`;

const CustomFooter = styled.div`
  display: flex;
  width: 100%;
  margin-top: 80px;
  margin-bottom: 70px;
  justify-content: center;
  gap: 28px;
`;

const UploadDetailModal = (props) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [hashtags, setHashtags] = useState([]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleHashtagsChange = (newHashtags) => {
    setHashtags(newHashtags);
  };
  const handleSubmit = () => {
    const data = {
      category: selectedOption,
      hashtags: hashtags,
    };
    props.onSubmit(data);
  };

  const options = [
    { value: "반려동물", label: "반려동물" },
    { value: "산", label: "산" },
    { value: "계절", label: "계절" },
    { value: "동물", label: "동물" },
    { value: "기타", label: "기타" },
    { value: "바다", label: "바다" },
    { value: "캠핑", label: "캠핑" },
    { value: "캐릭터", label: "캐릭터" },
    { value: "사물", label: "사물" },
  ];

  return (
    <BootstrapModalWrapper>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{
              fontFamily: "Noto Sans KR",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "24px",
              letterSpacing: "-1px",
              textAlign: "left",
              marginLeft: "10px",
              padding: "16px",
            }}
          >
            상세 정보 설정
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p
            style={{
              marginTop: "55px",
              marginLeft: "40px",
              fontFamily: "Noto Sans KR",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "24px",
              letterSpacing: "-1px",
              textAlign: "left",
            }}
          >
            카테고리<span style={{ color: "#54C1FF" }}> (필수, 1개)</span>
          </p>
          <Container>
            {options.map((option, index) => (
              <RadioItem key={index}>
                <RadioInput
                  type="radio"
                  name="category"
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={handleOptionChange}
                />
                <CustomRadio>
                  <img
                    src={
                      selectedOption === option.value
                        ? checkedIcon
                        : uncheckedIcon
                    }
                    alt={option.label}
                  />
                </CustomRadio>
                <div>{option.label}</div>
              </RadioItem>
            ))}
          </Container>

          <p
            style={{
              marginTop: "70px",
              marginLeft: "40px",
              fontFamily: "Noto Sans KR",
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "24px",
              letterSpacing: "-1px",
              textAlign: "left",
            }}
          >
            태그<span style={{ color: "#54C1FF" }}> (선택, 3개까지)</span>
          </p>
          <HashTagInput
            initialHashtags={hashtags}
            onHashtagsChange={handleHashtagsChange}
          />
        </Modal.Body>
        <CustomFooter>
          <button
            onClick={props.onHide}
            style={{
              padding: "18px 104px",
              backgroundColor: "white",
              fontFamily: "Noto Sans KR",
              fontSize: "16px",
              fontWeight: "500",
              letterSpacing: "-1px",
              color: "black",
              borderRadius: "10px",
              border: "2px solid #2D2D2D",
            }}
          >
            닫기
          </button>
          <button
            style={{
              padding: "18px 188px",
              backgroundColor: "#2D2D2D",
              border: "none",
              fontFamily: "Noto Sans KR",
              fontSize: "16px",
              fontWeight: "500",
              letterSpacing: "-1px",
              color: "white",
              borderRadius: "10px",
            }}
            onClick={handleSubmit}
          >
            업로드
          </button>
        </CustomFooter>
      </Modal>
    </BootstrapModalWrapper>
  );
};

export default UploadDetailModal;

// function App() {
//   const [modalShow, setModalShow] = React.useState(false);

//   return (
//     <>
//       <Button variant="primary" onClick={() => setModalShow(true)}>
//         Launch vertically centered modal
//       </Button>

//       <MyVerticallyCenteredModal
//         show={modalShow}
//         onHide={() => setModalShow(false)}
//       />
//     </>
//   );
// }

// render(<App />);
