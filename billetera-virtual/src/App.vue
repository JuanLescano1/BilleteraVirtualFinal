<template>
  <div>
    <nav>
      <router-link v-if="!usuarioAutenticado" to="/">Inicio |</router-link>
      <router-link v-if="!usuarioAutenticado" to="/about">Info</router-link>
      <router-link v-if="usuarioAutenticado" to="/crypto">
        Monedas|
      </router-link>
      <router-link v-if="usuarioAutenticado" to="/venta">Venta|</router-link>
      <router-link v-if="usuarioAutenticado" to="/">Historial|</router-link>
      <router-link v-if="usuarioAutenticado" to="/usuario">
        Usuario
      </router-link>
    </nav>
    <router-view />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["usuarioAutenticado"]),
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
}

nav {
  padding: 30px;
  display: flex;
  justify-content: right;
  position: relative;
  z-index: 10;
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
</style>
