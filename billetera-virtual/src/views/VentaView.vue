<template>
  <div>
    <div v-for="compra in criptosCompradas" :key="compra.id">
      <div v-if="compra.user_id === usuario.id">
        {{ compra.user_id }}
      </div>
    </div>
  </div>
</template>
<script>
import eventService from "@/services/EventService.js";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  data() {
    return {
      criptosCompradas: null,
      usu: this.usuario.id,
    };
  },
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
    async mostrarCompras() {
      try {
        const response = await eventService.venta();
        this.criptosCompradas = response.data;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
  },
  created() {
    this.mostrarCompras();
    console.log("usuario", this.usu);
  },
};
</script>
<style></style>
