import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Registro from "../views/Registro.vue";
import InicioSesion from "../views/InicioSesion.vue";
import Admin from "../views/Admin/InicioAdmin.vue";
import ConsultaCursos from "../views/Admin/consultaCursos.vue";
import Docentes from "../views/Admin/docentes.vue";
import Ofertas from "../views/Admin/Ofertas.vue";
import Docente from "../views/Docente/InicioDocente.vue";
import Estudiante from "../views/Estudiante/InicioEstudiante.vue";
import NotFound from "../views/NotFound.vue";

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
    path: "/administrador/inicio",
    name: "Admin",
    component: Admin,
    meta: { roles: ["ROLE_ADMIN"] },
  },
  {
    path: "/administrador/cursos",
    name: "consultaCursos",
    component: ConsultaCursos,
    meta: { roles: ["ROLE_ADMIN"] },
  },
  {
    path: "/administrador/docentes",
    name: "docentes",
    component: Docentes,
    meta: { roles: ["ROLE_ADMIN"] },
  },
  {
    path: "/administrador/ofertas",
    name: "ofertas",
    component: Ofertas,
    meta: { roles: ["ROLE_ADMIN"] },
  },
  {
    path: "/estudiante/inicio",
    name: "Estudiante",
    component: Estudiante,
    meta: { roles: ["ROLE_ESTUDIANTE"] },
  },
  {
    path: "/docente/inicio",
    name: "Docente",
    component: Docente,
    meta: { roles: ["ROLE_DOCENTE"] },
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  let rol = localStorage.getItem("authority");
  let hasPermission = false;
  if (!to.meta.roles) return next();
  to.meta.roles.forEach((element) => {
    if (element == rol) {
      hasPermission = true;
    }
  });

  if (hasPermission) {
    next();
  } else {
    next("/inicioSesion");
  }
});

export default router;
