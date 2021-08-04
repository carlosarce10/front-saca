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
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <!--- Tabla de cursos activos -->
    <div class="row" style="margin-top: 2%">
      <div class="col-10 centrar" style="background-color: #f8f8f8">
        <table class="table table-borderless table-hover">
          <thead class="table-success">
            <tr style="color: white">
              <th scope="col">#</th>
              <th scope="col">Titulo</th>
              <th scope="col">Descripción</th>
              <th scope="col">Fecha Inicio</th>
              <th scope="col">Fecha Fin</th>
              <th scope="col">Duración</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(oferta, item) in listaOfertasActivas"
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
                  @click="recuperarOferta(oferta.idOferta)"
                  variant="outline-primary"
                  ><b-icon icon="arrow-left-right" aria-hidden="true"></b-icon
                ></b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
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
      fechaInicioCard: [],
      fechaFinCard: [],
      oferta: {},
      costo: "",
      minAlum: "",
      maxAlum: "",
      fechaPeriodo: "",
      fechaInicio: "",
      fechaFin: "",
      tipoCurso: "",
      curso: "",
      modalidad: "",
      division: "",
      clasisificacion: "",
      idDocente: "",
    };
  },
  beforeMount() {
    this.getIdDocente();
  },
  methods: {
    getIdDocente() {
      let nickname = localStorage.username;
      api.doGet("cursos/usuario/get/" + nickname).then((response) => {
        this.getCursosOferta(response.data.idUsuario);
      });
    },
    getCursosOferta(id) {
      api
        .doGet("cursos/ofertaDocenteActivo/" + id)
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
              html: "<span style='font-size:14pt'>Para más información contacte a su operador.</span>",
              icon: "error",
            });
          }
        });
    },
    recuperarOferta(id) {
      api
        .doGet("cursos/oferta/" + id)
        .then((response) => {
          console.log(response.data);
          this.cambiarEstado(id,response.data);
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
    },
    cambiarEstado(id,data) {     
      this.oferta = {
        costo: data.costo,
        minimoParticipantes: data.minimoParticipantes,
        maximoParticipantes: data.maximoParticipantes,
        fechaPeriodoInscripcion: data.fechaPeriodoInscripcion,
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin,
        tipoCurso: data.tipoCurso,
        estado: "en curso",
        cursos: [{ idCurso: data.cursos[0].idCurso }],
        modalidades: [
          { idModalidad: data.modalidades[0].idModalidad },
        ],
        divisiones: [{ idDivision: data.divisiones[0].idDivision}],
        clasificaciones: [
          { idClasificacion: data.clasificaciones[0].idClasificacion },
        ],
        docente: { idUsuario: data.docente.idUsuario },
        idOferta: id,
      };
      api
        .doPut("cursos/oferta", this.oferta)
        .then(() => {
          this.$swal({
            title: "Se cambio el estado exitosamente",
            icon: "success",
          });
          this.getIdDocente();
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
</style>
