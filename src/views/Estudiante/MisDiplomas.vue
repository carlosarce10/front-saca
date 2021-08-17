<template>
  <div class="fondo">
    <div><HeaderEstudiante /></div>
    <div class="row" style="margin-top: 2%">
      <div class="offset-8 col-3">
        <div class="row px-2">
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
                  placeholder="  Buscar curso..."
                  aria-label="Search"
                  v-model="buscar"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!-- Cards de Cursos inscritos  -->
    <div class="container" style="margin-top: 2%">
      <div>
        <b-tabs content-class="mt-6">
          <b-tab title="Cursos Aceptados" active>
            <div class="row">
              <div
                class="card col-3 mx-5"
                style="margin-top: 2%"
                v-for="(inscripcion, item) in getAllCursos"
                :key="inscripcion.idInscripcion"
              >
                <div class="card-body">
                  <h5 class="card-title">
                    {{ inscripcion.oferta.cursos[0].titulo }}
                  </h5>
                  <h6 class="card-text">
                    {{ inscripcion.oferta.cursos[0].descripcion }}
                  </h6>
                  <br />
                  <h6 class="card-subtitle">
                    Docente: {{ inscripcion.oferta.docente.nombre }}
                    {{ inscripcion.oferta.docente.apellidoPaterno }}
                    {{ inscripcion.oferta.docente.apellidoMaterno }}
                  </h6>
                  <br />
                  <p class="card-text">
                    Inicio del curso: {{ fechaInicioCard[item] }}
                  </p>
                  <p class="card-text">
                    Finalización del curoso: {{ fechaFinCard[item] }}
                  </p>
                  <b-button
                    variant="outline-primary"
                    style="float: right; margin-left: 2%"
                    @click="mostrarModalAsistencia(inscripcion.idInscripcion)"
                    >Ver asistencias
                  </b-button>
                </div>
              </div>
              <div
                class="alert alert-success"
                role="alert"
                v-if="inscripciones.length === 0"
              >
                No hay cursos aceptados
              </div>
            </div>
          </b-tab>
          <b-tab title="Cursos Liberados">
            <div class="row">
              <div
                class="card col-3 mx-5"
                style="margin-top: 1%"
                v-for="(inscripcion, item) in getAllCursosFinalizados"
                :key="inscripcion.idInscripcion"
              >
                <div class="card-body">
                  <h5 class="card-title">
                    {{ inscripcion.oferta.cursos[0].titulo }}
                  </h5>
                  <h6 class="card-subtitle">${{ inscripcion.oferta.costo }}</h6>
                  <br />
                  <h6 class="card-text">
                    {{ inscripcion.oferta.cursos[0].descripcion }}
                  </h6>
                  <p class="card-text">
                    Inicio del curso: {{ fechaInicioCardF[item] }}
                  </p>
                  <p class="card-text">
                    Finalización del curoso: {{ fechaFinCardF[item] }}
                  </p>
                  <b-button
                    variant="outline-primary"
                    style="float: right; margin-left: 2%"
                    @click="descargarDiploma(inscripcion.idInscripcion)"
                    >Descargar Diploma
                  </b-button>
                </div>
              </div>
              <div
                class="alert alert-success"
                role="alert"
                v-if="inscripcionesLiberadas.length === 0"
              >
                No hay cursos liberados
              </div>
            </div>
          </b-tab>
        </b-tabs>
      </div>
    </div>
    <!--Modal pase de lista  -->
    <b-modal
      ref="asistencias-modal"
      size="xl"
      hide-footer
      title="Asistencias"
      scrollable
    >
      <div>
        <table class="table table-borderless table-hover">
          <thead class="table-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Curso</th>
              <th scope="col">Docente</th>
              <th scope="col">Fecha</th>
              <th scope="col">Asistencia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(asistencia, item) in asistencias" :key="asistencia.id">
              <th>
                {{ item + 1 }}
              </th>
              <td>
                {{ asistencia.oferta.cursos[0].titulo }}
              </td>
              <td>
                {{ asistencia.oferta.docente.nombre }}
                {{ asistencia.oferta.docente.apellidoPaterno }}
                {{ asistencia.oferta.docente.apellidoMaterno }}
              </td>
              <td>
                {{ AsistenciaFecha[item] }}
              </td>
              <td>
                {{ asistencia.estado }}
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div>
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
    <div><Footer class="fixed-bottom" /></div>
  </div>
</template>

<script>
import HeaderEstudiante from "@/components/HeaderEstudiante.vue";
import Footer from "@/components/Footer.vue";
import api from "../../util/api";

