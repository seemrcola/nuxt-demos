export type Props = Config

export interface Config {
  content: string
  type?: MessageType
  icon?: string
  close?: boolean
}

export type MessageType = 'success' | 'error' | 'warning' | 'info'

export type MessageTipFunction = {
  (props: Props): void
} & {
  [key in MessageType]: (props: Props) => void
}
