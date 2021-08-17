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

    <!-- Cards de Cursos ofertados  -->
    <div class="row">
      <div
        class="card col-3 mx-5"
        style="margin-top: 1%"
        v-for="(oferta, item) in getAllOfertas"
        :key="oferta.idOferta"
      >
        <div class="card-body">
          <h5 class="card-title">{{ oferta.cursos[0].titulo }}</h5>
          <br />
          <h6 class="card-text">{{ oferta.cursos[0].descripcion }}</h6>
          <p class="card-text">Inicio del curso: {{ fechaInicioCard[item] }}</p>
          <p class="card-text">
            Finalización del curoso: {{ fechaFinCard[item] }}
          </p>
          <b-button
            variant="outline-primary"
            style="float: right; margin-left: 2%"
            @click="mostrarModalLista(oferta.idOferta)"
            >Pasar lista
          </b-button>
        </div>
      </div>
    </div>
    <!--Modal pase de lista  -->
    <b-modal
      ref="cursos-modalLista"
      size="xl"
      hide-footer
      title="Pase de lista"
      scrollable
    >
      <div>
        <table class="table table-borderless table-hover">
          <thead class="table-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre(s)</th>
              <th scope="col">Apellido Paterno</th>
              <th scope="col">Apellido Materno</th>
              <th scope="col">Asistencia</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, item) in lista" :key="usuario.id">
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
                <b-form-select
                  :options="estadoAsistencia"
                  class="form-select"
                  v-model="usuario.estado"
                >
                </b-form-select>
              </td>
            </tr>
          </tbody>
        </table>
        <hr />
        <div>
          <b-button
            class="mt-2"
            variant="outline-success"
            style="margin: 5px; float: right"
            type="submit"
            @click="registrar()"
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
      estado: "",
      idOferta: "",
      idUsuario: "",
      listaOfertasActivas: [],
      fechaFinCard: [],
      fechaInicioCard: [],
      usuarios: [],
      asistencia: {},
      estadoAsistencia: [
        { value: "Asistencia", text: "Asistencia" },
        { value: "Inasistencia", text: "Falta" },
        { value: "Retardo", text: "Retardo" },
      ],
      lista: [],
      buscar:"",
    };
  },
  beforeMount() {
    this.getIdDocente();
  },
  computed:{
    getAllOfertas(){
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
    }
  },
  methods: {
    hideModal() {
      this.$refs["cursos-modalLista"].hide();
    },
    getIdDocente() {
      let nickname = localStorage.username;
      api
        .doGet("cursos/usuario/get/" + nickname)
        .then((response) => {
          this.getOfertaCursosActivo(response.data.idUsuario);
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
          this.idOferta = response.data[0].idOferta;
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
    mostrarModalLista(id) {
      api
        .doGet("/cursos/usuarios/asistencia/" + id)
        .then((response) => {
          this.lista = [];
          this.usuarios = response.data;

          for (let index = 0; index < this.usuarios.length; index++) {
            let alumno = {
              nombre: "",
              apellidoPaterno: "",
              apellidoMaterno: "",
              estudiante: {
                idUsuario: "",
              },
              oferta: {
                idOferta: "",
              },
              fechaAsistencia: "",
              estado: "",
            };

            alumno.estudiante.idUsuario = this.usuarios[index].idUsuario;
            alumno.nombre = this.usuarios[index].nombre;
            alumno.apellidoPaterno = this.usuarios[index].apellidoPaterno;
            alumno.apellidoMaterno = this.usuarios[index].apellidoMaterno;
            let fechaActual = new Date();
            let dia = fechaActual.getDate();
            let mes = fechaActual.getMonth() + 1;
            let year = fechaActual.getFullYear();
            if (mes < 10) {
              fechaActual = year + "-0" + mes + "-" + dia;
            } else {
              fechaActual = year + "-" + mes + "-" + dia;
            }
            alumno.fechaAsistencia = fechaActual;
            alumno.oferta.idOferta = id;
            this.lista.push(alumno);
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
      this.$refs["cursos-modalLista"].show();
    },
    registrar() {
      console.log(this.lista);
      api
        .doPost("/cursos/asistencia", this.lista)
        .then(() => {
          this.$swal({
            title: "El pase de lista se ha registrado exitosamente",
            icon: "success",
          });
          this.onReset();
          this.getOfertaCursosActivo();
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
