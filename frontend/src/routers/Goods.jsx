import React, { useState } from 'react';
import all_filter from '../assets/ranking-all-filter.svg';
import pet_filter from '../assets/ranking-pet-filter.svg';
import ocean_filter from '../assets/ranking-ocean-filter.svg';
import hill_filter from '../assets/ranking-hill-filter.svg';
import camping_filter from '../assets/ranking-camping-filter.svg';
import season_filter from '../assets/ranking-season-filter.svg';
import array_drop_down from '../assets/arrow_drop_down.svg';
import array_drop_up from '../assets/arrow_drop_up.svg';

import Foot from '../components/Foot.jsx';
import GoodsImg from '../components/GoodsImg.jsx';
import GoodsRanking from '../components/GoodsRanking';
import FilterButton from '../components/FilterButton.jsx';
import Dropdown from '../components/Dropdown.jsx';

import '../styles/Goods.css';

const goodsFilterButtons = [
    { id: 'all-button', label: '전체', icon: all_filter },
    { id: 'pet-button', label: '반려동물', icon: pet_filter },
    { id: 'ocean-button', label: '바다', icon: ocean_filter },
    { id: 'hill-button', label: '산', icon: hill_filter },
    { id: 'camping-button', label: '캠핑', icon: camping_filter },
    { id: 'season-button', label: '계절', icon: season_filter },
    { id: 'character-button', label: '캐릭터', icon: season_filter },
    { id: 'animal-button', label: '동물', icon: season_filter },
    { id: 'object-button', label: '사물', icon: season_filter },
    { id: 'etc-button', label: '기타', icon: season_filter }
];


export default function Goods() {
    const [view, setView] = useState(false);
    const [selectedSort, setSelectedSort] = useState('최신순'); 
    const [selectedCategory, setSelectedCategory] = useState('all-button'); 
    const list = ['최신순', '추천순'];

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
        setView(false); 
    };

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    return (
        <div className='Goods-wrap'>
                <div className="Goods-main-best">
                    <GoodsRanking count={3} />
                </div>

                <div className="goods-filter">
                    <FilterButton 
                        filterButtons={goodsFilterButtons} 
                        setCategory={handleCategoryChange} 
                    />
                </div>
                <div className='goods-sort' onClick={() => setView(!view)}>
                    <p style={{ color: 'rgba(45, 45, 45, 0.40)', fontSize: '1.3rem', fontStyle: 'normal', fontWeight: '400', position:'relative'}}>
                        정렬 방식: <span style={{ color: '#000', fontSize: '1.3rem', fontStyle: 'normal', fontWeight: '500' }}>{selectedSort}</span>
                        {view ? <img src={array_drop_up} alt="dropdown up" /> : <img src={array_drop_down} alt="dropdown down" />}
                        {view && (
                            <Dropdown style={{position:'absolute'}}onSortChange={handleSortChange} selectedSort={selectedSort} list = {list}/>
                        )}
                    </p>
                    
                </div>
                

                <div className="Goods-main-goods">
                    <GoodsImg selectedCategory={selectedCategory} selectedSort={selectedSort} /> 
                </div>

            <footer className="Goods-foot">
                <Foot />
            </footer>
        </div>
    );
}
