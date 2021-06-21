<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.letter {
  color: #00ab84;
}
input[type="text"] {
  background: transparent;
  border: none;
  border-bottom: 1px solid #00ab84;
}
input[type="password"] {
  background: transparent;
  border: none;
  border-bottom: 1px solid #00ab84;
}
.fondo {
  background-image: url("assets/fondo.png");
  height: 100vh;
}
.dirty {
  border-color: #8e8 !important;
}
.dirty:focus {
  outline-color: #8e8 !important;
}
.error {
  border-color: #f99 !important;
}
.error:focus {
  outline-color: #f99 !important;
}
.errorMsg {
  color: #f99;
  margin-top: 2%;
  font-size: small;
}
.swal2-container.swal2-center > .swal2-popup {
  flex-direction: column !important;
}
.form-group .form-control {
  padding-left: 2.5rem;
}

.form-control-icon {
  position: absolute;
  display: block;
  line-height: 2.375rem;
  text-align: center;
  width: 1.5rem;
  height: 1.5rem;
  z-index: 2;
  color: #00ab84;
  display: inline-block;
  margin: 5px;
}
.row {
  --bs-gutter-x: 0rem !important;
}
.header {
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.15);
  padding-top: 1%;
  padding-bottom: 0.5%;
}
</style>
