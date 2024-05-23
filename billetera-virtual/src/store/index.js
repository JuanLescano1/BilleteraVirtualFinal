import { createStore } from "vuex";
import eventService from "@/services/EventService.js";
import moment from "moment";

export default createStore({
  state: {
    usuarioAutenticado: JSON.parse(
      localStorage.getItem("usuarioAutenticado") || "false"
    ),
    usuarios: JSON.parse(localStorage.getItem("usuarios") || "[]"),
    nuarsData: null,
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
    //formatoFecha: null,
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
    actNuarsData(state, data) {
      state.nuarsData = data;
      state.datosCompra.nuars = data;
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
    /*formatoDeFecha(state, formatoFecha) {
      state.formatoFecha = formatoFecha;
    },*/
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
    async darFomatoFecha(_, tiempo) {
      const nuevaFecha = moment
        .unix(tiempo)
        .local()
        .format("YYYY-MM-DDTHH:mm:ss.SSSZ");
      console.log("Fecha compra (ISO 8601 con horario local):", nuevaFecha);
      return nuevaFecha;
    },
    /*async darFomatoFecha(_, tiempo) {
      const nuevaFecha = new Date(tiempo * 1000);
      const dia = nuevaFecha.getDate().toString().padStart(2, "0");
      const mes = (nuevaFecha.getMonth() + 1).toString().padStart(2, "0");
      const año = nuevaFecha.getFullYear();
      const hora = nuevaFecha.getHours().toString().padStart(2, "0");
      const minutos = nuevaFecha.getMinutes().toString().padStart(2, "0");
      const formatoFecha = `${dia}-${mes}-${año} ${hora}:${minutos}`.toString();
      console.log("fecha compra: ", formatoFecha);
      return formatoFecha;
    },*/
    /*dandoFormatoFecha({ commit }, fechaVista) {
      const formatoOriginal = fechaVista;
      const fecha = new Date(formatoOriginal * 1000);
      commit("formatoDeFecha", fecha);
    },*/
    consultaApi({ commit, dispatch }) {
      const actApi = async () => {
        try {
          const responseNuars = (await eventService.argenNuars()).data;
          const nuarsTiempo = responseNuars.time;
          const formatoFechaNuars = await dispatch(
            "darFomatoFecha",
            nuarsTiempo
          );
          responseNuars.time = formatoFechaNuars;
          commit("actNuarsData", responseNuars);
          const adaData = (await eventService.argenAda()).data;
          const adaTiempo = adaData.time;
          const formatoFechaAda = await dispatch("darFomatoFecha", adaTiempo);
          adaData.time = formatoFechaAda;
          commit("actAdaData", adaData);
          const responseAvax = (await eventService.argenAvax()).data;
          const avaxTiempo = responseAvax.time;
          const formatoFechaAvax = await dispatch("darFomatoFecha", avaxTiempo);
          responseAvax.time = formatoFechaAvax;
          commit("actAvaxData", responseAvax);
          console.log("ArgenAda", adaData);
          console.log("Nuars", responseNuars);
          console.log("Avax", responseAvax);
          for (const moneda of this.state.listaArgentBTC) {
            const responseBTC = (await eventService.argenBTC(moneda)).data;
            const btcTiempo = responseBTC.time;
            const formatoFechaBTC = await dispatch("darFomatoFecha", btcTiempo);
            responseBTC.time = formatoFechaBTC;
            commit("actArgentBTCData", { moneda, data: responseBTC });
            console.log("responseBTCs", responseBTC);
          }
          console.log(adaData);
          console.log(responseAvax);
          commit("actCarga", false);
        } catch (error) {
          console.log(error);
          commit("actError", true);
        }
      };
      setInterval(actApi, 60000);
      actApi();
    },
  },
});
