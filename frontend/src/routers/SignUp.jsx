import { useState } from "react";
import useInput from "../utils/useInput";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import agreement from '../assets/agreement.svg';
import agreementBlack from '../assets/agreementBlack.svg';
import styles from "../styles/SignUp.module.css"; // css를 모듈화해서 여기에만 적용되게 하기! 사용법은 className={styles.클래스이름}
import axios from 'axios'; // axios 추가

const BASE_URL = "http://3.39.26.152:8000";

const SignUp = () => {
  const navigate = useNavigate(); 


  const [clickAgreement, setClickAgreement] = useState(0);
  const [subscribed, setSubscribed] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0); // index에 따라 화면 다르게 보여주기
  const [showPassword, setShowPassword] = useState(false);

  // 입력값 상태 관리
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async () => {
    if (email && password && name && phone && username) {
      try {
        const response = await axios.post(`${BASE_URL}/api/users`, {
          email,
          password,
          name,
          phone,
          username,
          subscribed: clickAgreement === 1 // 동의 여부
        });
        console.log(response);
        // 회원가입 성공 시 페이지 이동
        navigate('/login'); // 성공적으로 가입한 후 메인 페이지로 이동
      } catch (error) {
        console.log("Error during signup:");
      }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.signupContainer}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <Link to="/">
              <img src={Logo} alt="Logo" />
            </Link>
          </div>
          <div className={styles.mainTitle}>
            <div>회원정보 입력하기</div>
          </div>
        </div>

        <div className={styles.inputBoxContainerWrap}>
          <div className={styles.inputBoxContainer}>
            {currentIndex === 0 && (
              <>
                <div className={styles.inputBox}>
                  <div className={styles.inputTitle}>이메일 주소</div>
                  <input 
                    placeholder="" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className={styles.inputEnterBox} 
                  />
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.inputTitle}>비밀번호</div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="8자 이상" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className={styles.inputEnterBox} 
                  />
                  <div className={styles.eyeIcon} onClick={togglePasswordVisibility}></div>
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.inputTitle}>비밀번호 확인</div>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="8자 이상" 
                    className={styles.inputEnterBox} 
                  />
                </div>
              </>
            )}
            {currentIndex === 1 && (
              <>
                <div className={styles.inputBox}>
                  <div className={styles.inputTitle}>사용자 이름</div>
                  <input 
                    placeholder="" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className={styles.inputEnterBox} 
                  />
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.inputTitle}>휴대폰 번호</div>
                  <input 
                    placeholder="000-0000-0000" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    className={styles.inputEnterBox} 
                  />
                </div>
                <div className={styles.inputBox}>
                  <div className={styles.inputTitle}>닉네임</div>
                  <input 
                    placeholder="" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    className={styles.inputEnterBox} 
                  />
                </div>
                <div className={styles.signupAgreement}>
                  <button className={styles.signupAgreementButton} onClick={() => setClickAgreement(1)}>
                    {clickAgreement === 0 ? 
                      <img src={agreement} alt="" className={styles.signupAgreementImg}/> : 
                      <img src={agreementBlack} alt="" className={styles.signupAgreementImg}/>}
                  </button>
                  <div>
                    <p className={styles.signupAgreementFirstP}>메일 및 문자 수신에 동의합니다.</p>
                    <p className={styles.signupAgreementSecondP}>광고 및 마케팅 정보 제공에 동의하시겠습니까?</p>
                  </div> 
                </div>
              </>
            )}

            <div className={styles.footer}>
              {currentIndex === 0 && (
                <>
                  <button 
                    className={styles.signupLeftButton} 
                    onClick={() => {/* 이전 버튼 클릭 시 동작 */}}
                  >
                    이전
                  </button>
                  <button 
                    className={styles.signupRightButton} 
                    onClick={() => setCurrentIndex(1)}
                  >
                    다음
                  </button>
                </>
              )}
              {currentIndex === 1 && (
                <div style={{ width: "100%", marginLeft: "23%" }}>
                  <button 
                    className={styles.finishClick} 
                    onClick={handleSignup}
                  >
                    완료
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
