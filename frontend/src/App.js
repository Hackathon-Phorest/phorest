import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Gallery from "./routers/Gallery";
import Ranking from "./routers/Ranking";
import Goods from "./routers/Goods";
import Main from "./routers/Main";
import Upload from "./routers/Upload";
import GoodsBuy from "./routers/GoodsBuy";
import PostWithHashtags from "./routers/Test";

import "./styles/App.css";

function App() {
  return (
    // <div>
    //   {/* <Ranking /> */}
    //   {/* <Gallery /> */}
    //   <Goods />
    //   {/* <Main /> */}
    //   {/* <GoodsBuy /> */}
    // </div>
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/goods" element={<Goods />} />
        <Route path="/goodsbuy" element={<GoodsBuy />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/test" element={<PostWithHashtags />} />
      </Routes>
    </Router>
  );
}
export default App;
