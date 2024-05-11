<template>
  <div>
    <h1>{{ monedas }}</h1>
    <div v-if="datosCompra[monedas]">
      <h1 v-if="monedas">Moneda a comprar: {{ monedas }}</h1>
      <div v-if="monedas && datosCompra[monedas]">
        <p>Moneda: {{ datosCompra[monedas].ask }}</p>
        <p>Datos: {{ datosCompra[monedas].totalAsk }}</p>
        <p>Datos: {{ datosCompra[monedas].bid }}</p>
        <p>Datos: {{ datosCompra[monedas].totalBid }}</p>
        <p>Tiempo: {{ datosCompra[monedas].time }}</p>
        <input
          v-model="cantidad"
          type="number"
          placeholder="Cantidad a comprar"
          step="0.0001"
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
import eventService from "@/services/EventService";
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
    ...mapActions(["consultaApi", "dandoFormatoFecha"]),
    async consultarApi() {
      await this.consultaApi();
      console.log("Datos actualizados:", this.datosCompra);
    },
    Confirmar() {
      if (this.validarCant()) {
        console.log(this.cantComprada());
        const infoCompra = {
          user_id: this.usuario.id,
          action: "purchase",
          crypto_code: this.monedas,
          crypto_amount: this.cantidad,
          money: this.cantComprada(),
          datetime: this.darFomatoFecha(),
        };
        console.log("data", infoCompra);
        eventService
          .compra(infoCompra)
          .then((response) => {
            console.log("Respuesta de la api: ", response.data);
          })
          .catch((error) => {
            console.error("Error de la api: ", error);
          });
        //console.log("data", infoCompra);
      } else {
        alert("Ingrese un dato valido.");
      }
    },
    Cancelar() {
      this.$router.push("/crypto");
    },
    validarCant() {
      return this.cantidad !== null && parseFloat(this.cantidad) >= 0;
    },
    cantComprada() {
      const precioUnidad = this.datosCompra[this.monedas].ask;
      const precioAPagar = precioUnidad * this.cantidad;
      return precioAPagar;
    },
    darFomatoFecha() {
      const nuevaFecha = new Date(this.datosCompra[this.monedas].time * 1000);
      const dia = nuevaFecha.getDate().toString().padStart(2, "0");
      const mes = (nuevaFecha.getMonth() + 1).toString().padStart(2, "0");
      const año = nuevaFecha.getFullYear();
      const hora = nuevaFecha.getHours().toString().padStart(2, "0");
      const minutos = nuevaFecha.getMinutes().toString().padStart(2, "0");
      const formatoFecha = `${dia}-${mes}-${año} ${hora}:${minutos}`;
      return formatoFecha;
    },
  },
};
</script>
<style></style>
