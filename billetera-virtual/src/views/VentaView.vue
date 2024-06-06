<template>
  <div>
    <div v-for="(compraAgrupada, index) in comprasAgrupadas" :key="index">
      <div v-if="compraAgrupada.user_id === usuario.id">
        <p>Precio de compra: {{ compraAgrupada.money }}</p>
        <p>Cantidad comprada: {{ compraAgrupada.totalAmount }}</p>
        <p>Usuario: {{ compraAgrupada.user_id }}</p>
        <p>Moneda: {{ compraAgrupada.crypto_code }}</p>
        <p v-if="datosCompra[compraAgrupada.crypto_code]">
          Precio de venta sin comisiones:
          {{ datosCompra[compraAgrupada.crypto_code].bid }}
        </p>
        <p v-if="datosCompra[compraAgrupada.crypto_code]">
          Precio de venta con comisiones:
          {{ datosCompra[compraAgrupada.crypto_code].totalBid }}
        </p>
        <p>
          ID Compra:
          {{ compraAgrupada.ids.join(", ") }}
        </p>
        <input
          type="number"
          v-model.number="cantidadAVender[compraAgrupada.crypto_code]"
          placeholder="Cantidad a vender"
        />
        <button @click="vender(compraAgrupada)">Vender</button>
      </div>
    </div>
  </div>
</template>
<script>
import eventService from "@/services/EventService.js";
import { useStore } from "vuex";
import { computed } from "vue";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      criptosCompradas: [],
      cantidadAVender: {},
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
  mounted() {
    this.consultarApi();
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
        const response = await eventService.transacciones();
        this.criptosCompradas = response.data;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    vender(comprasAgrupadas) {
      const cryptoCode = comprasAgrupadas.crypto_code;
      const totalAmount = comprasAgrupadas.crypto_amount;
      const cantAVednder = this.cantAVednder[cryptoCode];
      if (cantAVednder <= 0) {
        alert("Ingrese un numero valido");
      } else if (cantAVednder > totalAmount) {
        alert(
          "La cantidad que esta tratando de vender, es mayor a la que posee."
        );
      } else {
        //agregar un if donde si ya se vendio una moneda y se quiere vender otra vez, que corrobore que la cantidad ya vendida sea menor a la cantidad comprada.
        const infoVenta = {
          crypto_code: cryptoCode,
          crypto_amount: cantAVednder,
          money: this.cantVendida(),
          user_id: this.usuario.id,
          action: "sale",
          datetime: this.datosCompra[cryptoCode].datetime,
        };
        eventService.venta(infoVenta).then((response) => {
          console.log("Venta existosa ", response.data);
        });
      }
    },
    async consultarApi() {
      await this.consultaApi();
      console.log("Datos actualizados:", this.datoCompra);
    },
    cantVendida() {
      const precioUnidad = this.datosCompra[this.cryptoCode].bid;
      const precioAPagar = precioUnidad * this.cantAVednder;
      return precioAPagar;
    },
  },
  created() {
    this.mostrarCompras();
    console.log("usuario", this.usu);
  },
};
</script>
<style></style>
