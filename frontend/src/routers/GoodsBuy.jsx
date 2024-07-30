import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import goodsBuyplus from '../assets/goodsBuy-plus.svg';
import goodsBuyminus from '../assets/goodsBuy-minus.svg';
import Navbar from '../components/navbar.js';

import '../styles/GoodsBuy.css';

export default function GoodsBuy(props) {
    const location = useLocation();
    const { imgSrc } = location.state || {};
    const [count, setCount] = useState(1);
    const pricePerItem = 15000;

    function handleBuy(event) {
        alert(`${event.currentTarget.value}개 구매되었습니다.`);
    }

    function handleValue(event) {
        const value = Number(event.currentTarget.value);
        if (value === 1) {
            setCount(prevCount => prevCount + 1);
            console.log("+");
        } else if (value === 0 && count > 1) {
            setCount(prevCount => prevCount - 1);
            console.log("-");
        }
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('ko-KR').format(price);
    };

    return (
        <div className="GoodsBuy-wrap">
            <header className='GoodsBuy-header'>
                <Navbar />
            </header>
            <main className='GoodsBuy-main'>
                <div className='GoodsBuy-left'>
                    <img src={imgSrc} alt="굿즈 사진" className="GoodsBuy-img" />
                </div>

                <div className='GoodsBuy-right'>
                    <div className='GoodsBuy-description'>
                        <p className='GoodsBuy-producer'>글레이즈드 도넛</p>
                        <p className='GoodsBuy-introduction'>[2월 1위 상품] 다이브투 패브릭 포스터</p>
                        <p className='GoodsBuy-introduction-price'>{formatPrice(pricePerItem)}</p>
                    </div>
                    <div className='GoodsBuy-line'></div>
                    <div className='GoodsBuy-countBox'>
                        <p className='GoodsBuy-small-title'>[2월 1위 상품] 다이브투 패브릭 포스터</p>
                        <div className='GoodsBuy-count'>
                            <button className="plus-minus" onClick={handleValue} value='1'>
                                <img src={goodsBuyplus} alt='플러스기호' />
                            </button>
                            {count}
                            <button className="plus-minus" onClick={handleValue} value='0' disabled={count <= 1}>
                                <img src={goodsBuyminus} alt='마이너스기호' />
                            </button>
                            <span className='GoodsBuy-countPrice'>{formatPrice(count * pricePerItem)}</span>
                        </div>
                    </div>
                    <div className='GoodsBuy-totalPrice-box'>
                        <div className='GoodsBuy-price-description'>총 가격</div>
                        <div className='GoodsBuy-totalPrice'>{formatPrice(count * pricePerItem)}</div>
                    </div>
                    <button className='GoodsBuy-button' onClick={handleBuy} value={count}>
                        <p className='GoodsBuy-button-p'>바로 구매하기</p>
                    </button>
                </div>
            </main>
        </div>
    );
}
