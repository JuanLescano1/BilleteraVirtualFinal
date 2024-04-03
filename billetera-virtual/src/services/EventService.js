import axios from "axios";

const api = axios.create({
  baseURL: "https://criptoya.com/api",
});
export default {
    llamadoExchanges(exchange, moneda, unidad) {
      const url = `/${exchange}/${moneda}/${unidad}/`;
  
      return api2.get(url);
    },
};