<template>
  <div>
    <h1>Usuario iniciado: {{ usuario.id }}</h1>
    <div v-for="(compraAgrupada, index) in comprasAgrupadas" :key="index">
      <p>Precio de compra: {{ compraAgrupada.money }}</p>
      <p>Cantidad comprada: {{ compraAgrupada.totalAmount }}</p>
      <p>Usuario: {{ compraAgrupada.user_id }}</p>
      <h1>Moneda: {{ compraAgrupada.crypto_code }}</h1>
      <h1 v-if="datosCompra[compraAgrupada.crypto_code]">
        Precio de venta sin comisiones:
        {{ datosCompra[compraAgrupada.crypto_code].bid }}
      </h1>
    </div>
  </div>
</template>
<script>
import eventService from "@/services/EventService.js";
import { mapActions, mapGetters, useStore } from "vuex";
import { computed } from "vue";
export default {
  data() {
    return {
      criptosCompradas: [],
    };
  },
  setup() {
    const store = useStore();
    const usuario = computed(() => {
      const id = localStorage.getItem("idUsuario");
      return store.state.usuarios.find((usuario) => usuario.id === id) || {};
    });
    return { usuario };
  },
  computed: {
    ...mapGetters(["datosCompra"]),
    comprasAgrupadas() {
      const agrupadas = {};
      this.criptosCompradas.forEach((compra) => {
        if (
          compra.user_id === this.usuario.id &&
          compra.action === "purchase"
        ) {
          if (!agrupadas[compra.crypto_code]) {
            agrupadas[compra.crypto_code] = {
              user_id: compra.user_id,
              crypto_code: compra.crypto_code,
              money: compra.money,
              totalAmount: 0,
              ids: [],
            };
          }
          agrupadas[compra.crypto_code].totalAmount += compra.crypto_amount;
          agrupadas[compra.crypto_code].ids.push(compra._id);
        }
      });
      return Object.values(agrupadas);
    },
  },
  methods: {
    ...mapActions(["consultaApi"]),
    async mostrarCompras() {
      try {
        const datos = await eventService.transacciones();
        this.criptosCompradas = datos.data;
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    },
    async consultarApi() {
      await this.consultaApi();
      console.log("Datos actualizados:", this.datoCompra);
    },
  },
  mounted() {
    this.mostrarCompras();
    this.consultarApi();
  },
};
</script>
<style></style>
