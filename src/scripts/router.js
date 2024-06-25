// Importing page load functions
import { loadLogin } from './login.js';
import { loadRegister } from './register.js';
import { loadHome } from './home.js';
import { loadAddGame } from './add-game.js';
import { loadGameDetails } from './details.js';

// Routes definition
const routes = {
  '/': loadLogin,
  '/register': loadRegister,
  '/home': loadHome,
  '/add': loadAddGame,
  '/details': loadGameDetails
};

// Router function to handle hash changes
function router() {
  const url = window.location.hash.slice(1) || '/';
  const [path, params] = url.split('?');
  const route = routes[path];
  
  if (route) {
    const queryParams = params?.split('&').reduce((acc, current) => {
      const [key, value] = current.split('=');
      acc[key] = value;
      return acc;
    }, {});
    route(queryParams);  // Pass queryParams to the route handler
  } else {
    routes['/']();  // Default to login if route is not found
  }
}

// Initialize router on window load and hash changes
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

export { router };
