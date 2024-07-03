<template>
  <div
    class="orbit"
    :style="{
      width: orbitRadius * 2 + 'px',
      height: orbitRadius + 'px',
      bottom: 0,
      left: centerX + 'px',
      opacity: isTopThreshold || isBottomThreshold ? '0' : '1',
    }"
  >
    <Planet
      v-for="(i, idx) in data"
      :key="`planet-${position}-${idx}`"
      :message="i"
      :orbitRadius="orbitRadius"
      :position="
        getPosition(
          orbitRadius,
          isMiddleElement(data.length, idx)
            ? getAngles(data.length)[idx] + Math.PI / 18
            : getAngles(data.length)[idx]
        )
      "
    ></Planet>
    <div
      class="date"
      :style="{
        left: datePosition.x + 'px',
        bottom: datePosition.y + 'px',
        opacity: isActive ? '1' : '0',
      }"
    >
      Today
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAngles, getPosition, increment, radius } from "@/constants";
import { computed, defineProps, inject, type ComputedRef, type Ref } from "vue";
import Planet from "../Planet/index.vue";
import type { Props } from "./types";

const { data, orbitsCount, position } = defineProps<Props>();

const deltaY = inject("deltaY") as Ref<number>;
const current = inject("current") as ComputedRef<number>;
const centerX = inject("centerX") as ComputedRef<number>;

const orbitRadius = computed(
  () => deltaY.value + radius + increment * (orbitsCount - position)
);

const isTopThreshold = computed(
  () => deltaY.value >= increment * (position + 1)
);

const isBottomThreshold = computed(() => orbitRadius.value <= increment * 2.5);

const isActive = computed(() => position === current.value);

const datePosition = computed(() =>
  getPosition(orbitRadius.value, Math.PI / 2)
);

const isMiddleElement = computed(
  () => (length: number, idx: number) =>
    length % 2 === 1 && Math.floor(length / 2) === idx && isActive.value
);
</script>

<style scoped>
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
.date {
  position: absolute;
  font-size: 20px;
  color: white;
  transform: translate(-50%, 50%);
  z-index: 10;
  transition: 0.5s;
}
</style>
