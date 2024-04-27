<template>
  <div v-if="detalle">
    <h1>Detalles de la moneda: {{ $route.params.moneda }}</h1>
    <h2>Nombre: {{ detalle && detalle.data.ask }}</h2>
    <h2>Precio: {{ detalle && detalle.data.bid }}</h2>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  mounted() {
    const detalles = JSON.parse(sessionStorage.getItem("detalle"));
    if (detalles) {
      this.$store.commit("guardarDetalles", detalles);
    }
  },
  computed: {
    ...mapState(["detalle"]),
  },
};
</script>
<style></style>
