<script setup lang='ts'>
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'

const props = defineProps<{
  codeHtml: string
}>()

const code = Prism.highlight(props.codeHtml, Prism.languages.javascript, 'javascript')
</script>

<template>
  <pre px-2>
    <code v-html="code" />
  </pre>
</template>
