<template>
  <div class="fondo">
    <div><HeaderAdmin /></div>
    <div class="row" style="margin-top: 2%">
      <div class="offset-8 col-3">
        <div class="row px-2">
          <!-- Boton modal -->
          <div id="modal" class="col-1 centrar">
            <b-button id="show-btn" @click="showModal" variant="outline-success"
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
                  placeholder="  Buscar oferta..."
                  aria-label="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <b-modal ref="my-modal" hide-footer title="Registro">
      <div>
        <b-form>
          <b-form-group id="input-group-1" style="padding: 5px">
            <b-form-input
              id="titulo"
              v-model="$v.titulo.$model"
              :class="status($v.titulo)"
              type="text"
              placeholder="Titulo"
              required
            ></b-form-input>
          </b-form-group>
          <div
            class="error errorMsg"
            v-if="!$v.titulo.required && $v.titulo.dirty"
          >
            Este campo no puede ir vacío
          </div>
          <b-form-group id="input-group-2" style="padding: 5px">
            <b-form-textarea
              id="descripcion"
              v-model="$v.descripcion.$model"
              :class="status($v.descripcion)"
              placeholder="Ingrese la descripcion"
              required
            ></b-form-textarea>
          </b-form-group>
          <div
            class="error errorMsg"
            v-if="!$v.descripcion.required && $v.descripcion.dirty"
          >
            Este campo no puede ir vacío
          </div>

          <b-form-group id="input-group-3" style="padding: 5px">
            <b-form-textarea
              id="requisitos"
              v-model="$v.requisitos.$model"
              :class="status($v.requisitos)"
              placeholder="Ingrese los requisitos"
              required
            ></b-form-textarea>
          </b-form-group>
          <div
            class="error errorMsg"
            v-if="!$v.requisitos.required && $v.requisitos.dirty"
          >
            Este campo no puede ir vacío
          </div>

          <b-form-group id="input-group-4" style="padding: 5px">
            <b-form-input
              id="duracion"
              v-model="$v.duracion.$model"
              :class="status($v.duracion)"
              placeholder="Ingrese la duración"
              required
            ></b-form-input>
          </b-form-group>
          <div
            class="error errorMsg"
            v-if="!$v.duracion.required && $v.duracion.$dirty"
          >
            Este campo no puede ir vacío
          </div>

          <b-form-group id="input-group-5" style="padding: 5px">
            <b-form-textarea
              id="temario"
              v-model="$v.temario.$model"
              :class="status($v.temario)"
              placeholder="Ingrese el temario"
              required
            ></b-form-textarea>
            <div
              class="error errorMsg"
              v-if="!$v.temario.required && $v.temario.dirty"
            >
              Este campo no puede ir vacío
            </div>
          </b-form-group>
        </b-form>
        <div>
          <b-button
            class="mt-2"
            variant="outline-success"
            style="margin: 5px; float: right"
            type="submit"
            @click="registrar"
            :disabled="
              !(
                !$v.titulo.$invalid &&
                $v.titulo.$dirty &&
                !$v.descripcion.$invalid &&
                $v.descripcion.$dirty &&
                !$v.requisitos.$invalid &&
                $v.requisitos.$dirty &&
                !$v.duracion.$invalid &&
                $v.duracion.$dirty &&
                !$v.temario.$invalid &&
                $v.temario.$dirty
              )
            "
            >Guardar
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
    <br />
    <div class="row" style="margin-top: 2%">
      <div class="col-10 centrar" style="background-color: #f8f8f8">
        <table class="table table-borderless table-hover">
          <thead class="table-success">
            <tr style="color: white">
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Descripción</th>
              <th scope="col">Requisitos</th>
              <th scope="col">Temario</th>
              <th scope="col">Duración</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(curso, item) in listCursos" :key="curso.idCurso">
              <th>{{ item + 1 }}</th>
              <td>{{ curso.titulo }}</td>
              <td>{{ curso.descripcion }}</td>
              <td>{{ curso.requisitos }}</td>
              <td>{{ curso.temario }}</td>
              <td>{{ curso.duracion }}</td>
              <td>
                <button @click="eliminar(curso.idCurso)" class="btn ">
                  <b-icon icon="trash-fill" aria-hidden="true" variant="danger"></b-icon>
                </button>
                <b-button
                  id="show-btn"
                  @click="recuperarCurso(curso.idCurso)"
                  variant="outline-success"
                  ><b-icon icon="pencil-square" aria-hidden="true" variant="success"></b-icon></b-button
                >
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Modal editar -->
        <b-modal ref="my-modalE" hide-footer title="Editar">
          <div>
            <b-form>
              <b-form-group id="input-group-1" style="padding: 5px">
                <b-form-input
                  id="tituloE"
                  v-model="$v.tituloE.$model"
                  :class="status($v.tituloE)"
                  type="text"
                  placeholder="Titulo"
                  required
                ></b-form-input>
              </b-form-group>
              <div
                class="error errorMsg"
                v-if="!$v.tituloE.required && $v.tituloE.dirty"
              >
                Este campo no puede ir vacío
              </div>
              <b-form-group id="input-group-2" style="padding: 5px">
                <b-form-textarea
                  id="descripcionE"
                  v-model="$v.descripcionE.$model"
                  :class="status($v.descripcionE)"
                  placeholder="Ingrese la descripcion"
                  required
                ></b-form-textarea>
              </b-form-group>
              <div
                class="error errorMsg"
                v-if="!$v.descripcionE.required && $v.descripcionE.dirty"
              >
                Este campo no puede ir vacío
              </div>

              <b-form-group id="input-group-3" style="padding: 5px">
                <b-form-textarea
                  id="requisitosE"
                  v-model="$v.requisitosE.$model"
                  :class="status($v.requisitosE)"
                  placeholder="Ingrese los requisitos"
                  required
                ></b-form-textarea>
              </b-form-group>
              <div
                class="error errorMsg"
                v-if="!$v.requisitosE.required && $v.requisitosE.dirty"
              >
                Este campo no puede ir vacío
              </div>

              <b-form-group id="input-group-4" style="padding: 5px">
                <b-form-input
                  id="duracionE"
                  v-model="$v.duracionE.$model"
                  :class="status($v.duracionE)"
                  placeholder="Ingrese la duración"
                  required
                ></b-form-input>
              </b-form-group>
              <div
                class="error errorMsg"
                v-if="!$v.duracionE.required && $v.duracionE.$dirty"
              >
                Este campo no puede ir vacío
              </div>

              <b-form-group id="input-group-5" style="padding: 5px">
                <b-form-textarea
                  id="temarioE"
                  v-model="$v.temarioE.$model"
                  :class="status($v.temarioE)"
                  placeholder="Ingrese el temario"
                  required
                ></b-form-textarea>
                <div
                  class="error errorMsg"
                  v-if="!$v.temarioE.required && $v.temarioE.dirty"
                >
                  Este campo no puede ir vacío
                </div>
              </b-form-group>
            </b-form>
            <div>
              <b-button
                class="mt-2"
                variant="outline-success"
                style="margin: 5px; float: right"
                type="submit"
                @click="editar"
                
                >Guardar
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

    <div><Footer class="fixed-bottom" /></div>
  </div>
