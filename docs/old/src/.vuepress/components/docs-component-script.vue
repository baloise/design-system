<template></template>

<script>
import * as BalComponentScripts from '../generated/components'

export default {
  name: 'docs-component-script',
  props: {
    tag: String,
  },
  async mounted() {
    console.log(this.$props.tag)
    // let timeout = 0
    // let elements = []
    // const demos = document.querySelectorAll('.demo')
    // for (let index = 0; index < demos.length; index++) {
    //   const element = demos[index]
    //   elements = [...elements, ...element.getElementsByTagName('*')]
    // }

    // elements = elements.filter(el => el.tagName.startsWith('BAL-'))

    // // if (elements.length === 0) {
    // //   timeout = 500
    // // }

    // await Promise.all(elements.map(el => el.componentOnReady()))
    // const fn = BalComponentScripts[this.$props.tag]
    // if (fn && typeof fn == 'function') {
    //   setTimeout(() => fn(), timeout)
    // }
  },
}
</script>
