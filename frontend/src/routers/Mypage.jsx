import React, { useState, useEffect } from 'react';
import styles from '../styles/Mypage.module.css';
import axios from 'axios';

const BASE_URL = "http://3.39.26.152:8000";

const Mypage = () => {
    const [getData, setGetData] = useState([]);
    const [activeTab, setActiveTab] = useState('gallery'); 
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/users/my-profile/`);
            setGetData([response.data]);
            
        } catch (error) {
            console.error("Error fetching goods data:", error);
        }
    };
        useEffect(() => {
            fetchData();
        }, [])

    return (
        <div className={styles.pageWrapper}>
            <div style={{display:'flex', justifyContent:'center', marginBottom : '7.3%'}}>
                <div className={styles.userinfo}>
                    <img src={`http://${getData[0].profile_image}`} className={styles.profileImage}/>
                    <div className={styles.userDetails}>
                        <div className={styles.username}>
                            {getData[0].username}
                            <button className={styles.editButton}>프로필 편집</button>
                        </div>
                        <div className={styles.usermeta}>
                            {`${getData[0].username}의 갤러리를 구경해보세요.`}
                        </div>
                    </div>
                </div>
            </div>
        <div className={styles.navigation}>
            <span
            className={`${styles.navItem} ${
                activeTab === 'gallery' ? styles.active : ''
            }`}
            onClick={() => handleTabClick('gallery')}
            >
            내 갤러리
            </span>
            <span
            className={`${styles.navItem} ${
                activeTab === 'favorites' ? styles.active : ''
            }`}
            onClick={() => handleTabClick('favorites')}
            >
            좋아요
            </span>
        </div>
        <div style={{border : '0.05px solid black', height: '0px', width : '100%' , position:'absolute', top : '44.7%', left : '0%', zIndex :'1'}}></div>
        <div className={styles.gallery}>
            <div style={{display: 'flex', width : '100%', height: '100%', gap: '7%', justifyContent : 'center'}}>
                    <div className={styles.galleryItem}></div>
                    <div className={styles.galleryItem}></div>
                    <div className={styles.galleryItem}></div>
            </div>
            
            {activeTab === 'favorites' && (
            <div>
                <div className={styles.galleryItem}></div>
                <div className={styles.galleryItem}></div>
                <div className={styles.galleryItem}></div>
            </div>
            )}
        </div>
    </div>
  );
};

export default Mypage;