import Vue from "vue";
import VueRouter from "vue-router";
/*----------------------------import components----------------------------------*/
const signIn = () =>
  import(/* webpackChunkName: "sign-in" */ "@/views/signIn.vue");
const signUp = () =>
  import(/* webpackChunkName: "sign-up" */ "@/views/signUp.vue");
const defaultLayout = () =>
  import(/* webpackChunkName: "defaultLayout" */ "@/layouts/defaultLayout.vue");
const authLayout = () =>
  import(/* webpackChunkName: "authLayout" */ "@/layouts/authLayout.vue");
const categories = () =>
  import(/* webpackChunkName: "categories" */ "@/views/categories.vue");
const products = () =>
  import(/* webpackChunkName: "products" */ "@/views/products.vue");
const users = () => import(/* webpackChunkName: "users" */ "@/views/users.vue");

import auth from '@/auth'

Vue.use(VueRouter);
const routes = [
  {
    path: "/auth",
    component: authLayout,
    children: [
      {
        path: "sign-up",
        name: "signUp",
        component: signUp,
      },
      {
        path: "sign-in",
        name: "signIn",
        component: signIn,
      },
    ],
  },
  {
    path: "/",
    component: defaultLayout,
    beforeEnter: (to, from, next) => {
      if(auth())
      next()
      else
      next({name:'signIn'})
    },
    children: [
      {
        path: "",
        name:'categories',
        // which is lazy-loaded when the route is visited.
        component: categories,
      },
      {
        path: "/products",
        name: "products",
        // which is lazy-loaded when the route is visited.
        component: products,
      },
      {
        path: "/users",
        name: "users",
        // which is lazy-loaded when the route is visited.
        component: users,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
