<template>
  <div id="app">
    <BalNavbar>
      <BalNavbarBrand>
        Demo App
      </BalNavbarBrand>
    </BalNavbar>

    <nav class="has-background-white">
      <div class="container">
        <BalTabs>
          <router-link v-for="routeItem in routes" :key="routeItem" :to="routeItem" v-slot="{ href, route, navigate, isActive }">
            <BalTabItem
              :active="isActive"
              :href="href"
              :label="route.name"
              :value="route.name"
              @balNavigate="navigate"
            ></BalTabItem>
          </router-link>
        </BalTabs>
      </div>

      <!-- <router-link
        v-for="routeItem in routes"
        :key="routeItem.name"
        :to="routeItem"
        v-slot="{ href, route, navigate, isActive }"
      >
        <a :key="route.path" :label="route.name" :value="route.name" :active="isActive" :href="href">
          {{ route.name }}
        </a>
      </router-link> -->
    </nav>

    <main class="container">
      <BalCard style="margin-top: 40px">
        <div class="is-padded">
          <router-view />
        </div>
      </BalCard>
    </main>

    <div id="nav">
      <span v-for="(route, index) in routes" :key="route.path">
        <router-link :to="route.path">
          {{ route.name }}
        </router-link>
        <span v-if="index !== routes.length - 1">|</span>
      </span>
    </div>
    <div class="container"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { routes } from './router'
import { BalNavbar, BalTabs, BalTabItem, BalNavbarBrand, BalCard } from '@baloise/ui-library-vue'

export default Vue.extend({
  name: 'Home',
  components: {
    BalNavbar,
    BalNavbarBrand,
    BalCard,
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
