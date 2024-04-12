import axios from "axios";

const api = axios.create({
  baseURL: "https://criptoya.com/api",
});
export default {
  argenNupen() {
    return api.get("/buenbit/nupen/pen");
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
