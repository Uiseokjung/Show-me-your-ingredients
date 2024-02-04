const admin = require("firebase-admin");
const db = admin.firestore();
const axios = require("axios");

async function getRemcommendRecipes(ingredients) {
  // 구현 필요
  // 음식 재료를 기반으로 추천된 레시피를 가져오는 로직을 추가
}

async function getFoodInfoByName(foodName) {
  try {
    // 여기에 음식 이름을 사용하여 실제로 음식 정보를 가져오는 로직을 추가
    // 이 예시에서는 간단하게 음식 이름과 재료를 포함한 객체를 반환하는 것으로 가정
    const foodInfo = {
      name: foodName,
      ingredients: ["ingredient1", "ingredient2", "ingredient3"], // 실제 재료로 대체 필요
    };

    return foodInfo;
  } catch (error) {
    console.error("Error fetching food information", error);
    throw new Error("Error fetching food information");
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
          key: YOUTUBE_API_KEY, // 여기에 유튜브 API 키 추가
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

async function getFoodImage(foodName) {
  try {
    // 음식 이름을 사용하여 음식 이미지를 가져오는 로직을 추가
    // 이 예시에서는 간단하게 음식 이름에 따른 이미지 URL을 반환
    const foodImage = ""; // 예시 URL, 실제로는 적절한 이미지 URL로 대체 필요

    return foodImage;
  } catch (error) {
    console.error("Error fetching food image", error);
    throw new Error("Error fetching food image");
  }
}

async function getRecipeDetails(foodName) {
  try {
    // 음식 이름을 사용하여 음식 정보를 가져오는 로직 추가
    const foodInfo = await getFoodInfoByName(foodName);

    const youtubeVideo = await searchYouTube(
      foodInfo.ingredients.join(" ") + " recipe"
    );

    // 가져온 정보를 객체로 구성하여 반환

    const result = {
      foodInfo,
      youtubeVideo,
    };

    return result;
  } catch (error) {
    console.error("Error fetching recipe details", error);
    throw new Error("Error fetching recipe details");
  }
}

module.exports = {
  getRemcommendRecipes,
  getRecipeDetails,
  getFoodImage,
  getFoodInfoByName,
};
