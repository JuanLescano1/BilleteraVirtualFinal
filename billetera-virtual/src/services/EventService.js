import axios from "axios";

const api = axios.create({
  baseURL: "https://criptoya.com/api",
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
};
