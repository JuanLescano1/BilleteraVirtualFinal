<template>
  <div id="app">
    <div id="fondoImagen">
      <img src="@\components\Imagenes\FondoInicioSesion.jpg" id="fondoLista" />
      <div class="contenedor-Principal">
        <h1 v-if="error">
          No se puedieron cargar los datos obtenidos de la API
        </h1>
        <div v-if="!carga && !error">
          <button
            @click="
              buenBit = true;
              argenBTC = false;
            "
            class="botonExchange"
          >
            BuenBit
          </button>
          <button
            @click="
              buenBit = false;
              argenBTC = true;
            "
            class="botonExchange"
          >
            argentBTC
          </button>
          <div v-if="buenBit">
            <h1>buenBit</h1>
            <div class="contenedor-Monedas">
              <div class="monedas">
                <h2>nuARS</h2>
                <button @click="mostrarDetalles('nuars')">Ver detalles</button>
              </div>
              <div v-if="detalles === 'nuars'">
                <p>Precio: {{ nuarsData.ask }}</p>
                <p>Precio con comisiones: {{ nuarsData.totalAsk }}</p>
                <p>Venta: {{ nuarsData.bid }}</p>
                <p>Venta con comisiones: {{ nuarsData.totalBid }}</p>
                <p>Tiempo actualizacion: {{ nuarsData.time }}</p>
                <button @click="comprar(detalles, nuarsData)">Comprar</button>
              </div>
              <div class="monedas">
                <h2>ADA</h2>
                <button @click="mostrarDetalles('ada')">Ver detalles</button>
              </div>
              <div v-if="detalles === 'ada'">
                <p>Precio: {{ adaData.ask }}</p>
                <p>Precio con comisiones: {{ adaData.totalAsk }}</p>
                <p>Venta: {{ adaData.bid }}</p>
                <p>Venta con comisiones: {{ adaData.totalBid }}</p>
                <p>Tiempo actualizacion: {{ adaData.time }}</p>
                <button @click="comprar(detalles, adaData)">Comprar</button>
              </div>
              <div class="monedas">
                <h2>AVAX</h2>
                <button @click="mostrarDetalles('avax')">Ver detalles</button>
              </div>
              <div v-if="detalles === 'avax'">
                <p>Precio: {{ avaxData.ask }}</p>
                <p>Precio con comisiones: {{ avaxData.totalAsk }}</p>
                <p>Venta: {{ avaxData.bid }}</p>
                <p>Venta con comisiones: {{ avaxData.totalBid }}</p>
                <p>Tiempo actualizacion: {{ avaxData.time }}</p>
                <button @click="comprar(detalles, avaxData)">Comprar</button>
              </div>
            </div>
          </div>
          <div v-if="argenBTC">
            <h1>argenBTC</h1>
            <div class="contenedor-Monedas">
              <div v-for="(data, moneda) in argentBTCData" :key="moneda">
                <h2>{{ moneda }}</h2>
                <button @click="mostrarDetalles(moneda, data)">
                  Ver detalles
                </button>
                <div v-if="detalles === moneda">
                  <p>Precio: {{ data.ask }}</p>
                  <p>Precio con comisiones: {{ data.totalAsk }}</p>
                  <p>Venta: {{ data.bid }}</p>
                  <p>Venta con comisiones: {{ data.totalBid }}</p>
                  <p>Tiempo actualizacion: {{ data.time }}</p>
                  <button @click="comprar(moneda, data)">Comprar</button>
                </div>
              </div>
            </div>
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
      "nuarsData",
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
    comprar(moneda, data) {
      console.log("envio de datos:", moneda, data);
      this.$store.dispatch("btnCompra", { moneda, data });
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
<style>
#app1 {
  height: 100vh;
  overflow: hidden;
}
#fondoLista {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
}
#fondoImagen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.contenedor-Principal {
  position: relative;
  z-index: 1;
  height: 100%;
  overflow-y: auto;
}
.botonExchange {
  border-style: hidden;
  border-radius: 10px;
  margin: 5px;
  width: 30%;
  height: 50px;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  position: relative;
}
.botonExchange::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px groove;
  border-radius: 10px;
  transition: opacity 0.3s ease;
  border-color: rgb(195, 37, 209);
}
.botonExchange:hover::after {
  opacity: 0;
}
.contenedor-Monedas {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.monedas {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: 30%;
  margin-right: 30%;
}
</style>
