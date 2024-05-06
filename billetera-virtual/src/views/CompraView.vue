<template>
  <div>
    <h1>{{ monedas }}</h1>
    <div v-if="datosCompra[monedas]">
      <h1 v-if="monedas">Moneda a comprar: {{ monedas }}</h1>
      <div v-if="monedas && datosCompra[monedas]">
        <p>Moneda: {{ datosCompra[monedas].ask }}</p>
        <p>Datos: {{ datosCompra[monedas].totalAsk }}</p>
        <p>Datos: {{ datosCompra[monedas].bid }}</p>
        <p>Datos: {{ datosCompra[monedas].totalBid }}</p>
        <p>Tiempo: {{ datosCompra[monedas].time }}</p>
        <input
          v-model="cantidadAComprar"
          type="number"
          placeholder="Cantidad a comprar"
        />
        <button @click="Confirmar()">Comprar</button>
        <button @click="Cancelar()">Cancelar</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
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
    console.log(
      "Viendo DATOS:",
      this.$route.params.moneda,
      this.monedas,
      this.datosCompra[this.monedas]
    );
  },
  mounted() {
    this.consultarApi();
  },
  methods: {
    ...mapActions(["consultaApi"]),
    async consultarApi() {
      await this.consultaApi();
      // Aquí puedes acceder a this.datosCompra para asegurarte de que los datos se hayan actualizado correctamente
      console.log("Datos actualizados:", this.datosCompra);
    },
    Confirmar() {},
    Cancelar() {
      this.$router.push("/crypto");
    },
  },
};
</script>
<style></style>
