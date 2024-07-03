<script setup lang="ts">
import { format } from "date-fns";
import Orbit from "../components/Orbit/index.vue";
import { useGetWeekQuery, useOrbits } from "../hooks";
import { DateFormats } from "@/constants";

useOrbits();

const { data, isError, isLoading } = useGetWeekQuery(
  format(new Date(), DateFormats.YearMonthDay)
);
</script>

<template>
  <main class="container">
    <div v-if="isError">Error</div>
    <div v-if="isLoading">Loading</div>
    <template v-if="data?.length">
      <Orbit
        v-for="(day, idx) in data"
        :key="idx"
        :day="day"
        :orbits-count="data?.length || 0"
        :position="idx"
      ></Orbit>
    </template>
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
