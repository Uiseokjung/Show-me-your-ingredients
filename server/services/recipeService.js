const admin = require("firebase-admin");
const axios = require("axios");

async function getRemcommendRecipes(ingredients) {
  // 구현 필요
  // 음식 재료를 기반으로 추천된 레시피를 가져오는 로직을 추가
}

// Edamam Recipe Search API 요청에 필요한 APP_ID와 인증 키
const APP_ID = "bbeb467d";
const APP_KEY = "abbdd85c73056820f61ed273486c51ab";

async function searchFoodInfo(foodName) {
  try {
    // Edamam REcipe Search API에 요청을 보내기 위한 URL
    const url = `https://api.edamam.com/search?q=${foodName}&app_id=${APP_ID}&app_key=${APP_KEY}&to=1`;

    // API 요청 보내기
    const response = await axios.get(url);

    // API 응답에서 음식 정보 추출
    const recipe = response.data.hits[0].recipe;
    const youtubeVideo = searchYouTube(foodName);

    const foodInfo = {
      name: recipe.label,
      image: recipe.image,
      ingredients: recipe.ingredientLines,
      nutrients: recipe.totalNutrients,
      calories: recipe.calories,
      servings: recipe.yield,
      youtubeVideo: youtubeVideo,
    };

    return foodInfo;
  } catch (error) {
    console.error("Error searching food information: ", error);
    throw new Error("Error searching food information");
  }
}

async function searchYouTube(query) {
  try {
    // YouTube API를 사용하여 검색
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          q: query,
          type: "video",
          part: "snippet",
          maxResults: 1,
          key: "AIzaSyBEwO5QkUkk6q775cXpRpKdD_q02LKuY8U", // 여기에 유튜브 API 키 추가
        },
      }
    );

    // API 응답에서 동영상 정보를 추출하여 반환
    const youtubeVideo = {
      title: response.data.items[0].snippet.title,
      videoId: response.data.items[0].id.videoId,
    };

    return youtubeVideo;
  } catch (error) {
    console.error("Error searching YouTube", error);
    throw new Error("Error searching YouTube");
  }
}

module.exports = {
  getRemcommendRecipes,
  searchYouTube,
  searchFoodInfo,
};
