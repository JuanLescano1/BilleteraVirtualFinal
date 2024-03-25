import { createStore } from "vuex";

export default createStore({
  state: {
    usuarioAutenticado: false,
    usuarios: {},
  },
  getters: {
    usuarioPorId: (state) => (id) => {
      return state.usuarios[id];
    },
  },
  mutations: {
    EstablecerAutenticado(state, value) {
      state.usuarioAutenticado = value;
    },
    agregarUsuario(state, { id, datos }) {
      state.usuarios[id] = datos;
    },
  },
  actions: {
    inicio({ commit }, idUsuario) {
      commit("EstablecerAutenticado", true);
      commit("AgregarUsuario", { id: idUsuario, datos: {} });
      localStorage.setItem("idUsuario", idUsuario);
    },
    cierre({ commit }) {
      commit("EstablecerAutenticado", false);
    },
  },
  modules: {},
});
