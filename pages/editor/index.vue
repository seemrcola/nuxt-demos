<script setup lang='ts'>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import CompsList from './components/CompsList.vue'
import Settings from './components/Settings.vue'
import CanvasContainer from './components/Container.vue'
</script>

<template>
  <NuxtLayout name="editor">
    <template #header>
      <Header />
    </template>
    <template #sidebar>
      <div flex h-full>
        <Aside w="36px" bg-white />
        <CompsList flex-1 bg-white />
      </div>
    </template>
    <template #content>
      <ClientOnly>
        <CanvasContainer />
      </ClientOnly>
    </template>
    <template #settings>
      <Settings bg-white />
    </template>
  </NuxtLayout>
</template>
