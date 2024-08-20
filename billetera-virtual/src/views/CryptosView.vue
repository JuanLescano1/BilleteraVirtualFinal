<template>
  <div>
    <div id="fondoImagen">
      <img src="@\components\Imagenes\FondoInicioSesion.jpg" id="fondoLista" />
      <div class="contenedor-Principal">
        <h1 v-if="error">
          No se pudieron cargar los datos obtenidos de la API
        </h1>
        <div v-if="!carga && !error">
          <div class="botones">
            <button
              @click="
                buenBit = true;
                argenBTC = false;
              "
              class="botonExchange"
            >
              BuenBit
            </button>
            <button
              @click="
                buenBit = false;
                argenBTC = true;
              "
              class="botonExchange"
            >
              argentBTC
            </button>
          </div>
          <div class="titulo">
            <h1 v-if="buenBit">buenBit</h1>
            <h1 v-if="argenBTC">argenBTC</h1>
          </div>
          <div class="contenedor-Secundario">
            <div v-if="buenBit">
              <div>
                <div
                  class="contenedor-verDetalles"
                  @click="mostrarDetalles('nuars')"
                >
                  <h2>nuARS</h2>
                  <h3>Ver detalles</h3>
                </div>
                <div v-if="detalles === 'nuars'" class="detalles">
                  <p>Precio: {{ nuarsData.ask }}</p>
                  <p>Precio con comisiones: {{ nuarsData.totalAsk }}</p>
                  <p>Venta: {{ nuarsData.bid }}</p>
                  <p>Venta con comisiones: {{ nuarsData.totalBid }}</p>
                  <p>Tiempo actualizacion: {{ nuarsData.time }}</p>
                  <button
                    @click="comprar(detalles, nuarsData)"
                    class="btnCompra"
                  >
                    Comprar
                  </button>
                </div>
              </div>
              <div>
                <div
                  class="contenedor-verDetalles"
                  @click="mostrarDetalles('ada')"
                >
                  <h2>ADA</h2>
                  <h3>Ver detalles</h3>
                </div>
                <div v-if="detalles === 'ada'" class="detalles">
                  <p>Precio: {{ adaData.ask }}</p>
                  <p>Precio con comisiones: {{ adaData.totalAsk }}</p>
                  <p>Venta: {{ adaData.bid }}</p>
                  <p>Venta con comisiones: {{ adaData.totalBid }}</p>
                  <p>Tiempo actualizacion: {{ adaData.time }}</p>
                  <button @click="comprar(detalles, adaData)" class="btnCompra">
                    Comprar
                  </button>
                </div>
              </div>
              <div>
                <div
                  class="contenedor-verDetalles"
                  @click="mostrarDetalles('avax')"
                >
                  <h2>AVAX</h2>
                  <h3>Ver detalles</h3>
                </div>
                <div v-if="detalles === 'avax'" class="detalles">
                  <p>Precio: {{ avaxData.ask }}</p>
                  <p>Precio con comisiones: {{ avaxData.totalAsk }}</p>
                  <p>Venta: {{ avaxData.bid }}</p>
                  <p>Venta con comisiones: {{ avaxData.totalBid }}</p>
                  <p>Tiempo actualizacion: {{ avaxData.time }}</p>
                  <button
                    @click="comprar(detalles, avaxData)"
                    class="btnCompra"
                  >
                    Comprar
                  </button>
                </div>
              </div>
            </div>
            <div v-if="argenBTC">
              <div>
                <div v-for="(data, moneda) in argentBTCData" :key="moneda">
                  <div
                    class="contenedor-verDetalles"
                    @click="mostrarDetalles(moneda, data)"
                  >
                    <h2>{{ moneda }}</h2>
                    <h3>Ver detalles</h3>
                  </div>
                  <div v-if="detalles === moneda" class="detalles">
                    <p>Precio: {{ data.ask }}</p>
                    <p>Precio con comisiones: {{ data.totalAsk }}</p>
                    <p>Venta: {{ data.bid }}</p>
                    <p>Venta con comisiones: {{ data.totalBid }}</p>
                    <p>Tiempo actualizacion: {{ data.time }}</p>
                    <button @click="comprar(moneda, data)" class="btnCompra">
                      Comprar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState([
      "nuarsData",
      "adaData",
      "avaxData",
      "argentBTCData",
      "carga",
      "error",
    ]),
  },

  created() {
    this.consultaApi();
  },
  data() {
    return {
      detalles: null,
      buenBit: true,
      argenBTC: false,
    };
  },
  methods: {
    ...mapActions(["consultaApi"]),
    mostrarDetalles(moneda) {
      this.detalles = this.detalles === moneda ? null : moneda;
    },
    comprar(moneda, data) {
      console.log("envio de datos:", moneda, data);
      this.$store.dispatch("btnCompra", { moneda, data });
      this.$router.push({ name: "Compra", params: { moneda: moneda } });
    },
  },
};
</script>
<style>
#fondoLista {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
}
#fondoImagen {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /*background: linear-gradient(135deg, #000008, #531466);*/
}
.contenedor-Principal {
  position: relative;
  z-index: 1;
  height: 100%;
  overflow-y: auto;
  align-content: center;
}
.contenedor-Secundario {
  overflow-y: auto;
  display: grid;
  grid-template-rows: 1fr 1fr;
  position: absolute;
  width: 80%;
  height: 50%;
  border-style: solid;
  border-radius: 10px;
  margin-left: 10%;
  margin-right: 10%;
  bottom: 5%;
  background: rgba(0, 0, 0, 0.6);
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
}
.contenedor-Secundario::-webkit-scrollbar {
  background: transparent;
}
.contenedor-verDetalles {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  width: 100%;
  position: relative;
  cursor: pointer;
}
.contenedor-verDetalles::after {
  content: "";
  position: absolute;
  top: 0;
  left: 52%;
  transform: translateX(-50%);
  width: 70%;
  border-top: 2px solid #ccc;
}
.contenedor-verDetalles h3 {
  grid-column: 2;
  justify-self: center;
}
.contenedor-verDetalles h2 {
  grid-column: 1;
  align-self: center;
}
.detalles {
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
  width: 40%;
  margin: 0 auto;
  align-items: center;
  border-radius: 10px;
  color: rgb(255, 255, 255);
  margin-bottom: 1%;
}
.detalles button {
  margin-bottom: 16px;
}
.botones {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  position: fixed;
  top: 10%;
  width: 100%;
  z-index: 2;
  height: 20%;
}
.botonExchange {
  border-style: hidden;
  border-radius: 10px;
  margin: 5px;
  width: 30%;
  height: 50px;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  position: relative;
  color: white;
}
.botonExchange::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px groove;
  border-radius: 10px;
  transition: opacity 0.3s ease;
  border-color: rgb(255, 255, 255);
}
.botonExchange:hover::after {
  opacity: 0.1;
}
.titulo {
  position: fixed;
  top: 30%;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;
  height: 10%;
  color: rgb(255, 255, 255);
  text-shadow: 0 5px 10px black;
  -webkit-text-stroke: 1.5px rgb(110, 16, 95);
}
.btnVerDetalles {
  border-style: hidden;
  border-radius: 10px;
  margin: 5px;
  background: transparent;
  font-size: 20px;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  position: relative;
  color: white;
}
.btnVerDetalles::after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 2px groove;
  border-radius: 10px;
  transition: opacity 0.3s ease;
  border-color: rgb(255, 255, 255);
}
.btnVerDetalles:hover::after {
  opacity: 0.2;
}
.btnCompra {
  border-radius: 10px;
  width: 20%;
  min-width: 90px;
  font-size: 18px;
  cursor: pointer;
}
</style>
