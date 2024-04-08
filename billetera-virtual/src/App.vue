<template>
  <nav>
    <router-link to="/">Inicio</router-link> |
    <router-link to="/about">Info</router-link>
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  display: flex;
  justify-content: right;
  position: relative;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  padding-right: 3px;
  padding-left: 3px;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
