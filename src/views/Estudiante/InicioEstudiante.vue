<template>
  <div class="fondo">
    <div><HeaderEstudiante /></div>
    <h1>Inicio estudiante</h1>
    <div><Footer class="fixed-bottom" /></div>
  </div>
</template>

<script>
import HeaderEstudiante from "@/components/HeaderEstudiante.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    HeaderEstudiante,
    Footer,
  },
};
</script>