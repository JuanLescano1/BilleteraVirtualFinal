<template>
  <div>
    <h1>Monedas del {{ exchanges1 }}</h1>
    <ul>
      <li v-for="moneda in monedasBitso" :key="moneda">
        {{ moneda }} - Ask {{ exchangeRates[`Bitso_${moneda}`]?.ask }}
      </li>
    </ul>
  </div>
</template>
<script>
import eventService from "@/services/EventService.js";

export default {
  data() {
    return {
      exchanges1: "bitsoalpha",
      exchanges2: "cryptomkt",
      exchanges3: "argenbtc",
      monedasBitso: [
        "ada",
        "bat",
        "bch",
        "btc",
        "dai",
        "doge",
        "dot",
        "eth",
        "link",
        "ltc",
        "mana",
        "matic",
        "shib",
        "sol",
        "trx",
        "usdc",
        "usdt",
        "xrp",
      ],
      monedasArgen: ["btc", "dai", "eth", "usdt"],
      monedasCryptomkt: [
        "aave",
        "ada",
        "algo",
        "avax",
        "bch",
        "bnb",
        "btc",
        "dai",
        "dot",
        "eos",
        "eth",
        "link",
        "ltc",
        "matic",
        "paxg",
        "shib",
        "sol",
        "trx",
        "uni",
        "usdc",
        "usdt",
        "xlm",
        "xrp",
      ],
      exchangeRates: {},
    };
  },
  methods: {
    llamadoApi() {
      this.exchangeRates = {};
      for (let moneda of this.monedasBitso) {
        eventService.Bitso(moneda).then((response) => {
          this.exchangeRates[`Bitso_${moneda}`] = response.data;
        });
      }
      for (let moneda of this.monedasArgen) {
        eventService.Argen(moneda).then((response) => {
          this.exchangeRates[`Argen_${moneda}`] = response.data;
        });
      }
      for (let moneda of this.monedasCryptomkt) {
        eventService.Cryptomkt(moneda).then((response) => {
          this.exchangeRates[`Cryptomkt_${moneda}`] = response.data;
        });
      }
    },
  },
};
</script>
<style></style>
