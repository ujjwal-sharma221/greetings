"use client";

import {
  parseAsInteger,
  parseAsString,
  useQueryStates,
  parseAsStringEnum,
} from "nuqs";

import { MeetingStatus } from "../types";
import { DEFAULT_PAGE } from "@/lib/constants";

export const useMeetingsFilter = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    agentId: parseAsString
      .withDefault("")
      .withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
    status: parseAsStringEnum(Object.values(MeetingStatus)),
  });
};
