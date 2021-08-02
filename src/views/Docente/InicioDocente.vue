<template>
  <div class="fondo">
    <div><HeaderDocente/></div>
    <h1>Inicio docente</h1>
    <div><Footer class="fixed-bottom" /></div>
  </div>
</template>

<script>
import HeaderDocente from "@/components/HeaderDocente.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    HeaderDocente,
    Footer,
  },
};
</script>
