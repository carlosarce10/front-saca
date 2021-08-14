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
    <b-modal size="lg" ref="docentes-modal" hide-footer title="Registro">
      <div class="row">
        <div>
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
            <br />
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
                v-if="!$v.apellidoPaterno.required && $v.apellidoPaterno.$dirty"
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
                v-if="!$v.apellidoMaterno.required && $v.apellidoMaterno.$dirty"
              >
                Este campo no puede ir vacío
              </div>
            </div>
          </div>
          <br />
          <div class="row">
            <div class="col-4 centrar">
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
            <div class="col-3 centrar">
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
            <div class="col-3 centrar">
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
            <br />
          </div>
          <br />
          <div class="row"></div>
          <br />
          <hr />
        </div>
        <div>
          <b-button
            class="mt-2"
            variant="outline-success"
            style="margin: 5px; float: right"
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
                !$v.email.$invalid &&
                $v.email.$dirty &&
                !$v.password.$invalid &&
                $v.password.$dirty &&
                !$v.passwordRepeat.$invalid &&
                $v.passwordRepeat.$dirty
              )
            "
            >Ok
          </b-button>
          <b-button
            class="mt-2"
            variant="outline-danger"
            style="margin: 5px; float: right"
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
              <th scope="col">Correo electrónico</th>
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
                {{ usuario.email }}
              </td>
              <td>
                <b-button
                  variant="outline-primary"
                  @click="recuperarUser(usuario.idUsuario)"
                >
                  <b-icon icon="pencil-square" aria-hidden="true"></b-icon>
                </b-button>
                <b-button
                  variant="outline-danger"
                  @click="eliminar(usuario.idUsuario)"
                >
                  <b-icon icon="trash-fill" aria-hidden="true"></b-icon>
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
        <div
          class="alert alert-success"
          role="alert"
          v-if="usuarios.length === 0"
        >
          No hay usuarios registrados
        </div>
        <!-- Modal editar -->
        <b-modal size="lg" ref="docentes-modalEdit" hide-footer title="Editar">
          <div class="row">
            <div>
              <div class="row">
                <div class="col-3 centrar">
                  <h6 for="">Nombre</h6>
                  <b-form-input
                    id="nombreE"
                    type="text"
                    v-model="$v.nombreE.$model"
                    :class="status($v.nombreE)"
                    required
                  />
                  <div
                    class="error errorMsg"
                    v-if="!$v.nombreE.required && $v.nombreE.$dirty"
                  >
                    Este campo no puede ir vacío
                  </div>
                </div>
                <br />
                <div class="col-3 centrar">
                  <h6 for="">Apellidos Paterno</h6>
                  <b-form-input
                    id="apellidoAE"
                    type="text"
                    v-model="$v.apellidoPaternoE.$model"
                    :class="status($v.apellidoPaternoE)"
                    required
                  />
                  <div
                    class="error errorMsg"
                    v-if="
                      !$v.apellidoPaternoE.required &&
                        $v.apellidoPaternoE.$dirty
                    "
                  >
                    Este campo no puede ir vacío
                  </div>
                </div>
                <div class="col-3 centrar">
                  <h6 for="">Apellido Materno</h6>
                  <b-form-input
                    id="apellidoME"
                    type="text"
                    v-model="$v.apellidoMaternoE.$model"
                    :class="status($v.apellidoMaternoE)"
                    required
                  />
                  <div
                    class="error errorMsg"
                    v-if="
                      !$v.apellidoMaternoE.required &&
                        $v.apellidoMaternoE.$dirty
                    "
                  >
                    Este campo no puede ir vacío
                  </div>
                </div>
              </div>
              <br />
              <div class="row">
                <div class="col-4 centrar">
                  <h6 for="">Correo electrónico</h6>
                  <b-form-input
                    id="emailE"
                    type="text"
                    v-model="$v.emailE.$model"
                    :class="status($v.emailE)"
                    required
                  />
                  <div
                    class="error errorMsg"
                    v-if="!$v.emailE.required && $v.emailE.$dirty"
                  >
                    Este campo no puede ir vacío
                  </div>
                </div>
                <div class="col-3 centrar">
                  <h6 for="">Cotraseña</h6>
                  <b-form-input
                    id="pass1"
                    type="password"
                    v-model="$v.passwordE.$model"
                    :class="status($v.passwordE)"
                    required
                  />
                  <div
                    class="error errorMsg"
                    v-if="!$v.passwordE.required && $v.passwordE.$dirty"
                  >
                    Este campo no puede ir vacío
                  </div>
                </div>
                <br />
                <div class="col-3 centrar">
                  <h6 for="">Confirmar Contraseña</h6>
                  <b-form-input
                    id="pass2"
                    type="password"
                    v-model="$v.passwordRepeatE.$model"
                    :class="status($v.passwordRepeatE)"
                    required
                  />
                  <div
                    class="error errorMsg"
                    v-if="
                      !$v.passwordRepeatE.required && $v.passwordRepeatE.$dirty
                    "
                  >
                    Este campo no puede ir vacío
                  </div>
                  <div
                    class="error errorMsg"
                    v-if="
                      !$v.passwordRepeatE.sameAspassword &&
                        $v.passwordRepeatE.$dirty
                    "
                  >
                    La contraseña no coincide
                  </div>
                </div>
                <br />
              </div>
              <br />
              <hr />
            </div>
            <div>
              <b-button
                class="mt-2"
                variant="outline-success"
                style="margin: 5px; float: right"
                type="submit"
                @click="editar()"
                >Ok
              </b-button>
              <b-button
                class="mt-2"
                variant="outline-danger"
                style="margin: 5px; float: right"
                block
                @click="hideModalE"
                >Cerrar
              </b-button>
            </div>
          </div>
        </b-modal>
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
      email: "",
      password: "",
      passwordRepeat: "",
      usuario: {},
      usuarios: [],
      nombreE: "",
      apellidoPaternoE: "",
      apellidoMaternoE: "",
      emailE: "",
      passwordE: "",
      passwordRepeatE: "",
      usuarioE: {},
      idUsuarioE: "",
      roles: {},
    };
  },
  beforeMount() {
    this.getDocente();
  },
  methods: {
    mostrarModal() {
      this.$refs["docentes-modal"].show();
    },
    hideModal() {
      this.$refs["docentes-modal"].hide();
    },
    mostrarModalE() {
      this.$refs["docentes-modalEdit"].show();
    },
    hideModalE() {
      this.$refs["docentes-modalEdit"].hide();
    },
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
      this.hideModal();
    },
    getDocente() {
      console.log("entre al consulta docentes");
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
      console.log(this.usuarios);
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
      this.email = "";
      this.password = "";
      this.passwordRepeat = "";
    },
    recuperarUser(id) {
      console.log(id);
      api
        .doGet("cursos/docente/getOne/" + id)
        .then((response) => {
          (this.nombreE = response.data.nombre),
            (this.apellidoPaternoE = response.data.apellidoPaterno),
            (this.apellidoMaternoE = response.data.apellidoMaterno),
            (this.nicknameE = response.data.nickname),
            (this.emailE = response.data.email),
            (this.direccionE = response.data.direccion),
            (this.idUsuarioE = response.data.idUsuario),
            this.passwordE = response.data.password;
            this.passwordRepeatE = response.data.password;
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
        });
      this.mostrarModalE();
    },
    editar() {
      this.usuarioE = {
        idUsuario: this.idUsuarioE,
        nombre: this.nombreE,
        apellidoPaterno: this.apellidoPaternoE,
        apellidoMaterno: this.apellidoMaternoE,
        email: this.emailE,
        password: this.passwordE,
        direccion: "zapata",
      };
      api
        .doPut("cursos/docente/update", this.usuarioE)
        .then(() => {
          this.$swal({
            title: "Usuario modificado exitosamente!",
            icon: "success",
          });
          this.getDocente();
          this.onReset();
        })
        .catch((error) => {
          console.log(error);
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
        });
      this.hideModalE();
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

    nombreE: { required },
    apellidoPaternoE: { required },
    apellidoMaternoE: { required },
    emailE: { required },
    passwordE: { required },
    passwordRepeatE: { required, sameAspassword: sameAs("passwordE") },
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
