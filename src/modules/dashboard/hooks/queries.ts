import { useQuery } from "@tanstack/vue-query";
import { apiGetWeek } from "../api";
import { weekQueryKeys } from "../constants";

export const useGetWeekQuery = (date: string) =>
  useQuery({
    queryKey: weekQueryKeys.receiveWeek(date),
    queryFn: () => apiGetWeek(date),
  });
