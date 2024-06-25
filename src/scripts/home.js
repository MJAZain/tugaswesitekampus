
import { db } from './firebase.js';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

async function fetchGames() {
  const gamesContainer = document.getElementById('gamesContainer');
  const gamesSnapshot = await getDocs(collection(db, 'Games'));
  gamesSnapshot.forEach((doc) => {
    const game = doc.data();
    const gameCard = document.createElement('div');
    gameCard.classList.add('card');
    gameCard.innerHTML = `
      <img src="${game.gameImg}" alt="${game.gameTitle}" />
      <div class="content">
        <div class="left">
          <h5>${game.gameTitle}</h5>
          <p><a href="#/details?id=${doc.id}" class="detail-link">Details</a></p>
        </div>
      </div>
    `;
    gamesContainer.appendChild(gameCard);
  });
}

function loadHome() {
  document.getElementById('app').innerHTML = `
  <style>
  /* Google Fonts 'Poppins */
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
  
  /* CSS reset */
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  
  /* Color root */
  :root {
    --color-1: #262b3f;
    --color-2: #fff;
    --color-3: #1e2337;
    --color-4: rgba(255, 255, 255, 0.5);
    --color-5: greenyellow;
  }
  
  body {
    width: 100%;
    height: 100vh;
    background: #1e2337;
    font-family: 'Poppins', sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; /* Prevent scrolling */
  }
  
  header {
    width: 85%;
    height: 95%;
    box-shadow: 0 0 30px rgba(20, 19, 19, 1);
    border-radius: 10px;
    display: flex;
  }
  
  header aside,
  article {
    height: 100%;
    background: var(--color-3);
    overflow: hidden; /* Prevent scrolling within the card */
  }
  
  header aside {
    width: 15%;
    border-radius: 10px 0 0 10px;
    background: #663da6;
  }
  
  header aside h1 {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 22px;
    font-weight: 800;
  }
  
  header aside h1 i {
    margin-left: 5px;
  }
  
  header aside button {
    display: block;
    padding: 8px 20px;
    margin: 5px auto;
    border: none;
    cursor: pointer;
    font-size: 12px;
    background: #270458;
    color: #fff;
    transition: 0.3s linear;
  }
  
  header aside button:hover {
    background: #1e2337;
  }
  
  header aside ul {
    margin-top: 10px;
    list-style-type: none;
    padding-bottom: 20px;
  }
  
  header aside ul::before {
    content: '';
    position: absolute;
    width: 88%;
    height: 2px;
    background: rgba(184, 184, 184, 0.1);
    bottom: 0;
  }
  
  header aside ul li {
    padding: 2.5px 0;
  }
  
  header aside ul li a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.7);
    font-size: 12px;
    transition: 0.3s linear;
  }
  
  header aside ul li a:hover {
    color: #fff;
  }
  
  header aside ul li a i {
    margin-right: 15px;
  }
  
  /* List item active */
  header aside ul .active_li {
    border-right: 3px solid #fff;
  }
  
  header aside ul .active_li a {
    color: #fff;
    font-size: 13px;
  }
  
  header article {
    width: 85%;
    border-radius: 0 10px 10px 0;
  }
  
  /* Navigation */
  header article nav {
    width: 100%;
    height: 9%;
    padding: 0 30px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-1);
  }
  
  header article nav button {
    padding: 7px 20px;
    border-radius: 5px;
    border: none;
    background: #663da6;
    color: #fff;
    font-family: 'Poppins', sans-serif;
  }
  
  header article nav .search {
    width: 40%;
    background: var(--color-3);
    padding: 4px 10px;
    transition: 0.5s linear;
  }
  
  header article nav .search input {
    width: 95%;
    background: none;
    border: none;
    outline: none;
    padding: 0 10px;
    color: var(--color-2);
    transition: 0.5s linear;
  }
  
  header article nav .search input::placeholder {
    color: var(--color-4);
    font-family: 'Poppins', sans-serif;
    font-size: 12px;
    transition: 0.5s linear;
  }
  
  header article nav .search i {
    color: var(--color-4);
    font: 13px;
    transition: 0.5s linear;
  }
  
  header article nav .right_bx {
    width: 38%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  header article nav .right_bx i {
    color: var(--color-4);
    font-size: 20px;
    cursor: pointer;
    transition: 0.5s linear;
  }
  
  header article nav .right_bx i:hover {
    color: #fff;
  }
  
  header article nav .right_bx button {
    padding: 0 20px;
    background: rgba(184, 184, 184, 0.2);
    border: 2px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #fff;
    transition: 0.5s linear;
  }
  
  header article nav .right_bx button span {
    margin: -2px 0 0 10px;
  }
  
  /* Battery active class */
  header article nav .right_bx .active_battery {
    background: #663da6;
    box-shadow: 0 0 20px #663da6;
  }
  
  header article nav .right_bx .user_data {
    position: relative;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: 0.5s linear;
  }
  
  header article nav .right_bx .user_data h6 {
    width: 70px;
    color: var(--color-4);
    font-weight: 600;
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    transition: 0.5s linear;
  }
  
  header article nav .right_bx .user_data h5 {
    color: #fff;
    background: #663da6;
    border-radius: 50%;
    padding: 8px 9px;
    font-size: 11px;
    margin: 0 5px;
    transition: 0.5s linear;
  }
  
  header article nav .right_bx .user_data i {
    color: var(--color-2);
    font-size: 12px;
    transition: 0.7s linear;
  }
  
  header article nav .right_bx .user_data:hover i {
    transform: rotate(180deg);
  }
  
  header article nav .right_bx .user_data .card {
    position: absolute;
    width: 130px;
    height: 0;
    top: 50px;
    z-index: 9999;
    display: flex;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
    opacity: 0;
    transition: 1s linear;
  }
  
  header article nav .right_bx .user_data:hover .card {
    height: 200px;
    opacity: 1;
    overflow: unset;
  }
  
  header article nav .right_bx .user_data .card::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(184, 184, 184, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    z-index: -1;
  }
  
  header article nav .right_bx .user_data .card::after {
    content: '';
    position: absolute;
    border-top: 15px solid rgba(184, 184, 184, 0.1);
    border-right: 15px solid transparent;
    border-bottom: 15px solid transparent;
    top: -10px;
    right: 20px;
    transform: rotate(45deg);
  }
  
  header article nav .right_bx .user_data .card img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-top: 10px;
  }
  
  header article nav .right_bx .user_data .card h6 {
    width: unset;
    overflow: unset;
    text-align: center;
    display: block;
    margin-top: 10px;
    color: #fff;
    transition: 0.5s linear;
  }
  
  header article nav .right_bx .user_data .card p {
    font-size: 9px;
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 10px;
    transition: 0.5s linear;
  }
  
  header article nav .right_bx .user_data .card .card_gta_img {
    width: 110px;
    height: 60px;
    border-radius: 15px;
    margin: 15px;
  }
  
  /* Game Box Start */
  header article .game1 {
    position: relative;
    width: 100%;
    height: 200px;
    padding: 0 30px;
    margin-top: 20px;
  }
  
  header article .game1 h3 {
    color: var(--color-2);
    font-size: 14px;
    font-weight: 600;
    transition: 0.5s linear;
  }
  
  header article .game1 .game_bx {
    width: 100%;
    height: 175px;
    display: flex;
    align-items: center;
    overflow: auto;
    scroll-behavior: smooth;
  }
  
  header article .game1 .game_bx::-webkit-scrollbar {
    display: none;
  }
  
  header article .game1 .game_bx .card {
    min-width: 230px;
    height: 160px;
    border-radius: 10px;
    margin: 10px 20px 10px 0;
  }
  
  header article .game1 .game_bx .card:nth-last-child(1) {
    margin-right: 0;
  }
  
  header article .game1 .game_bx .card .content {
    width: 100%;
    height: 25%;
    display: flex;
    justify-content: space-between;
    color: var(--color-2);
    margin-top: -5px;
    transition: 0.5s linear;
  }
  
  header article .game1 .game_bx .card .content .left {
    color: var(--color-2);
    transition: 0.5s linear;
  }
  
  header article .game1 .game_bx .card .content .left h5 {
    font-size: 12px;
    font-weight: 500;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  header article .game1 .game_bx .card .content .left p {
    font-size: 8px;
    font-weight: 500;
    width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--color-4);
  }
  
  header article .game1 .game_bx .card .content h6 {
    font-size: 10px;
    font-weight: 500;
    color: var(--color-4);
    margin-top: 5px;
    transition: 0.5s linear;
  }
  
  header article .game1 .btns {
    position: absolute;
    right: 3%;
    top: 0;
    display: flex;
    align-items: center;
    color: var(--color-4);
    transition: 0.5s linear;
  }
  
  header article .game1 .btns i {
    margin-left: 5px;
    cursor: pointer;
    transition: 0.5s linear;
  }
  
  header article .game1 .btns i:hover {
    color: var(--color-2);
  }
  
  header article .game2 {
    position: relative;
    width: 100%;
    height: 380px;
    padding: 0 30px;
    overflow: hidden;
  }
  
  header article .game2 h3 {
    color: var(--color-2);
    font-size: 14px;
    font-weight: 600;
    transition: 0.5s linear;
  }
  
  header article .game2 .games_bx {
    width: 100%;
    height: 350px;
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow-y: auto;
  }
  
  header article .game2 .games_bx::-webkit-scrollbar {
    width: 5px;
    border-radius: 20px;
    background: rgba(184, 184, 184, 0.2);
    visibility: hidden;
  }
  
  header article .game2 .games_bx::-webkit-scrollbar-thumb {
    border-radius: 20px;
    background: rgba(184, 184, 184, 0.7);
    visibility: hidden;
  }
  
  header article .game2 .games_bx:hover::-webkit-scrollbar {
    visibility: visible;
  }
  
  header article .game2 .games_bx:hover::-webkit-scrollbar-thumb {
    visibility: visible;
  }
  
  header article .game2 .games_bx .card {
    width: 100px;
    height: 170px;
    margin: 0 5px 11px 0;
  }
  
  header article .game2 .games_bx .card .content {
    width: 100%;
    height: 20%;
    overflow: hidden;
  }
  
  header article .game2 .games_bx .card .content h6 {
    width: 100%;
    color: var(--color-2);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    transition: 0.5s linear;
  }
  /* Ensure full height for body and html */
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: #1e2337;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Container for the entire app */
#app {
  width: 100%;
  height: 100%;
}

/* Styles for header and its child elements */
header {
  width: 85%;
  height: 95%;
  display: flex;
  box-shadow: 0 0 30px rgba(20, 19, 19, 1);
  border-radius: 10px;
  overflow: hidden;
}

/* Styles for aside section */
header aside {
  width: 15%;
  background: #663da6;
  padding: 1rem;
  box-sizing: border-box;
}

header aside h1 {
  color: #fff;
  font-size: 22px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
}

header aside ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

header aside ul li {
  margin-bottom: 1rem;
}

header aside ul li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}

header aside ul li a i {
  margin-right: 10px;
}

header aside ul li a:hover {
  color: #fff;
}

header aside ul .active_li a {
  color: #fff;
}

/* Styles for article section */
header article {
  width: 85%;
  background: var(--color-3);
  display: flex;
  flex-direction: column;
}

header article nav {
  width: 100%;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-1);
  height: 9%;
}

header article nav .search {
  display: flex;
  align-items: center;
  width: 40%;
  padding: 0.5rem;
  background: var(--color-3);
}

header article nav .search input {
  flex: 1;
  background: none;
  border: none;
  color: var(--color-2);
  outline: none;
}

header article nav .search input::placeholder {
  color: var(--color-4);
}

header article nav .right_bx {
  display: flex;
  align-items: center;
}

header article nav .right_bx i, 
header article nav .right_bx button {
  margin-left: 1rem;
}

header article .game1, 
header article .game2 {
  padding: 1rem;
}

header article .game1 h3,
header article .game2 h3 {
  color: var(--color-2);
  margin-bottom: 1rem;
}

header article .game1 .game_bx,
header article .game2 .games_bx {
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
}

header article .game1 .game_bx .card,
header article .game2 .games_bx .card {
  background: var(--color-3);
  border-radius: 10px;
  margin-right: 1rem;
  overflow: hidden;
  flex-shrink: 0;
}

html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  background: #1e2337;
  display: flex;
  align-items: center;
  justify-content: center;
}

#app {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

header {
  width: 85%;
  height: 95%;
  display: flex;
  box-shadow: 0 0 30px rgba(20, 19, 19, 1);
  border-radius: 10px;
  overflow: hidden;
  /* Centering the header */
  align-items: center;
  justify-content: center;
}

/* Adjusting aside and article to fit within the centered header */
header aside {
  width: 15%;
  background: #663da6;
  padding: 1rem;
  box-sizing: border-box;
}

header aside h1 {
  color: #fff;
  font-size: 22px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1rem;
}

header aside ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

header aside ul li {
  margin-bottom: 1rem;
}

header aside ul li a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}

header aside ul li a i {
  margin-right: 10px;
}

header aside ul li a:hover {
  color: #fff;
}

header aside ul .active_li a {
  color: #fff;
}

header article {
  width: 85%;
  background: var(--color-3);
  display: flex;
  flex-direction: column;
}

header article nav {
  width: 100%;
  padding: 0 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--color-1);
  height: 9%;
}

header article nav .search {
  display: flex;
  align-items: center;
  width: 40%;
  padding: 0.5rem;
  background: var(--color-3);
}

header article nav .search input {
  flex: 1;
  background: none;
  border: none;
  color: var(--color-2);
  outline: none;
}

header article nav .search input::placeholder {
  color: var(--color-4);
}

header article nav .right_bx {
  display: flex;
  align-items: center;
}

header article nav .right_bx i, 
header article nav .right_bx button {
  margin-left: 1rem;
}

header article .game1, 
header article .game2 {
  padding: 1rem;
}

header article .game1 h3,
header article .game2 h3 {
  color: var(--color-2);
  margin-bottom: 1rem;
}

header article .game1 .game_bx,
header article .game2 .games_bx {
  display: flex;
  overflow-x: auto;
  padding-bottom: 1rem;
}

header article .game1 .game_bx .card,
header article .game2 .games_bx .card {
  background: var(--color-3);
  border-radius: 10px;
  margin-right: 1rem;
  overflow: hidden;
  flex-shrink: 0;
}

header article .game1 .game_bx .card img,
header article .game2 .games_bx .card img {
  width: 100%;
  height: auto;
  display: block;
}

header article .game1 {
  position: relative;
  width: 100%;
  height: 200px;
  /* border: 1px solid #fff; */
  padding: 0px 30px;
  margin-top: 20px;
}

header article .game1 h3 {
  color: var(--color-2);
  font-size: 14px;
  font-weight: 600;
  transition: 0.5s linear;
}

header article .game1 .game_bx {
  width: 100%;
  height: 175px;
  /* border: 1px solid #fff; */
  display: flex;
  align-items: center;
  overflow: auto;
  scroll-behavior: smooth;
}

header article .game1 .game_bx::-webkit-scrollbar {
  display: none;
}

header article .game1 .game_bx .card {
  min-width: 230px;
  height: 160px;
  /* border: 1px solid #fff; */
  border-radius: 10px;
  margin-top: 10px;
  margin-right: 20px;
}

header article .game1 .game_bx .card:nth-last-child(1) {
  margin-right: 0px;
}

header article .game1 .game_bx .card img {
  width: 100%;
  height: 70%;
  border-radius: 5px;
}

header article .game1 .game_bx .card .content {
  width: 100%;
  height: 25%;
  /* border: 1px solid #fff; */
  display: flex;
  justify-content: space-between;
  color: var(--color-2);
  margin-top: -5px;
  transition: 0.5s linear;
}

header article .game1 .game_bx .card .content .left {
  color: var(--color-2);
  transition: 0.5s linear;
}

header article .game1 .game_bx .card .content .left h5 {
  font-size: 12px;
  font-weight: 500;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

header article .game1 .game_bx .card .content .left p {
  font-size: 8px;
  font-weight: 500;
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: var(--color-4);
}

header article .game1 .game_bx .card .content h6 {
  font-size: 10px;
  font-weight: 500;
  color: var(--color-4);
  margin-top: 5px;
  transition: 0.5s linear;
}

header article .game1 .btns {
  position: absolute;
  right: 3%;
  top: 0;
  display: flex;
  align-items: center;
  color: var(--color-4);
  transition: 0.5s linear;
}

header article .game1 .btns i {
  margin-left: 5px;
  cursor: pointer;
  transition: 0.5s linear;
}

header article .game1 .btns i:hover {
  color: var(--color-2);
}

header article .game2 {
  position: relative;
  width: 100%;
  height: 380px;
  /* border: 1px solid #fff; */
  padding: 0px 30px;
  overflow: hidden;
}

header article .game2 h3 {
  color: var(--color-2);
  font-size: 14px;
  font-weight: 600;
  transition: 0.5s linear;
}

header article .game2 .games_bx {
  width: 100%;
  height: 350px;
  margin-top: 8px;
  /* border: 1px solid #fff; */
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  overflow-y: auto;
}

header article .game2 .games_bx::-webkit-scrollbar {
  width: 5px;
  border-radius: 20px;
  background: rgb(184, 184, 184, 0.2);
  visibility: hidden;
}

header article .game2 .games_bx::-webkit-scrollbar-thumb {
  border-radius: 20px;
  background: rgb(184, 184, 184, 0.7);
  visibility: hidden;
}
header article .game2 .games_bx:hover::-webkit-scrollbar {
  visibility: visible;
}
header article .game2 .games_bx:hover::-webkit-scrollbar-thumb {
  visibility: visible;
}

header article .game2 .games_bx .card {
  width: 100px;
  height: 170px;
  /* border: 1px solid #fff; */
  margin: 0px 5px 11px 0px;
}

header article .game2 .games_bx .card img {
  width: 100%;
  height: 80%;
  border-radius: 10px;
}

header article .game2 .games_bx .card .content {
  width: 100%;
  height: 20%;
  overflow: hidden;
}
header article .game2 .games_bx .card .content h6 {
  width: 100%;
  color: var(--color-2);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  transition: 0.5s linear;
}
  </style>
  
  <header>
  <aside>
    <h1>Game <i class="bi bi-joystick"></i></h1>
    <ul>
      <li class="active_li">
        <a href="#"><i class="bi bi-archive-fill"></i> Browse</a>
      </li>
      <li>
        <a href="#"><i class="bi bi-clipboard-check-fill"></i> Channels</a>
      </li>
      <li>
        <a href="#"><i class="bi bi-people-fill"></i> Friends</a>
      </li>
      <li>
        <a href="#"><i class="bi bi-controller"></i> Delete Games</a>
      </li>
      <li>
        <a href="#/add"><i class="bi bi-bookmark-check-fill"></i> Add Games</a>
      </li>
    </ul>
  </aside>
  <article>
    <nav>
      <div class="search">
        <input type="text" placeholder="Search..." />
        <i class="bi bi-search"></i>
      </div>
      <div class="right_bx">
        <i class="bi bi-moon-fill" id="day_night"></i>
        <i class="bi bi-brightness-high-fill" id="day_night2"></i>
        <i class="bi bi-wifi" id="wifi"></i>
        <i class="bi bi-gear-fill"></i>
        <button id="active_battery"><i class="bi bi-battery-half" id="battery_icon"></i> <span id="battery_level">84%</span></button>
        <div class="user_data">
          <h6>userName</h6>
          <h5>uN</h5> <!--userName Abbreviation-->
          <i class="bi bi-caret-down-fill"></i>
          <div class="card">
            <img src="" /> <!--userName Pfp-->
            <h6>userName</h6>
            <p>gameTitle</p> <!--recent Review-->
            <img class="card_game_img" /> <!--corresponding gameImg-->
            <p class="logout" align="center"><a href="#/">Logout</a></p>
          </div>
        </div>
      </div>
    </nav>
    <!-- Game Box Start -->

    <div class="game2">
      <h3>Most Played</h3>
      <div class="games_bx">
        <section id="gamesContainer"></section>
      </div>
    </div>

  </article>
  </header>
  `;

  // Day/Night Mode Toggle
  let day_night = document.getElementById('day_night');
  let day_night2 = document.getElementById('day_night2');
  day_night2.style.display = 'none';

  day_night.addEventListener('click', () => {
    document.documentElement.style.setProperty('--color-1', 'rgb(184,184,184,.5)');
    document.documentElement.style.setProperty('--color-2', '#000');
    document.documentElement.style.setProperty('--color-3', '#fff');
    document.documentElement.style.setProperty('--color-4', 'rgb(0,0,0,.5)');
    document.documentElement.style.setProperty('--color-5', '#663da6');
    day_night.style.display = 'none';
    day_night2.style.display = 'unset';
  });

  day_night2.addEventListener('click', () => {
    document.documentElement.style.setProperty('--color-1', '#262b3f');
    document.documentElement.style.setProperty('--color-2', '#fff');
    document.documentElement.style.setProperty('--color-3', '#1e2337');
    document.documentElement.style.setProperty('--color-4', 'rgb(255,255,255,.5)');
    document.documentElement.style.setProperty('--color-5', 'greenyellow');
    day_night.style.display = 'unset';
    day_night2.style.display = 'none';
  });

  // Battery Status
  let active_battery = document.getElementById('active_battery');
  let battery_icon = document.getElementById('battery_icon');
  let battery_level = document.getElementById('battery_level');

  navigator.getBattery().then((battery) => {
    const battery_level_change = () => {
      battery_level.innerText = battery.level * 100 + '%';
    };

    setInterval(battery_level_change, 1000);
    battery_level_change();

    battery_icon.value = battery.charging;
    battery.addEventListener('chargingchange', () => {
      switch (battery.charging) {
        case true:
          battery_icon.classList.remove('bi-battery-half');
          battery_icon.classList.add('bi-battery-charging');
          active_battery.classList.add('active_battery');
          battery_icon.style.color = '#fff';
          break;
        case false:
          battery_icon.classList.add('bi-battery-half');
          battery_icon.classList.remove('bi-battery-charging');
          active_battery.classList.remove('active_battery');
          battery_icon.style.color = 'unset';
          break;
      }
    });
  });

  // Wi-Fi Status
  let wifi = document.getElementById('wifi');
  const wifi_change = () => {
    if (navigator.onLine) {
      wifi.style.color = 'var(--color-5)';
    } else {
      wifi.style.color = '';
    }
  };

  setInterval(wifi_change, 100);
  wifi_change();
  
  fetchGames();
}

export { loadHome };
