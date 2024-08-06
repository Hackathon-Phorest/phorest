import styles from "../styles/Login.module.css";
import Logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom"; // useNavigate로 변경
import naverLogin from '../assets/naverLogin.png';
import { useState } from "react";
import axios from 'axios';

const BASE_URL = "http://3.39.26.152:8000";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // useNavigate 훅 사용

    const handleLogin = async () => {
        if (email && password) {
            try {
                const response = await axios.post(`${BASE_URL}/api/login`, {
                    email,
                    password
                });
                // 로그인 성공 시 페이지 이동
                navigate('/'); // 성공적으로 로그인한 후 메인 페이지로 이동
            } catch (error) {
                console.error("Error during login:", error);
            }
        }
    };

    return (
        <div className={styles.LoginWrapper}>
            <div className={styles.LoginContainer}>
                <div className={styles.logo}>
                    <Link to="/">
                        <img src={Logo} alt="Logo" className={styles.headerLogo} />
                    </Link>
                </div>

                <div className={styles.loginBoxContainerWrap}>
                    <div className={styles.loginBoxContainer}>
                        <div className={styles.loginBox}>
                            <div className={styles.loginTitle}>이메일 주소</div>
                            <input 
                                placeholder="" 
                                className={styles.loginEnterBox} 
                                onChange={(event) => setEmail(event.target.value)} 
                            />
                        </div>
                        <div className={styles.loginBox}>
                            <div className={styles.loginTitle}>비밀번호</div>
                            <input 
                                type={"password"}   
                                className={styles.loginEnterBox} 
                                onChange={(event) => setPassword(event.target.value)} 
                            />
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%", marginLeft: "23%" }}>
                    <button 
                        className={styles.loginFinishClick} 
                        onClick={handleLogin} // 수정된 부분
                    >
                        로그인
                    </button>
                </div>

                <p style={{ marginTop: '-5%' }}>SNS로 간편하게 회원가입하기</p>
                <img style={{ marginTop: '-7%', width: '30%', height: '9%' }} src={naverLogin} />
                <div style={{ width: '100%', alignItems: 'center', justifyContent: 'center', display: 'flex', marginTop: '-4%', gap: '1%' }}>
                    <p style={{ color: "rgba(0, 0, 0, 0.40)", fontSize: '16px', fontStyle: 'normal', fontWeight: '500', lineHeight: '16px' }}>아직 회원이 아니라면?</p>
                    <Link to='/signup' style={{ fontStyle: 'none' }}>
                        <p>회원가입하기</p>
                    </Link>
                </div>
            </div>
        </div>
    );
}
