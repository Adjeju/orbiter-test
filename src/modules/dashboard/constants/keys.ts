export const weekQueryKeys = {
  all: ["week"],
  receiveWeek: (date: string) => [...weekQueryKeys.all, { date }],
};
