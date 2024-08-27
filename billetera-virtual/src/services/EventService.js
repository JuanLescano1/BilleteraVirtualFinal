import axios from "axios";

const api = axios.create({
  baseURL: "https://criptoya.com/api",
});
const apiClient = axios.create({
  //baseURL: "https://labor3-d60e.restdb.io/rest/",
  //headers: { "x-apikey": "64a2e9bc86d8c525a3ed8f63" },
  //baseURL: "https://labor3-d60e.restdb.io/rest/",
  //headers: { "x-apikey": "64a2e9bc86d8c525a3ed8f63" },
  baseURL: "https://laboratorio3-5459.restdb.io/rest/",
  headers: { "x-apikey": "64a57c2b86d8c50fe6ed8fa5" },
  //baseURL: "https://laboratorio-36cf.restdb.io/rest/",
  //headers: { "x-apikey": "64a5ccf686d8c5d256ed8fce" },
  //baseURL: "https://laboratorio3-f36a.restdb.io/rest/",
  //headers: { "x-apikey": "64bdbb6f86d8c5e18ded91e3" },
  //baseURL: "https://laboratorio3-5fc7.restdb.io/rest/",
  //headers: { "x-apikey": "64bdbc3386d8c5613ded91e7" },
  //baseURL: "https://laboratorio-ab82.restdb.io/rest/",
  //headers: { "x-apikey": "650b525568885487530c00bb" },
  //baseURL: "https://laboratorio-afe2.restdb.io/rest/",
  //headers: { "x-apikey": "650b53356888544ec60c00bf" },
  //baseURL: "https://laboratorio3-f36a.restdb.io/rest/",
  //headers: { "x-apikey": "60eb09146661365596af552f" },
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
    console.log("Datos enviados a la API:", infoVenta);
    return apiClient
      .post("/transactions", infoVenta)
      .then((response) => {
        console.log("Respuesta de la API: ", response.data);
        return response;
      })
      .catch((error) => {
        console.log("Error de la API: ", error);
        throw error;
      });
  },
  transacciones() {
    return apiClient
      .get("/transactions")
      .then((response) => {
        console.log("Respuesta de la API: ", response.data);
        return response;
      })
      .catch((error) => {
        console.log("Error de la API: ", error);
        throw error;
      });
  },
};
