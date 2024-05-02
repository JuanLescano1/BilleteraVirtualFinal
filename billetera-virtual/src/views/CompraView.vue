<template>
  <div>
    <h1>Detalles de la compra</h1>
    <p>Moneda: {{ datosCompra.moneda }}</p>
    <p>Datos: {{ datosCompra.data.ask }}</p>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["datosCompra"]),
  },
};
</script>
<style></style>
