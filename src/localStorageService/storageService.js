class StorageService {
  setSrcToStorage = (src) => {
    window.localStorage.setItem("src", src);
  };
  setAuth = () => {
    window.localStorage.setItem("isAuth", true);
  };
  clearLocalStorage = () => {
    window.localStorage.clear();
  };
  getSrc = () => {
    return window.localStorage.getItem("src");
  };
  isAuth = () => {
    return window.localStorage.getItem("isAuth");
  };
}

export const storageService = new StorageService();
