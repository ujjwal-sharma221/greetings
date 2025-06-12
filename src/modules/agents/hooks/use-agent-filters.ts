"use client";

import { DEFAULT_PAGE } from "@/lib/constants";
import { parseAsInteger, parseAsString, useQueryStates } from "nuqs";

export const useAgentsFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger
      .withDefault(DEFAULT_PAGE)
      .withOptions({ clearOnDefault: true }),
  });
};
