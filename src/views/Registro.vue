<template>
  <div class="fondo">
    <div><HeaderRegistro /></div>
    <div class="row">
      <div class="col-5 estilo">
        <b-card-group deck>
          <b-card>
            <template #header>
              <h4 style="color: #00ab84">Regístrate</h4>
            </template>
            <div class="row">
              <div class="col-3 centrar">
                <b-form-input
                  id="nombre"
                  type="text"
                  v-model="$v.nombre.$model"
                  :class="status($v.nombre)"
                  placeholder="Nombre(s)"
                  required
                />
                <div
                  class="error errorMsg"
                  v-if="!$v.nombre.required && $v.nombre.$dirty"
                >
                  Este campo no puede ir vacío
                </div>
              </div>
              <div class="col-3 centrar">
                <b-form-input
                  id="apellidoA"
                  type="text"
                  v-model="$v.apellidoPaterno.$model"
                  :class="status($v.apellidoPaterno)"
                  placeholder="Apellido paterno"
                  required
                />
                <div
                  class="error errorMsg"
                  v-if="
                    !$v.apellidoPaterno.required && $v.apellidoPaterno.$dirty
                  "
                >
                  Este campo no puede ir vacío
                </div>
              </div>
              <div class="col-3 centrar">
                <b-form-input
                  id="apellidoM"
                  type="text"
                  v-model="$v.apellidoMaterno.$model"
                  :class="status($v.apellidoMaterno)"
                  placeholder="Apellido materno"
                  required
                />
                <div
                  class="error errorMsg"
                  v-if="
                    !$v.apellidoMaterno.required && $v.apellidoMaterno.$dirty
                  "
                >
                  Este campo no puede ir vacío
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-5 centrar">
                <b-form-input
                  id="pass1"
                  type="password"
                  v-model="$v.password.$model"
                  :class="status($v.password)"
                  placeholder="Contraseña"
                  required
                />
                <div
                  class="error errorMsg"
                  v-if="!$v.password.required && $v.password.$dirty"
                >
                  Este campo no puede ir vacío
                </div>
              </div>
              <br />
              <div class="col-5 centrar">
                <b-form-input
                  id="pass2"
                  type="password"
                  v-model="$v.passwordRepeat.$model"
                  :class="status($v.passwordRepeat)"
                  placeholder="Confirmar contraseña"
                  required
                />
                <div
                  class="error errorMsg"
                  v-if="!$v.passwordRepeat.required && $v.passwordRepeat.$dirty"
                >
                  Este campo no puede ir vacío
                </div>
                <div
                  class="error errorMsg"
                  v-if="
                    !$v.passwordRepeat.sameAspassword &&
                    $v.passwordRepeat.$dirty
                  "
                >
                  La contraseña no coincide
                </div>
              </div>
            </div>
            <br />
            <div class="row">
              <div class="col-7" style="margin-left: 4%">
                <b-form-input
                  id="email"
                  type="text"
                  v-model="$v.email.$model"
                  :class="status($v.email)"
                  placeholder="Correo electrónico"
                  required
                />
                <div
                  class="error errorMsg"
                  v-if="!$v.email.required && $v.email.$dirty"
                >
                  Este campo no puede ir vacío
                </div>
              </div>
            </div>
            <hr />
            <template>
              <b-button
                style="float: right"
                variant="outline-success"
                @click="registrar()"
                :disabled="
                  !(
                    !$v.nombre.$invalid &&
                    $v.nombre.$dirty &&
                    !$v.apellidoPaterno.$invalid &&
                    $v.apellidoPaterno.$dirty &&
                    !$v.apellidoMaterno.$invalid &&
                    $v.apellidoMaterno.$dirty &&
                    !$v.email.$invalid &&
                    $v.email.$dirty &&
                    !$v.password.$invalid &&
                    $v.password.$dirty &&
                    !$v.passwordRepeat.$invalid &&
                    $v.passwordRepeat.$dirty
                  )
                "
                >Registrar</b-button
              >
            </template>
          </b-card>
        </b-card-group>
      </div>
      <Footer class="fixed-bottom" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Footer from "@/components/Footer.vue";
import HeaderRegistro from "@/components/HeaderRegistro.vue";
import VueRouter from "vue-router";
import api from "../util/api";
import { required, sameAs } from "vuelidate/lib/validators";

Vue.use(VueRouter);
export default {
  components: {
    Footer,
    HeaderRegistro,
  },
  data() {
    return {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      email: "",
      password: "",
      passwordRepeat: "",
      direccion:"",
      usuario: {},
    };
  },
  methods: {
    registrar() {
      this.usuario = {
        nombre: this.nombre,
        apellidoPaterno: this.apellidoPaterno,
        apellidoMaterno: this.apellidoMaterno,
        email: this.email,
        password: this.password,
        direccion: "zapata",
      };
      api
        .doPost("auth/register", this.usuario)
        .then(() => {
          this.$swal({
            title: "El usuario se registro exitosamente",
            icon: "success",
          });
          this.onReset();
          this.$router.push("/");
        })
        .catch((error) => {
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
    onReset() {
      this.nombre = "";
      this.apellidoPaterno = "";
      this.apellidoMaterno = "";
      this.email = "";
      this.password = "";
      this.passwordRepeat = "";
    },
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
  },
  validations: {
    nombre: { required },
    apellidoPaterno: { required },
    apellidoMaterno: { required },
    email: { required },
    password: { required },
    passwordRepeat: { required, sameAspassword: sameAs("password") },
  },
};
</script>

<style scoped>
.estilo {
  margin-left: auto;
  margin-right: auto;
  margin-top: 3%;
}
.centrar {
  margin-left: auto;
  margin-right: auto;
}
</style>
