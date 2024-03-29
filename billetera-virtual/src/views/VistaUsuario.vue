<template>
  <div>
    <h1>{{ idUsuarioAutenticado }}</h1>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["usuarioAutenticado"]),
    idUsuarioAutenticado() {
      return localStorage.getItem("idUsuario");
    },
  },
};
</script>
<style></style>
