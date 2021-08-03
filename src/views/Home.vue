<template>
  <div class="row fondo">
    <div class="home">
      <HeaderInicio />
      <!-- Modal de detalles del curso -->
      <b-modal
        ref="cursos-modalDetalles"
        size="lg"
        hide-footer
        title="Detalles del curso"
      >
        <div class="row">
          <div>
            <div class="row">
              <div class="col-12">
                <h6>Título:</h6>
                {{ curso }}
              </div>
              <div class="linea"></div>
              <div class="col-12">
                <h6>Descripción:</h6>
                {{ descripcion }}
              </div>
              <div class="linea"></div>
              <div class="col-12">
                <h6>Requisitos:</h6>
                {{ requisitos }}
              </div>
              <div class="linea"></div>
              <div class="col-12">
                <h6>Temario:</h6>
                {{ temario }}
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
                <h6>Periodo:</h6>
                {{ fechaPeriodo }}
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
              <div class="col-12">
                <h6>División:</h6>
                {{ division }}
              </div>
              <div class="linea"></div>
              <div class="col-12">
                <h6>Modalidad:</h6>
                {{ modalidad }}
              </div>
              <div class="linea"></div>
              <div class="col-12">
                <h6>Clasificación:</h6>
                {{ clasificacion }}
              </div>
              <div class="linea"></div>
              <div class="col-12">
                <h6>Docente:</h6>
                {{ docenteNombre }} {{ docenteApellidoP }}
                {{ docenteApellidoM }}
              </div>
              <div class="linea"></div>
              <div class="col-12">
                <h6>Tipo de curso:</h6>
                {{ tipoCurso }}
              </div>
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

      <!-- Cards de Cursos ofertados  -->
      <div class="row">
        <div
          class="card col-3 mx-5"
          style="margin-top: 1%"
          v-for="(oferta,item) in listaOfertas"
          :key="oferta.idOferta"
        >
          <div class="card-body" >
            <h5 class="card-title">{{ oferta.cursos[0].titulo }}</h5>
            <h6 class="card-subtitle">${{ oferta.costo }}</h6>
            <br />
            <h6 class="card-text">{{ oferta.cursos[0].descripcion }}</h6>
            <p class="card-text" >Inicio del curso: {{ fechaInicioCard[item] }}</p>
            <p class="card-text">
              Finalización del curoso: {{ fechaFinCard[item] }}
            </p>
            <b-button
              variant="outline-primary"
              style="float: right; margin-left: 2%"
              @click="mostrarModalDetalles(oferta.idOferta)"
              >Ver detalles
            </b-button>
          </div>
        </div>
      </div>
      <Footer class="fixed-bottom" />
    </div>
  </div>
</template>

<script>
import HeaderInicio from "@/components/HeaderInicio.vue";
import Footer from "@/components/Footer.vue";
import api from "../util/api";

export default {
  name: "Home",
  components: {
    HeaderInicio,
    Footer,
  },
  data() {
    return {
      listaOfertas: [],
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
    };
  },
  beforeMount() {
    this.getOfertaCursos();
  },
  methods: {
    getOfertaCursos() {
      api
        .doGet("cursos/oferta")
        .then((response) => {
          this.listaOfertas = response.data          
          let arrFechaI = [];
          let arrFechaF = [];
          for(let i=0; i<this.listaOfertas.length; i++){
            arrFechaF.push(this.listaOfertas[i].fechaFin);
            arrFechaI.push(this.listaOfertas[i].fechaInicio);
            
          }
          for(let j=0; j< arrFechaI.length; j++){
            let date  = new Date(arrFechaI[j]);
            this.fechaInicioCard[j] = (date.getDate()+1)+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
          }
          for(let k=0; k< arrFechaF.length; k++){
            let date  = new Date(arrFechaF[k]);
            this.fechaFinCard[k] = (date.getDate()+1)+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
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
              html: "<span style='font-size:14pt'>Para más información contacte a su operador.</span>",
              icon: "error",
            });
          }
        });
      console.log(this.listaOfertas);
    },
    mostrarModalDetalles(id) {
      api
        .doGet("cursos/oferta/" + id)
        .then((response) => {
          console.log(response)
          //let fechaP = new Date(response.data.fechaPeriodoInscripcion);
          let fechaI = new Date(response.data.fechaInicio);
          let fechaF = new Date(response.data.fechaFin);
          this.costo = response.data.costo;
          this.fechaPeriodo = response.data.fechaPeriodoInscripcion
          this.fechaInicio = (fechaI.getDate()+1)+"-"+(fechaI.getMonth()+1)+"-"+fechaI.getFullYear();
          this.fechaFin = (fechaF.getDate()+1)+"-"+(fechaF.getMonth()+1)+"-"+fechaF.getFullYear();
          this.modalidad = response.data.modalidades[0].modalidad;
          this.division = response.data.divisiones[0].division;
          this.clasificacion = response.data.clasificaciones[0].clasificacion;
          this.docenteNombre = response.data.docente.nombre;
          this.docenteApellidoP = response.data.docente.apellidoPaterno;
          this.docenteApellidoM = response.data.docente.apellidoMaterno;
          this.curso = response.data.cursos[0].titulo;
          this.descripcion = response.data.cursos[0].descripcion;
          this.requisitos = response.data.cursos[0].requisitos;
          this.temario = response.data.cursos[0].temario;
          this.duracion = response.data.cursos[0].duracion;
          this.tipoCurso = response.data.tipoCurso;
          this.ofertaId = response.data.idOferta;
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
              html: "<span style='font-size:14pt'>Para más información contacte a su operador.</span>",
              icon: "error",
            });
          }
        });

      this.$refs["cursos-modalDetalles"].show();
    },
    hideModalDetalles() {
      this.$refs["cursos-modalDetalles"].hide();
    },
  },
};
</script>

<style scoped>
h6 {
  display: inline;
}
</style>