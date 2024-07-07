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
    <img :src="orbitSrc" alt="orbit" class="h-[inherit] w-[inherit]" />
    <Planet
      v-for="(user, idx) in array"
      :key="`planet-${position}-${user.id}`"
      :user="user"
      :orbitRadius="orbitRadius"
      :date="contact_date"
      :canShowCard="canShowCard"
      :position="
        getPosition(
          orbitRadius,
          isMiddleElement(array.length, idx)
            ? angles[idx] + Math.PI / 30
            : angles[idx],
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
      {{ isToday ? "Today" : formattedDate }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, type ComputedRef, type Ref } from "vue";
import Planet from "../Planet/index.vue";
import type { Props } from "./types";
import { getAngles, getPosition } from "../../utils";
import { format } from "date-fns";
import { DateFormats } from "@/constants";
import orbitSrc from "@/assets/icons/orbit.svg";

const { day, orbitsCount, position } = defineProps<Props>();

const { array, contact_date } = day;

const deltaY = inject("deltaY") as Ref<number>;
const current = inject("current") as ComputedRef<number>;
const centerX = inject("centerX") as ComputedRef<number>;
const smallestRadius = inject("smallestRadius") as ComputedRef<number>;
const radius = inject("radius") as ComputedRef<number>;

const angles = getAngles(array.length);

const orbitRadius = computed(
  () =>
    deltaY.value +
    smallestRadius.value +
    radius.value * (orbitsCount - position),
);

const isTopThreshold = computed(
  () => deltaY.value >= radius.value * (position + 1),
);

const isBottomThreshold = computed(() => orbitRadius.value < radius.value * 3);

const isActive = computed(() => position === current.value);

const datePosition = computed(() =>
  getPosition(orbitRadius.value, Math.PI / 2),
);

const isMiddleElement = computed(
  () => (length: number, idx: number) =>
    length % 2 === 1 && Math.floor(length / 2) === idx && isActive.value,
);

const formattedDate = format(contact_date, DateFormats.WeekMonthDay);
const isToday = format(new Date(), DateFormats.WeekMonthDay) === formattedDate;

const canShowCard = computed(
  () => current.value <= position && position < current.value + 7,
);
</script>

<style scoped>
.orbit {
  transition: 1s;
  @apply pointer-events-none absolute -translate-x-1/2 rounded-t-full;
}
.date {
  transition: 1s;
  @apply 3xl:p-3 3xl:text-base absolute -translate-x-1/2 translate-y-1/2 bg-black-secondary p-1 text-sm text-muted;
}
</style>
