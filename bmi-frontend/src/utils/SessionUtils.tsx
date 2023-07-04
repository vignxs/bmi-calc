interface UserInfo {
  name: string;
  // Add other properties as needed
}

export const setUserInfoInSession = (userInfo: UserInfo) => {
  sessionStorage.setItem("userInfo", JSON.stringify(userInfo));
};

export const getUserInfoFromSession = (): UserInfo | null => {
  const userInfo = sessionStorage.getItem("userInfo");
  return userInfo ? JSON.parse(userInfo) : null;
};
