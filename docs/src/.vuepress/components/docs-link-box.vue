<template>
  <a class="bal-app" :href="link" style="text-decoration: none">
    <bal-card>
      <bal-card-content>
        <bal-list>
          <bal-list-item>
            <bal-list-item-icon>
              <bal-icon :name="iconLeft"></bal-icon>
            </bal-list-item-icon>
            <bal-list-item-content>
              <bal-list-item-title>{{ title }}</bal-list-item-title>
              <bal-list-item-subtitle>{{ subtitle }}</bal-list-item-subtitle>
            </bal-list-item-content>
            <bal-list-item-icon right>
              <bal-icon :name="iconRight"></bal-icon>
            </bal-list-item-icon>
          </bal-list-item>
        </bal-list>
      </bal-card-content>
    </bal-card>
  </a>
</template>

<script>
export default {
  name: 'docs-link-box',
  props: {
    title: {
      type: String,
      default: '',
    },
    subtitle: {
      type: String,
      default: '',
    },
    link: {
      type: String,
      default: '',
    },
    iconLeft: {
      type: String,
      default: 'document',
    },
    iconRight: {
      type: String,
      default: 'download',
    },
  },
}
</script>
