import axios from "axios";

const api = axios.create({
  baseURL: "https://criptoya.com/api",
});
const apiClient = axios.create({
  baseURL: "https://laboratorio-afe2.restdb.io/rest/",
  headers: { "x-apikey": "650b53356888544ec60c00bf" },
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
  compra(infoCompra) {
    console.log("Datos enviados a la API:", infoCompra);
    return apiClient
      .post("/transactions", infoCompra)
      .then((response) => {
        console.log("Respuesta de la API: ", response.data);
        return response;
      })
      .catch((error) => {
        console.log("Error de la API: ", error);
        throw error;
      });
  },
  venta(infoVenta) {
    return apiClient.post("/transactions", infoVenta);
  },
  transacciones() {
    return apiClient.get("/transactions");
  },
};
