<template>
  <div id="app">
    <BalNavbar>
      <BalNavbarBrand>
        <img src="https://github.com/baloise/ui-library/raw/master/docs/assets/images/icon.svg" />
        <BalText style="margin-left: 15px">Demo App</BalText>
      </BalNavbarBrand>
    </BalNavbar>

    <nav class="has-background-white">
      <div class="container">
        <BalTabs>
          <router-link
            v-for="routeItem in routes"
            :key="routeItem.name"
            :to="routeItem"
            v-slot="{ href, route, navigate, isActive }"
          >
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
    </nav>

    <main class="container">
      <BalCard style="margin-top: 40px">
        <div class="is-padded">
          <router-view />
        </div>
      </BalCard>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { routes } from './router'
import { BalNavbar, BalTabs, BalTabItem, BalNavbarBrand, BalCard, BalText } from '@baloise/ui-library-vue'

export default Vue.extend({
  name: 'Home',
  components: {
    BalNavbar,
    BalNavbarBrand,
    BalCard,
    BalTabs,
    BalTabItem,
    BalText,
  },
  data: () => {
    return {
      routes,
    }
  },
  methods: {
    bubu: (e: any) => {
      alert(e)
    },
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
