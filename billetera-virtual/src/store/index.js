import { createStore } from "vuex";

export default createStore({
  state: {
    usuarioAutenticado: false,
  },
  getters: {},
  mutations: {
    EstablecerAutenticado(state, value) {
      state.isAuthenticated = value;
    },
  },
  actions: {
    inicio({ commit }) {
      commit("EstablecerAutenticado", true);
    },
    cierre({ commit }) {
      commit("EstablecerAutenticado", false);
    },
  },
  modules: {},
});
