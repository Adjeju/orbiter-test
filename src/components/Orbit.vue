<script setup lang="ts">
import {
  deltaThreshold,
  getPlanetPosition,
  increment,
  radius,
} from "../constants";
import { computed } from "vue";
import Planet from "./Planet.vue";

const { item, count, position, deltaY, current } = defineProps<{
  item: any[];
  position: number;
  count: number;
  deltaY: number;
  centerX: number;
  current: number;
}>();

const orbitRadius = computed(
  () => deltaY + radius + increment * (count - position)
);
</script>

<template>
  <div
    class="orbit"
    :style="{
      width: `${orbitRadius * 2}px`,
      height: `${orbitRadius}px`,
      bottom: 0,
      left: `${centerX}px`,
      display:
        deltaY >= deltaThreshold * (position + 1) ||
        orbitRadius <= deltaThreshold * 5
          ? 'none'
          : 'block',
    }"
  >
    <Planet
      v-for="(i, idx) in item"
      :key="idx"
      :current="current"
      :data="i"
      :delta-y="deltaY"
      :planets-count="item.length"
      :orbit-position="position"
      :orbit-radius="orbitRadius"
    ></Planet>
    <div
      class="date"
      :style="{
        ...getPlanetPosition(orbitRadius, Math.PI / 2),
        display: position === current ? 'block' : 'none',
      }"
    >
      Today
    </div>
  </div>
</template>

<style scoped>
.orbit {
  border: 1px solid white;
  border-top-left-radius: 9999px;
  border-top-right-radius: 9999px;
  border-bottom: none;
  position: absolute;
  transform: translateX(-50%);
  z-index: 1;
}

.date {
  position: absolute;
  font-size: 20px;
  color: white;
  transform: translate(-50%, 50%);
  z-index: 10;
}
</style>
