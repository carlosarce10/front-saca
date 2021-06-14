<template>
  <div class="header">
    <div class="row align-items-center">
      <div class="col-2">
        <a class="navbar-brand" href="#">
          <img class="logo" src="../assets/Logo-utez.png" />
        </a>
      </div>
      <div class="col-8">
        <form class="d-flex">
          <input
            class="buscador"
            placeholder="  Buscar curso..."
            aria-label="Search"
          />
          <button class="btn btn-outline-success buscador" type="submit">
            Buscar
          </button>
        </form>
      </div>
      <div class="col-2">
        <a href="/InicioSesion">
          <img class="logoUser" src="../assets/user.png" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 1%;
  padding-bottom: 0.5%;
}
.logo {
  height: 80px;
  weight: 80px;
  margin-left: 60px;
}
.logoUser {
  height: 55px;
  weight: 55px;
  margin-right: 60px;
  float: right;
}
.buscador {
  border: 1px solid #00ab84;
  position: relative;
  float: left;
  margin-left: 10px;
}
.navbar {
  justify-content: start;
}
.botones {
  position: absolute;
  float: right;
}
.row {
  --bs-gutter-x: 0rem !important;
}
</style>
