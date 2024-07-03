<script setup lang="ts">
import { computed, onMounted, onUnmounted, provide, ref } from "vue";
import Orbit from "./components/Orbit.vue";
import {
  deltaThreshold,
  getAngles,
  getPlanetPosition,
  increment,
  radius,
} from "./constants";

const windowWidth = ref(window.innerWidth);
const windowHeight = ref(window.innerHeight);

const deltaY = ref(0);

const updateWindowSize = () => {
  windowWidth.value = window.innerWidth;
  windowHeight.value = window.innerHeight;
};

const updateDeltaY = (delta: number) => {
  if (deltaY.value === 0 && delta < 0) {
    return;
  }

  if (deltaY.value + (increment * delta) / 100 > deltaThreshold * 4) {
    return;
  }

  deltaY.value += (increment * delta) / 100;
};

onMounted(() => {
  window.addEventListener("resize", updateWindowSize);
  window.addEventListener("wheel", (e) => updateDeltaY(e.deltaY));
});

onUnmounted(() => {
  window.removeEventListener("resize", updateWindowSize);
  window.removeEventListener("wheel", (e) => updateWindowSize());
});

const centerX = computed(() => windowWidth.value / 2);
const current = computed(() => Math.floor(deltaY.value / deltaThreshold));

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
    <!-- <Orbit
      :item="arr"
      :key="idx"
      :position="idx"
      :count="data.length"
      :center-x="centerX"
      :current="current"
      :delta-y="deltaY"
      v-for="({ arr }, idx) in data"
    ></Orbit> -->
    <div
      class="orbit"
      v-for="({ arr }, idx) in data"
      :key="idx"
      :style="{
        width: `${(deltaY + radius + increment * (data.length - idx)) * 2}px`,
        height: `${deltaY + radius + increment * (data.length - idx)}px`,
        bottom: 0,
        left: `${centerX}px`,
        opacity:
          deltaY >= deltaThreshold * (idx + 1) ||
          deltaY + radius + increment * (data.length - idx) <=
            deltaThreshold * 4
            ? '0'
            : '1',
      }"
    >
      <div
        class="planet"
        v-for="(item, index) in arr"
        :key="`planet-${idx}-${index}`"
        :style="{
          ...getPlanetPosition(
            deltaY + radius + increment * (data.length - idx),
            arr.length % 2 === 1 &&
              Math.floor(arr.length / 2) === index &&
              idx === current
              ? getAngles(arr.length)[index] + Math.PI / 18
              : getAngles(arr.length)[index]
          ),
          background:
            arr.length % 2 === 1 && Math.floor(arr.length / 2) === index
              ? 'red'
              : 'blue',
        }"
      ></div>
      <div
        class="date"
        :style="{
          ...getPlanetPosition(
            deltaY + radius + increment * (data.length - idx),
            Math.PI / 2
          ),
          opacity: idx === current ? '1' : '0',
        }"
      >
        Today
      </div>
    </div>
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
.orbit {
  border: 1px solid white;
  border-top-left-radius: 9999px;
  border-top-right-radius: 9999px;
  border-bottom: none;
  position: absolute;
  transform: translateX(-50%);
  z-index: 1;
  transition: 0.5s;
}
.planet {
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  z-index: 10;
  transform: translate(-50%, 50%);
  transition: 0.5s;
}
.date {
  position: absolute;
  font-size: 20px;
  color: white;
  transform: translate(-50%, 50%);
  z-index: 10;
  transition: 0.5s;
}
</style>
