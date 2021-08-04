<template>
  <div class="fondo">
    <div><HeaderEstudiante /></div>
    <!-- Cards de Cursos inscritos  -->
    <div class="row">
      <div
        class="card col-3 mx-5"
        style="margin-top: 1%; "
        v-for="(inscripcion, item) in inscripciones"
        :key="inscripcion.idInscripcion"
      >
        <div class="card-body">
          <h5 class="card-title">{{ inscripcion.oferta.cursos[0].titulo }}</h5>
          <h6 class="card-subtitle">${{ inscripcion.oferta.costo }}</h6>
          <br />
          <h6 class="card-text">{{ inscripcion.oferta.cursos[0].descripcion }}</h6>
          <p class="card-text">Inicio del curso: {{ fechaInicioCard[item] }}</p>
          <p class="card-text">
            Finalización del curoso: {{ fechaFinCard[item] }}
          </p>
          <b-button
            variant="outline-primary"
            style="float: right; margin-left: 2%"
            @click="mostrarModalDetalles(inscripcion.idInscripcion)"
            >Ver asistencias
          </b-button>
        </div>
      </div>
    </div>
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
      fechaInicioCard: [],
      fechaFinCard: [],
      idEstudiante: "",
    };
  },
  beforeMount() {
    this.getId();
  },
  methods: {
    getId() {
      let nickname = localStorage.username;
      api.doGet("cursos/usuario/get/" + nickname).then((response) => {
        this.getCursosOferta(response.data.idUsuario);
      });
    },
    getCursosOferta(id) {
      console.log("aidi")
      api
        .doGet("cursos/inscripcion/inscripcionAceptada/" + id)
        .then((response) => {
          this.inscripciones = response.data;
          console.log(this.inscripciones);
          let arrFechaI = [];
          let arrFechaF = [];
          for (let i = 0; i < this.inscripciones.length; i++) {
            console.log(this.inscripciones.oferta)
            arrFechaF.push(this.inscripciones[i].oferta.fechaFin);
            arrFechaI.push(this.inscripciones[i].oferta.fechaInicio);
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
  },
};
</script>
