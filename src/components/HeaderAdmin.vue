<template>
  <div class="header">
    <div class="row align-items-center">
      <div class="col-2">
        <a class="navbar-brand" href="/administrador/inicio">
          <img class="logo" src="../assets/Logo-utez.png" />
        </a>
      </div>
      <div class="col-8">
        <h3 class="titulo">Sistema Administrativo de Cursos Académicos</h3>
      </div>
      <div class="col-2">
        <img class="logoUser" id="popover1" src="../assets/user.png" />
      </div>
      <b-popover target="popover1" placement="auto" triggers="hover">
        <div class="row align-items-center">
          <div class="col-3">
            <img class="logo2" id="popover1" src="../assets/user.png" />
          </div>
          <div class="col-8">
            <h4 style="color: #707273; font-family: 'Times New Roman'">
              Administrador
            </h4>
          </div>
          <div class="linea"></div>
        </div>
        <b-button
          style="color: #707273"
          class="text-decoration-none"
          variant="link"
          href="/administrador/inicio"
          >Solicitudes</b-button
        ><br />
        <b-button
          style="color: #707273"
          class="text-decoration-none"
          variant="link"
          href="/administrador/docentes"
          >Docentes</b-button
        ><br />
        <b-button
          style="color: #707273"
          class="text-decoration-none"
          variant="link"
          href="/administrador/cursos"
          >Cursos</b-button
        ><br />
        <b-button
          style="color: #707273"
          class="text-decoration-none"
          variant="link"
          href="/administrador/ofertas"
          >Ofertas</b-button
        ><br />
        <b-button
          style="color: #707273"
          class="text-decoration-none"
          variant="link"
          href="/"
          >Cerrar sesión</b-button
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
.logo {
  height: 80px;
  margin-left: 60px;
}
.logoUser {
  height: 55px;
  margin-right: 60px;
  float: right;
}
.navbar {
  justify-content: start;
}
.botones {
  position: absolute;
  float: right;
}
.logo2 {
  height: 55px;
  margin-right: 40px;
  margin-top: -10px;
  margin-bottom: 5px;
}
.titulo {
  font-family: serif;
  color: #00ab84;
  display: flex;
  position: absolute;
  top: 6%;
}
</style>