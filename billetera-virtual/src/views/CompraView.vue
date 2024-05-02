<template>
  <div v-if="datosCompra[monedas]">
    <h1 v-if="monedas">Moneda a comprar: {{ monedas }}</h1>
    <div v-if="monedas && datosCompra[monedas]">
      <p>Moneda: {{ datosCompra[monedas].ask }}</p>
      <p>Datos: {{ datosCompra[monedas].totalAsk }}</p>
      <p>Datos: {{ datosCompra[monedas].bid }}</p>
      <p>Datos: {{ datosCompra[monedas].totalBid }}</p>
      <p>Datos: {{ datosCompra[monedas].time }}</p>
      <button>Comprar</button>
      <button>Cancelar</button>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      monedas: null,
    };
  },
  computed: {
    ...mapGetters(["datosCompra"]),
  },
  created() {
    this.monedas = this.$route.params.moneda;
  },
};
</script>
<style></style>
