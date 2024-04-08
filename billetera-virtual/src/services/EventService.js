import axios from "axios";

const api = axios.create({
  baseURL: "https://criptoya.com/api",
});
export default {
  async Bitso(moneda) {
    try {
      const url = `/bitsoalpha/${moneda}/ars}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error al llamar a la API:", error);
      throw error;
    }
  },
  async Cryptomkt(moneda) {
    try {
      const url = `/cryptomkt/${moneda}/ars}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error al llamar a la API:", error);
      throw error;
    }
  },
  async Argen(moneda) {
    try {
      const url = `/argenbtc/${moneda}/ars}`;
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error al llamar a la API:", error);
      throw error;
    }
  },
};
