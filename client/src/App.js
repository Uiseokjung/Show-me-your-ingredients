import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Signin from './components/Signin';
import Signup from './components/Signup';
import SearchPage from './components/SearchPage';
import RecommendPage from './components/RecommendPage';
import CommunityPage from './components/CommunityPage';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <header>
          {/* 상단바 */}
          <nav className="navbar">
            {/* 로고 (메인 페이지로 이동) */}
            <Link to="/" className="logo">SMYI</Link>
            {/* 로그인과 회원가입 링크 */}
            <div className="navbar-right">
              <ul>
                <li><Link to="/signin">SignIn</Link></li>
                <li><Link to="/signup">SignUp</Link></li>
              </ul>
            </div>
          </nav>
        </header>
        <main className="main-content">
          {/* 메인 페이지 */}
          <div className="main-container">
            <h1>Show me your ingredients</h1>
            <div className="section-container">
              <Link to="/recommend" className="section-link">Recommend that using your ingredients</Link>
              <Link to="/search" className="section-link">Search recipe</Link>
              <Link to="/community" className="section-link">Community</Link>
            </div>
          </div>

          {/* 세 가지 섹션으로 나뉘는 부분 */}
          <Routes>
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/recommend" element={<RecommendPage />} />
            <Route path="/community" element={<CommunityPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
