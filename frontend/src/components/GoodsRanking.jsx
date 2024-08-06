import React, { useEffect, useState } from 'react';
import axios from 'axios';
import rankingShadow from '../assets/ranking_shadow.png';
import '../styles/RankingImg.css';

const BASE_URL = "http://3.39.26.152:8000";

const GoodsRankingBox = ({ index }) => {
    const [ranking, setRanking] = useState([]); 

    // 상품 순위 데이터를 가져오는 비동기 함수
    const fetchGoodsRanking = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/goods/ranking`);
            if (Array.isArray(response.data)) {
                setRanking(response.data); // 배열로 설정
            } else {
                console.error("응답이 배열이 아닙니다:", response.data);
            }
        } catch (error) {
            console.error("Error fetching ranking data:", error);
        }
    };
    
    useEffect(() => {
        fetchGoodsRanking(); 
    }, []);

    // 데이터가 로드되지 않았을 경우 로딩 상태 처리
    if (!ranking) {
        return <div>Loading...</div>;
    }

    return (
        <div className="rankingImg-box">
            <div className="number-container">
                <p className='best-ranking-number'>{index + 1}</p>
            </div>
            <div className='ranking-box-container'>
                <img src={rankingShadow} alt="Ranking Shadow" className="best-ranking-shadow" />
                <img src={`http://${ranking[index]?.image}`} alt="Best Ranking" className="best-ranking" />
            </div>
        </div>
    );
};

const GoodsRanking = ({ count }) => {
    return (
        <div className="rankingImg-wrap">
            {Array.from({ length: count }, (_, index) => (
                <GoodsRankingBox key={index} index={index} />
            ))}
        </div>
    );
};

export default GoodsRanking;
