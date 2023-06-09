import { createApp } from 'vue'
import MessageComponent from '~/components/NMessage.vue'
import type { Config, MessageTipFunction, MessageType } from '~/types/comp.message.d'

const Field: MessageType[] = ['success', 'error', 'warning', 'info']

// @ts-expect-error
const NMessage: MessageTipFunction = (props: Config) => {
  const messageInstance = createApp(MessageComponent, {
    ...props,
  })
  showMessage(messageInstance, props.duration)
}

Field.forEach((type: MessageType) => {
  NMessage[type] = (props: Config) => {
    props.type = type
    return NMessage(props)
  }
})

function showMessage(app: any, durantion = 3000) {
  const fragment = document.createDocumentFragment()
  app.mount(fragment)
  document.body.appendChild(fragment)

  setTimeout(() => {
    app.unmount() // 销毁实例
  }, durantion)
}

export default NMessage
