import { db } from './firebase.js';
import { doc, getDoc, collection, getDocs, addDoc, deleteDoc, query, where, updateDoc } from 'firebase/firestore';

async function fetchGameDetails(docId) {
  const gameRef = doc(db, 'Games', docId);
  const gameSnap = await getDoc(gameRef);

  if (gameSnap.exists()) {
    const game = gameSnap.data();
    document.getElementById('game-title').innerText = game.gameTitle;
    document.getElementById('game-desc').innerText = game.gameDesc;
    document.getElementById('game-img').src = game.gameImg;
    fetchReviews(docId);
  } else {
    console.log('No such game!');
  }
}

async function fetchReviews(gameId) {
  const reviewsContainer = document.querySelector('.reviews');
  reviewsContainer.innerHTML = '';
  const q = query(collection(db, "Reviews"), where("gameId", "==", gameId));
  const reviewsSnapshot = await getDocs(q);

  reviewsSnapshot.forEach((doc) => {
    const review = doc.data();
    const reviewElement = document.createElement('div');
    reviewElement.className = 'review';
    reviewElement.innerHTML = `
      <p>${review.revDesc}</p>
      <p>Rating: ${review.recRating}</p>
      <button class="edit-review" data-id="${doc.id}">Edit</button>
      <button class="delete-review" data-id="${doc.id}">Delete</button>
    `;
    reviewsContainer.appendChild(reviewElement);
  });

  document.querySelectorAll('.delete-review').forEach(button => {
    button.addEventListener('click', async (e) => {
      const reviewId = e.target.getAttribute('data-id');
      await deleteReview(reviewId, gameId);
    });
  });

  document.querySelectorAll('.edit-review').forEach(button => {
    button.addEventListener('click', (e) => {
      const reviewId = e.target.getAttribute('data-id');
      const reviewData = reviewsSnapshot.docs.find(doc => doc.id === reviewId).data();
      editReview(reviewId, reviewData, gameId);
    });
  });
}

async function deleteReview(reviewId, gameId) {
  await deleteDoc(doc(db, 'Reviews', reviewId));
  fetchReviews(gameId);  // Refresh reviews list for the current game
}

async function addReview(gameId, revDesc, recRating) {
  await addDoc(collection(db, 'Reviews'), {
    gameId,  // Ensure this is passed when creating a new review
    revDesc,
    recRating
  });
  fetchReviews(gameId);  // Refresh reviews list for the current game
}

async function editReview(reviewId, reviewData, gameId) {
  const newDesc = prompt("Edit your review description:", reviewData.revDesc);
  const newRating = prompt("Edit your rating (1-5):", reviewData.recRating);

  if (newDesc !== null && newRating !== null && !isNaN(newRating)) {
    await updateDoc(doc(db, 'Reviews', reviewId), {
      revDesc: newDesc,
      recRating: parseInt(newRating)
    });
    fetchReviews(gameId);
  } else {
    alert("Invalid input or cancellation. No changes made.");
  }
}

function loadGameDetails(params) {
  document.getElementById('app').innerHTML = `
  <style> 
  * {
  background-color: #262b3f;
  font-family: 'Ubuntu', sans-serif;
}

#review-form, .revCont, .game {
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
  .revCont h2 {
    background-color: transparent;
  padding-top: 20px;
  color: #663da6;
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;
  font-size: 23px;
  text-align: center;
  }

  #review-desc, 
  #review-rating,
  #game-desc, 
  .revCont {
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
  </style>
    <header>
      <div class="game">
        <h1 id="game-title"></h1>
        <img id="game-img" alt="Game Image" />
        <p id="game-desc"></p>
      </div>
    </header>
    <section>
      <div class="revCont">
        <h2>Reviews</h2>
        <div class="reviews"></div>
      </div>
      <form id="review-form">
        <textarea id="review-desc" placeholder="Write your review"></textarea>
        <input type="number" id="review-rating" min="1" max="5" placeholder="Rating (1-5)" />
        <button type="submit">Submit Review</button>
      </form>
    </section>
  `;

  const urlParams = new URLSearchParams(params);
  const docId = urlParams.get('id');

  if (docId) {
    fetchGameDetails(docId);

    document.getElementById('review-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const revDesc = document.getElementById('review-desc').value;
      const recRating = document.getElementById('review-rating').value;
      addReview(docId, revDesc, recRating);
    });
  }
}

export { loadGameDetails };