</template>
<script>
import HeaderAdmin from "@/components/HeaderAdmin.vue";
import Footer from "@/components/Footer.vue";
import { required } from "vuelidate/lib/validators";
import api from "../../util/api";

export default {
  name: "Home",
  components: {
    HeaderAdmin,
    Footer,
  },
  data() {
    return {
      listCursos: [],
      curso: {},
      titulo: "",
      descripcion: "",
      requisitos: "",
      duracion: "",
      temario: "",

      tituloE: "",
      descripcionE: "",
      requisitosE: "",
      duracionE: "",
      temarioE: "",
      idCursoEdit: "",
      cursoEdit:""
    };
  },
  beforeMount() {
    this.getCursos();
  },
  methods: {
    getCursos() {
      api
        .doGet("cursos/curso/getAll")
        .then((response) => (this.listCursos = response.data))
        .catch((error) => {
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              icon: "error",
            });
          }
        })
        .finally(() => (this.loading = false));
    },
    showModal() {      
      this.$refs["my-modal"].show();      
    },
     showModalE() {     
      this.$refs["my-modalE"].show();
                 
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
     hideModalE() {
      this.$refs["my-modalE"].hide();
    },
    registrar() {
      this.curso = {
        titulo: this.titulo,
        descripcion: this.descripcion,
        requisitos: this.requisitos,
        duracion: this.duracion,
        temario: this.temario,
      };
      api
        .doPost("cursos/curso/save", this.curso)
        .then(() => {
          this.$swal({
            title: "Curso registrado exitosamente!",
            icon: "success",
          });
          this.getCursos();
          (this.titulo = ""),
            (this.descripcion = ""),
            (this.requisitos = ""),
            (this.duracion = ""),
            (this.temario = "");
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
                errorResponse.message,
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              icon: "error",
            });
          }
        })
        .finally(() => (this.loading = false));
        this.hideModal();
    },
    eliminar(id) {
      console.log(id);
      this.$swal({
        title: "¿Estás seguro de eliminar este curso?",
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
            .doDelete("cursos/curso/delete/" + id)
            .then(() => {
              this.$swal({
                title: "!Curso eliminado exitosamente!",
                icon: "success",
              });
              this.getCursos();
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
                  html: "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
                  icon: "error",
                });
              }
            })
            .finally(() => (this.loading = false));
        }
      });
    },
    recuperarCurso(idCursoE){
      console.log(idCursoE);
      api
        .doGet("cursos/curso/getOne/" + idCursoE)
        .then((response) => {
          this.tituloE = response.data.titulo;
          this.descripcionE = response.data.descripcion;
          this.requisitosE = response.data.requisitos;
          this.duracionE = response.data.duracion;
          this.temarioE = response.data.temario;
          this.idCursoEdit = response.data.idCurso
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
      this.showModalE();
    },
    editar() {
      this.cursoEdit = {
        idCurso: this.idCursoEdit,
        titulo: this.tituloE,
        descripcion: this.descripcionE,
        requisitos: this.requisitosE,
        temario: this.temarioE,
        duracion: this.duracionE
      }
      api
        .doPut("cursos/curso/update", this.cursoEdit)
        .then(() => {
          this.$swal({
            title: "Curso modificado exitosamente!",
            icon: "success",
          });
          this.getCursos();
          this.cursoEdit.id = 0;
          this.tituloE = "",
          this.descripcionE = "",
          this.requisitosE = "",
          this.temarioE = "",
          this.duracionE = ""
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
    titulo: {
      required,
    },
    descripcion: {
      required,
    },
    requisitos: {
      required,
    },
    duracion: {
      required,
    },
    temario: {
      required,
    },
    tituloE: {
      required,
    },
    descripcionE: {
      required,
    },
    requisitosE: {
      required,
    },
    duracionE: {
      required,
    },
    temarioE: {
      required,
    },
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