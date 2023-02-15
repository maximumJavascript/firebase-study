import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { action, makeObservable, observable, reaction, autorun } from "mobx";
import { signOut } from "firebase/auth";
import { getAuth, GoogleAuthProvider, getRedirectResult } from "firebase/auth";
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
      userId: observable,
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
  setUserId = (id) => {
    this.userId = id;
  };
  handleIsAuth = () => {
    this.isAuth = !this.isAuth;
  };
  handleLogin = () => {
    signInWithPopup(auth, provider).then((value) => {
      const credential = GoogleAuthProvider.credentialFromResult(value);
      provider.addScope("https://www.googleapis.com/auth/userinfo.profile");
      this.setUserId(value.user.uid);
      this.setSrc(value.user.photoURL);
      this.handleIsAuth();
    });
    getRedirectResult(auth).then((result) => {
      // This gives you a Google Access Token. You can use it to access Google APIs.
      console.log(result);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
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
    storageService.setUserIdToStorage(authService.userId);
  }
  if (authService.isAuth === false && storageService.isStorageAuth()) {
    authService.handleIsAuth();
    authService.setSrc(storageService.getSrcFromStorage());
    authService.setUserId(storageService.getUserIdFromStorage());
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
