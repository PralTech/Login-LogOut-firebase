import React, { useState, useEffect } from 'react';
import './LoginLogout.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/firestore';

// Firebase configrn 
const firebaseConfig = {
    apiKey: "AIzaSyCTfZju580zjdw4RAOYYLqWcOSt2a0hxPs",
    authDomain: "login-logout-7eb2d.firebaseapp.com",
    projectId: "login-logout-7eb2d",
    storageBucket: "login-logout-7eb2d.appspot.com",
    messagingSenderId: "585472773454",
    appId: "1:585472773454:web:9df7ca2d234d84c98f221f"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function LoginLogout() {
  const [user, setUser] = useState(null);

  //state change
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

    //Google signin
  const handleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await auth.signInWithPopup(provider);
    alert("loggedIn succesfully.");
  };

  
  const handleLogout = async () => {
    await auth.signOut();
    alert("LogOut Succesfully.");
  };


  const handleEmailSignUp = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.createUserWithEmailAndPassword(email.value, password.value);
      alert("Signed up successfully, please log in.");
    } catch (error) {
      alert(error);
    }
  };
  
  const handleEmailLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await auth.signInWithEmailAndPassword(email.value, password.value);
      alert("SignIn successfully.");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container">
    {user ? (
      <div className="dashboard">
        <h1>Hello World</h1>
        <button className="logout" onClick={handleLogout}>Log out</button>
      </div>
    ) : (
      <div className="login-container">
        <div className="form-container">
          <h1>Sign Up</h1>
          <form className='form-data' onSubmit={handleEmailSignUp}>
            <label>
              Email:
              <input type="email" name="email" required placeholder='Enter your Email'/>
            </label>
            <label>
              Password:
              <input type="password" name="password" required placeholder='Enter your password'/>
            </label>
            <button className='signup-button' type="submit">Sign Up</button>
            <button className='google-button' onClick={handleLogin}>Log in with Google</button>
          </form>
        </div>
        
        <div className="login-form-container">
        <h1>Log In</h1>
          <form onSubmit={handleEmailLogin}>
            <label>
              Email:
              <input type="email" name="email" required placeholder='Enter your Email' />
            </label>
            <label>
              Password:
              <input type="password" name="password" required placeholder='Enter your password' />
            </label>
            <button className='login-button' type="submit">Log in</button>
          </form>
        </div>
      </div>
    )}
  </div>
  
  );
}

export default LoginLogout;
