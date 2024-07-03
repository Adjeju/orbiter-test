<script setup lang="ts">
import { defineProps, inject } from "vue";
import {
  deltaThreshold,
  getAngles,
  radius,
  increment,
  getPlanetPosition,
} from "../constants";

defineProps<{
  orbitRadius: number;
  orbitPosition: number;
  data: number;
  planetsCount: number;
  deltaY: number;
  current: number;
}>();
</script>

<template>
  <div
    class="planet"
    v-for="(_, index) in data"
    :key="`planet-${orbitPosition}-${index}`"
    :style="{
      ...getPlanetPosition(
        orbitRadius,
        planetsCount % 2 === 1 &&
          Math.floor(planetsCount / 2) === index &&
          (orbitPosition === current || orbitPosition === current + 1)
          ? getAngles(planetsCount)[index] +
              (Math.PI / 36) *
                ((deltaY - deltaThreshold * orbitPosition) / 10) +
              (orbitPosition === 0 ? Math.PI / 36 : 0)
          : getAngles(planetsCount)[index]
      ),
      background:
        planetsCount % 2 === 1 && Math.floor(planetsCount / 2) === index
          ? 'red'
          : 'blue',
    }"
  ></div>
</template>

<style scoped>
.planet {
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  z-index: 10;
  transform: translate(-50%, +50%);
}
</style>
