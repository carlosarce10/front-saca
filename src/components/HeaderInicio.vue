<template>
  <div>
    <nav class="navbar header">
      <a class="navbar-brand" href="#">
        <img class="logo" src="../assets/logo.png" />
      </a>
      <form class="d-flex">
        <input
          class="buscador"
          type="search"
          placeholder="  Buscar curso..."
          aria-label="Search"
        />
        <button class="btn btn-outline-success buscador" type="submit">
          Buscar
        </button>
      </form>
      <button
        class="btn btn-outline-success buscador"
        type="button"
        onclick="location.href='/InicioSesion'"
      >
        Iniciar sesión
      </button>
    </nav>
  </div>
</template>

<style scoped>
.header {
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.15);
}
.logo {
  height: 80px;
  weight: 80px;
  margin-left: 50px;
}
.buscador {
  border: 1px solid #00ab84;
  box-sizing: border-box;
  border-radius: 26.5px;
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
</style>
