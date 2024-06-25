
import { db, storage } from './firebase.js';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function loadAddGame() {
  document.getElementById('app').innerHTML = `
  <style> 
  * {
  background-color: #262b3f;
  
  font-family: 'Ubuntu', sans-serif;
}

#game-form {
  background-color: #1e2337;
  width: 400px;
  max-width: 440px; /* Allow up to 10% stretch */
  height: auto; /* Let the height adjust based on content */
  margin: 5em auto;
  border-radius: 1.5em;
  box-shadow: 0px 11px 35px 2px rgba(0, 0, 0, 0.14);
  padding: 20px; /* Added padding to the form */
  box-sizing: border-box; /* Ensure padding is included in the width and height */
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  background-color: transparent;
  padding-top: 20px;
  color: #663da6;
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;
  font-size: 23px;
  text-align: center;
}

#game-title,
#game-desc {
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
  text-align: center;
  font-family: 'Ubuntu', sans-serif;
}

#game-title:focus,
#game-desc:focus {
  border: 2px solid rgba(0, 0, 0, 0.18) !important;
}

button {
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
  margin-top: 10px;
  font-size: 13px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.04);
}

.profile-pic {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin: 1px auto;
  cursor: pointer;
}

a {
  text-shadow: 0px 0px 3px rgba(117, 117, 117, 0.12);
  color: #663da6;
  text-decoration: none;
}

@media (max-width: 600px) {
  #game-form {
    width: 90%;
    max-width: 100%; /* Remove the max-width constraint on small screens */
    border-radius: 0;
  }
}

.image-upload {
  position: relative;
  border-radius: 20px;
  width: 76%;
  margin: 20px 0; /* Reduced margin to fit better in the form */
}

#game-img {
  display: none;
}

#image-label {
  display: block;
  width: 100%;
  height: 200px;
  background: rgba(136, 126, 126, 0.04);
  border: 2px solid rgba(0, 0, 0, 0.02);
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 14px;
  color: #fff;
  letter-spacing: 1px;
  text-align: center;
}

#display-image {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
}
  </style>
    <form id="game-form">
    <h1>Add New Game</h1>
    <div class="image-upload">
      <input type="file" id="game-img" accept="image/*" required />
      <label for="game-img" id="image-label">Choose Image</label>
      <img id="display-image" src="" alt="Game Image" style="display: none;" />
    </div>
    <input type="text" id="game-title" placeholder="Game Title" required />
    <textarea id="game-desc" placeholder="Game Description" required></textarea>
    <button type="submit">Add Game</button>
  </form>
    </section>
  `;

  document.getElementById('game-img').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const displayImage = document.getElementById('display-image');
        displayImage.src = e.target.result;
        displayImage.style.display = 'block';
        document.getElementById('image-label').style.display = 'none';
        
        // Adjust form width
        const form = document.getElementById('game-form');
        form.style.maxWidth = '440px'; // Allow up to 10% stretch
      };
      reader.readAsDataURL(file);
    }
  });
  
  document.getElementById('display-image').addEventListener('click', function() {
    // Reset the image input
    document.getElementById('game-img').value = '';
    this.style.display = 'none';
    document.getElementById('image-label').style.display = 'flex';
    
    // Reset form width
    const form = document.getElementById('game-form');
    form.style.maxWidth = '400px'; // Reset to original width
  });
  

  document.getElementById('game-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const gameTitle = document.getElementById('game-title').value;
    const gameDesc = document.getElementById('game-desc').value;
    const gameImgFile = document.getElementById('game-img').files[0];

    if (gameTitle && gameDesc && gameImgFile) {
      const gameImgRef = ref(storage, 'game_images/' + gameImgFile.name);
      await uploadBytes(gameImgRef, gameImgFile);
      const gameImgUrl = await getDownloadURL(gameImgRef);

      await addDoc(collection(db, 'Games'), {
        gameTitle,
        gameDesc,
        gameImg: gameImgUrl
      });

      alert('Game added successfully!');
      window.location.href = '#/home';
    } else {
      alert('Please fill in all fields and upload an image.');
    }
  });
}

export { loadAddGame };
