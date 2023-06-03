import { createApp } from 'vue'
import MessageComponent from './index.vue'
import type { Config, MessageTipFunction, MessageType } from './type'

const Field: MessageType[] = ['success', 'error', 'warning', 'info']

// @ts-expect-error
const messageTip: MessageTipFunction = (props: Config) => {
  const messageInstance = createApp(MessageComponent, {
    ...props,
  })
  showMessage(messageInstance)
}

Field.forEach((type: MessageType) => {
  messageTip[type] = (props: Config) => {
    props.type = type
    return messageTip(props)
  }
})

function showMessage(app: any) {
  const fragment = document.createDocumentFragment()
  app.mount(fragment)
  document.body.appendChild(fragment)

  setTimeout(() => {
    app.unmount() // 销毁实例
  }, 3000) // 3s后销毁实例 -- 暂时写死
}

export default messageTip
