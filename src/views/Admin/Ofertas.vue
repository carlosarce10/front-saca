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

    <!-- form del modal Registrar-->
    <b-modal ref="cursos-modal" size="lg" hide-footer title="Registro">
      <div class="row">
        <div>
          <div class="row">
            <div class="col-3 centrar">
              <h6>Docente</h6>
              <b-form-select
                v-model="$v.docente.$model"
                :class="status($v.docente)"
                class="form-select"
              >
                <b-form-select-option
                  v-bind:key="option.idUsuario"
                  v-for="option in listaDocentes"
                  :value="option.idUsuario"
                >
                  {{ option.nombre }} {{ option.apellidoPaterno }}
                  {{ option.apellidoMaterno }}
                </b-form-select-option>
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.docente.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-3 centrar">
              <h6>Divisiones</h6>
              <b-form-select
                :options="divisiones"
                v-model="$v.division.$model"
                :class="status($v.division)"
                class="form-select"
              >
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.division.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-5 centrar">
              <h6>Curso</h6>
              <b-form-select
                v-model="$v.curso.$model"
                :class="status($v.curso)"
                class="form-select"
              >
                <b-form-select-option
                  v-bind:key="option.idCurso"
                  v-for="option in listaCursos"
                  :value="option.idCurso"
                >
                  {{ option.titulo }}
                </b-form-select-option>
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.curso.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-3 centrar">
              <h6>Modalidad</h6>
              <b-form-select
                :options="modalidades"
                v-model="$v.modalidad.$model"
                :class="status($v.modalidad)"
                class="form-select"
              >
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.modalidad.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-3 centrar">
              <h6>Tipo</h6>
              <b-form-select
                :options="tipoCursos"
                v-model="$v.tipoCurso.$model"
                :class="status($v.tipoCurso)"
                class="form-select"
              >
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.tipoCurso.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-5 centrar">
              <h6>Clasificaciones</h6>
              <b-form-select
                :options="clasificaciones"
                v-model="$v.clasificacion.$model"
                :class="status($v.clasificacion)"
                class="form-select"
              >
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.clasificacion.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-3 centrar">
              <b-form-input
                id="costo"
                type="number"
                v-model="$v.costo.$model"
                :class="status($v.costo)"
                placeholder="Costo"
              />
              <div
                class="error errorMsg"
                v-if="!$v.costo.required && $v.costo.$dirty"
              >
                Este campo no puede ir vacío
              </div>
            </div>
            <div class="col-3 centrar">
              <b-form-input
                id="minAlum"
                type="number"
                v-model="$v.minAlum.$model"
                :class="status($v.minAlum)"
                placeholder="Mínimo de participantes"
              />
              <div
                class="error errorMsg"
                v-if="!$v.minAlum.required && $v.minAlum.$dirty"
              >
                Este campo no puede ir vacío
              </div>
            </div>
            <div class="col-3 centrar">
              <b-form-input
                id="maxAlum"
                type="number"
                v-model="$v.maxAlum.$model"
                :class="status($v.maxAlum)"
                placeholder="Máximo de participantes"
              />
              <div
                class="error errorMsg"
                v-if="!$v.maxAlum.required && $v.maxAlum.$dirty"
              >
                Este campo no puede ir vacío
              </div>
              <br />
            </div>
            <div class="col-5 centrar">
              <label for="datepicker-full-width">Periodo del curso</label>
              <b-form-datepicker
                v-model="$v.fechaPeriodo.$model"
                :class="status($v.fechaPeriodo)"
                menu-class="w-100"
                calendar-width="100%"
                class="mb-2"
              ></b-form-datepicker>
              <div class="error errorMsg" v-if="!$v.fechaPeriodo.required">
                Este campo no puede ir vacío
              </div>
            </div>
            <div class="col-5 centrar">
              <label for="datepicker-full-width">Fecha de inicio</label>
              <b-form-datepicker
                v-model="$v.fechaInicio.$model"
                :class="status($v.fechaInicio)"
                menu-class="w-100"
                calendar-width="100%"
                class="mb-2"
              ></b-form-datepicker>
              <div class="error errorMsg" v-if="!$v.fechaInicio.required">
                Este campo no puede ir vacío
              </div>
              <br />
            </div>
            <div class="col-5" style="margin-left: 4%">
              <label for="datepicker-full-width">Fecha a concluir</label>
              <b-form-datepicker
                v-model="$v.fechaFin.$model"
                menu-class="w-100"
                :class="status($v.fechaFin)"
                calendar-width="100%"
                class="mb-2"
              ></b-form-datepicker>
              <div class="error errorMsg" v-if="!$v.fechaFin.required">
                Este campo no puede ir vacío
              </div>
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
            v-on:click="hideModal"
            :disabled="
              !(
                !$v.costo.$invalid &&
                $v.costo.$dirty &&
                !$v.minAlum.$invalid &&
                $v.minAlum.$dirty &&
                !$v.maxAlum.$invalid &&
                $v.maxAlum.$dirty &&
                !$v.fechaPeriodo.$invalid &&
                $v.fechaPeriodo.$dirty &&
                !$v.fechaInicio.$invalid &&
                $v.fechaInicio.$dirty &&
                !$v.fechaFin.$invalid &&
                $v.fechaFin.$dirty &&
                !$v.modalidad.$invalid &&
                $v.modalidad.$dirty &&
                !$v.division.$invalid &&
                $v.division.$dirty &&
                !$v.clasificacion.$invalid &&
                $v.clasificacion.$dirty &&
                !$v.docente.$invalid &&
                $v.docente.$dirty &&
                !$v.curso.$invalid &&
                $v.curso.$dirty
              )
            "
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

    <!-- form del modal Editar -->
    <b-modal ref="cursos-modalEdit" size="lg" hide-footer title="Editar">
      <div class="row">
        <div>
          <div class="row">
            <div class="col-3 centrar">
              <h6>Docente</h6>
              <b-form-select
                v-model="$v.docenteEdit.$model"
                :class="status($v.docenteEdit)"
                class="form-select"
              >
                <b-form-select-option
                  v-bind:key="option.idUsuario"
                  v-for="option in listaDocentes"
                  :value="option.idUsuario"
                >
                  {{ option.nombre }} {{ option.apellidoPaterno }}
                  {{ option.apellidoMaterno }}
                </b-form-select-option>
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.docenteEdit.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-3 centrar">
              <h6>Divisiones</h6>
              <b-form-select
                :options="divisiones"
                v-model="$v.divisionEdit.$model"
                :class="status($v.divisionEdit)"
                class="form-select"
              >
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.divisionEdit.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-5 centrar">
              <h6>Curso</h6>
              <b-form-select
                v-model="$v.cursoEdit.$model"
                :class="status($v.cursoEdit)"
                class="form-select"
              >
                <b-form-select-option
                  v-bind:key="option.idCurso"
                  v-for="option in listaCursos"
                  :value="option.idCurso"
                >
                  {{ option.titulo }}
                </b-form-select-option>
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.cursoEdit.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-3 centrar">
              <h6>Modalidad</h6>
              <b-form-select
                :options="modalidades"
                v-model="$v.modalidadEdit.$model"
                :class="status($v.modalidadEdit)"
                class="form-select"
              >
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.modalidadEdit.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-3 centrar">
              <h6>Tipo</h6>
              <b-form-select
                :options="tipoCursos"
                v-model="$v.tipoCursoEdit.$model"
                :class="status($v.tipoCursoEdit)"
                class="form-select"
              >
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.tipoCursoEdit.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-5 centrar">
              <h6>Clasificaciones</h6>
              <b-form-select
                :options="clasificaciones"
                v-model="$v.clasificacionEdit.$model"
                :class="status($v.clasificacionEdit)"
                class="form-select"
              >
              </b-form-select>
              <div class="error errorMsg" v-if="!$v.clasificacionEdit.required">
                Debe seleccionar una opción
              </div>
              <br />
            </div>
            <div class="col-3 centrar">
              <b-form-input
                id="costo"
                type="number"
                v-model="$v.costoEdit.$model"
                :class="status($v.costoEdit)"
                placeholder="Costo"
              />
              <div
                class="error errorMsg"
                v-if="!$v.costoEdit.required && $v.costoEdit.$dirty"
              >
                Este campo no puede ir vacío
              </div>
            </div>
            <div class="col-3 centrar">
              <b-form-input
                id="minAlum"
                type="number"
                v-model="$v.minAlumEdit.$model"
                :class="status($v.minAlumEdit)"
                placeholder="Mínimo de participantes"
              />
              <div
                class="error errorMsg"
                v-if="!$v.minAlumEdit.required && $v.minAlumEdit.$dirty"
              >
                Este campo no puede ir vacío
              </div>
            </div>
            <div class="col-3 centrar">
              <b-form-input
                id="maxAlum"
                type="number"
                v-model="$v.maxAlumEdit.$model"
                :class="status($v.maxAlumEdit)"
                placeholder="Máximo de participantes"
              />
              <div
                class="error errorMsg"
                v-if="!$v.maxAlumEdit.required && $v.maxAlumEdit.$dirty"
              >
                Este campo no puede ir vacío
              </div>
              <br />
            </div>
            <div class="col-5 centrar">
              <label for="datepicker-full-width">Periodo del curso</label>
              <b-form-datepicker
                v-model="$v.fechaPeriodoEdit.$model"
                :class="status($v.fechaPeriodoEdit)"
                menu-class="w-100"
                calendar-width="100%"
                class="mb-2"
              ></b-form-datepicker>
              <div class="error errorMsg" v-if="!$v.fechaPeriodoEdit.required">
                Este campo no puede ir vacío
              </div>
            </div>
            <div class="col-5 centrar">
              <label for="datepicker-full-width">Fecha de inicio</label>
              <b-form-datepicker
                v-model="$v.fechaInicioEdit.$model"
                :class="status($v.fechaInicioEdit)"
                menu-class="w-100"
                calendar-width="100%"
                class="mb-2"
              ></b-form-datepicker>
              <div class="error errorMsg" v-if="!$v.fechaInicioEdit.required">
                Este campo no puede ir vacío
              </div>
              <br />
            </div>
            <div class="col-5" style="margin-left: 4%">
              <label for="datepicker-full-width">Fecha a concluir</label>
              <b-form-datepicker
                v-model="$v.fechaFinEdit.$model"
                menu-class="w-100"
                :class="status($v.fechaFinEdit)"
                calendar-width="100%"
                class="mb-2"
              ></b-form-datepicker>
              <div class="error errorMsg" v-if="!$v.fechaFinEdit.required">
                Este campo no puede ir vacío
              </div>
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
            @click="editar()"
            v-on:click="hideModalEdit"
            :disabled="
              !(
                (!$v.costoEdit.$invalid && $v.costoEdit.$dirty) &
                  (!$v.minAlumEdit.$invalid && $v.minAlumEdit.$dirty) &
                  (!$v.maxAlumEdit.$invalid && $v.maxAlumEdit.$dirty) &
                  (!$v.fechaPeriodoEdit.$invalid ||
                    $v.fechaPeriodoEdit.$dirty) ||
                (!$v.fechaInicioEdit.$invalid && $v.fechaInicioEdit.$dirty) ||
                (!$v.fechaFinEdit.$invalid &&
                  $v.fechaFinEdit.$dirty &&
                  !$v.modalidadEdit.$invalid &&
                  !$v.divisionEdit.$invalid &&
                  !$v.clasificacionEdit.$invalid &&
                  !$v.docenteEdit.$invalid &&
                  !$v.cursoEdit.$invalid)
              )
            "
            >Ok
          </b-button>
          <b-button
            class="mt-2"
            variant="outline-danger"
            style="margin: 5px; float: right"
            block
            @click="hideModalEdit"
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
          v-for="(oferta,item) in ofertasList"
          :key="oferta.id"
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
                  style="float: right; margin-left: 2%"
                  variant="outline-danger"
                  @click="eliminar(oferta.idOferta)"
                >
                  <b-icon icon="trash-fill" />
                </b-button>
                <b-button
                  style="float: right; margin-left: 2%"
                  variant="outline-primary"
                  @click="mostrarModalEdit(oferta.idOferta)"
                >
                  <b-icon icon="pencil-square" />
                </b-button>
          </div>
        </div>
      </div>    
    <div><Footer class="fixed-bottom" /></div>
  </div>
