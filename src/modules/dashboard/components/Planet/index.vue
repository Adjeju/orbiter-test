<template>
  <div
    class="planet"
    :style="{
      left: position.x + 'px',
      bottom: position.y + 'px',
    }"
  ></div>
</template>

<script setup lang="ts">
import type { Props } from "./types";

defineProps<Props>();
</script>

<style scoped>
.planet {
  transition: 1s;
  @apply absolute z-10 h-5 w-5 -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-700;
}
</style>
