<template>
  <div>
    <div>
      <HeaderInicio />
    </div>

    <h1>Consulta de Cursos</h1>
    <div id="modal">
      <b-button id="show-btn" @click="showModal">Registrar Curso</b-button>
    </div>
    <div>      
      <b-form>
        <div class="buscador">
          <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Buscar..."
          ></b-form-input>        
        </div>
        <div class="btnBuscador">
          <button size="sm" class="my-2 my-sm-0 btn btn-secondary" type="submit">Buscar</button>
        </div>
      </b-form>
    </div>

    <b-modal ref="my-modal" hide-footer title="Registro">
      <div>
        <b-form v-if="show">
          <b-form-group id="input-group-1" label="Titulo">
            <b-form-input
              id="titulo"
              v-model="form.titulo"
              type="text"
              placeholder="Titulo"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Descripción">
            <b-form-input
              id="descripcion"
              v-model="form.descripcion"
              placeholder="Ingrese la descripcion"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-3" label="Requisitos:">
            <b-form-input
              id="requisitos"
              v-model="form.requisitos"
              placeholder="Ingrese los requisitos"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-4" label="Duracion:">
            <b-form-input
              id="duracion"
              v-model="form.duracion"
              placeholder="Ingrese la duración"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-5" label="Temario:">
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
            variant="outline-danger"
            style="margin: 5px"
            block
            @click="hideModal"
            >Cerrar</b-button
          >
          <b-button
            class="mt-2"
            variant="outline-primary"
            style="margin: 5px"
            type="submit"
            @click="registrar"
            >Guardar</b-button
          >
        </div>
      </div>
    </b-modal>
    <br />
    <div id="table">
      <b-table :items="items" :fields="fields" caption-top>
        <template #cell(actions)>
          <button @click="mostrar()" class="btn btn-primary">Editar</button>
          <button @click="mostrar()" class="btn btn-danger">Eliminar</button>
        </template>
      </b-table>
    </div>
  </div>
</template>
<script>
import HeaderInicio from "@/components/HeaderInicio.vue";

export default {
  name: "Home",
  components: {
    HeaderInicio,
  },
  data() {
    return {
      fields: ["Titulo", "Descripcion", "Requesitos","Duración", "Acciones"],
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
      },
      foods: [
        { text: "Select One", value: null },
        "Carrots",
        "Beans",
        "Tomatoes",
        "Corn",
      ],
      show: true,
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
  width: 50%;
  margin-left: 25%;
}
#modal {
  position: absolute;
  float: left;
  margin-top: -30px;
  padding-left: 25px;
}

.buscador{
  width: 250px;
  float: right;
  margin-right: 100px;
  margin-top: -30px;
}
.btnBuscador{
  float: right;
  margin-right: -340px;
  margin-top: -30px;  
}
</style>