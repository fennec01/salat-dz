import { pwaInfo } from 'virtual:pwa-info'
import { registerSW } from 'virtual:pwa-register'
// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/main.css';

// Import Bootstrap JS and Popper.js
import 'bootstrap';
import { darkMode } from './components/darkMode';
import { salatManager } from './components/salatManager';
import { hourMode } from './components/hourMode';


darkMode();
salatManager();
hourMode();


//vite-pwa boilerplate code?
const date = __DATE__

console.log(pwaInfo)



registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log('onNeedRefresh message should not appear')
  },
  onOfflineReady() {
    console.log('onOfflineReady message should not appear')
  },
});