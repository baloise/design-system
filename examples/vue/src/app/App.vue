<template>
  <header class="has-background-white">
    <BalNavbar>
      <BalNavbarBrand>
        <BalIcon name="logo" inverted size="large"></BalIcon>
        <BalText style="margin-left: 15px"> <strong>Vue</strong> Starter-Kit </BalText>
      </BalNavbarBrand>
    </BalNavbar>
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
  </header>
  <main>
    <div class="container">
      <!-- Page content -->
      <router-view />
    </div>
  </main>
  <footer class="footer">
    <div class="container">
      <!-- Footer content -->
      Footer
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { routes } from '../router'

export default defineComponent({
  name: 'App',
  data: () => {
    return {
      routes,
    }
  },
})
</script>
