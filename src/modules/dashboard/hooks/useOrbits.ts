import { computed, onUnmounted } from "vue";
import { onMounted, provide, ref } from "vue";

let lastScrollTime = 0;
const scrollCooldown = 700;

export const useOrbits = () => {
  const windowWidth = ref(window.innerWidth);
  const windowHeight = ref(window.innerHeight);

  const deltaY = ref(0);

  provide("deltaY", deltaY);

  const updateWindowSize = () => {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  };

  const smallestRadius = computed(() =>
    Math.floor((windowHeight.value - 200) / 9),
  );

  const radius = computed(() => Math.floor((windowHeight.value - 150) / 9));

  provide("smallestRadius", smallestRadius);
  provide("radius", radius);

  const updateDeltaY = (delta: number) => {
    const now = Date.now();

    console.log({ delta, radius: radius.value, deltaY: deltaY.value });

    if (now - lastScrollTime < scrollCooldown) {
      return;
    }

    lastScrollTime = now;

    if (deltaY.value === 0 && delta < 0) {
      return;
    }

    const value = radius.value * (delta > 0 ? 1 : -1);

    if (deltaY.value + value > radius.value * 8.5) {
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
  const current = computed(() => Math.floor(deltaY.value / radius.value));

  provide("centerX", centerX);
  provide("current", current);
};
