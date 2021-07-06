<template>
  <div class="header">
    <div class="row align-items-center">
      <div class="col-2">
        <a class="navbar-brand" href="/">
          <img class="logo" src="../assets/Logo-utez.png" />
        </a>
      </div>
      <div class="col-8">
        <h3 class="titulo">Sistema Administrativo de Cursos Académicos</h3>
      </div>
      <div class="col-2">
        <b-button
          id="pagInicial"
          class="btnRegresar"
          href="/"
          variant="outline-success"
        >
          <b-icon icon="arrow-left" />
        </b-button>
        <b-tooltip target="pagInicial" triggers="hover" variant="success">
          Regresar
        </b-tooltip>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 80px;
  margin-left: 60px;
}
.btnRegresar {
  margin-right: 60px;
  float: right;
}
.navbar {
  justify-content: start;
}
.titulo {
  font-family: serif;
  color: #00ab84;
  display: flex;
  position: absolute;
  top: 6%;
}
</style>
