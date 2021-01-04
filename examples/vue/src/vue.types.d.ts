import Vue from 'vue'
import { BalUtilsStatic } from '@baloise/ui-library-utils'

declare module 'vue/types/vue' {
  interface VueConstructor {
    $balUtils: BalUtilsStatic
  }

  interface Vue {
    $balUtils: BalUtilsStatic
  }
}
