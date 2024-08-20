<template>
  <div id="principal">
    <div id="secundario">
      <h1>Usuario iniciado: {{ usuario.id }}</h1>
      <div
        v-for="(compraAgrupada, index) in comprasAgrupadas"
        :key="index"
        id="datosCompra"
      >
        <h2>Moneda: {{ compraAgrupada.crypto_code }}</h2>
        <p>Precio de compra: {{ compraAgrupada.money }}</p>
        <p>Cantidad comprada: {{ compraAgrupada.totalAmount }}</p>
        <p>Usuario: {{ compraAgrupada.user_id }}</p>
        <p>
          Cantidad actual:
          {{ cantidadActual(compraAgrupada.crypto_code).toFixed(4) }}
        </p>
        <p v-if="datosCompra[compraAgrupada.crypto_code]">
          Precio de venta sin comisiones:
          {{ datosCompra[compraAgrupada.crypto_code].bid }}
        </p>
        <input
          v-model="cantidad[compraAgrupada.crypto_code]"
          type="number"
          placeholder="Cantidad a vender"
          step="0.001"
        />
        <button @click="ConfirmarVenta(compraAgrupada)">Vender</button>
      </div>
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
      cantidad: {},
      criptosVendidas: [],
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
      });
      return Object.values(agrupadas);
    },
    ventasAgrupadas() {
      const vAgrupadas = {};
      this.criptosVendidas.forEach((venta) => {
        if (!vAgrupadas[venta.crypto_code]) {
          vAgrupadas[venta.crypto_code] = {
            user_id: venta.user_id,
            crypto_code: venta.crypto_code,
            money: venta.money,
            totalAmount: 0,
            ids: [],
          };
        }
        vAgrupadas[venta.crypto_code].totalAmount += venta.crypto_amount;
        vAgrupadas[venta.crypto_code].ids.push(venta._id);
      });
      return Object.values(vAgrupadas);
    },
  },
  methods: {
    ...mapActions(["consultaApi"]),
    async mostrarCompras() {
      try {
        const datos = await eventService.transacciones();
        this.criptosCompradas = datos.data.filter(
          (compra) =>
            compra.user_id === this.usuario.id && compra.action === "purchase"
        );
        this.criptosVendidas = datos.data.filter(
          (compra) =>
            compra.user_id === this.usuario.id && compra.action === "sale"
        );
      } catch (error) {
        console.error("Error al obtener los datos: ", error);
      }
    },
    async consultarApi() {
      await this.consultaApi();
      console.log("Datos actualizados:", this.datoCompra);
    },
    cantidadActual(cryptoCode) {
      const compraAgrupada = this.comprasAgrupadas.find(
        (compra) => compra.crypto_code === cryptoCode
      );
      if (!compraAgrupada) {
        return 0;
      }
      const ventasAgrupada = this.ventasAgrupadas.find(
        (venta) => venta.crypto_code === cryptoCode
      );
      const ventasTotales = ventasAgrupada ? ventasAgrupada.totalAmount : 0;
      const cantidadActual = compraAgrupada.totalAmount - ventasTotales;
      return cantidadActual;
    },
    async ConfirmarVenta(compraAgrupada) {
      const cantidadVender = this.cantidad[compraAgrupada.crypto_code];
      const cantActual = this.cantidadActual(compraAgrupada.crypto_code);
      console.log(cantActual);
      if (cantidadVender <= 0) {
        alert("La cantidad a vender debe ser mayor que 0.");
        return;
      }
      if (cantActual < cantidadVender) {
        alert("No puedes vender una cantidad mayor a la que posees.");
        return;
      }
      const infoVenta = {
        crypto_code: compraAgrupada.crypto_code,
        crypto_amount: cantidadVender,
        money:
          cantidadVender * this.datosCompra[compraAgrupada.crypto_code].bid,
        user_id: this.usuario.id,
        action: "sale",
        datetime: this.datosCompra[compraAgrupada.crypto_code].time,
      };
      try {
        const response = await eventService.venta(infoVenta);
        console.log("Venta realizada ", response);
        compraAgrupada.totalAmount -= cantidadVender;
        if (compraAgrupada.totalAmount <= 0) {
          alert("Has vendido todas las monedas.");
          compraAgrupada.totalAmount = 0;
        }
        await this.mostrarCompras();
        await this.consultarApi();
      } catch (error) {
        console.error("Error en la venta: ", error);
      }
    },
  },
  mounted() {
    this.mostrarCompras();
    this.consultarApi();
  },
};
</script>
<style>
#principal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(135deg, #531466, #000008);
}
#secundario {
  position: relative;
  top: 5;
  margin-top: 10%;
}
#datosCompra {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr 0.5fr;
  gap: 20px;
  width: 90%;
  position: relative;
  cursor: pointer;
  margin-left: 5%;
  margin-right: 5%;
}
</style>
