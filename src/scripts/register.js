import { auth, storage, db } from './firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';

function loadRegister() {
  document.getElementById('app').innerHTML = `
  <style> 
  body {
    background-color: #262b3f;
    font-family: 'Ubuntu', sans-serif;
  }
  .main {
    background-color: #1e2337;
    width: 400px;
    height: 680px;
    margin: 5em auto;
    border-radius: 1.5em;
    box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
  }
  .sign {
    padding-top: 40px;
    color: #663da6;
    font-family: 'Ubuntu', sans-serif;
    font-weight: bold;
    font-size: 23px;
    text-align: center;
  }
  .userName, .fullName, .password, .email {
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
    margin-bottom: 15px;
    margin-left: 46px;
    text-align: center;
    font-family: 'Ubuntu', sans-serif;
  }
  form.form1 {
    padding-top: 20px;
  }
  .userName:focus, .fullName:focus, .password:focus, .email:focus {
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
    margin-left: 34%;
    margin-top: 10px;
    font-size: 13px;
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
  }
  .profile-pic {
    display: block;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    object-fit: cover;
    margin: 1px auto;
    cursor: pointer;
    padding-bottom: 25px;
  }
  #file-upload {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
  .forgot {
    text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
    color: #663da6;
    padding-top: 15px;
    text-align: center;
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
      <p class="sign" align="center">Register</p>
      <form class="form1" id="register-form">
        <img src="../images/default.png" class="profile-pic" id="profile-pic" alt="Profile Picture">
        <input type="file" id="file-upload" accept="image/*">
        <input class="userName" type="text" id="register-name" align="center" placeholder="Username" required aria-label="Username">
        <input class="email" type="email" id="register-email" align="center" placeholder="Email" required aria-label="Email">
        <input class="password" type="password" id="register-password" align="center" placeholder="Password" required aria-label="Password">
        <button class="submit" type="submit" align="center">Register</button>
        <p class="forgot" align="center"><a href="#/">Already have an account?</a></p>
      </form>
    </div>
  `;

  const registerForm = document.getElementById('register-form');
  const registerName = document.getElementById('register-name');
  const registerEmail = document.getElementById('register-email');
  const registerPassword = document.getElementById('register-password');
  const profilePic = document.getElementById('profile-pic');
  const fileUpload = document.getElementById('file-upload');
  
  profilePic.addEventListener('click', () => {
    fileUpload.click();
  });

  fileUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(event) {
        profilePic.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  });

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = registerEmail.value;
    const password = registerPassword.value;
    const username = registerName.value;
    const file = fileUpload.files[0];

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      let profilePicURL = '';
      if (file) {
        const storageRef = ref(storage, `user_profile/${user.uid}`);
        await uploadBytes(storageRef, file);
        profilePicURL = await getDownloadURL(storageRef);
      }

      await setDoc(doc(db, 'user-profile', user.uid), {
        username: username,
        profilePic: profilePicURL,
        email: email
      });

      alert('Registration successful');
      window.location.href = '#/home';
    } catch (error) {
      handleRegisterError(error);
    }
  });
}

function handleRegisterError(error) {
  // Handle different error scenarios here
  switch (error.code) {
    case 'auth/email-already-in-use':
      alert('The email address is already in use by another account.');
      break;
    case 'auth/invalid-email':
      alert('The email address is not valid.');
      break;
    case 'auth/operation-not-allowed':
      alert('Email/password accounts are not enabled.');
      break;
    case 'auth/weak-password':
      alert('The password is not strong enough.');
      break;
    default:
      alert('Error registering: ' + error.message);
  }
}

export { loadRegister };
