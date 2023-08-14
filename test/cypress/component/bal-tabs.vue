<script setup lang="ts">
import { BalTabs, BalTabItem } from '../support/utils'
</script>
<template>
  <BalTabs>
    <BalTabItem value="tab-a" label="Tab A">Content of Tab A</BalTabItem>
    <BalTabItem value="tab-b" label="Tab B">Content of Tab B</BalTabItem>
    <BalTabItem bubble value="tab-c" label="Tab C">Content of Tab C</BalTabItem>
    <BalTabItem value="tab-d" label="Tab D" hidden>Hidden Content of Tab D</BalTabItem>
    <BalTabItem value="tab-e" label="Tab E" disabled>Content of Tab E</BalTabItem>
    <BalTabItem value="tab-link" label="Tab link" href="https://github.com/baloise/design-system" target="_blank"
      >Content of Tab link</BalTabItem
    >
  </BalTabs>
</template>
