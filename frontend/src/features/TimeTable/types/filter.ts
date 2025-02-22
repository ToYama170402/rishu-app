import type { lecture } from "@/types/lecture";

export type filterElement = {
  key: keyof lecture;
  value: lecture[keyof Omit<lecture, "dateTime" | "capacity">];
};

export type filters = filterElement[];
