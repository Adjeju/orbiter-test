<script setup lang="ts">
import { format } from "date-fns";
import Orbit from "../components/Orbit/index.vue";
import { useGetWeekQuery, useOrbits } from "../hooks";
import { DateFormats } from "@/constants";
import Loading from "vue-loading-overlay";

useOrbits();

const { data, isError, isLoading } = useGetWeekQuery(
  format(new Date(), DateFormats.YearMonthDay),
);
</script>

<template>
  <main class="relative h-screen w-full overflow-hidden">
    <div
      v-if="isError"
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl text-red-700"
    >
      Error
    </div>
    <template v-if="isLoading">
      <Loading
        :active="false"
        :is-full-page="false"
        background-color="#000"
        color="#fff"
      ></Loading>
    </template>
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

<style></style>
