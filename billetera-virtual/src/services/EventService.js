import axios from "axios";

const api = axios.create({
  baseURL: "https://criptoya.com/api",
});
const apiClient = axios.create({
  baseURL: "https://laboratorio3-f36a.restdb.io/rest",
  headers: { "x-apikey": "60eb09146661365596af552f" },
});
export default {
  argenNuars() {
    return api.get("/buenbit/nuars/ars");
  },
  argenAda() {
    return api.get("/buenbit/ada/ars");
  },
  argenAvax() {
    return api.get("/buenbit/avax/ars");
  },
  argenBTC(moneda) {
    return api.get(`/argenbtc/${moneda}/ars`);
  },
  compra() {
    return apiClient.post("/transactions");
  },
};
