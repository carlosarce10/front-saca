import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Registro from "../views/Registro.vue";
import InicioSesion from "../views/InicioSesion.vue";
import Admin from "../views/Admin/InicioAdmin.vue";
import Docente from "../views/Docente/InicioDocente.vue";
import Estudiante from "../views/Estudiante/InicioEstudiante.vue";
import consultaCursos from "../views/consultaCursos.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/registro",
    name: "Registro",
    component: Registro,
  },
  {
    path: "/inicioSesion",
    name: "InicioSesion",
    component: InicioSesion,
  },
  {
    path: "/consultaCursos",
    name: "consultaCursos",
    component: consultaCursos,
  },
  {
    path: "/administrador/inicio",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/docente/inicio",
    name: "Docente",
    component: Docente,
  },
  {
    path: "/estudiante/inicio",
    name: "Estudiante",
    component: Estudiante,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
