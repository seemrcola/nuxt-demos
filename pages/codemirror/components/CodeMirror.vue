<script setup lang='ts'>
import CodeMirror from 'codemirror'
import 'codemirror/lib/codemirror.css'
import 'codemirror/mode/javascript/javascript.js'
import { DEFAULT_OPTIONS, DEFAULT_VALUE } from './const'
import { fill } from './codeeverywhere'
import { rectangle } from './rectangle'

const code = ref(fill(DEFAULT_VALUE))
const textarea = ref<HTMLElement>()
let editor: CodeMirror.EditorFromTextArea
onMounted(() => {
  const myTextarea = textarea.value as HTMLTextAreaElement
  editor = CodeMirror.fromTextArea(
    myTextarea,
    DEFAULT_OPTIONS,
  )
  rectangle(editor)
})
</script>

<template>
  <div wh-full>
    <textarea ref="textarea" v-model="code" />
  </div>
</template>

<style lang="scss">
.CodeMirror {
  height: 100vh;
  width: 100%;
  &:hover {
    ::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
