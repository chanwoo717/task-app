<template>
  <nav v-if="typeof $route.name === 'string' && !'home'.includes($route.name)">
    <router-link to="/">Home</router-link> |
    <router-link to="/weather">Weather</router-link> |
    <router-link to="/todo">Todo-List</router-link> |
    <router-link to="/calculator">Calculator</router-link> |
    <router-link to="/map">Google Maps</router-link> |
  </nav>
  <router-view/>
</template>

<style lang="scss">

#app {
  font-family: "Montserrat", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: auto 15%;
  font-family: 'Montserrat', sans-serif;
  background-color: #343d4b;

}

nav {
  padding: 50px;

  a {
    font-weight: bold;
    color: #cfcfcf;
    margin: auto 30px;
    text-decoration: overline underline wavy;
    &.router-link-exact-active {
      color: #5ac4f5;
    }
  }
}
</style>
