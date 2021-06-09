import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import InicioSesion from "../views/InicioSesion.vue";
import consultaCursos from "../views/consultaCursos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/InicioSesion",
    name: "InicioSesion",
    component: InicioSesion,
  },
  {
    path: "/consultaCursos",
    name: "consultaCursos",
    component: consultaCursos,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
