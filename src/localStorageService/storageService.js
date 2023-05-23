class StorageService {
  setAuthToStorage = (isAuth) => {
    window.localStorage.setItem('isAuth', isAuth);
  };

  setSrcToStorage = (src) => {
    window.localStorage.setItem('src', src);
  };

  getSrcFromStorage = () => window.localStorage.getItem('src');

  clearStorage = () => {
    window.localStorage.clear();
  };

  isStorageAuth = () =>
    window.localStorage.getItem('isAuth') === 'true' ||
    window.localStorage.getItem('userId');

  setUserIdToStorage = (userId) => {
    window.localStorage.setItem('userId', userId);
  };

  getUserIdFromStorage = () => window.localStorage.getItem('userId');
}
export const storageService = new StorageService();
