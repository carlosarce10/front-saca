<template>
  <div class="fondo">
    <div><HeaderAdmin /></div>
    <div>
      <h1>Inicio admin</h1>
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