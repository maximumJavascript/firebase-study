import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { action, makeObservable, observable, reaction, autorun } from "mobx";
import { signOut } from "firebase/auth";
import storageService from "../localStorageService/storageService";
class AuthService {
  photoSrc = null;
  isAuth = false;
  isLogOut = null;
  userId = null;
  constructor() {
    makeObservable(this, {
      photoSrc: observable,
      isAuth: observable,
      isLogOut: observable,
      // It is recommended that you mark any piece of code that changes observable's as an action
      handleLogin: action,
      handleLogOut: action,
      setSrc: action,
      handleIsAuth: action,
    });
    this.photoSrc = null;
    this.isAuth = false;
  }

  setSrc = (src) => {
    this.photoSrc = src;
  };

  handleIsAuth = () => {
    this.isAuth = !this.isAuth;
  };
  handleLogin = () => {
    signInWithPopup(auth, provider).then((value) => {
      console.log(value);
      this.userId = value.user.uid;
      let photoSrc = value.user.photoURL;
      this.setSrc(photoSrc);
      this.handleIsAuth();
    });
  };

  handleLogOut = () => {
    signOut(auth).then(() => {
      this.handleIsAuth();
      this.isLogOut = true;
      window.location.pathname = "/login";
    });
  };
}
export const authService = new AuthService();

autorun(() => {
  if (authService.isAuth) {
    storageService.setAuthToStorage(authService.isAuth);
    storageService.setSrcToStorage(authService.photoSrc);
  }
  if (authService.isAuth === false && storageService.isStorageAuth()) {
    authService.handleIsAuth();
    authService.setSrc(storageService.getSrcFromStorage());
  }
  if (authService.isLogOut === true) {
    storageService.clearStorage();
  }
});

// reaction(
//   () => authService.isAuth,
//   (isAuth) => storageService.handleAuth(isAuth)
// );
// reaction(
//   () => authService.photoSrc,
//   (photoSrc) => storageService.setPhoto(photoSrc)
// );
