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
        <img class="logoUser" id="popover1" src="../assets/user.png" />
      </div>
      <b-popover target="popover1" placement="auto" triggers="hover">
        <div class="row align-items-center">
          <div class="col-5">
            <img class="logo2" id="popover1" src="../assets/logo.png" />
          </div>
          <div class="col-6">
            <h4 style="color: #707273; font-family: 'Times New Roman'">SACA</h4>
          </div>
          <div class="linea"></div>
        </div>
        <b-button
          style="color: #707273"
          class="text-decoration-none"
          variant="link"
          href="/InicioSesion"
          >Iniciar sesión</b-button
        ><br />
        <b-button
          style="color: #707273"
          class="text-decoration-none"
          variant="link"
          >Registrarse</b-button
        >
        <div class="linea"></div>
        <p style="color: #707273; text-align: center">
          Cursos al alcance de tu <br />
          mano
        </p>
      </b-popover>
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
.logo2 {
  height: 55px;
  weight: 55px;
  margin-right: 40px;
}
.linea {
  border-top: 1px solid rgba(0, 0, 0, 0.15);
  height: 0.5px;
  max-width: 200px;
  padding: 0;
  margin: 20px auto 10px auto;
}
</style>
