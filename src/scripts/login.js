
import { auth } from './firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';

function loadLogin() {
  document.getElementById('app').innerHTML = `
  <style> 
  body {
    background-color: #262b3f;
    font-family: 'Ubuntu', sans-serif;
  }
  
  .main {
    background-color: #1e2337;
    width: 400px;
    height: 350px;
    margin: 7em auto;
    border-radius: 1.5em;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
  }
  
  .sign {
    padding-top: 40px;
    color: #663da6;
    font-family: 'Ubuntu', sans-serif;
    font-weight: bold;
    font-size: 23px;
  }
  
  .email {
    width: 76%;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.02);
    margin-bottom: 50px;
    margin-left: 46px;
    text-align: center;
    margin-bottom: 27px;
    font-family: 'Ubuntu', sans-serif;
  }
  
  form.form1 {
    padding-top: 20px;
  }
  
  .password {
    width: 76%;
    color: #fff;
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 1px;
    background: rgba(136, 126, 126, 0.04);
    padding: 10px 20px;
    border: none;
    border-radius: 20px;
    outline: none;
    box-sizing: border-box;
    border: 2px solid rgba(0, 0, 0, 0.02);
    margin-bottom: 50px;
    margin-left: 46px;
    text-align: center;
    margin-bottom: 27px;
    font-family: 'Ubuntu', sans-serif;
  }
  
  .email:focus, 
  .password:focus {
    border: 2px solid rgba(0, 0, 0, 0.18) !important;
  }
  
  .submit {
    cursor: pointer;
    border-radius: 5em;
    color: #fff;
    background: #663da6;
    border: 0;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 10px;
    padding-top: 10px;
    font-family: 'Ubuntu', sans-serif;
    margin-left: 35%;
    font-size: 13px;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
  }
  
  .forgot {
    text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
    color: #663da6;
    padding-top: 15px;
  }
  
  a {
    text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
    color: #663da6;
    text-decoration: none;
  }
  
  @media (max-width: 600px) {
    .main {
      border-radius: 0px;
    }
  } 
  </style>
    <div class="main">
      <p class="sign" align="center">Login</p>
      <form class="form1" id="login-form">
        <input class="email" type="email" id="login-email" align="center" placeholder="Email" required aria-label="Email">
        <input class="password" type="password" id="login-password" align="center" placeholder="Password" required aria-label="Password">
        <button class="submit" type="submit" align="center">Login</button>
        <p class="forgot" align="center"><a href="#/register">Don't have an account?</a></p>
      </form>
    </div>
  `;

  const loginForm = document.getElementById('login-form');
  const loginEmail = document.getElementById('login-email');
  const loginPassword = document.getElementById('login-password');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = loginEmail.value;
    const password = loginPassword.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful');
      window.location.href = '#/home';
    } catch (error) {
      handleLoginError(error);
    }
  });
}

function handleLoginError(error) {
  // Handle different error scenarios here
  switch (error.code) {
    case 'auth/wrong-password':
      alert('Incorrect password. Please try again.');
      break;
    case 'auth/user-not-found':
      alert('No user found with this email. Please register first.');
      break;
    default:
      alert('Error logging in: ' + error.message);
  }
}

export { loadLogin };
