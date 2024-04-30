<template>
  <div id="background">
    <div id="sd">
      <h1>ds:{{ usuario.id }}</h1>
      <button @click="cerrarSesion">Cerrar sesión</button>
      <p v-if="!autenticado">Usuario no autenticado</p>
      <p v-else>Usuario autenticado</p>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const usuario = computed(() => {
      const id = localStorage.getItem("idUsuario");
      return store.state.usuarios.find((usuario) => usuario.id === id) || {};
    });
    const autenticado = computed(() => {
      return store.getters.usuarioAutenticado;
    });
    return {
      usuario,
      autenticado,
    };
  },
  methods: {
    cerrarSesion() {
      this.$store.dispatch("cierre");
      this.$router.push("/");
    },
  },
};
</script>

<style>
#background {
  background-size: cover;
  background-repeat: no-repeat;
}
#sd {
  display: flex;
  width: 100%;
}
</style>
