<template>
  <div
    class="planet"
    :style="{
      left: position.x + 'px',
      bottom: position.y + 'px',
    }"
  >
    <HoverCardRoot :openDelay="500" v-model:open="hoverState">
      <HoverCardTrigger>
        <AvatarRoot
          class="inline-flex h-[68px] w-[68px] select-none rounded-full border-8 border-[rgba(10,_10,_10,_1)] align-middle"
        >
          <AvatarImage
            :src="user.img"
            :alt="user.name"
            class="h-full w-full rounded-[inherit] object-cover"
          />
          <AvatarFallback class="h-full w-full rounded-[inherit] object-cover">
            <img
              :src="avatarFallbackSrc"
              alt="avatar-fallback"
              class="h-full w-full rounded-[inherit] object-cover"
            />
          </AvatarFallback>
        </AvatarRoot>
      </HoverCardTrigger>
      <HoverCardPortal>
        <Transition name="fade">
          <HoverCardContent
            side="right"
            align="start"
            :sideOffset="-68"
            :alignOffset="-15"
          >
            <Card :user="user" :date="date" />
          </HoverCardContent>
        </Transition>
      </HoverCardPortal>
    </HoverCardRoot>
  </div>
</template>

<script setup lang="ts">
import type { Props } from "./types";
import Card from "../Card/index.vue";
import {
  AvatarFallback,
  AvatarImage,
  AvatarRoot,
  HoverCardContent,
  HoverCardPortal,
  HoverCardRoot,
  HoverCardTrigger,
} from "radix-vue";

import avatarFallbackSrc from "@/assets/images/avatar-fallback.png";
import { ref, Transition } from "vue";

const hoverState = ref(false);

defineProps<Props>();
</script>

<style scoped>
.planet {
  transition: 1s;
  @apply pointer-events-auto absolute z-10 -translate-x-1/2 translate-y-1/2;
}
</style>
border: 1px solid; border-image-source: linear-gradient(180deg, #FFFFFF 0%,
#000000 100%);
