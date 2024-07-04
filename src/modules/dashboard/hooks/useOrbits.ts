import { RADIUS } from "@/modules/dashboard/constants";
import { computed, onUnmounted } from "vue";
import { onMounted, provide, ref } from "vue";

let lastScrollTime = 0;
const scrollCooldown = 1000;

export const useOrbits = () => {
  const windowWidth = ref(window.innerWidth);

  const deltaY = ref(0);

  provide("deltaY", deltaY);

  const updateWindowSize = () => {
    windowWidth.value = window.innerWidth;
  };

  const updateDeltaY = (delta: number) => {
    const now = Date.now();

    if (now - lastScrollTime < scrollCooldown) {
      return;
    }

    lastScrollTime = now;

    if (deltaY.value === 0 && delta < 0) {
      return;
    }

    const value = RADIUS * (delta > 0 ? 1 : -1);

    if (deltaY.value + value > RADIUS * 8.5) {
      return;
    }

    deltaY.value += value;
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
  const current = computed(() => Math.floor(deltaY.value / RADIUS));

  provide("centerX", centerX);
  provide("current", current);
};
