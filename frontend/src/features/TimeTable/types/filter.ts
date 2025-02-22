import type { lecture } from "@/types/lecture";

export type filterTarget = Omit<lecture, "dateTime" | "capacity">;

export type filterElement = {
  key: keyof filterTarget;
  value: lecture[keyof filterTarget];
};

export type filters = filterElement[];
