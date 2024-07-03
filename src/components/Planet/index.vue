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
import { defineProps } from "vue";
import type { Props } from "./types";

defineProps<Props>();
</script>

<style scoped>
.planet {
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  z-index: 10;
  transform: translate(-50%, 50%);
  transition: 0.5s;
  background: blue;
}
</style>
