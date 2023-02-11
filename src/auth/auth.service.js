import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase-config";
import { makeObservable, observable } from "mobx";
import { signOut } from "firebase/auth";

class AuthService {
	photoSrc = null;
	isAuth = false;

	constructor() {
		makeObservable(this, {
			photoSrc: observable,
			isAuth: observable,
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
			let photoSrc = value.user.photoURL;
			this.setSrc(photoSrc);
			this.handleIsAuth();
		});
	};

	handleLogOut = () => {
		signOut(auth).then(() => {
			this.handleIsAuth();
			window.location.pathname = "/login";
		});
	};
}

export const authService = new AuthService();
