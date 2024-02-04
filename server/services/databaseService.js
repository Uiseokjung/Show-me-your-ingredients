const admin = require("firebase-admin");

// 사용자 정보 조회 메서드
async function getUserInfo(userId) {
  const userDoc = await admin.firestore().collection("users").doc(userId).get();
  return userDoc.data;
}

// 사용자 프로필 업데이트 메서드
async function updateUserProfile(userId, updatedProfile) {
  const userRef = admin.firestore().collection("users").doc(userId);
  await userRef.update(updatedProfile);
}

module.exports = {
  getUserInfo,
  updateUserProfile,
};
