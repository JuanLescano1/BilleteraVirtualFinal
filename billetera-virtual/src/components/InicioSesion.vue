<template>
  <div>
    <img src="@\components\Imagenes\FondoInicioSesion.jpg" id="fondo" />
    <div id="ingresoDeUsuario">
      <h2>Ingrese su ID</h2>
      <div id="imagen">
        <img src="@\components\Imagenes\Usuario-removebg-preview.png" />
      </div>
      <input v-model.trim="idUsuario" id="id" />
      <button v-on:click="controlDeInicio">Ingresar</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      idUsuario: "",
    };
  },
  methods: {
    ...mapActions(["inicio"]),
    controlDeInicio() {
      if (this.idUsuario !== "") {
        this.inicio(this.idUsuario);
        this.$router.push("/usuario");
      } else {
        alert("Usuario no valido");
      }
    },
  },
};
</script>

<style scoped>
#fondo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
}
#ingresoDeUsuario {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  border-style: groove;
  border-radius: 10px;
  border-color: black;
  min-width: 300px;
  min-height: 300px;
  align-items: center;
  justify-content: center;
  max-width: 300px;
  background-image: url("/src/components/Imagenes/FondoInicioSesion.jpg");
  background-size: cover;
}

#ingresoDeUsuario h2 {
  position: relative;
  margin: 0px;
  -webkit-text-stroke: 1px black;
  text-shadow: 0px 2px 4px #fc0490;
}
#ingresoDeUsuario button {
  border-radius: 10px;
  border-color: rgb(44, 23, 102);
  width: 100px;
  font-size: 15px;
}
#ingresoDeUsuario #id {
  margin-bottom: 10px;
  border-radius: 10px;
  border-style: inset;
  border-color: rgb(44, 23, 102);
}
#imagen img {
  width: 50%;
  height: 50%;
  display: block;
  margin: auto;
}
#imagen {
  display: flex;
  margin: 3px;
  border-radius: 50%;
  position: relative;
  max-width: 100px;
  max-height: 100px;
  min-width: 100px;
  min-height: 100px;
  background: linear-gradient(
    35deg,
    #1b0438,
    #1b0438,
    #5c3a8e,
    #db2190,
    #fc0490
  );
  border-style: solid;
}
</style>
