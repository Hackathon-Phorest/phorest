import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Dropdown from '../components/Dropdown';
import axios from 'axios';

import '../styles/Search.css';

import array_drop_down from '../assets/arrow_drop_down.svg';
import array_drop_up from '../assets/arrow_drop_up.svg';
import search from '../assets/search.svg';
import favorite from '../assets/favorite.svg';

const BASE_URL = "http://3.39.26.152:8000";

export default function Search() {
    const [content, setContent] = useState([]);
    const [view, setView] = useState(false);
    const [searchContent, setSearchContent] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [selectedSort, setSelectedSort] = useState('최신순'); 
    const list = ['최신순', '추천순', '좋아요순'];

    const navigate = useNavigate(); // useNavigate 훅 사용

    const fetchSearch = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/galleries/search?content=${searchContent}&page=1`);
            if (Array.isArray(response.data)) { 
                setContent(response.data);
                console.log(response.data);
            } else {
                console.error("응답이 배열이 아닙니다:", response.data);
            }
        } catch (error) {
            console.error("Error fetching goods data:", error);
        }
    };

    useEffect(() => {
        fetchSearch();
    }, [searchContent]);

    const handleSortChange = (sortOption) => {
        setSelectedSort(sortOption);
        setView(false); 
    };

    const handleInput = (event) => {
        setInputValue(event.target.value); 
    };

    const handleSearch = () => {
        setSearchContent(inputValue);
    };

    const activeEnter = (e) => {
        if (e.key === "Enter") {
            setSearchContent(inputValue);
        }
    };

    const handleImageClick = (item) => {
        navigate('/OneGallery', { state: { id: item.id } });
    };

    return (
        <div className='Search-wrap'>
            <div className='Search-top-box'>
                <div className='Search-top-input'>
                    <button className="Search-icon" onClick={handleSearch}>
                        <img src={search} alt="" style={{ width: '2.5rem' }} /> 
                    </button>
                    <input 
                        className='Search-input' 
                        onChange={handleInput} 
                        value={inputValue} 
                        onKeyDown={activeEnter}
                    />
                </div>
            </div>
            <div className='Search-bottom-box'>
                <div className='Search-bottom-top-rectangle'>
                    <p className='Search-content'>{`"${searchContent}"`}</p>
                    <div className='Search-sort' onClick={() => setView(!view)}>
                        <p style={{ color: 'rgba(45, 45, 45, 0.40)', fontSize: '1.2rem', fontStyle: 'normal', fontWeight: '400'}}>
                            정렬 방식: <span style={{ color: '#000', fontSize: '1.2rem', fontStyle: 'normal', fontWeight: '500' }}>{selectedSort}</span>
                            {view && (
                                <Dropdown className="Search-dropdown" onSortChange={handleSortChange} selectedSort={selectedSort} list={list} />
                            )}
                        </p>
                        {view ? <img src={array_drop_up} alt="dropdown up" className='Search-view-img' /> : <img src={array_drop_down} alt="dropdown down" className='Search-view-img' />}
                    </div>
                </div>
                <div className='Search-bottom-bottom-rectangle'>
                    <div className='Search-grid'>
                        {content.map((item) => {
                            return (
                                <div className='Search-grid-box' key={Math.random()}>
                                    <button className="Search-img-box" onClick={() => handleImageClick(item)}> 
                                        <img src={`http://${item.image}`} alt="" className="Search-search-image" />
                                    </button>
                                    <div className='Search-description-box'>
                                        <img src={`http://${item.profile_image}`} alt="" className='Search-profile-img'></img>
                                        <div className='Search-description-middle'>
                                            <p className='Search-description-p'>{item.title}</p>
                                            <img src={favorite} alt="" className='Search-favorite-icon' />
                                        </div>
                                        <p className='Search-count'>{item.like}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
