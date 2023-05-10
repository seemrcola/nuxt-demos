<script setup lang='ts'>

</script>

<template>
  <main h-full w-full overflow-hidden>
    <header h="40px" shadow-inherit b-b="1px solid #ccc">
      <slot name="header" />
    </header>
    <div flex h="[calc(100vh-40px)]">
      <aside w="240px" b-r="1px solid #ccc">
        <slot name="sidebar" />
      </aside>
      <div flex-1>
        <slot name="content" />
      </div>
      <div w="300px" b-l="1px solid #ccc">
        <slot name="settings" />
      </div>
    </div>
  </main>
</template>
