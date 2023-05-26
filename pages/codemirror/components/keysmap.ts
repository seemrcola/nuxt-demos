import type CodeMirror from 'codemirror'
import { SPACE } from './const'

export function onEnterPressed(cm: CodeMirror.Editor) {
  const { line, ch } = cm.getCursor()
  const text = cm.getRange({ line, ch: 0 }, { line, ch })
  let space = 0
  let targetCh = ch
  for (let i = ch; i >= 0; i--) {
    if (text[i] === SPACE) {
      space++
      if (space === 2) {
        targetCh = i + 2
        break
      }
    }
    else {
      space = 0
    }
  }
  cm.setCursor({ line: line + 1, ch: targetCh })
}

export function onShiftSpace(cm: CodeMirror.Editor) {
  cm.replaceRange(SPACE, cm.getCursor(), cm.getCursor())
}
