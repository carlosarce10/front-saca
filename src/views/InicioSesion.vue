<template>
  <div class="row fondo">
    <div class="offset-5 col">
      <img src="../assets/Logo-utez.png" class="logo" />
    </div>
    <div class="offset-5 col-2 sesion ">
      <p class="fs-4 letter letra">Login</p>
      <b-form>
        <div class="col-11 mx-auto form-group">
          <b-icon icon="person-circle" class="form-control-icon"></b-icon>
          <b-form-input
            class="form-control"
            id="usuario"
            v-model="$v.nickname.$model"
            :class="status($v.nickname)"
            type="text"
            placeholder="Usuario"
            required
            style="margin-top: 5%"
          />
        </div>
        <div class="col-11 mx-auto form-group">
          <b-icon icon="lock-fill" class="form-control-icon"></b-icon>
          <b-form-input
            id="contrasenia"
            v-model="$v.password.$model"
            :class="status($v.password)"
            type="password"
            placeholder="Contraseña"
            required
            style="margin-top: 10%"
          />
        </div>
      </b-form>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button
          type="button"
          style="margin-top: 30%"
          class="btn btn-outline-success"
          @click="authenticate()"
          :disabled="
            !(
              !$v.nickname.$invalid &&
              $v.nickname.$dirty &&
              !$v.password.$invalid &&
              $v.password.$dirty
            )
          "
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
import { required } from "vuelidate/lib/validators";

Vue.use(VueRouter);
export default {
  data() {
    return {
      nickname: "",
      password: "",
      user: {},
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
      this.user = {
        nickname: this.nickname,
        password: this.password,
      };
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
        .catch((error) => {
          console.log("->>>",error)
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Ha ocurrido un error en el servidor!",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message +
                "<br>Para más información contacte a su operador.</span>",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Ha ocurrido un error en el servidor!",
              html:
                "<span style='font-size:14pt'>Para más información contacte a su operador.</span>",
              icon: "error",
            });
          }
        });
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
  },
  validations: {
    nickname: {
      required,
    },
    password: {
      required,
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
  align-content: center;
  flex: wrap;
}
</style>
