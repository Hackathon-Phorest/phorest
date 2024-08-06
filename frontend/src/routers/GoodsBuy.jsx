import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import goodsBuyplus from "../assets/goodsBuy-plus.svg";
import goodsBuyminus from "../assets/goodsBuy-minus.svg";
import "../styles/GoodsBuy.css";

export default function GoodsBuy() {
  const location = useLocation();
  const { imgSrc, itemName, itemPrice } = location.state || {};
  const [count, setCount] = useState(1);

  function handleBuy() {
    alert(`${count}개 구매되었습니다.`);
  }

  function handleValue(increment) {
    setCount((prevCount) => Math.max(1, prevCount + increment)); // 최소 1개 유지
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="GoodsBuy-wrap">
      <main className="GoodsBuy-main">
        <div className="GoodsBuy-left">
          <img
            src={`http://${imgSrc}`}
            alt="굿즈 사진"
            className="GoodsBuy-img"
          />
        </div>

        <div className="GoodsBuy-right">
          <div className="GoodsBuy-description">
            <p className="GoodsBuy-producer">{itemName}</p>
            <p className="GoodsBuy-introduction">{itemName}</p>
            <p className="GoodsBuy-introduction-price">
              {`${formatPrice(itemPrice)}원`}
            </p>
          </div>
          <div className="GoodsBuy-line"></div>
          <div className="GoodsBuy-countBox">
            <p className="GoodsBuy-small-title">{itemName}</p>
            <div className="GoodsBuy-count">
              <button className="plus-minus" onClick={() => handleValue(1)}>
                <img src={goodsBuyplus} alt="플러스기호" />
              </button>
              {count}
              <button
                className="plus-minus"
                onClick={() => handleValue(-1)}
                disabled={count <= 1}
              >
                <img src={goodsBuyminus} alt="마이너스기호" />
              </button>
              <span className="GoodsBuy-countPrice">
              {`${formatPrice(count * itemPrice)}원`}
              </span>
            </div>
          </div>
          <div className="GoodsBuy-totalPrice-box">
            <div className="GoodsBuy-price-description">총 가격</div>
            <div className="GoodsBuy-totalPrice">
              {`${formatPrice(count * itemPrice)}원`}
            </div>
          </div>
          <button className="GoodsBuy-button" onClick={handleBuy}>
            <p className="GoodsBuy-button-p">바로 구매하기</p>
          </button>
        </div>
      </main>
    </div>
  );
}
