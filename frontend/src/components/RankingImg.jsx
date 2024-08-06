import React, { useEffect, useState } from 'react';
import rankingShadow from '../assets/ranking_shadow.png';
import axios from 'axios';
import '../styles/RankingImg.css';

const BASE_URL = "http://3.39.26.152:8000";

export default function RankingImg({ count }) {
    const [ranking, setRanking] = useState([]);

    const rankingGet = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/galleries/ranking?type=사진&category=반려동물`);
            // 응답이 배열인지 확인하고 설정
            if (Array.isArray(response.data)) {
                setRanking(response.data); // 배열로 설정
                console.log(response.data);
            } else {
                console.error("응답이 배열이 아닙니다:", response.data);
            }

        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        rankingGet(); 
    }, []);

    return (
        <div className="rankingImg-wrap">
          {ranking.slice(0, Math.min(count, ranking.length)).map((rankingItem, index) => (
              <RankingImgBox index={index} ranking={rankingItem} />
          ))}
        </div>
    );
}

function RankingImgBox({ index, ranking }) {
    return (
        <div className="rankingImg-box">
            <div className='best-ranking-number'>{index + 1}</div>
            <div className='ranking-box-container'>
            <img src={rankingShadow} alt="" className="best-ranking-shadow" />
            <img src={`http://${ranking.image}`} alt="" className="best-ranking" />
            <img src={`http://${ranking.profile_image}`} alt="" className="profile-img" />
            <p className='best-ranking-p'>{ranking.title || '임시 글쓰기'}</p>
        </div>
        </div>
    );
}
