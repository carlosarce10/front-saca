<template>
  <div class="fondo">
    <div><HeaderDocente /></div>
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
    <!-- Tabs de los cursos finalizados y en curso -->
    <div class="container">
      <b-tabs content-class="mt-6">
        <b-tab title="En Curso" active>
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
                  <tr
                    v-for="(oferta, item) in getAllOfertasActivas"
                    :key="oferta.idOferta"
                  >
                    <th>{{ item + 1 }}</th>
                    <td>{{ oferta.cursos[0].titulo }}</td>
                    <td>{{ oferta.cursos[0].descripcion }}</td>
                    <td>{{ fechaInicioCard[item] }}</td>
                    <td>{{ fechaFinCard[item] }}</td>
                    <td>{{ oferta.cursos[0].duracion }}</td>
                    <td>
                      <b-button
                        id="finalizarCurso"
                        @click="recuperarOferta(oferta.idOferta)"
                        variant="outline-primary"
                        ><b-icon
                          icon="arrow-left-right"
                          aria-hidden="true"
                        ></b-icon
                      ></b-button>
                      <b-tooltip
                        target="finalizarCurso"
                        triggers="hover"
                        variant="primary"
                      >
                        Finalizar curso
                      </b-tooltip>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="alert alert-success"
                role="alert"
                v-if="listaOfertasActivas.length === 0"
              >
                No hay cursos disponibles
              </div>
            </div>
          </div>
        </b-tab>
        <b-tab title="Finalizado">
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
                  <tr
                    v-for="(oferta, item) in getAllOfertasFinalizadas"
                    :key="oferta.idOferta"
                  >
                    <th>{{ item + 1 }}</th>
                    <td>{{ oferta.cursos[0].titulo }}</td>
                    <td>{{ oferta.cursos[0].descripcion }}</td>
                    <td>{{ fechaInicioCard[item] }}</td>
                    <td>{{ fechaFinCard[item] }}</td>
                    <td>{{ oferta.cursos[0].duracion }}</td>
                    <td>
                      <b-button
                        @click="recuperarInscripciones(oferta.idOferta)"
                        variant="outline-primary"
                        id="button-liberar"
                        ><b-icon icon="check2" aria-hidden="true"></b-icon
                      ></b-button>
                      <b-tooltip
                        target="button-liberar"
                        triggers="hover"
                        variant="primary"
                      >
                        Liberar alumnos
                      </b-tooltip>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="alert alert-success"
                role="alert"
                v-if="listaOfertasFinalizadas.length === 0"
              >
                No hay cursos disponibles
              </div>
            </div>
          </div>
        </b-tab>
      </b-tabs>
    </div>
    <div><Footer class="fixed-bottom" /></div>
  </div>
</template>

<script>
import HeaderDocente from "@/components/HeaderDocente.vue";
import Footer from "@/components/Footer.vue";
import api from "../../util/api";

