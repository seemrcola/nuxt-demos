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
