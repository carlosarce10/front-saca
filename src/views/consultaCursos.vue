<template>
  <div>
        <div>
            <HeaderInicio />
        </div>

        <h1>Consulta de Cursos</h1>
        <div id="modal">
            <b-button id="show-btn" @click="showModal">Registrar Curso</b-button>
            
        </div>

         <b-modal ref="my-modal" hide-footer title="Registro">
            <div>
                <b-form  v-if="show">
                    <b-form-group
                        id="input-group-1"
                        label="Titulo"                                        
                    >
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
                <b-button class="mt-2" variant="outline-danger" block @click="hideModal">Cerrar</b-button>
                <b-button class="mt-2" variant="outline-primary" type="submit"  @click="registrar">Guardar</b-button>               
            </div>
        </b-modal>

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
      fields: ["first_name", "last_name", "age", "actions"],
      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
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
        this.$refs['my-modal'].show()
    },
    hideModal() {
    this.$refs['my-modal'].hide()
    },
    registrar(){
        
    }
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
</style>