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
    <div class="row" style="margin-top: 2%">
      <div class="col-10 centrar" style="background-color: #f8f8f8">
        <table class="table table-borderless table-hover">
          <thead class="table-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Curso</th>
              <th scope="col">Precio</th>
              <th scope="col">Fecha Inicio</th>
              <th scope="col">Fecha Fin</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(oferta, item) in ofertas" :key="oferta.idOferta">
              <th>
                {{ item + 1 }}
              </th>
              <td>
                {{ oferta.cursos[item].titulo }}
              </td>
              <td>
                {{ oferta.costo }}
              </td>
              <td>
                {{ oferta.fechaInicio }}
              </td>
              <td>
                {{ oferta.fechaFin }}
              </td>
              <td>
                <button class="btn btn-success" variant="outline-success" @click="inscribir(oferta.idOferta)">
                  Inscribir
                </button>
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
      ofertas: [],
      fechaFin:"",
      fechaInicio:"",
      inscripcion:{},
      status:"",
      id_oferta:"",
      usuario_id_usuario:"",
    };
  },
  beforeMount() {
    this.getCursosOferta();
    console.log(localStorage)
  },
  methods: {
    getCursosOferta() {
      api
        .doGet("cursos/oferta")
        .then((response) => (this.ofertas = response.data))
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
    inscribir(idOferta){
      console.log(idOferta)      
      this.inscripcion={
        estatus: "espera",
        oferta: {
          idOferta: idOferta
        },
        usuario: {
          nickname: localStorage.username
        }
      }
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
              html: "<span style='font-size:14pt'>Para más información contacte a su operador.</span>",
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