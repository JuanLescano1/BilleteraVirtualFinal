<template>
  <div id="background">
    <div id="sd">
      <h1>ds:{{ usuarioIniciado.id }}</h1>
      <button @click="cerrarSesion">Cerrar sesión</button>
      <p v-if="!usuarioAutenticado">Usuario no autenticado</p>
      <p v-else>Usuario autenticado</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["usuarioIniciado", "usuarioAutenticado"]),
  },
  methods: {
    cerrarSesion() {
      this.$store.dispatch("cierre");
      this.$router.push("/");
    },
  },
};
</script>

<style>
#background {
  background-size: cover;
  background-repeat: no-repeat;
}
#sd {
  display: flex;
  width: 100%;
}
</style>
