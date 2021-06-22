<template>
  <div class="row fondo">
    <div class="home">
      <HeaderInicio />
      <div class="container">
        <div class="row justify-content-lg-center">
          <div class="col-md-auto">
            <h1>Consulta de Cursos</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-8" id="modal">
          <b-button id="show-btn" @click="showModal">Registrar Curso</b-button>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-4">
          <b-form>
            <div class="buscador">
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Buscar..."
              ></b-form-input>
            </div>
            <div class="btnBuscador">
              <button
                size="sm"
                class="my-2 my-sm-0 btn btn-secondary"
                type="submit">
                Buscar
              </button>
            </div>
          </b-form>
        </div>
      </div>
      
      <b-modal ref="my-modal" hide-footer title="Registro">
        <div>
          <b-form >
            <b-form-group id="input-group-1" style="padding: 5px;">
              <b-form-input
                id="titulo"
                v-model="$v.titulo.$model"
                :class="status($v.titulo)"
                type="text"
                placeholder="Titulo"
                required
              ></b-form-input>
            </b-form-group>
            <div class="error errorMsg" v-if="!$v.titulo.required && $v.titulo.dirty">
              Este campo no puede ir vacío
            </div>

            <b-form-group id="input-group-2" style="padding: 5px;">
              <b-form-input
                id="descripcion"
                v-model="$v.descripcion.$model"
                :class="status($v.descripcion)"
                placeholder="Ingrese la descripcion"
                required
              ></b-form-input>
            </b-form-group>
            <div class="error errorMsg" v-if="!$v.descripcion.required && $v.descripcion.dirty">
              Este campo no puede ir vacío
            </div>

            <b-form-group id="input-group-3" style="padding: 5px;">
              <b-form-input
                id="requisitos"
                v-model="$v.requisitos.$model"
                :class="status($v.requisitos)"
                placeholder="Ingrese los requisitos"
                required
              ></b-form-input>
            </b-form-group>
            <div class="error errorMsg" v-if="!$v.requisitos.required && $v.requisitos.dirty">
              Este campo no puede ir vacío
            </div>

            <b-form-group id="input-group-4" style="padding: 5px;">
              <b-form-input
                id="duracion"
                v-model="$v.duracion.$model"
                :class="status($v.duracion)"
                placeholder="Ingrese la duración"
                required
              ></b-form-input>
            </b-form-group>
            <div class="error errorMsg" v-if="!$v.duracion.required && $v.duracion.$dirty">
              Este campo no puede ir vacío
            </div>

            <b-form-group id="input-group-5" style="padding: 5px;">
              <b-form-textarea
                id="temario"
                v-model="$v.temario.$model"
                :class="status($v.temario)"
                placeholder="Ingrese el temario"
                required
              ></b-form-textarea>
              <div class="error errorMsg" v-if="!$v.temario.required && $v.temario.dirty">
                Este campo no puede ir vacío
              </div>

            </b-form-group>
          </b-form>
          <div>
            <b-button
              class="mt-2"
              variant="outline-success"
              style="margin: 5px"
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
                style="margin: 5px"
                block
                @click="hideModal">Cerrar
            </b-button>
          </div>
        </div>
      </b-modal>
      <br />
      <div id="table">
        <table class="table">
          <thead style="background-color: #00ab84;">
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
              <th>{{item+1}}  </th>
              <td>{{curso.titulo}}  </td>
              <td>{{curso.descripcion}}  </td>
              <td>{{curso.requisitos}}  </td>
              <td>{{curso.temario}}  </td>
              <td>{{curso.duracion}}  </td>
              <td>
                <button @click="eliminar(curso.idCurso)" class="btn btn-danger">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Footer class="fixed-bottom" />
    </div>
  </div>
</template>
<script>
import HeaderInicio from "@/components/HeaderInicio.vue";
import Footer from "@/components/Footer.vue";
import { required } from "vuelidate/lib/validators";
import api from '../../util/api';

export default {
  name: "Home",
  components: {
    HeaderInicio,
    Footer,
  },
  data() {
    return {
      listCursos: [],
      curso:{},
      titulo: "",
      descripcion:"",
      requisitos:"",
      duracion:"",
      temario:""
    };
  },
  beforeMount(){
    this.getCursos();
  },
  methods: {
    getCursos(){
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
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    registrar() {
      this.curso = {
        titulo : this.titulo,
        descripcion : this.descripcion,
        requisitos : this.requisitos,
        duracion : this.duracion,
        temario : this.temario
      };
      api
      .doPost("cursos/curso/save",this.curso)
      .then(()=>{
          this.$swal({
            title: "Curso registrado exitosamente!",
            icon: "success",          
          });
          this.getCursos();
          this.titulo= "",
          this.descripcion="",
          this.requisitos="",
          this.duracion="",
          this.temario=""
      })
      .catch((error)=>{
        let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              html:
                "<span style='font-size:14pt'><b>" +
                errorResponse.code +
                "</b> " +
                errorResponse.message ,
              icon: "error",
            });
          }else{
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              icon: "error",
            });
          }
      }).finally(() => (this.loading = false));
    },
    eliminar(id){
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
  },
};
</script>
<style scoped>
#table {
  width: 65%;
  margin-left: 15%;
}
#modal {
  position: absolute;
  float: left;
  margin-top: -30px;
  padding-left: 25px;
}

.buscador {
  width: 250px;
  float: right;
  margin-right: 100px;
  margin-top: -30px;
}
.btnBuscador {
  float: right;
  margin-right: -340px;
  margin-top: -30px;
}
</style>