<template>
  <div id="app">
    <BalNavbar>
      <BalNavbarBrand>
        Demo App
      </BalNavbarBrand>
    </BalNavbar>
    <main class="container">
      <BalTabs>
        <BalTabItem v-for="route in routes" :key="route.path" :label="route.name" :value="route.name" :href="route.path"></BalTabItem>
      </BalTabs>
      <router-view />
    </main>

    <!-- <div id="nav">
      <span v-for="(route, index) in routes" :key="route.path">
        <router-link :to="route.path">
          {{ route.name }}
        </router-link>
        <span v-if="index !== routes.length - 1">|</span>
      </span>
    </div>
    <div class="container"></div> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { routes } from './router'
import { BalNavbar, BalTabs, BalTabItem, BalNavbarBrand } from '@baloise/ui-library-vue'

export default Vue.extend({
  name: 'Home',
  components: {
    BalNavbar,
    BalNavbarBrand,
    BalTabs,
    BalTabItem,
  },
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
