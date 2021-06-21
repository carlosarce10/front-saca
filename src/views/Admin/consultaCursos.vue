<template>
  <div class="row fondo">
    <div class="home">
      <HeaderInicio />
      <div class="container">
        <div class="row justify-content-lg-center">
          <div class="col-md-auto">
            <h1>Consulta de Cursos</h1>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12 col-md-8" id="modal">
          <b-button id="show-btn" @click="showModal">Registrar Curso</b-button>
        </div>
      </div>
      <div class="row justify-content-end">
        <div class="col-4">
          <b-form>
            <div class="buscador">
              <b-form-input
                size="sm"
                class="mr-sm-2"
                placeholder="Buscar..."
              ></b-form-input>
            </div>
            <div class="btnBuscador">
              <button
                size="sm"
                class="my-2 my-sm-0 btn btn-secondary"
                type="submit">
                Buscar
              </button>
            </div>
          </b-form>
        </div>
      </div>
      
      <b-modal ref="my-modal" hide-footer title="Registro">
        <div>
          <b-form >
            <b-form-group id="input-group-1" style="padding: 5px;">
              <b-form-input
                id="titulo"
                v-model="form.titulo"
                type="text"
                placeholder="Titulo"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" style="padding: 5px;">
              <b-form-input
                id="descripcion"
                v-model="form.descripcion"
                placeholder="Ingrese la descripcion"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" style="padding: 5px;">
              <b-form-input
                id="requisitos"
                v-model="form.requisitos"
                placeholder="Ingrese los requisitos"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" style="padding: 5px;">
              <b-form-input
                id="duracion"
                v-model="form.duracion"
                placeholder="Ingrese la duración"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-5" style="padding: 5px;">
              <b-form-textarea
                id="temario"
                v-model="form.temario"
                placeholder="Ingrese el temario"
                required
              ></b-form-textarea>
            </b-form-group>
          </b-form>
          <div>
            <b-button
              class="mt-2"
              variant="outline-success"
              style="margin: 5px"
              type="submit"
              @click="registrar">Guardar
            </b-button>
            <b-button
                class="mt-2"
                variant="outline-danger"
                style="margin: 5px"
                block
                @click="hideModal">Cerrar
            </b-button>
          </div>
        </div>
      </b-modal>
      <br />
      <div id="table">
        <b-table :items="items" :fields="fields" caption-top>
          <template #cell(actions)>
            <button class="btn btn-primary" @click="mostrar()" >Editar</button>
            <button @click="mostrar()" class="btn btn-danger">Eliminar</button>
          </template>
        </b-table>
      </div>

      <Footer class="fixed-bottom" />
    </div>
  </div>
</template>
<script>
import HeaderInicio from "@/components/HeaderInicio.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    HeaderInicio,
    Footer,
  },
  data() {
    return {
      fields: ["Titulo", "Descripcion", "Requesitos", "Duración", "Acciones"],
      items: [
        { Requesitos: 40, Titulo: "Dickerson", Descripcion: "Macdonald" },
        { Requesitos: 21, Titulo: "Larsen", Descripcion: "Shaw" },
        { Requesitos: 89, Titulo: "Geneva", Descripcion: "Wilson" },
      ],
      form: {
        email: "",
        name: "",
        food: null,
        checked: [],
      }
    };
  },
  methods: {
    mostrar() {
      alert("Hola bbs");
    },
    showModal() {
      this.$refs["my-modal"].show();
    },
    hideModal() {
      this.$refs["my-modal"].hide();
    },
    registrar() {},
  },
};
</script>
<style scoped>
#table {
  width: 65%;
  margin-left: 20%;
}
#modal {
  position: absolute;
  float: left;
  margin-top: -30px;
  padding-left: 25px;
}

.buscador {
  width: 250px;
  float: right;
  margin-right: 100px;
  margin-top: -30px;
}
.btnBuscador {
  float: right;
  margin-right: -340px;
  margin-top: -30px;
}
</style>