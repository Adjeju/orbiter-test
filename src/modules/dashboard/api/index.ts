import { api, apiRoutes } from "@/config";
import type { ReceiveWeekResponse } from "../types";

export const apiGetWeek = (start_date: string) =>
  api
    .get(apiRoutes.receiveWeek, { searchParams: { start_date } })
    .json<ReceiveWeekResponse>();
