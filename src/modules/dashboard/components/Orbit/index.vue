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
            : angles[idx]
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
  () => deltaY.value + SMALLEST_RADIUS + RADIUS * (orbitsCount - position)
);

const isTopThreshold = computed(() => deltaY.value >= RADIUS * (position + 1));

const isBottomThreshold = computed(() => orbitRadius.value <= RADIUS * 2.5);

const isActive = computed(() => position === current.value);

const datePosition = computed(() =>
  getPosition(orbitRadius.value, Math.PI / 2)
);

const isMiddleElement = computed(
  () => (length: number, idx: number) =>
    length % 2 === 1 && Math.floor(length / 2) === idx && isActive.value
);

const formattedDate = format(contact_date, DateFormats.WeekMonthDay);
const isToday = format(new Date(), DateFormats.WeekMonthDay) === formattedDate;
</script>

<style scoped>
.orbit {
  border: 1px solid white;
  border-top-left-radius: 9999px;
  border-top-right-radius: 9999px;
  border-bottom: none;
  position: absolute;
  transform: translateX(-50%);
  transition: 1s;
}
.date {
  padding: 12px;
  background: rgba(10, 10, 10, 1);
  font-size: 18px;
  color: rgba(146, 146, 146, 1);
  position: absolute;
  font-size: 20px;
  color: white;
  transform: translate(-50%, 50%);
  transition: 1s;
}
</style>
