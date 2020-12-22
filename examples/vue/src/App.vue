<template>
  <div id="app" class="container">
    <div id="nav">
      <span v-for="(route, index) in routes" :key="route.path">
        <router-link :to="route.path">
          {{ route.name }}
        </router-link>
        <span v-if="index !== routes.length - 1">|</span>
      </span>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { routes } from './router'

export default Vue.extend({
  name: 'Home',
  data: () => {
    return {
      routes,
    }
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    margin-left: 10px;
    margin-right: 10px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