</template>

<script>
import HeaderAdmin from "@/components/HeaderAdmin.vue";
import Footer from "@/components/Footer.vue";
import api from "../../util/api";
import { required } from "vuelidate/lib/validators";

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
      modalidades: [
        { value: 1, text: "Online" },
        { value: 2, text: "Presencial" },
      ],
      divisiones: [
        { value: 1, text: "DATEFI" },
        { value: 2, text: "DACEA" },
        { value: 3, text: "DAMI" },
        { value: 4, text: "DATIC" },
      ],
      clasificaciones: [
        { value: 1, text: "Tecnologías de la información y la comunicación" },
        { value: 2, text: "Economía Administrativa" },
        { value: 3, text: "Ciencias básicas y matemáticas" },
      ],
      tipoCursos: [
        { value: "taller", text: "Taller" },
        { value: "diplomado", text: "Diplomado" },
      ],
      modalidad: "",
      division: "",
      clasificacion: "",
      docente: "",
      curso: [],
      ofertasList: [],
      oferta: {},
      ofertaEdit: {},
      listaCursos: [],
      listaDocentes: [],
      tipoCursoEdit: "",
      costoEdit: "",
      minAlumEdit: "",
      maxAlumEdit: "",
      fechaPeriodoEdit: "",
      fechaInicioEdit: "",
      fechaFinEdit: "",
      modalidadEdit: "",
      divisionEdit: "",
      clasificacionEdit: "",
      docenteEdit: "",
      cursoEdit: "",
      fechaInicioCard:[],
      fechaFinCard:[],

    };
  },
  beforeMount() {
    this.getLists();
    this.getOferta();
  },
  methods: {
    mostrarModal() {
      this.$refs["cursos-modal"].show();
    },
    hideModal() {
      this.$refs["cursos-modal"].hide();
    },
    mostrarModalEdit(id) {
      api
        .doGet("cursos/oferta/" + id)
        .then((response) => {
          this.costoEdit = response.data.costo;
          this.minAlumEdit = response.data.minimoParticipantes;
          this.maxAlumEdit = response.data.maximoParticipantes;
          this.fechaPeriodoEdit = response.data.fechaPeriodoInscripcion;
          this.fechaInicioEdit = response.data.fechaInicio;
          this.fechaFinEdit = response.data.fechaFin;
          this.modalidadEdit = response.data.modalidades[0].idModalidad;
          this.divisionEdit = response.data.divisiones[0].idDivision;
          this.clasificacionEdit = response.data.clasificaciones[0].idClasificacion;
          this.docenteEdit = response.data.docentes[0].idUsuario;
          this.cursoEdit = response.data.cursos[0].idCurso;
          this.tipoCursoEdit = response.data.tipoCurso;
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

      this.$refs["cursos-modalEdit"].show();
    },
    hideModalEdit() {
      this.$refs["cursos-modalEdit"].hide();
    },
     
    getLists() {
      api.doGet("cursos/docente/getAll").then((resultDocente) => {
        this.listaDocentes = resultDocente.data;
      });
      api.doGet("cursos/curso/getAll").then((resultCurso) => {
        this.listaCursos = resultCurso.data;
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
        tipoCurso: this.tipoCurso,
        modalidades: [{ idModalidad: this.modalidad }],
        divisiones: [{ idDivision: this.division }],
        clasificaciones: [{ idClasificacion: this.clasificacion }],
        docentes: [{ idUsuario: this.docente }],
        cursos: [{ idCurso: this.curso }],
      };
      api
        .doPost("cursos/oferta", this.oferta)
        .then(() => {
          this.$swal({
            title: "La oferta se registro exitosamente",
            icon: "success",
          });
          this.getOferta();
          //this.onReset();
          
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
    getOferta() {
      //this.ofertasList = response.data
      api
        .doGet("cursos/oferta")
        .then((response) => {
          this.ofertasList = response.data
          let arrFechaF = [];
          let arrFechaI = [];
          for(let i = 0; i<this.ofertasList.length; i++){
            arrFechaF.push(this.ofertasList[i].fechaFin)
            arrFechaI.push(this.ofertasList[i].fechaInicio)
          }
          for(let j = 0; j< arrFechaF.length; j++){
            let dateF  = new Date(arrFechaF[j]);
            this.fechaFinCard[j] = (dateF.getDate()+1)+"-"+(dateF.getMonth()+1)+"-"+dateF.getFullYear();            
          }
          for(let k = 0; k< arrFechaI.length; k++){          
            let dateI  = new Date(arrFechaI[k]);
            this.fechaInicioCard[k] = (dateI.getDate()+1)+"-"+(dateI.getMonth()+1)+"-"+dateI.getFullYear();       
          }
        })
        .catch((error) => {
          
          let errorResponse = error.response.data;
          if (errorResponse.errorExists) {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              icon: "error",
            });
          } else {
            this.$swal({
              title: "Oops! Ha ocurrido un error en el servidor.",
              icon: "error",
            });
          }
        }).finally(() => (this.loading = false));
    },
    dateFormate() {
      
      /*this.fechaPeriodoF = this.ofertasList.fechaInicio
      var d = new Date(this.fechaPeriodo);
      var day = d.getUTCDate();
      var month = d.getUTCMonth() + 1;
      var year = d.getUTCFullYear();
      this.fechaPeriodoF = year + "-" + month + "-" + day;
      console.log(this.fechaPeriodoF)*/
    },
    eliminar(id) {
      this.$swal({
        title: "¿Estás seguro de eliminar esta oferta?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#64b5f6",
        cancelButtonColor: "#ff7674",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true,
      }).then((result) => {
        if (result.isConfirmed) {
          api
            .doDelete("cursos/oferta/" + id)
            .then(() => {
              this.$swal({
                title: "!Oferta eliminada exitosamente!",
                icon: "success",
              });
              this.getOferta();
            })
            .catch((error) => {
              let errorResponse = error.response.data;
              if (errorResponse.errorExists) {
                this.$swal({
                  title: "Oops! Ha ocurrido un error en el servidor.",
                  html:
                    "<span style='font-size:14pt'><b>" +
                    errorResponse.code +
                    "</b> " +
                    errorResponse.message +
                    "<br>Contacte a su operador para más detalles.</span>",
                  icon: "error",
                });
              } else {
                this.$swal({
                  title: "Oops! Ha ocurrido un error en el servidor.",
                  html:
                    "<span style='font-size:14pt'>Contacte a su operador para más detalles.</span>",
                  icon: "error",
                });
              }
            })
            .finally(() => (this.loading = false));
        }
      });
    },
    editar() {
      this.ofertaEdit = {
        idOferta: this.ofertaId,
        costo: this.costoEdit,
        minimoParticipantes: this.minAlumEdit,
        maximoParticipantes: this.maxAlumEdit,
        fechaPeriodoInscripcion: this.fechaPeriodoEdit,
        fechaInicio: this.fechaInicioEdit,
        fechaFin: this.fechaFinEdit,
        tipoCurso: this.tipoCursoEdit,
        modalidades: [{ idModalidad: this.modalidadEdit }],
        divisiones: [{ idDivision: this.divisionEdit }],
        clasificaciones: [{ idClasificacion: this.clasificacionEdit }],
        docentes: [{ idUsuario: this.docenteEdit }],
        cursos: [{ idCurso: this.cursoEdit }],
      };
      api
        .doPut("cursos/oferta", this.ofertaEdit)
        .then(() => {
          this.$swal({
            title: "Se ha modificado exitosamente",
            icon: "success",
          });
          this.onReset();
          this.getOferta();
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
    /* onReset() {
       this.tipoCurso = "",
      this.costo= "",
      this.minAlum= "",
      this.maxAlum= "",
      this.fechaPeriodo= "",
      this.fechaInicio= "",
      this.fechaFin= "",
      this.modalidad= "",
      this.division= "",
      this.clasificacion= "", 
      this.docente= "",
      this.curso= "",
      this.tipoCursoEdit= "", 
      this.costoEdit= "",
      this.minAlumEdit= "",
      this.maxAlumEdit= "",
      this.fechaPeriodoEdit= "",
      this.fechaInicioEdit= "",
      this.fechaFinEdit= "",
      this.modalidadEdit = "",
      this.divisionEdit= "",
      this.clasificacionEdit = "", 
      this.docenteEdit = "",
      this.cursoEdit = "",
    }, */
    status(validation) {
      return {
        error: validation.$error,
        dirty: validation.$dirty,
      };
    },
  },
  validations: {
    tipoCurso: { required },
    costo: { required },
    minAlum: { required },
    maxAlum: { required },
    fechaPeriodo: { required },
    fechaInicio: { required },
    fechaFin: { required },
    modalidad: { required },
    division: { required },
    clasificacion: { required },
    docente: { required },
    curso: { required },
    tipoCursoEdit: { required },
    costoEdit: { required },
    minAlumEdit: { required },
    maxAlumEdit: { required },
    fechaPeriodoEdit: { required },
    fechaInicioEdit: { required },
    fechaFinEdit: { required },
    modalidadEdit: { required },
    divisionEdit: { required },
    clasificacionEdit: { required },
    docenteEdit: { required },
    cursoEdit: { required },
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
/* input[type="text"] {
  background: transparent;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  border-right: 1px solid rgba(0, 0, 0, 0.15);
} */
</style>