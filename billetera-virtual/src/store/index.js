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
    agregarUsuario (state, {id, datos }) {
      state.usuarios = datos;
    },
  },
  actions: {
    inicio({ commit }) {
      commit("EstablecerAutenticado", true);
      commit("AgregarUsuario", { id: idUsuario, datos: {} });
    },
    cierre({ commit }) {
      commit("EstablecerAutenticado", false);
    },
  },
  modules: {},
});
