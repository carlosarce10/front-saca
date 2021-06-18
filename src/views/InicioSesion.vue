<template>
  <div class="row fondo">
    <div class="offset-5 col">
      <img src="../assets/Logo-utez.png" class="logo" />
    </div>
    <div class="offset-5 col-2 sesion">
      <p class="fs-4 letter letra">Login</p>
      <b-form class="d-grid gap-2 col-11 mx-auto">
        <b-form-input
          id="usuario"
          v-model="user.nickname"
          type="text"
          placeholder="Usuario"
          required
          style="margin-top: 5%"
        />
        <b-form-input
          id="contrasenia"
          v-model="user.password"
          type="password"
          placeholder="Contraseña"
          required
          style="margin-top: 10%"
        />
      </b-form>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button
          type="button"
          style="margin-top: 30%"
          class="btn btn-outline-success"
          @click="authenticate()"
        >
          GO
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import api from "../util/api";

Vue.use(VueRouter);
export default {
  data() {
    return {
      user: {
        nickname: "",
        password: "",
      },
    };
  },
  beforeMount() {
    let token = localStorage.getItem("token");
    if (token !== null) {
      let auth = localStorage.getItem("authority");
      if ((auth !== null) & "ROLE_ADMIN") {
        this.$$router.push("/administrador/inicio");
      }
      if ((auth !== null) & "ROLE_DOCENTE") {
        this.$$router.push("/docente/inicio");
      }
      if ((auth !== null) & "ROLE_ESTUDIANTE") {
        this.$$router.push("/estudiante/inicio");
      }
    }
  },
  methods: {
    authenticate() {
      console.log(this.user);
      api
        .doPost("auth/login", this.user)
        .then((response) => {
          console.log(response);
          if (response.data.token !== null || response.data.token !== "") {
            let authority = response.data.authorities[1].authority;
            let nickname = response.data.username;
            let token = response.data.token;

            console.log(authority + " " + nickname + " " + token);

            localStorage.setItem("authority", authority);
            localStorage.setItem("username", nickname);
            localStorage.setItem("token", token);

            if (authority == "ROLE_ADMIN") {
              this.$router.push("/administrador/inicio");
            } else if (authority == "ROLE_DOCENTE") {
              this.$router.push("/docente/inicio");
            } else if (authority == "ROLE_ESTUDIANTE") {
              this.$router.push("/estudiante/inicio");
            }
          }
        })
    },
  },
};
</script>

<style scoped>
.logo {
  width: 230px;
  height: 110px;
  margin-left: 20px;
}
.sesion {
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding-bottom: 3%;
  margin-top: 1%;
}
.letra {
  margin-top: 5%;
  margin-left: 5%;
}
.row {
  --bs-gutter-x: 0rem !important;
  align-content: center;
  flex: wrap;
}
</style>
