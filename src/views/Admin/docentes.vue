<template>
  <div class="fondo">
    <div><HeaderAdmin /></div>
    <div class="row" style="margin-top: 2%">
      <div class="offset-8 col-3">
        <div class="row px-2">
          <!-- Boton modal -->
          <div id="modal" class="col-1 centrar">
            <b-button
              id="show-btn"
              @click="mostrarModal"
              variant="outline-success"
              ><b-icon icon="clipboard-plus"
            /></b-button>
          </div>
          <!-- div de busqueda -->
          <div class="col-9 centrar">
            <form>
              <div class="form-group">
                <b-icon
                  style="margin-left: 20px"
                  icon="search"
                  class="form-control-icon"
                ></b-icon>
                <input
                  class="buscador form-control"
                  placeholder="  Buscar docente..."
                  aria-label="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- form del modal -->
    <b-modal ref="docentes-modal" hide-footer title="Registro">
      <div class="row">
        <div>
          <div class="row">
            <div class="col-5 centrar">
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
            <br />
            <div class="col-5 centrar">
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
                v-if="!$v.apellidoPaterno.required && $v.apellidoPaterno.$dirty"
              >
                Este campo no puede ir vacío
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-5 centrar">
              <b-form-input
                id="apellidoM"
                type="text"
                v-model="$v.apellidoMaterno.$model"
                :class="status($v.apellidoMaterno)"
                placeholder="Apellido Materno"
                required
              />
              <div
                class="error errorMsg"
                v-if="!$v.apellidoMaterno.required && $v.apellidoMaterno.$dirty"
              >
                Este campo no puede ir vacío
              </div>
            </div>
            <br />
            <div class="col-5 centrar">
              <b-form-input
                id="nickname"
                type="text"
                v-model="$v.nickname.$model"
                :class="status($v.nickname)"
                placeholder="Nickname"
                required
              />
              <div
                class="error errorMsg"
                v-if="!$v.nickname.required && $v.nickname.$dirty"
              >
                Este campo no puede ir vacío
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-11 centrar">
              <b-form-input
                id="email"
                type="text"
                v-model="$v.email.$model"
                :class="status($v.email)"
                placeholder="Correo"
                required
              />
              <div
                class="error errorMsg"
                v-if="!$v.email.required && $v.email.$dirty"
              >
                Este campo no puede ir vacío
              </div>
            </div>
            <br />
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
                placeholder="Confirmar contrseña"
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
                  !$v.passwordRepeat.sameAspassword && $v.passwordRepeat.$dirty
                "
              >
                La contraseña no coincide
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-11 centrar">
              <b-form-input
                id="direccion"
                type="text"
                v-model="$v.direccion.$model"
                :class="status($v.direccion)"
                placeholder="Dirección"
                required
              />
              <div
                class="error errorMsg"
                v-if="!$v.direccion.required && $v.direccion.$dirty"
              >
                Este campo no puede ir vacío
              </div>
            </div>
            <br />
          </div>
          <hr />
        </div>
        <div>
          <b-button
            class="mt-2"
            variant="outline-success"
            style="margin: 5px"
            type="submit"
            @click="registrar()"
            :disabled="
              !(
                !$v.nombre.$invalid &&
                $v.nombre.$dirty &&
                !$v.apellidoPaterno.$invalid &&
                $v.apellidoPaterno.$dirty &&
                !$v.apellidoMaterno.$invalid &&
                $v.apellidoMaterno.$dirty &&
                !$v.nickname.$invalid &&
                $v.nickname.$dirty &&
                !$v.email.$invalid &&
                $v.email.$dirty &&
                !$v.password.$invalid &&
                $v.password.$dirty &&
                !$v.direccion.$invalid &&
                $v.direccion.$dirty &&
                !$v.passwordRepeat.$invalid &&
                $v.passwordRepeat.$dirty
              )
            "
            >Ok
          </b-button>
          <b-button
            class="mt-2"
            variant="outline-danger"
            style="margin: 5px"
            block
            @click="hideModal"
            >Cerrar
          </b-button>
        </div>
      </div>
    </b-modal>

    <!-- Tabla -->
    <div class="row" style="margin-top: 2%">
      <div class="col-10 centrar" style="background-color: #f8f8f8">
        <table class="table table-borderless table-hover">
          <thead class="table-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre(s)</th>
              <th scope="col">Apellido Paterno</th>
              <th scope="col">Apellido Materno</th>
              <th scope="col">Nickname</th>
              <th scope="col">Correo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, item) in usuarios" :key="usuario.id">
              <th>
                {{ item + 1 }}
              </th>
              <td>
                {{ usuario.nombre }}
              </td>
              <td>
                {{ usuario.apellidoPaterno }}
              </td>
              <td>
                {{ usuario.apellidoMaterno }}
              </td>
              <td>
                {{ usuario.nickname }}
              </td>
              <td>
                {{ usuario.email }}
              </td>
              <td>
                <button
                  class="btn btn-danger"
                  @click="eliminar(usuario.idUsuario)"
                >
                  eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Footer class="fixed-bottom" />
  </div>
