import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home/Home.vue';
import Store from '../views/Store/Store.vue';

Vue.use(VueRouter);
  
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/store/:storeName',
    name: 'Store',
    component: Store
  }
]

const router = new VueRouter({
  routes
});

export default router;
