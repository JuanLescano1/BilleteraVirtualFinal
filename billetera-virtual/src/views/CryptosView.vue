<template>
  <div>
    <ul>
      <li v-for="crypto in cryptos" :key="crypto.id">
        {{ crypto }}
      </li>
    </ul>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      exchanges: [],
      Cryptos: [],
      listaCryptos: [
        "btc",
        "eth",
        "usdt",
        "usdc",
        "dai",
        "uxd",
        "usdp",
        "wld",
        "bnb",
        "sol",
        "xrp",
        "ada",
        "avax",
        "doge",
        "trx",
        "link",
        "dot",
        "matic",
        "shib",
        "ltc",
        "bch",
        "eos",
        "xlm",
        "ftm",
        "aave",
        "uni",
        "algo",
        "bat",
        "paxg",
        "cake",
        "axs",
        "slp",
        "mana",
        "sand",
        "chz",
      ],
    };
  },
};
</script>
<style></style>
