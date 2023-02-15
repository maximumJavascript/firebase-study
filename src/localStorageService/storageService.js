import { autorun } from "mobx";
import { authService } from "../auth/auth.service";
class StorageService {
  setAuthToStorage = (isAuth) => {
    window.localStorage.setItem("isAuth", isAuth);
  };

  setSrcToStorage = (src) => {
    window.localStorage.setItem("src", src);
  };

  getSrcFromStorage = () => window.localStorage.getItem("src");

  clearStorage = () => {
    window.localStorage.clear();
  };

  isStorageAuth = () =>
    window.localStorage.getItem("isAuth") === "true" &&
    window.localStorage.getItem("userId");

  setUserIdToStorage = (userId) => {
    window.localStorage.setItem("userId", userId);
  };

  getUserIdFromStorage = () => window.localStorage.getItem("userId");
}
const storageService = new StorageService();
export default storageService;
// если переносить сюда, то работает ток с таймаутом
// setTimeout(() => {
//   autorun(() => {
//     if (authService.isAuth) {
//       storageService.setAuthToStorage(authService.isAuth);
//       storageService.setSrcToStorage(authService.photoSrc);
//     }
//     if (authService.isAuth === false && storageService.isStorageAuth()) {
//       authService.handleIsAuth();
//       authService.setSrc(storageService.getSrcFromStorage());
//     }
//     if (authService.tellTheTruth === true) {
//       storageService.clearStorage();
//     }
//   });
// });
