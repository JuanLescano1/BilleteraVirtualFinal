import { createStore } from "vuex";
import eventService from "@/services/EventService.js";

export default createStore({
  state: {
    usuarioAutenticado: JSON.parse(
      localStorage.getItem("usuarioAutenticado") || "false"
    ),
    usuarios: JSON.parse(localStorage.getItem("usuarios") || "[]"),
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
    carga: true,
    error: false,
    datosCompra: JSON.parse(localStorage.getItem("datosCompra") || "{}"),
  },
  getters: {
    usuarioAutenticado(state) {
      const usuarioCerrado = state.usuarioAutenticado;
      console.log("usuario cerrado", usuarioCerrado);
      return usuarioCerrado;
    },
    datosCompra(state) {
      return state.datosCompra;
    },
  },
  mutations: {
    establecerAutenticado(state, value) {
      state.usuarioAutenticado = value;
    },
    agregarUsuario(state, { id, datos }) {
      const usuarioExistente = state.usuarios.find(
        (usuario) => usuario.id === id
      );
      if (!usuarioExistente) {
        state.usuarios.push({ id, datos });
        localStorage.setItem("usuarios", JSON.stringify(state.usuarios));
      }
    },
    actNupenData(state, data) {
      state.nupenData = data;
      state.datosCompra.nupen = data;
      localStorage.setItem("datosCompra", JSON.stringify(state.datosCompra));
    },
    actAdaData(state, data) {
      state.adaData = data;
      state.datosCompra.ada = data;
      localStorage.setItem("datosCompra", JSON.stringify(state.datosCompra));
    },
    actAvaxData(state, data) {
      state.avaxData = data;
      state.datosCompra.avax = data;
      localStorage.setItem("datosCompra", JSON.stringify(state.datosCompra));
    },
    actArgentBTCData(state, { moneda, data }) {
      state.argentBTCData[moneda] = data;
      state.datosCompra[moneda] = data;
      localStorage.setItem("datosCompra", JSON.stringify(state.datosCompra));
    },
    actCarga(state, value) {
      state.carga = value;
    },
    actError(state, value) {
      state.error = value;
    },
    guardarDatosCompra(state, { moneda, data }) {
      console.log("Guardando datos en el estado:", moneda, data);
      state.datosCompra[moneda] = data;
      localStorage.setItem("datosCompra", JSON.stringify(state.datosCompra));
    },
    /*guardarDetalles(state, { moneda, data }) {
      state.detalle = { moneda, data };
      sessionStorage.setItem("detalle", JSON.stringify({ moneda, data }));
    },*/
  },
  actions: {
    inicio({ commit }, idUsuario) {
      commit("establecerAutenticado", true);
      commit("agregarUsuario", { id: idUsuario, datos: {} });
      localStorage.setItem("idUsuario", idUsuario);
      localStorage.setItem("usuarioAutenticado", true);
    },
    cierre({ commit }) {
      commit("establecerAutenticado", false);
      localStorage.setItem("usuarioAutenticado", false);
    },
    btnCompra({ commit }, { moneda, data }) {
      //console.log("Guardando datos de compra:", moneda, data);
      commit("guardarDatosCompra", { moneda, data });
    },
    async consultaApi({ commit }) {
      const actApi = async () => {
        try {
          const responseNupen = (await eventService.argenNupen()).data;
          commit("actNupenData", responseNupen);
          const adaData = (await eventService.argenAda()).data;
          commit("actAdaData", adaData);
          const responseAvax = (await eventService.argenAvax()).data;
          commit("actAvaxData", responseAvax);
          console.log("ArgenAda", adaData);
          console.log("Nupen", responseNupen);
          console.log("Avax", responseAvax);
          for (const moneda of this.state.listaArgentBTC) {
            const responseBTC = (await eventService.argenBTC(moneda)).data;
            commit("actArgentBTCData", { moneda, data: responseBTC });
            console.log("responseBTC", responseBTC);
          }
          console.log(this.adaData);
          console.log(responseAvax);
          commit("actCarga", false);
        } catch (error) {
          console.log(error);
          commit("actError", true);
        }
      };
      setInterval(actApi, 60000);
      await actApi();
    },
  },
});
