<template>
  <div id="contenedorCompra">
    <div v-if="datosCompra[monedas]" id="ContenedorInfoCompra">
      <h1 v-if="monedas">Moneda a comprar: {{ monedas }}</h1>
      <div v-if="monedas && datosCompra[monedas]">
        <p>Precio: {{ datosCompra[monedas].ask }}</p>
        <p>Precio: {{ datosCompra[monedas].totalAsk }}</p>
        <p>Datos: {{ datosCompra[monedas].bid }}</p>
        <p>Datos: {{ datosCompra[monedas].totalBid }}</p>
        <p>Tiempo: {{ datosCompra[monedas].time }}</p>
        <input
          v-model="cantidad"
          :step="cantidadMinima"
          :min="cantidadMinima"
          type="number"
          :placeholder="`Cantidad minima: ${cantidadMinima}`"
        />
        <button @click="Confirmar()">Comprar</button>
        <button @click="Cancelar()">Cancelar</button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { useStore } from "vuex";
import { computed } from "vue";
import eventService from "@/services/EventService.js";
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
  data() {
    return {
      monedas: null,
      cantidad: null,
    };
  },
  computed: {
    ...mapGetters(["datosCompra"]),
    cantidadMinima() {
      if (this.datosCompra[this.monedas]) {
        const gastoMin = 0.01;
        const precioUnidad = this.datosCompra[this.monedas].ask;
        return gastoMin / precioUnidad;
      }
      return 0;
    },
  },
  created() {
    this.monedas = this.$route.params.moneda;
    /*console.log(
      "Viendo DATOS:",
      this.$route.params.moneda,
      this.monedas,
      this.datosCompra[this.monedas]
    );*/
  },
  mounted() {
    this.consultarApi();
  },
  methods: {
    ...mapActions(["consultaApi"]),
    async consultarApi() {
      await this.consultaApi();
      console.log("Datos actualizados:", this.datosCompra);
    },
    async Confirmar() {
      console.log("Cantidad a comprar:", this.cantidad);
      if (this.cantidad > 0) {
        console.log(this.cantComprada());
        console.log("Fecha comprada dsa", this.datosCompra[this.monedas].time);
        const fecha = this.datosCompra[this.monedas].time;
        console.log("fecha de compra: ", fecha);
        console.log("precio a comprar:", this.cantComprada());
        const infoCompra = {
          crypto_code: this.monedas,
          crypto_amount: this.cantidad,
          money: this.cantComprada(),
          user_id: this.usuario.id,
          action: "purchase",
          datetime: fecha,
          /*crypto_code: "nuars",
          crypto_amount: "1",
          money: "1",
          user_id: "JuanCruz",
          action: "purchase",
          datetime: "2023-06-21T23:17:35.767Z",*/
        };
        console.log("Cantidad a comprar:", this.cantidad);
        console.log("precio a comprar:", this.cantComprada());
        console.log("data", infoCompra);
        console.log("dsadad", fecha);
        console.log("Tipo de crypto_amount:", typeof infoCompra.crypto_amount);
        eventService
          .compra(infoCompra)
          .then((response) => {
            console.log("Respuesta de la api: ", response.data);
            console.log("Cantidad a comprar:", this.cantidad);
          })
          .catch((error) => {
            console.error("Error de la api: ", error);
            console.log("Cantidad a comprar:", this.cantidad);
            console.log("precio a comprar:", this.cantComprada());
          });
        //console.log("data", infoCompra);
      } else {
        alert("Ingrese un dato valido o un gasto mayor a 0.01$ argentinos.");
      }
    },
    Cancelar() {
      this.$router.push("/crypto");
    },
    cantComprada() {
      const precioUnidad = this.datosCompra[this.monedas].totalAsk.toFixed(2);
      const precioAPagar = precioUnidad * this.cantidad;
      return parseFloat(precioAPagar.toFixed(2));
    },
    /*darFomatoFecha() {
      const nuevaFecha = new Date(this.datosCompra[this.monedas].time * 1000);
      const dia = nuevaFecha.getDate().toString().padStart(2, "0");
      const mes = (nuevaFecha.getMonth() + 1).toString().padStart(2, "0");
      const año = nuevaFecha.getFullYear();
      const hora = nuevaFecha.getHours().toString().padStart(2, "0");
      const minutos = nuevaFecha.getMinutes().toString().padStart(2, "0");
      const formatoFecha = `${dia}-${mes}-${año} ${hora}:${minutos}`;
      return formatoFecha;
    },*/
  },
};
</script>
<style>
#contenedorCompra {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: linear-gradient(135deg, #000000, #531466);
  display: flex;
  justify-content: center;
  align-items: center;
}
#ContenedorInfoCompra {
  position: relative;
}
</style>
