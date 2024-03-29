<template>
  <div id="background">
    <div id="background">
      <div id="sd">
        <h1>{{ idUsuarioAutenticado }}</h1>
      </div>
    </div>
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
