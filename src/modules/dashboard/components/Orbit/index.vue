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
      v-for="(user, idx) in array"
      :key="`planet-${position}-${user.id}`"
      :user="user"
      :orbitRadius="orbitRadius"
      :position="
        getPosition(
          orbitRadius,
          isMiddleElement(array.length, idx)
            ? angles[idx] + Math.PI / 36
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
import { RADIUS, SMALLEST_RADIUS } from "@/modules/dashboard/constants";
import { computed, inject, type ComputedRef, type Ref } from "vue";
import Planet from "../Planet/index.vue";
import type { Props } from "./types";
import { getAngles, getPosition } from "../../utils";
import { format } from "date-fns";
import { DateFormats } from "@/constants";

const { day, orbitsCount, position } = defineProps<Props>();

const { array, contact_date } = day;

const deltaY = inject("deltaY") as Ref<number>;
const current = inject("current") as ComputedRef<number>;
const centerX = inject("centerX") as ComputedRef<number>;

const angles = getAngles(array.length);

const orbitRadius = computed(
  () => deltaY.value + SMALLEST_RADIUS + RADIUS * (orbitsCount - position),
);

const isTopThreshold = computed(() => deltaY.value >= RADIUS * (position + 1));

const isBottomThreshold = computed(() => orbitRadius.value <= RADIUS * 2.5);

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
</script>

<style scoped>
.orbit {
  transition: 1s;
  @apply absolute -translate-x-1/2 rounded-t-full border border-b-0 border-white;
}
.date {
  transition: 1s;
  @apply absolute -translate-x-1/2 translate-y-1/2 bg-[rgba(10,_10,_10,_1)] p-3 text-base text-[rgba(146,_146,_146,_1)];
}
</style>
