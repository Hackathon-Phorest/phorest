import all_filter from '../assets/ranking-all-filter.svg';
import pet_filter from '../assets/ranking-pet-filter.svg';
import ocean_filter from '../assets/ranking-ocean-filter.svg';
import hill_filter from '../assets/ranking-hill-filter.svg';
import camping_filter from '../assets/ranking-camping-filter.svg';
import season_filter from '../assets/ranking-season-filter.svg';

import '../styles/Ranking.css';
import Foot from '../components/Foot.jsx';
import RankingImg from '../components/RankingImg.jsx';
import GoodsImg from '../components/GoodsImg.jsx';
import FilterButton from '../components/FilterButton.jsx';

const rankingFilterButtons = [
  { id: 'all-button', label: '전체', icon: all_filter },
  { id: 'pet-button', label: '반려동물', icon: pet_filter },
  { id: 'ocean-button', label: '바다', icon: ocean_filter },
  { id: 'hill-button', label: '산', icon: hill_filter },
  { id: 'camping-button', label: '캠핑', icon: camping_filter },
  { id: 'season-button', label: '계절', icon: season_filter }
];

export default function Ranking() {
 

  return (
    <div className="ranking-wrap">
      <header></header>

      <main>
        <div className="ranking-filter">
          <FilterButton filterButtons={rankingFilterButtons}/>
        </div>

        <div className="ranking-main-best">
          <RankingImg count={6}/>
        </div>
        <div className="ranking-main-goods">
          <h1 className='ranking-goods-title'>베스트 굿즈</h1>
          <GoodsImg />
        </div>
      </main>

      <foot className="ranking-foot">
        <Foot />
      </foot>
    </div>
  );
}
