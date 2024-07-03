<script setup lang="ts">
import Orbit from "./components/Orbit/index.vue";
import { useOrbits } from "./hooks/useOrbits";

useOrbits();

const data = [
  { arr: [1, 1, 1, 1, 1] },
  { arr: [1, 1, 1] },
  { arr: [1, 1, 1] },
  { arr: [1, 1, 1, 1, 1, 1, 1] },
  { arr: [1, 1] },
  { arr: [1, 1, 1] },
  { arr: [1, 1, 1, 1] },
  { arr: [1, 1, 1, 1] },
  { arr: [1, 1, 1, 1] },
];
</script>

<template>
  <main class="container">
    <Orbit
      v-for="({ arr }, idx) in data"
      :key="idx"
      :data="arr"
      :orbits-count="data.length"
      :position="idx"
    ></Orbit>
  </main>
</template>

<style>
.container {
  height: 100vh;
  width: 100%;
  position: relative;
  overflow-y: hidden;
  overflow-x: hidden;
}
</style>
