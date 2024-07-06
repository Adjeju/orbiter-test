<template>
  <div class="gradient-bg max-w-[503px] select-none rounded-xl text-white">
    <div
      class="bg-black-secondary flex items-center gap-[15px] rounded-t-[inherit] px-2.5 py-[9px]"
    >
      <div class="gradient-bg select-none rounded-full">
        <AvatarRoot
          class="inline-flex h-[100px] w-[100px] rounded-[inherit] align-middle"
        >
          <AvatarImage class="avatar" :src="img" :alt="name" />
          <AvatarFallback class="avatar">
            <img
              :src="avatarFallbackSrc"
              alt="avatar-fallback"
              class="avatar"
            />
          </AvatarFallback>
        </AvatarRoot>
      </div>
      <div class="flex flex-1 flex-col gap-[5px]">
        <div class="text-base font-bold">{{ name }}</div>
        <div class="text-xs">{{ position }}</div>
        <div class="text-xs">{{ city }}</div>
        <div class="flex items-center gap-1.5">
          <div class="flex">
            <AvatarRoot
              v-for="(image, idx) in images"
              :key="image"
              class="inline-flex h-5 w-5 select-none rounded-full border border-white"
              :class="idx !== 0 ? '-ml-1' : 'ml-0'"
            >
              <AvatarImage class="avatar" :src="image" alt="person" />
            </AvatarRoot>
          </div>
          <div class="text-xs">
            Jason Diamond, John Eremic, and 281 other mutual connections
          </div>
        </div>
      </div>
      <div class="gradient-bg self-start rounded-[4px]">
        <img
          src="https://s3-alpha-sig.figma.com/img/66e9/ee01/018be20926c8b281df498206d4778368?Expires=1721001600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TGHfWX9fo9MABpA~BtlRgMyw8WK0OyYirG6M~7QKKqu90xpOvjIr6LOvwHxGExsztE14Mh2xOPJaVQBOMsQKk6Y06MyFS16uE8gwPsavlLPhpNbENDu7XNH5ZXwh5Gce~7lC5Blp3qvnEdRDaWSOhE-e4sLFnjdjZfrbFEGFbIRqqEzS1ZLxEOAtqTgl6UB9hb5C1WcdNcZR5M46H1~DUKQUpZzfTzANA4t4GL1YqeVR72UjSv2GRQMIk0jCQ9CPO1Rp5marckz4MLsyt3UyWTg0hmjD5YkAY~KBxcH50ojO3wG79tMVy8xRtRBMYi0cqTUBhaYb0RkbUIUrl798Eg__"
          alt="logo"
          class="h-12 w-12 rounded-[inherit]"
        />
      </div>
    </div>
    <div class="rounded-b-[inherit] bg-[rgba(_22,_22,_22,_255)] p-2.5">
      <div class="flex items-center gap-2.5 p-2.5">
        <img :src="mailSrc" alt="mail-logo" />
        <div>Reply from Emery Wells</div>
      </div>
      <div
        class="flex flex-col gap-2.5 rounded-lg bg-[rgba(10,_10,_10,_0.85)] p-2.5"
      >
        <div class="text-muted flex justify-between">
          <div>{{ format(date, DateFormats.Full) }}</div>
          <div>{{ dayDifference() }}</div>
        </div>
        <div>
          <div class="text-base font-bold">
            {{ message_head }}
          </div>
          <div
            class="message-content"
            :class="isShowed ? 'expanded' : 'collapsed'"
          >
            {{ message }}
          </div>
        </div>
        <div
          class="flex w-max cursor-pointer items-center gap-2.5"
          @click="showHideMessage"
        >
          <div>{{ isShowed ? "Less" : "More" }}</div>
          <img :src="isShowed ? chevronUpSrc : chevronDownSrc" alt="chevron" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AvatarFallback, AvatarImage, AvatarRoot } from "radix-vue";
import { ref } from "vue";
import mailSrc from "@/assets/icons/mail.svg";
import chevronUpSrc from "@/assets/icons/chevron-up.svg";
import chevronDownSrc from "@/assets/icons/chevron-down.svg";
import type { Props } from "./type";

import avatarFallbackSrc from "@/assets/images/avatar-fallback.png";
import { differenceInDays, format } from "date-fns";
import { DateFormats } from "@/constants";
import { images } from "./constants";

const isShowed = ref(false);

const { user, date } = defineProps<Props>();

const {
  city,
  img,
  name,
  position,
  _orbits_last_message: { message, message_head },
} = user;

const dayDifference = () => {
  const diff = differenceInDays(new Date(), date);
  if (diff === 0) return "Today";
  if (diff === 1) return "1 day ago";
  return `${diff} days ago`;
};

const showHideMessage = () => {
  isShowed.value = !isShowed.value;
};
</script>

<style scoped>
.avatar {
  @apply h-full w-full rounded-[inherit] object-cover;
}

.message-content {
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  max-height: 1.5rem;
}

.message-content.expanded {
  max-height: 500px;
}
</style>
