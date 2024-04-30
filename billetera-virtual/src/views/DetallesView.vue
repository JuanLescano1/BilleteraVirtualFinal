<template>
  <div v-if="detalle">
    <h1>Detalles de la moneda: {{ $route.params.moneda }}</h1>
    <h2>Precio: {{ detalle.data.ask }}</h2>
    <h2>Tiempo: {{ detalle.data.time }}</h2>
    <h2>ds: {{ detallesMoneda.data.ask }}</h2>
    <h2>ds: {{ detallesMoneda.data.ask }}</h2>
  </div>
</template>
<script>
import { mapState, mapGetters } from "vuex";
export default {
  /*  mounted() {
    const detalles = JSON.parse(sessionStorage.getItem("detalle"));
    if (detalles) {
      this.moneda = detalles.moneda;
      this.data = detalles.data;
    }
  },
  data() {
    return {
      moneda: null,
      data: null,
    };
  },
  */
  computed: {
    ...mapState(["detalle"]),
    ...mapGetters(["detallesMoneda"]),
  },
};
</script>
<style></style>
