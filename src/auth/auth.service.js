import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase-config';
import { action, makeObservable, observable, reaction, autorun } from 'mobx';
import { signOut } from 'firebase/auth';
import { userService } from '../usersService/UserService';
import { storageService } from '../localStorageService/storageService';

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
  }

  setSrc = (src) => {
    this.photoSrc = src;
  };

  setUserId = (id) => {
    this.userId = id;
  };

  handleIsAuth = (bool) => {
    this.isAuth = bool;
  };

  handleLogin = async () => {
    const value = await signInWithPopup(auth, provider);
    this.setUserId(value.user.uid);
    this.setSrc(value.user.photoURL);
    this.handleIsAuth(true);
    // каждый раз добавляем юзера в базу. Если он уже там есть, то просто обновятся его поля, которые он мог поменять ( имя, картинка профиля и т.д.)
    userService.handleAddUsers({
      userUid: value.user.uid,
      userName: value.user.displayName,
      userPhoto: value.user.photoURL,
      userEmail: value.user.email,
    });
  };

  handleLogOut = () => {
    this.handleIsAuth(false);
    this.isLogOut = true;
    storageService.clearStorage();
    this.setSrc(null);
    signOut(auth);
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
    authService.handleIsAuth(true);
    authService.setSrc(storageService.getSrcFromStorage());
    authService.setUserId(storageService.getUserIdFromStorage());
  }
  if (authService.isLogOut === true) {
    storageService.clearStorage();
  }
});
