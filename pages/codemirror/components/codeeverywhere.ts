// 文本填充 => 用于实现点击哪里光标就在哪里
import { EOL, SPACE } from './const'

export function fill(text: string) {
  const lines = 90
  const columns = 300
  const textLines = text.split(EOL)

  const result = []
  for (let l = 0; l < Math.max(lines, textLines.length); l++) {
    const tLine = (textLines[l] || '').trimEnd()
    let line = ''
    for (let c = 0; c < Math.max(columns, tLine.length); c++)
      line += tLine[c] || SPACE
    result.push(line)
  }

  return result.join(EOL)
}
