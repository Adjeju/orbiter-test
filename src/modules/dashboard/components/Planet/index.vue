<template>
  <div
    class="planet"
    :style="{
      left: position.x + 'px',
      bottom: position.y + 'px',
    }"
    :class="canShowCard && 'cursor-pointer'"
  >
    <HoverCardRoot
      :openDelay="500"
      :open="hoverState"
      @update:open="handleOpen"
    >
      <HoverCardTrigger>
        <div
          ref="avatarRef"
          class="gradient-bg 3xl:border-8 rounded-full border-4 border-black-secondary"
        >
          <AvatarRoot
            class="3xl:h-[68px] 3xl:w-[68px] inline-flex h-8 w-8 select-none rounded-full align-middle"
          >
            <AvatarImage :src="user.img" :alt="user.name" class="avatar" />
            <AvatarFallback class="avatar">
              <img
                :src="avatarFallbackSrc"
                alt="avatar-fallback"
                class="avatar"
              />
            </AvatarFallback>
          </AvatarRoot>
        </div>
      </HoverCardTrigger>
      <HoverCardPortal>
        <Transition name="fade">
          <HoverCardContent
            side="right"
            align="start"
            :side-offset="-alignOffset"
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
import { ref, Transition, watchEffect } from "vue";

const props = defineProps<Props>();

const hoverState = ref(false);
const avatarRef = ref<HTMLDivElement | undefined>();

const alignOffset = ref(0);

watchEffect(() => {
  if (avatarRef.value) alignOffset.value = avatarRef.value.offsetWidth;
});

const handleOpen = (open: boolean) => {
  if (props.canShowCard) {
    hoverState.value = open;
  }
};
</script>

<style scoped>
.planet {
  transition: 1s;
  @apply pointer-events-auto absolute z-10 -translate-x-1/2 translate-y-1/2;
}
.avatar {
  @apply h-full w-full rounded-[inherit] object-cover;
}
</style>
