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
    <div>
      <h1>Ofertas</h1>
    </div>
    <div><Footer class="fixed-bottom" /></div>
  </div>
</template>

<script>
import HeaderAdmin from "@/components/HeaderAdmin.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    HeaderAdmin,
    Footer,
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