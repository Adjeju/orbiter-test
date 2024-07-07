import type { ComputedRef, InjectionKey, Ref } from "vue";

export const weekQueryKeys = {
  all: ["week"],
  receiveWeek: (date: string) => [...weekQueryKeys.all, { date }],
};

export const injectionKeys = {
  deltaY: Symbol() as InjectionKey<Ref<number>>,
  current: Symbol() as InjectionKey<ComputedRef<number>>,
  centerX: Symbol() as InjectionKey<ComputedRef<number>>,
  smallestRadius: Symbol() as InjectionKey<ComputedRef<number>>,
  radius: Symbol() as InjectionKey<ComputedRef<number>>,
};