export default {
  components: {
    HeaderEstudiante,
    Footer,
  },
  data() {
    return {
      requisitos: "",
      temario: "",
      duracion: "",
      curso: "",
      descripcion: "",
      costo: "",
      fechaPeriodo: "",
      fechaInicio: "",
      fechaFin: "",
      modalidad: "",
      division: "",
      clasificacion: "",
      docenteNombre: "",
      docenteApellidoM: "",
      docenteApellidoP: "",
      tipoCurso: "",
      ofertaId: "",
      inscripcion: {},
      inscripciones: [],
      status: "",
      id_oferta: "",
      usuario_id_usuario: "",
      AsistenciaFecha: [],
      fechaInicioCard: [],
      fechaFinCard: [],
      fechaInicioCardF: [],
      fechaFinCardF: [],
      idEstudiante: "",
      inscripcionesLiberadas: [],
      OfertaID: "",
      usuarioID: "",
      asistencias: [],
      buscar:"",
    };
  },
  beforeMount() {
    this.getId();
  },
  computed:{
    getAllCursos(){
      if (!this.buscar) {
        return this.inscripciones;
      } else {
        return this.inscripciones.filter((inscripcion) => {
          return [inscripcion.oferta.cursos[0].titulo, inscripcion.oferta.cursos[0].descripcion,inscripcion.oferta.docente.nombre ].find((field) => {
            return field
              .toLowerCase()
              .includes(this.buscar.toLowerCase().trim());
          });
        });
      }
    },
    getAllCursosFinalizados(){
      if (!this.buscar) {
        return this.inscripcionesLiberadas;
      } else {
        return this.inscripcionesLiberadas.filter((inscripcion) => {
          return [inscripcion.oferta.cursos[0].titulo, inscripcion.oferta.cursos[0].descripcion].find((field) => {
            return field
              .toLowerCase()
              .includes(this.buscar.toLowerCase().trim());
          });
        });
      }
    }
  },
  methods: {
    hideModal() {
      this.$refs["asistencias-modal"].hide();
    },
    getId() {
      let nickname = localStorage.username;
      api.doGet("cursos/usuario/get/" + nickname).then((response) => {
        this.getCursosOferta(response.data.idUsuario);
        this.getInscripcionesLiberadas(response.data.idUsuario);
      });
    },
    getCursosOferta(id) {
      api
        .doGet("cursos/inscripcion/inscripcionAceptada/" + id)
        .then((response) => {
          this.inscripciones = response.data;
          console.log(this.inscripciones);
          let arrFechaI = [];
          let arrFechaF = [];
          for (let i = 0; i < this.inscripciones.length; i++) {
            console.log(this.inscripciones.oferta);
            arrFechaF.push(this.inscripciones[i].oferta.fechaFin);
            arrFechaI.push(this.inscripciones[i].oferta.fechaInicio);
          }

          for (let j = 0; j < arrFechaI.length; j++) {
            let date = new Date(arrFechaI[j]);
            this.fechaInicioCard[j] =
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear();
          }
          for (let k = 0; k < arrFechaF.length; k++) {
            let date = new Date(arrFechaF[k]);
            this.fechaFinCard[k] =
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear();
          }
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
    getInscripcionesLiberadas(id) {
      api
        .doGet("cursos/inscripcion/inscripcionLiberada/" + id)
        .then((response) => {
          this.inscripcionesLiberadas = response.data;
          let arrFechaI = [];
          let arrFechaF = [];
          for (let i = 0; i < this.inscripcionesLiberadas.length; i++) {
            arrFechaF.push(this.inscripcionesLiberadas[i].oferta.fechaFin);
            arrFechaI.push(this.inscripcionesLiberadas[i].oferta.fechaInicio);
          }

          for (let j = 0; j < arrFechaI.length; j++) {
            let date = new Date(arrFechaI[j]);
            this.fechaInicioCardF[j] =
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear();
          }
          for (let k = 0; k < arrFechaF.length; k++) {
            let date = new Date(arrFechaF[k]);
            this.fechaFinCardF[k] =
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear();
          }
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
    mostrarModalAsistencia(id) {
      api.doGet("/cursos/inscripcion/" + id).then((response) => {
        console.log("id: " + id);
        this.consultaAsistencia(
          response.data.oferta.idOferta,
          response.data.usuario.idUsuario
        );
      });
    },
    consultaAsistencia(oferta, alumno) {
      api
        .doGet("/cursos/asistencia/estudiante/" + oferta + "/" + alumno)
        .then((response) => {
          this.asistencias = response.data;
          let arrFechaI = [];
          for (let i = 0; i < this.asistencias.length; i++) {
            arrFechaI.push(this.asistencias[i].fechaAsistencia);
          }
          for (let j = 0; j < arrFechaI.length; j++) {
            let date = new Date(arrFechaI[j]);
            this.AsistenciaFecha[j] =
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear();
          }
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
      this.$refs["asistencias-modal"].show();
    },
    descargarDiploma(id) {
      window.location = "http://localhost:8090/cursos/pdf/" + id;
    },
  },
};
</script>
