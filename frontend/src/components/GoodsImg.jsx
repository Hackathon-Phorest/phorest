import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import '../styles/GoodsImg.css';

const BASE_URL = "http://3.39.26.152:8000";

function GoodsImgBox({ image, name, price }) {
    const navigate = useNavigate(); 

    const handleClick = () => {
        navigate('/goodsbuy', { state: { imgSrc: image, itemName: name, itemPrice: price } }); 
    };

    const formattedPrice = new Intl.NumberFormat().format(price);

    return (
        <div>
            <button className="goodsImg-box" onClick={handleClick}> 
                <img src={`http://${image}`} alt="" className="best-goods-image" />
            </button>
            <div>
                <p className='best-goods-description'>{name}</p>
                <p className='best-goods-price'>{`${formattedPrice}원`}</p>
            </div>
        </div>
    );
}

export default function GoodsImg({ selectedCategory, selectedSort }) {
    const [goods, setGoods] = useState([]);

    const fetchGoods = async () => {
        try {
            const sortValue = selectedSort || "최신순"; 
            const category = selectedCategory === 'all-button' ? '전체' : 
            selectedCategory === 'pet-button' ? '반려동물' :
            selectedCategory === 'ocean-button' ? '바다' :
            selectedCategory === 'hill-button' ? '산' :
            selectedCategory === 'camping-button' ? '캠핑' :
            selectedCategory === 'season-button' ? '계절' :
            selectedCategory === 'character-button' ? '캐릭터' :
            selectedCategory === 'animal-button' ? '동물' :
            selectedCategory === 'object-button' ? '사물' :
            selectedCategory === 'etc-button' ? '기타' : '반려동물';
            console.log(category);
            console.log(sortValue);
            const response = await axios.get(`${BASE_URL}/api/goods?category=${category}&page=1&sort=${sortValue}`);
            if (Array.isArray(response.data)) {
                setGoods(response.data); 
                console(response.data); 
            } else {
                console.error("응답이 배열이 아닙니다:", response.data);
            }
        } catch (error) {
            console.error("Error fetching goods data:", error);
        }
    };
    
    useEffect(() => {
        fetchGoods(); 
    }, [selectedCategory, selectedSort]); 

    return (
        <div className="goodsImg-wrap">
            {goods.map((item) => (
                <GoodsImgBox key={item.id} image={item.image} name={item.name} price={item.price} />
            ))}
        </div>
    );
}
