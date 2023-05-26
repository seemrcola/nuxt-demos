import type CodeMirror from 'codemirror'

// 框选效果处理成矩形
export function rectangle(editor: CodeMirror.Editor) {
  editor.on('beforeSelectionChange', (_, event) => {
    console.log(event, 'xxx')
  })
}
