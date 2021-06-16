<template>
  <div class="row fondo">
    <div class="offset-5 col">
      <img src="../assets/Logo-utez.png" class="logo" />
    </div>
    <div class="offset-5 col-2 sesion">
      <p class="fs-4 letter letra">Login</p>
      <b-form class="d-grid gap-2 col-11 mx-auto">
        <b-form-input
          id="usuario"
          v-model="usuario"
          type="text"
          placeholder="Usuario"
          required
          style="margin-top: 5%"
        />
        <b-form-input
          id="contrasenia"
          v-model="contrasenia"
          type="password"
          placeholder="Contraseña"
          required
          style="margin-top: 10%"
        />
      </b-form>
      <div class="d-grid gap-2 col-6 mx-auto">
        <button
          type="button"
          style="margin-top: 30%"
          class="btn btn-outline-success"
        >
          GO
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 230px;
  height: 110px;
  margin-left: 20px;
}
.sesion {
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  padding-bottom: 3%;
  margin-top: 1%;
}
.letra {
  margin-top: 5%;
  margin-left: 5%;
}
.row {
  --bs-gutter-x: 0rem !important;
  align-content: center;
  flex: wrap;
}
</style>
