<template>
  <div>
    <div v-for="compra in criptosCompradas" :key="compra.id">
      {{ compra }}
    </div>
  </div>
</template>
<script>
import eventService from "@/services/EventService.js";
export default {
  data() {
    return {
      criptosCompradas: null,
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
  },
};
</script>
<style></style>
