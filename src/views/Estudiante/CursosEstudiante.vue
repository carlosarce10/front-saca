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
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
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
              {{ docenteNombre }} {{ docenteApellidoP }} {{ docenteApellidoM }}
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
        style="margin-top: 1%; "
        v-for="(oferta,item) in ofertas"
        :key="oferta.idOferta"
      >
        <div class="card-body">
          <h5 class="card-title">{{ oferta.cursos[0].titulo }}</h5>
          <h6 class="card-subtitle">${{ oferta.costo }}</h6>
          <br />
          <h6 class="card-text">{{ oferta.cursos[0].descripcion }}</h6>
          <p class="card-text">Inicio del curso: {{ fechaInicioCard[item] }}</p>
          <p class="card-text">
            Finalización del curoso: {{ fechaFinCard[item] }}
          </p>
          <b-button
            variant="outline-primary"
            style="float: right; margin-left: 2%"
            @click="mostrarModalDetalles(oferta.idOferta)"
            >Ver detalles
          </b-button>
          <b-button
            variant="outline-success"
            @click="inscribir(oferta.idOferta)"
            style="float: right"
          >
            Inscribir
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
      ofertas: [],
      status: "",
      id_oferta: "",
      usuario_id_usuario: "",
      fechaInicioCard: [],
      fechaFinCard:[],
      listaIncripcion:[]
    };
  },
  beforeMount() {
    this.getCursosOferta();
    this.getInscripcion();
  },
  methods: {
    getCursosOferta() {
      api
        .doGet("cursos/oferta")
        .then((response) => {
          this.ofertas = response.data;
          let arrFechaI = [];
          let arrFechaF = [];
          for(let i=0; i<this.ofertas.length; i++){
            arrFechaF.push(this.ofertas[i].fechaFin);
            arrFechaI.push(this.ofertas[i].fechaInicio);
            
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
              html:
                "<span style='font-size:14pt'>Para más información contacte a su operador.</span>",
              icon: "error",
            });
          }
        });
    },
    inscribir(idOferta) {
      console.log(idOferta);
      this.inscripcion = {
        estatus: "espera",
        oferta: {
          idOferta: idOferta,
        },
        usuario: {
          nickname: localStorage.username,
        },
      };
      api
        .doPost("cursos/inscripcion", this.inscripcion)
        .then(() => {
          this.$swal({
            title: "Se inscribio exitosamente exitosamente",
            icon: "success",
          });
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
    mostrarModalDetalles(id) {
      api
        .doGet("cursos/oferta/" + id)
        .then((response) => {
          let fechaP = response.data.fechaPeriodoInscripcion.split("T");
          let fechaI = response.data.fechaInicio.split("T");
          let fechaF = response.data.fechaFin.split("T"); 
          this.costo = response.data.costo;
          this.fechaPeriodo = fechaP[0];
          this.fechaInicio = fechaI[0];
          this.fechaFin = fechaF[0];
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
    getInscripcion(){
      api
        .doGet("cursos/inscripcion")
        .then((response) => {
          this.listaIncripcion = response.data;
          console.log(this.listaIncripcion)
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

<style scoped>
.buscador {
  border: 1px solid #00ab84;
}
.centrar {
  margin-left: auto;
  margin-right: auto;
}
h6 {
  display: inline;
}
</style>
