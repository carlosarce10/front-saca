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
</style>
