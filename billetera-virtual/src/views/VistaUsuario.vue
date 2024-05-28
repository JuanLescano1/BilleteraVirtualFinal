<template>
  <div id="aa">
    <div id="sd">
      <h1>Usuario: {{ usuario.id }}</h1>
      <button @click="cerrarSesion">Cerrar sesión</button>
      <h3 v-if="!autenticado">Usuario no autenticado</h3>
      <h4 v-else>Usuario autenticado</h4>
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
#aa {
  background: linear-gradient(135deg, #000008, #531466);
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
}
#sd {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  position: relative;
}
</style>
