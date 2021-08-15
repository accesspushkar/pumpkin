import { createRouter, createWebHashHistory } from 'vue-router';
import Login from './views/Login.vue';
import Home from './views/Home.vue';
import Dashboard from './views/Dashboard.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: Home,
    props: true,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard,
    props: true,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
