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
            exact
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
        <div class="has-padding">
          <router-view />
        </div>
      </BalCard>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { routes } from './router'
import { BalNavbar, BalTabs, BalTabItem, BalNavbarBrand, BalCard, BalText } from '@baloise/ui-library-vue-2'

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
