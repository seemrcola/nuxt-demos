import type { App } from 'vue'
import NMessage from './message'
import type { UseMessage } from './type'
import { useMessageKey } from '~/provider.keys'

const useMessage: UseMessage = Object.assign(
  NMessage,
  {
    install(app: App) {
      app.config.globalProperties.useMessage = NMessage
      app.provide(useMessageKey, NMessage)
      // app.component('NMessage', NMessage) // 这一步nuxt有自动导入，会自行处理
    },
  },
)

export default useMessage

// 这个方法是针对vue3的全局挂载方案，nuxt3的话可以写简单一点，比这个要好不少
// nuxt3的方案我写在了blog那个仓库里面，可以参考一下

// index.vue是为了让nuxt3自动导入，通过组件方式使用
// index.ts是为了让用户手动导入，通过函数方式使用
// 现在有两种方法使用，一种是inject导入，一种是直接导入对应组件的index.ts文件
