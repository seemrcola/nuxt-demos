<script setup lang='ts'>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import CompsList from './components/CompsList.vue'
import Settings from './components/Settings.vue'
import CanvasContainer from './components/Container.vue'
import Ruler from './components/Ruler.vue'
import Layer from './components/Layer.vue'

const mode = ref('components')
function changeMode(name: string) {
  mode.value = name
}
</script>

<template>
  <NuxtLayout name="editor">
    <template #header>
      <Header />
    </template>
    <template #sidebar>
      <div flex h-full>
        <Aside w="36px" bg-white @checkout="changeMode" />
        <CompsList v-if="mode === 'components'" flex-1 bg-white />
        <Layer v-if="mode === 'layers'" flex-1 bg-white />
      </div>
    </template>
    <template #content>
      <ClientOnly>
        <Ruler>
          <CanvasContainer />
        </Ruler>
      </ClientOnly>
    </template>
    <template #settings>
      <Settings bg-white />
    </template>
  </NuxtLayout>
</template>
