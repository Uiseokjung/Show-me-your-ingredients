import React, { useState } from 'react';
import axios from 'axios';

function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/search/${searchQuery}`);
      const foodInfo = response.data.foodInfo;
      setSearchResults([foodInfo]); // 음식 정보를 배열에 담아야 하므로 배열로 묶어줍니다.
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      // 오류 처리 로직 추가
    }
  };

  return (
    <div>
      <h2>Search recipes</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchInputChange}
        placeholder="Input your recipe"
      />
      <button onClick={handleSearch}>검색</button>

      {/* 검색 결과 표시 */}
      <div>
        {searchResults.map((result) => (
          <div key={result.name}>
            <h3>{result.name}</h3>
            <img src={result.image} alt={result.name} />
            <ul>
              {result.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <p>calorie: {result.calories}</p>
            {/* 추가적인 검색 결과 항목을 표시하는 UI를 구현하세요 */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;