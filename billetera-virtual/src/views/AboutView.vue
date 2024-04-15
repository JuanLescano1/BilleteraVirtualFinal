<template>
  <div>
    <img src="@\components\Imagenes\FondoInicioSesion.jpg" id="fondo" />
    <div class="about">
      <h1>Billetera virtual</h1>
      <div id="info">
        <p>Trabajo final Juan Cruz Lescano</p>
      </div>
    </div>
  </div>
</template>

<style>
body {
  margin: 0px;
}
#fondo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
}
h1 {
  color: gold;
}
.about {
  min-height: 91.8vh;
  display: grid;
  position: relative;
}
#info {
  position: absolute;
  min-height: 80%;
  min-width: 80%;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50px;
}
#info p {
  font-size: 23px;
  margin-left: 100px;
  margin-right: 100px;
  margin-top: 100px;
  text-justify: auto;
}
</style>
