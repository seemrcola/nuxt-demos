import type { App } from 'vue'

export type Props = Config

export interface Config {
  content: string
  type?: MessageType
  icon?: string
  close?: boolean
  duration?: number
}

export type MessageType = 'success' | 'error' | 'warning' | 'info'

export type MessageTipFunction = {
  (props: Config): void
} & {
  [key in MessageType]: (props: Config) => void
}

export interface UseMessage extends MessageTipFunction {
  install: (app: App) => void
}