</template>

<script>
import HeaderAdmin from "@/components/HeaderAdmin.vue";
import Footer from "@/components/Footer.vue";
import api from "../../util/api";
import { required, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Home",
  components: {
    HeaderAdmin,
    Footer,
  },
  data() {
    return {
      nombre: "",
      apellidoPaterno: "",
      apellidoMaterno: "",
      nickname: "",
      email: "",
      password: "",
      passwordRepeat: "",
      direccion: "",
      usuario: {},
      usuarios: [],
    };
  },
  beforeMount() {
    this.getDocente();
  },
  methods: {
    mostrar() {
      alert("Hola bbs");
    },
    mostrarModal() {
      this.$refs["docentes-modal"].show();
    },
    hideModal() {
      this.$refs["docentes-modal"].hide();
    },
    registrar() {
      this.usuario = {
        nombre: this.nombre,
        apellidoPaterno: this.apellidoPaterno,
        apellidoMaterno: this.apellidoMaterno,
        nickname: this.nickname,
        email: this.email,
        password: this.password,
        direccion: this.direccion,
      };
      api
        .doPost("cursos/docente/save", this.usuario)
        .then(() => {
          this.$swal({
            title: "El usuario se registro exitosamente",
            icon: "success",
          });
          this.onReset();
          this.getDocente();
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
    getDocente() {
      api
        .doGet("cursos/docente/getAll")
        .then((response) => (this.usuarios = response.data))
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
    eliminar(id) {
      this.$swal({
        title: "¿Estás seguro de eliminar este docente?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#64b5f6",
        cancelButtonColor: "#ff7674",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doDelete("cursos/docente/delete/" + id)
            .then(() => {
              this.$swal({
                title: "!Curso eliminado exitosamente!",
                icon: "success",
              });
              this.getDocente();
            })
            .catch((error) => {
              let errorResponse = error.response.data;
              if (errorResponse.errorExists) {
                this.$swal({
                  title: "Oops! Ha ocurrido un error en el servidor.",
                  html:
                    "<span style='font-size:14pt'><b>" +
                    errorResponse.code +
                    "</b> " +
                    errorResponse.message +
                    "<br>Contacte a su operador para más detalles.</span>",
                  icon: "error",
                });
              } else {
                this.$swal({
                  title: "Oops! Ha ocurrido un error en el servidor.",
                  html:
                    "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
                  icon: "error",
                });
              }
            })
            .finally(() => (this.loading = false));
        }
      });
    },
    onReset() {
      this.nombre = "";
      this.apellidoPaterno = "";
      this.apellidoMaterno = "";
      this.nickname = "";
      this.email = "";
      this.password = "";
      this.passwordRepeat = "";
      this.direccion = "";
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
    nickname: { required },
    email: { required },
    password: { required },
    passwordRepeat: { required, sameAspassword: sameAs("password") },
    direccion: { required },
  },
};
</script>

<style scoped>
.buscador {
  border: 1px solid #00ab84;
}
.centrar {
  margin-left: auto;
  margin-right: auto;
}
</style>