export default {
  components: {
    HeaderDocente,
    Footer,
  },
  data() {
    return {
      listaOfertasActivas: [],
      listaOfertasFinalizadas: [],
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
      fechaFinCard: [],
      fechaInicioCard: [],
      idDoccente: "",
      oferta: {},
      inscripción: {},
      buscar:"",
    };
  },
  beforeMount() {
    this.getIdDocente();
  },
  computed:{
    getAllOfertasActivas(){
      if (!this.buscar) {
        return this.listaOfertasActivas;
      } else {
        return this.listaOfertasActivas.filter((oferta) => {
          return [oferta.cursos[0].titulo , oferta.cursos[0].descripcion].find((field) => {
            return field
              .toLowerCase()
              .includes(this.buscar.toLowerCase().trim());
          });
        });
      }
    },
    getAllOfertasFinalizadas(){
      if (!this.buscar) {
        return this.listaOfertasFinalizadas;
      } else {
        return this.listaOfertasFinalizadas.filter((oferta) => {
          return [oferta.cursos[0].titulo , oferta.cursos[0].descripcion].find((field) => {
            return field
              .toLowerCase()
              .includes(this.buscar.toLowerCase().trim());
          });
        });
      }
    }
  },
  methods: {
    getIdDocente() {
      let nickname = localStorage.username;
      api
        .doGet("cursos/usuario/get/" + nickname)
        .then((response) => {
          //this.idDoccente = response.data.idUsuario;
          this.getOfertaCursosActivo(response.data.idUsuario);
          this.getOfrtasFinalaizadas(response.data.idUsuario);
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
    getOfertaCursosActivo(id) {
      api
        .doGet("cursos/ofertaDocente/" + id)
        .then((response) => {
          this.listaOfertasActivas = response.data;
          console.log(response.data);
          let arrFechaI = [];
          let arrFechaF = [];
          for (let i = 0; i < this.listaOfertasActivas.length; i++) {
            arrFechaF.push(this.listaOfertasActivas[i].fechaFin);
            arrFechaI.push(this.listaOfertasActivas[i].fechaInicio);
          }
          for (let j = 0; j < arrFechaI.length; j++) {
            let date = new Date(arrFechaI[j]);
            this.fechaInicioCard[j] =
              date.getDate() +
              "/" +
              (date.getMonth() + 1) +
              "/" +
              date.getFullYear();
            console.log("fecha " + this.fechaInicioCard);
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
    getOfrtasFinalaizadas(id) {
      api
        .doGet("cursos/ofertaDocenteFinalizado/" + id)
        .then((response) => {
          this.listaOfertasFinalizadas = response.data;
          //this.checarEstado(response.data.idOferta);
          console.log(response.data);
          let arrFechaI = [];
          let arrFechaF = [];
          for (let i = 0; i < this.listaOfertasFinalizadas.length; i++) {
            arrFechaF.push(this.listaOfertasFinalizadas[i].fechaFin);
            arrFechaI.push(this.listaOfertasFinalizadas[i].fechaInicio);
          }
          for (let j = 0; j < arrFechaI.length; j++) {
            let date = new Date(arrFechaI[j]);
            this.fechaInicioCard[j] =
              date.getDate() +
              1 +
              "-" +
              (date.getMonth() + 1) +
              "-" +
              date.getFullYear();
          }
          for (let k = 0; k < arrFechaF.length; k++) {
            let date = new Date(arrFechaF[k]);
            this.fechaFinCard[k] =
              date.getDate() +
              1 +
              "-" +
              (date.getMonth() + 1) +
              "-" +
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
    checarEstado(id) {
      api
        .doGet("cursos/inscripcion/inscripcionOferta/" + id)
        .then((response) => {
          console.log(response.data);
          if (response.data.estado == "liberado") {
            document
              .getElementById("button-liberar")
              .setAttribute("disabled", "");
          }
        });
    },
    recuperarOferta(id) {
      api.doGet("cursos/oferta/" + id).then((response) => {
        console.log(response.data);
        this.cambiarEstado(id, response.data);
      });
    },
    cambiarEstado(id, data) {
      this.oferta = {
        costo: data.costo,
        minimoParticipantes: data.minimoParticipantes,
        maximoParticipantes: data.maximoParticipantes,
        fechaPeriodoInscripcion: data.fechaPeriodoInscripcion,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        tipoCurso: data.tipoCurso,
        estado: "finalizado",
        cursos: [{ idCurso: data.cursos[0].idCurso }],
        modalidades: [{ idModalidad: data.modalidades[0].idModalidad }],
        divisiones: [{ idDivision: data.divisiones[0].idDivision }],
        clasificaciones: [
          { idClasificacion: data.clasificaciones[0].idClasificacion },
        ],
        docente: { idUsuario: data.docente.idUsuario },
        idOferta: id,
      };
      console.log(this.oferta);

      this.$swal({
        title: "¿Estás seguro de Finalizar el curso?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#64b5f6",
        cancelButtonColor: "#ff7674",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      })
        .then((result) => {
          if (result.isConfirmed) {
            api.doPut("cursos/oferta", this.oferta).then(() => {
              this.$swal({
                title: "Se finalizo el curso exitosamente",
                icon: "success",
              });
              this.getIdDocente();
            });
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
    recuperarInscripciones(id) {
      api
        .doGet("cursos/inscripcion/inscripcionOferta/" + id)
        .then((response) => {
          console.log(response.data);
          this.liberarCurso(response.data);
        });
    },
    liberarCurso(data) {
      let arrIncripcion = [];
      for (let i = 0; i < data.length; i++) {
        this.inscripción = {
          idInscripcion: data[i].idInscripcion,
          estatus: "liberado",
          oferta: { idOferta: data[i].oferta.idOferta },
          usuario: { nickname: data[i].usuario.nickname },
        };
        arrIncripcion.push(this.inscripción);
      }
      console.log("-->> ", arrIncripcion);
      //document.getElementById("button-liberar").setAttribute("disabled", "");
      this.$swal({
        title: "¿Estás seguro que deseas liberar a los alumnos del curso?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#64b5f6",
        cancelButtonColor: "#ff7674",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      })
        .then((result) => {
          if (result.isConfirmed) {
            for (let j = 0; j < arrIncripcion.length; j++) {
              //console.log(arrIncripcion[j])
              api.doPut("cursos/inscripcion", arrIncripcion[j]).then(() => {
                this.$swal({
                  title: "Se liberó los alumnos",
                  icon: "success",
                });
              });
            }
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
  },
};
</script>
