<template>
  <div>
    <img class="logo" src="../assets/Logo-utez.png" />
    <div class="sesion">
      <p class="fs-4 letter" style="margin-top: 5%;">Login</p>
      <form>
        <input type="text" placeholder="Usernmae" />
        <input type="text" placeholder="Password" style="margin-top: 10%;" />
      </form>
      <div class="">
        <b-button
          type="submit"
          style="margin-top: 10%;"
          variant="outline-success"
          >GO</b-button
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  width: 230px;
  height: 110px;
  margin-top: 5%;
  margin-left: auto;
  margin-right: auto;
}
.sesion {
  background: #f8f8f8;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 43px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2%;
  width: 18%;
  height: 280px;
}
.letra {
  margin-top: 5%;
}
</style>
