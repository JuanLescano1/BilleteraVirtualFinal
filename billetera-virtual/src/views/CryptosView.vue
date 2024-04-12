<template>
  <div>
    <h1>Monedas del</h1>
    <div v-if="adaData && nupenData && avaxData">
      <h2>s</h2>
      <ul>
        <li>{{ adaData }}</li>
      </ul>
      <ul>
        <li v-for="(data, moneda) in argentBTCData" :key="moneda">
          {{ moneda }}: {{ data }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import eventService from "@/services/EventService.js";
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
    };
  },
  created() {
    eventService
      .argenNupen()
      .then((response) => {
        this.nupenData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    eventService
      .argenAda()
      .then((response) => {
        this.adaData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    eventService
      .argenAvax()
      .then((response) => {
        this.avaxData = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
    this.listaArgentBTC.forEach((moneda) => {
      eventService
        .argenBTC(moneda)
        .then((response) => {
          this.argentBTCData[moneda] = response.data;
          console.log(`Datos de ${moneda}:`, response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  },
};
</script>
<style></style>
