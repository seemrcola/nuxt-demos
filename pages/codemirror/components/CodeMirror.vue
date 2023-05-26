<script setup lang='ts'>
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'

const EOL = '\n'
const SPACE = ' '
const DEFAULT_VALUE = `
   seemr.
        👋 hello world
        💪 the barbell is raised as usual
`

// 文本填充 => 用于实现点击哪里光标就在哪里
function fill(text: string) {
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

const code = ref(fill(DEFAULT_VALUE))
const textarea = ref<HTMLElement>()
let editor: CodeMirror.EditorFromTextArea
onMounted(() => {
  const myTextarea = textarea.value as HTMLTextAreaElement
  editor = CodeMirror.fromTextArea(myTextarea, {
    mode: 'javascript',
    theme: 'monokai',
    value: fill(DEFAULT_VALUE),
  })
})
</script>

<template>
  <div wh-full>
    <textarea ref="textarea" v-model="code" />
  </div>
</template>

<style lang="scss">
.CodeMirror.cm-s-monokai {
  height: 100vh;
  width: 100%;
  &:hover {
    ::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
