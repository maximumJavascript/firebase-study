import React from 'react';
// чтобы регаться через гугл нам нужен импорт auth/provider из кофига firebase
import { auth, provider } from '../firebase-config';
// ниже импортим специальную функцию (signInWithPopup) опять же из firebase, которая и позволяет нам регаться;
//  Provider нужен именно для регистрации в гугле, какой-то прикол с ним, хз че это значит.
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { authService } from './auth.service';

function Login({ setIsAuth }) {
  let navigate = useNavigate();
  const signInWithGoogle = () => {
    authService.handleLogin();
    navigate('/');
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
