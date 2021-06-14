<template>
  <div class="row fondo">
    <div class="offset-5 col">
      <img src="../assets/Logo-utez.png" class="logo" />
    </div>
    <div class="offset-5 col-2 sesion">
      <p class="fs-4 letter letra">Login</p>
      <form>
        <input
          type="text"
          placeholder="Username"
          style="margin-top: 5%; margin-left: 5%"
        />
        <input
          type="text"
          placeholder="Password"
          style="margin-top: 10%; margin-left: 5%"
        />
      </form>
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
  margin-top: 5%;
  margin-left: 20px;
}
.sesion {
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 40px;
  padding-bottom: 3%;
  margin-top: 1%;
}
.letra {
  margin-top: 15%;
  margin-left: 5%;
}
.boton {
  margin-left: auto;
  margin-right: auto;
}
.row {
  --bs-gutter-x: 0rem !important;
  align-content: center;
  flex: wrap;
}
.fondo {
  background-image: url("../assets/fondo.png");
  height: 100vh;
}
</style>
