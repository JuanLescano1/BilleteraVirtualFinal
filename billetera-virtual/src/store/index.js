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
  },
  getters: {
    usuarioIniciado(state) {
      const id = localStorage.getItem("idUsuario");
      const usuario = state.usuarios.find((usuario) => usuario.id === id);
      console.log("Usuario iniciado:", usuario);
      return usuario;
    },
    usuarioAutenticado(state) {
      const usuarioCerrado = state.usuarioAutenticado;
      console.log("usuario cerrado", usuarioCerrado);
      return usuarioCerrado;
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
    },
    actAdaData(state, data) {
      state.adaData = data;
    },
    actAvaxData(state, data) {
      state.avaxData = data;
    },
    actArgentBTCData(state, { moneda, data }) {
      state.argentBTCData[moneda] = data;
    },
    actCarga(state, value) {
      state.carga = value;
    },
    actError(state, value) {
      state.error = value;
    },
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
    async consultaApi({ commit }) {
      try {
        const responseNupen = await eventService.argenNupen();
        commit("actNupenData", responseNupen.data);
        const adaData = (await eventService.argenAda()).data;
        commit("actAdaData", adaData);
        const responseAvax = await eventService.argenAvax();
        commit("actAvaxData", responseAvax.data);
        for (const moneda of this.listaArgentBTC) {
          const responseBTC = await eventService.argenBTC(moneda);
          commit("actArgentBTCData", { moneda, data: responseBTC.data });
          console.log(responseBTC.data);
        }
        console.log(this.adaData);
        console.log(responseAvax);
        commit("actCarga", false);
      } catch (error) {
        console.log(error);
        commit("actError", true);
      }
    },
  },
});
