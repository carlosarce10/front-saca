<template>
  <div class="fondo">
    <div><HeaderAdmin /></div>
    <div class="row" style="margin-top: 2%">
      <div class="col-10 centrar" style="background-color: #f8f8f8">
        <!-- Tabla consulta de ofertas pendientes -->
        <table class="table table-borderless table-hover">
          <thead class="table-success">
            <tr>
              <th class="text-center" scope="col">#</th>
              <th class="text-center" scope="col">Nombre(s)</th>
              <th class="text-center" scope="col">Apellido Paterno</th>
              <th class="text-center" scope="col">Apellido Materno</th>
              <th class="text-center" scope="col">Curso</th>
              <th class="text-center" scope="col">Periodo</th>
              <th class="text-center" scope="col">Costo</th>
              <th class="text-center" scope="col">Aciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(oferta, item) in ofertas" :key="oferta.id">
              <th class="text-center">
                {{ item + 1 }}
              </th>
              <td class="text-center">
                {{ oferta.usuario.nombre }}
              </td>
              <td class="text-center">
                {{ oferta.usuario.apellidoPaterno }}
              </td>
              <td class="text-center">
                {{ oferta.usuario.apellidoMaterno }}
              </td>
              <td class="text-center">
                {{ oferta.oferta.cursos[0].titulo }}
              </td>
              <td class="text-center">
                {{ oferta.oferta.fechaPeriodoInscripcion }}
              </td>
              <td class="text-center">${{ oferta.oferta.costo }}</td>
              <td class="text-center">
                <b-button
                  variant="outline-primary"
                  @click="mostrarModalDetalles(oferta.idInscripcion)"
                  >Ver detalles
                </b-button>
                <b-button
                  id="rechazar"
                  variant="outline-danger"
                  @click="rechazarInscripcion(oferta.idInscripcion)"
                >
                  <b-icon icon="x" aria-hidden="true"></b-icon>
                </b-button>
                <b-tooltip target="rechazar" triggers="hover" variant="success">
                  Rechazar
                </b-tooltip>
                <b-button
                  id="aceptar"
                  variant="outline-success"
                  @click="aceptarInscripcion(oferta.idInscripcion)"
                >
                  <b-icon icon="check" aria-hidden="true"></b-icon>
                </b-button>
                <b-tooltip target="aceptar" triggers="hover" variant="success">
                  Aceptar
                </b-tooltip>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="alert alert-success" role="alert" v-if="ofertas.length === 0">
          No hay solicitudes de  inscripciones
        </div>
      </div>
    </div>
    <!-- Modal de detalles del curso -->
    <b-modal
      ref="cursos-modalDetalles"
      size="lg"
      hide-footer
      title="Detalles de inscripción"
    >
      <div class="row">
        <div>
          <div class="row">
            <div class="col-12">
              <h6>Estudiante:</h6>
              {{ estudianteNombre }} {{ estudianteApellidoP }}
              {{ estudianteApellidoM }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Correo:</h6>
              {{ estudianteEmail }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Curso:</h6>
              {{ curso }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Descripción:</h6>
              {{ descripcion }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Duración:</h6>
              {{ duracion }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Costo:</h6>
              ${{ costo }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Mínimo de participantes:</h6>
              {{ minParticipantes }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Máximo de participantes:</h6>
              {{ maxParticipantes }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Tipo de curso:</h6>
              {{ tipoCurso }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Periodo:</h6>
              {{ periodo }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Fecha de inicio:</h6>
              {{ fechaInicio }}
            </div>
            <div class="linea"></div>
            <div class="col-12">
              <h6>Fecha de finalización:</h6>
              {{ fechaFin }}
            </div>
            <div class="linea"></div>
          </div>
          <hr />
        </div>
        <div>
          <b-button
            class="mt-2"
            variant="outline-danger"
            style="margin: 5px; float: right"
            block
            @click="hideModalDetalles"
            >Cerrar
          </b-button>
        </div>
      </div>
    </b-modal>
    <div><Footer class="fixed-bottom" /></div>
  </div>
</template>

<script>
import HeaderAdmin from "@/components/HeaderAdmin.vue";
import Footer from "@/components/Footer.vue";
import api from "../../util/api";
export default {
  components: {
    HeaderAdmin,
    Footer,
  },
  data() {
    return {
      ofertas: [],
      inscripcion: {},
      estudianteNombre: "",
      estudianteApellidoP: "",
      estudianteApellidoM: "",
      estudianteEmail: "",
      curso: "",
      descripcion: "",
      duracion: "",
      costo: "",
      minParticipantes: "",
      maxParticipantes: "",
      tipoCurso: "",
      periodo: "",
      fechaInicio: "",
      fechaFin: "",
      estudianteID: "",
      ofertaID: "",
    };
  },
  beforeMount() {
    this.getOfertas();
  },
  methods: {
    getOfertas() {
      api
        .doGet("cursos/inscripcion/inscripcionPendiente")
        .then((response) => {
          this.ofertas = response.data;
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
      console.log(this.ofertas);
    },
    mostrarModalDetalles(id) {
      api
        .doGet("cursos/inscripcion/" + id)
        .then((response) => {
          this.estudianteNombre = response.data.usuario.nombre;
          this.estudianteApellidoP = response.data.usuario.apellidoPaterno;
          this.estudianteApellidoM = response.data.usuario.apellidoMaterno;
          this.estudianteEmail = response.data.usuario.email;
          this.curso = response.data.oferta.cursos[0].titulo;
          this.descripcion = response.data.oferta.cursos[0].descripcion;
          this.duracion = response.data.oferta.cursos[0].duracion;
          this.costo = response.data.oferta.costo;
          this.minParticipantes = response.data.oferta.minimoParticipantes;
          this.maxParticipantes = response.data.oferta.maximoParticipantes;
          this.tipoCurso = response.data.oferta.tipoCurso;
          this.periodo = response.data.oferta.fechaPeriodoInscripcion;
          this.fechaInicio = response.data.oferta.fechaInicio;
          this.fechaFin = response.data.oferta.fechaFin;
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
      this.$refs["cursos-modalDetalles"].show();
    },
    hideModalDetalles() {
      this.$refs["cursos-modalDetalles"].hide();
    },
    aceptarInscripcion(idInscripcion) {
      api.doGet("cursos/inscripcion/" + idInscripcion).then((response) => {
        this.estudianteID = response.data.usuario.nickname;
        this.ofertaID = response.data.oferta.idOferta;
      });
      this.$swal({
        title: "¿Estás seguro que desea aceptar la inscripción?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#64b5f6",
        cancelButtonColor: "#ff7674",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.inscripcion = {
            idInscripcion: idInscripcion,
            estatus: "aceptado",
            usuario: {
              nickname: this.estudianteID,
            },
            oferta: {
              idOferta: this.ofertaID,
            },
          };
          api.doPut("cursos/inscripcion", this.inscripcion).then(() => {
            this.$swal({
              title: "Se ha aceptado la solicitud de inscripción correctamente",
              icon: "success",
            });
            this.getOfertas();
          });
        }
      });
    },
    rechazarInscripcion(idInscripcion) {
      api.doGet("cursos/inscripcion/" + idInscripcion).then((response) => {
        this.estudianteID = response.data.usuario.nickname;
        this.ofertaID = response.data.oferta.idOferta;
      });
      this.$swal({
        title: "¿Estás seguro que desea rechazar la inscripción?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#64b5f6",
        cancelButtonColor: "#ff7674",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.inscripcion = {
            idInscripcion: idInscripcion,
            estatus: "rechazado",
            usuario: {
              nickname: this.estudianteID,
            },
            oferta: {
              idOferta: this.ofertaID,
            },
          };
          api.doPut("cursos/inscripcion", this.inscripcion).then(() => {
            this.$swal({
              title: "Se ha rechazado la solicitud de inscripción correctamente",
              icon: "success",
            });
            this.getOfertas();
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.centrar {
  margin-left: auto;
  margin-right: auto;
}
h6 {
  display: inline;
}
</style>
