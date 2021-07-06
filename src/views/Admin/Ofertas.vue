<template>
  <div class="fondo">
    <div><HeaderAdmin /></div>
    <div class="row" style="margin-top: 2%">
      <div class="offset-8 col-3">
        <div class="row px-2">
          <!-- Boton modal -->
          <div id="modal" class="col-1 centrar">
            <b-button
              id="show-btn"
              @click="mostrarModal"
              variant="outline-success"
              ><b-icon icon="clipboard-plus"
            /></b-button>
          </div>
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
                  placeholder="  Buscar oferta..."
                  aria-label="Search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- form del modal -->
    <b-modal ref="cursos-modal" size="lg" hide-footer title="Registro">
      <div class="row">
        <div>
          <div class="row">
            <div class="col-3 centrar">
              <h6>Docente</h6>
              <b-form-select v-model="docente" class="form-select">
                <b-form-select-option
                  v-bind:key="option.idUsuario"
                  v-for="option in listaDocentes"
                  :value="option.idUsuario"
                >
                  {{ option.nombre }} {{ option.apellidoPaterno }}
                  {{ option.apellidoMaterno }}
                </b-form-select-option>
              </b-form-select>
              <br />
            </div>
            <div class="col-3 centrar">
              <h6>Divisiones</h6>
              <b-form-select v-model="division" class="form-select">
                <b-form-select-option> DATIC </b-form-select-option>
                <b-form-select-option> DACEA </b-form-select-option>
                <b-form-select-option> DAMI </b-form-select-option>
                <b-form-select-option> DATEFI </b-form-select-option>
              </b-form-select>
              <br />
            </div>
            <div class="col-5 centrar">
              <h6>Curso</h6>
              <b-form-select v-model="curso" class="form-select">
                <b-form-select-option
                  v-bind:key="option.idCurso"
                  v-for="option in listaCursos"
                  :value="option.idCurso"
                >
                  {{ option.titulo }}
                </b-form-select-option>
              </b-form-select>
              <br />
            </div>
            <div class="col-3 centrar">
              <h6>Modalidad</h6>
              <b-form-select v-model="modalidad" class="form-select">
                <b-form-select-option> Online </b-form-select-option>
                <b-form-select-option> Presencial </b-form-select-option>
              </b-form-select>
              <br />
            </div>
            <div class="col-3 centrar">
              <h6>Tipo</h6>
              <b-form-select v-model="tipoCurso" class="form-select">
                <b-form-select-option> Diplomado </b-form-select-option>
                <b-form-select-option> Taller </b-form-select-option>
              </b-form-select>
              <br />
            </div>
            <div class="col-5 centrar">
              <h6>Clasificaciones</h6>
              <b-form-select v-model="clasificacion" class="form-select">
                <b-form-select-option>
                  Tecnologías de la información y la comunicación
                </b-form-select-option>
                <b-form-select-option>
                  Economía Administrativa
                </b-form-select-option>
                <b-form-select-option>
                  Mecánica industrial
                </b-form-select-option>
                <b-form-select-option>
                  Ciencias básicas y matemáticas
                </b-form-select-option>
                <b-form-select-option> Idiomas </b-form-select-option>
                <b-form-select-option> Otros </b-form-select-option>
              </b-form-select>
              <br />
            </div>
            <div class="col-3 centrar">
              <b-form-input
                id="costo"
                type="number"
                v-model="costo"
                placeholder="Costo"
              />
            </div>
            <div class="col-3 centrar">
              <b-form-input
                id="minAlum"
                type="number"
                v-model="minAlum"
                placeholder="Mínimo de participantes"
              />
            </div>
            <div class="col-3 centrar">
              <b-form-input
                id="minAlum"
                type="number"
                v-model="minAlum"
                placeholder="Máximo de participantes"
              />
              <br />
            </div>
            <div class="col-5 centrar">
              <label for="datepicker-full-width">Periodo del curso</label>
              <b-form-datepicker
                id="datepicker-full-width"
                v-model="fechaPeriodo"
                menu-class="w-100"
                calendar-width="100%"
                class="mb-2"
              ></b-form-datepicker>
            </div>
            <div class="col-5 centrar">
              <label for="datepicker-full-width">Fecha de inicio</label>
              <b-form-datepicker
                id="datepicker-full-width"
                v-model="fechaInicio"
                menu-class="w-100"
                calendar-width="100%"
                class="mb-2"
              ></b-form-datepicker>
              <br />
            </div>
            <div class="col-5" style="margin-left: 4%">
              <label for="datepicker-full-width">Fecha a concluir</label>
              <b-form-datepicker
                id="datepicker-full-width"
                v-model="fechaFin"
                menu-class="w-100"
                calendar-width="100%"
                class="mb-2"
              ></b-form-datepicker>
            </div>
          </div>
          <hr />
        </div>
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

    <!-- Tabla -->
    <div class="row" style="margin-top: 2%">
      <div class="col-10 centrar" style="background-color: #f8f8f8">
        <table class="table table-borderless table-hover">
          <thead class="table-success">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre(s)</th>
              <th scope="col">Apellido Paterno</th>
              <th scope="col">Apellido Materno</th>
              <th scope="col">Nickname</th>
              <th scope="col">Correo</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(oferta, item) in ofertas" :key="oferta.id">
              <th>
                {{ item + 1 }}
              </th>
              <td>
                {{ oferta.nombre }}
              </td>
              <td>
                <button
                  class="btn btn-danger"
                  @click="eliminar(usuario.idUsuario)"
                >
                  eliminar
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
      tipoCurso: "",
      costo: "",
      minAlum: "",
      maxAlum: "",
      fechaPeriodo: "",
      fechaInicio: "",
      fechaFin: "",
      modalidad: [],
      division: [],
      clasificacion: [],
      docente: [],
      curso: [],
      ofertas: [],
      oferta: {},
      listaCursos: [],
      listaDocentes: [],
    };
  },
  beforeMount() {
    this.getLists();
  },
  methods: {
    mostrarModal() {
      this.$refs["cursos-modal"].show();
    },
    hideModal() {
      this.$refs["cursos-modal"].hide();
    },
    getLists() {
      api.doGet("cursos/docente/getAll").then((resultDocente) => {
        this.listaDocentes = resultDocente.data;
        console.log(this.listaDocentes);
      });
      api.doGet("cursos/curso/getAll").then((resultCurso) => {
        this.listaCursos = resultCurso.data;
        console.log(this.listaCursos);
      });
    },
    registrar() {
      this.oferta = {
        costo: this.costo,
        minimoParticipantes: this.minAlum,
        maximoParticipantes: this.maxAlum,
        fechaPeriodoInscripcion: this.fechaPeriodo,
        fechaInicio: this.fechaInicio,
        fechaFin: this.fechaFin,
        modalidades: {
          id: this.modalidad,
        },
        division: {},
        clasificacion: {},
        docente: {},
        curso: {},
      };
      api.doPost("cursos/oferta", this.oferta);
    },
  },
  validations: {},
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
/* input[type="text"] {
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(0, 0, 0, 0.15);
} */
</style>