<template>
  <nav>
    <router-link to="/" v-if="!this.usuarioAutenticado"
      >Iniciar sesion</router-link
    >
    <router-link v-if="!this.usuarioAutenticado" to="/about">About</router-link>
    <button
      v-on:click="CierreSesion"
      id="btnCerrarSesion"
      v-if="this.usuarioAutenticado"
    >
      Cerrar sesion
    </button>
  </nav>
  <router-view />
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      idUsuario: "",
    };
  },
  methods: {
    ...mapActions(["cierre"]),
    CierreSesion() {
      this.cierre();
      this.$router.push("/");
    },
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("components/Imagenes/FondoInicioSesion.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: right;
  position: relative;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding-right: 3px;
  padding-left: 3px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
#btnCerrarSesion {
  display: flex;
  justify-content: right;
  position: relative;
  background-color: transparent;
  border-color: transparent;
  color: #42b983;
}
</style>
