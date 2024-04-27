<template>
  <div>
    <h1 v-if="error">No se puedieron cargar los datos obtenidos de la API</h1>
    <div v-if="!carga && !error">
      <h2>s</h2>
      <ul>
        <li>
          {{ adaData }}
          <button>Ver detalles</button>
        </li>
        <li>
          {{ avaxData }}
          <button>Ver detalles</button>
        </li>
        <li>
          {{ nupenData }}
          <button>Ver detalles</button>
        </li>
      </ul>
      <ul>
        <li v-for="(data, moneda) in argentBTCData" :key="moneda">
          {{ moneda }}: {{ data }}
          <button @click="verDetalles(moneda)">Ver detalles</button>
        </li>
      </ul>
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
  methods: {
    ...mapActions(["consultaApi"]),
    verDetalles(moneda) {
      this.$router.push({ name: "Detalles", params: { moneda: moneda } });
    },
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
