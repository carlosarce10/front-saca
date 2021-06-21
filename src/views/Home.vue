<template>
  <div class="row fondo">
    <div class="home">
      <HeaderInicio />
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
};
</script>