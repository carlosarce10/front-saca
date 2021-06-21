<template>
  <div class="fondo">
    <div><HeaderRegistro /></div>
    <div class="row">
      <div class="col-3">
        <b-form inline>
          <label class="sr-only" for="inline-form-input-name">Name</label>
          <b-form-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Jane Doe"
          ></b-form-input>

          <label class="sr-only" for="inline-form-input-username"
            >Username</label
          >
          <b-input-group prepend="@" class="mb-2 mr-sm-2 mb-sm-0">
            <b-form-input
              id="inline-form-input-username"
              placeholder="Username"
            ></b-form-input>
          </b-input-group>

          <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0"
            >Remember me</b-form-checkbox
          >

          <b-button variant="primary">Save</b-button>
        </b-form>
      </div>
      <Footer class="fixed-bottom" />
    </div>
  </div>
</template>

<script>
import Footer from "@/components/Footer.vue";
import HeaderRegistro from "@/components/HeaderRegistro.vue";
export default {
  components: {
    Footer,
    HeaderRegistro,
  },
  data() {
    return {};
  },
};
</script>
