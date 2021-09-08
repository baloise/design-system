<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.hash" :class="{ active: activeTab === item.hash }">
        <a @click="scrollTo(item.hash)">
          {{ item.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'docs-component-tabs',
  data() {
    return {
      activeTab: 'examples',
      items: [],
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)

    this.items = this.getHeadings()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    getHeadings() {
      const list = [...document.getElementsByTagName('h2')].slice(0, -2)
      return list.map(item => {
        return {
          label: item.innerText.replace('#\n', ''),
          hash: item.id,
          offsetTop: item.offsetTop,
        }
      })
    },
    handleScroll(event) {
      let breaked = false
      this.getHeadings()
        .reverse()
        .forEach(item => {
          if (!breaked && item.offsetTop <= window.scrollY) {
            breaked = true
            this.activeTab = item.hash
          }
        })
    },
    scrollTo(hash) {
      this.activeTab = hash
      location.hash = '#' + hash
      setTimeout(() => {
        const element = document.getElementById(hash)
        const top = element.offsetTop
        window.scrollTo(0, top)
      }, 0)
    },
  },
}
</script>

<style scoped>
div {
  overflow: hidden;
  overflow-x: auto;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
  margin: 0;
  position: -webkit-sticky;
  position: sticky;
  top: 57px;
  z-index: 35;
  width: 100%;
  height: 56px;
  margin: 32px 0;
  border-bottom: 1px solid #d1dbed;
}

ul {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  box-shadow: none;
  display: flex;
  flex-direction: row;
  max-width: none;
  -webkit-user-select: none;
  user-select: none;
  list-style-type: none;
}

li {
  position: relative;
  white-space: nowrap;
  margin: 0;
  padding: 0;
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
}

li > a {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0 16px;
  color: #000;
  border-radius: 4px;
  font-size: 18px;
  vertical-align: sub;
  cursor: pointer;
  text-decoration: none !important;
}

li:hover {
  color: #039;
  background: #d1dbed;
}

li.active {
  border-bottom: 2px solid #039;
  background: #d1dbed;
  color: #039;
}
</style>
