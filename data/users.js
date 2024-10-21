let userId = null;
let userName = null;
let userEmail = null;

export const userStore = {
  setUser: (id, name, email) => {
    userId = id;
    userName = name;
    userEmail = email;
  },
  clearUser: () => {
    userId = null;
    userName = null;
    userEmail = null;
  },
  getUserId: () => userId,
  getUserName: () => userName,
  getUserEmail: () => userEmail,
};