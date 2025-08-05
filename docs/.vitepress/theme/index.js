import DefaultTheme from 'vitepress/theme'
import '@varco/core/dist/index.css'
import Basic from '../components/Button/Basic.vue'
import Disabled from '../components/Button/Disabled.vue'
import Sizes from '../components/Button/Sizes.vue'
import Loading from '../components/Button/Loading.vue'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    DefaultTheme.enhanceApp({ app })
    app.component('Basic', Basic)
    app.component('Disabled', Disabled)
    app.component('Sizes', Sizes)
    app.component('Loading', Loading)
  }
}