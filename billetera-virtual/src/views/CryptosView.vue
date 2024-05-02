<template>
  <div>
    <h1 v-if="error">No se puedieron cargar los datos obtenidos de la API</h1>
    <div v-if="!carga && !error">
      <button
        @click="
          buenBit = true;
          argenBTC = false;
        "
      >
        BuenBit
      </button>
      <button
        @click="
          buenBit = false;
          argenBTC = true;
        "
      >
        argentBTC
      </button>
      <div v-if="buenBit">
        <h2>nuPEN</h2>
        <button @click="mostrarDetalles('nupen')">Ver detalles</button>
        <div v-if="detalles === 'nupen'">
          <p>Precio: {{ nupenData.ask }}</p>
          <p>Precio con comisiones: {{ nupenData.totalAsk }}</p>
          <p>Venta: {{ nupenData.bid }}</p>
          <p>Venta con comisiones: {{ nupenData.totalBid }}</p>
          <p>Tiempo actualizacion: {{ nupenData.time }}</p>
          <button @click="comprar(detalles, nupenData)">Comprar</button>
        </div>
        <h2>ADA</h2>
        <button @click="mostrarDetalles('ada')">Ver detalles</button>
        <div v-if="detalles === 'ada'">
          <p>Precio: {{ adaData.ask }}</p>
          <p>Precio con comisiones: {{ adaData.totalAsk }}</p>
          <p>Venta: {{ adaData.bid }}</p>
          <p>Venta con comisiones: {{ adaData.totalBid }}</p>
          <p>Tiempo actualizacion: {{ adaData.time }}</p>
          <button @click="comprar(detalles, adaData)">Comprar</button>
        </div>
        <h2>AVAX</h2>
        <button @click="mostrarDetalles('avax')">Ver detalles</button>
        <div v-if="detalles === 'avax'">
          <p>Precio: {{ avaxData.ask }}</p>
          <p>Precio con comisiones: {{ avaxData.totalAsk }}</p>
          <p>Venta: {{ avaxData.bid }}</p>
          <p>Venta con comisiones: {{ avaxData.totalBid }}</p>
          <p>Tiempo actualizacion: {{ avaxData.time }}</p>
          <button @click="comprar(detalles, avaxData)">Comprar</button>
        </div>
      </div>
      <div v-if="argenBTC">
        <div v-for="(data, moneda) in argentBTCData" :key="moneda">
          <h2>{{ moneda }}</h2>
          <button @click="mostrarDetalles(moneda, data)">Ver detalles</button>
          <div v-if="detalles === moneda">
            <p>Precio: {{ data.ask }}</p>
            <p>Precio: {{ data.totalAsk }}</p>
            <p>Precio: {{ data.bid }}</p>
            <p>Precio: {{ data.totalBid }}</p>
            <p>Precio: {{ data.time }}</p>
            <button @click="comprar(moneda, data)">Comprar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState([
      "nupenData",
      "adaData",
      "avaxData",
      "argentBTCData",
      "carga",
      "error",
    ]),
  },

  created() {
    this.consultaApi();
  },
  data() {
    return {
      detalles: null,
      buenBit: true,
      argenBTC: false,
    };
  },
  methods: {
    ...mapActions(["consultaApi"]),
    mostrarDetalles(moneda) {
      this.detalles = this.detalles === moneda ? null : moneda;
    },
    async comprar(moneda, data) {
      console.log("envio de datos:", moneda, data);
      await this.$store.dispatch("btnCompra", { moneda, data });
      this.$router.push({ name: "Compra", params: { moneda: moneda } });
    },
    /*    verDetalles(moneda, data) {
      this.$store.commit("guardarDetalles", { moneda, data });
      this.$router.push({ name: "Detalles", params: { moneda: moneda } });
    }, */
  },
};
/*import eventService from "@/services/EventService.js";
export default {
  data() {
    return {
      nupenData: null,
      adaData: null,
      avaxData: null,
      listaArgentBTC: ["BTC", "DAI", "ETH", "USDT"],
      argentBTCData: {
        BTC: null,
        DAI: null,
        ETH: null,
        USDT: null,
      },
      carga: true,
      error: false,
    };
  },
  async created() {
    try {
      const responseNupen = await eventService.argenNupen();
      this.nupenData = responseNupen.data;
      this.adaData = (await eventService.argenAda()).data;
      const responseAvax = await eventService.argenAvax();
      this.avaxData = responseAvax.data;
      for (const moneda of this.listaArgentBTC) {
        const responseBTC = await eventService.argenBTC(moneda);
        this.argentBTCData[moneda] = responseBTC.data;
        console.log(this.argentBTCData[moneda]);
      }
      console.log(this.adaData);
      console.log(responseAvax);
      this.carga = false;
    } catch (error) {
      console.log(error);
      this.error = true;
    }
  },
};*/
</script>
<style></style>
