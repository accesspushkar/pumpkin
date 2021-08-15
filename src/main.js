import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import * as bootstrap from 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css"; 

const app = createApp(App);

app.use(router);
app.use(bootstrap);
app.use(Toast, {
  position: 'top-center',
  timeout: 5000,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: false,
  hideProgressBar: true,
  closeButton: false,
  icon: false,
});

app.mount('#app');
