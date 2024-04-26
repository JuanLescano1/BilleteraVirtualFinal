import { createRouter, createWebHistory } from "vue-router";
import InicioSesion from "../components/InicioSesion.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: InicioSesion,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/usuario",
    name: "usuario",
    component: () => import("../views/VistaUsuario.vue"),
  },
  {
    path: "/crypto",
    name: "crypto",
    component: () => import("../views/CryptosView.vue"),
  },
  {
    path: "/detalles/:moneda",
    name: "detalles",
    component: () => import("../views/DetallesView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
