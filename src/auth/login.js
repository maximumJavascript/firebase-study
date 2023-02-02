import React from "react";
// чтобы регаться через гугл нам нужен импорт auth/provider из кофига firebase
import { auth, provider } from "../firebase-config";
// ниже импортим специальную функцию (signInWithPopup) опять же из firebase, которая и позволяет нам регаться;
// называть мы ее можем любым способом. В ней 2 аргумента: auth/provider. Provider нужен именно для регистрации в гугле, какой-то прикол с ним, хз че это значит.
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuth }) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((value) => {
      console.log("value", value);
      let photoSrc = value.user.photoURL;
      localStorage.setItem("isAuth", true);
      localStorage.setItem("photoSrc", photoSrc);
      // если пользователь залогинился, ставим пропc setIsAuth из app.js на true
      setIsAuth(true);
      // функция navigate использутся из реакт-роутера, чтоб перенаправить нас на страницу Home после успешного логина
      navigate("/");
    });
  };

  return (
    <div className="loginPage">
      <p>Sign In With Google to Continue</p>
      <button className="login-with-google-btn" onClick={signInWithGoogle}>
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
