export type filterElement = {
  [key: string]: boolean;
};

export type filters = {
  category: filterElement;
  teacher: filterElement;
  targetStudent: filterElement;
};
