import { createSignal } from "solid-js";

export default function createSet<T>(initialValues?: T[]) {
  const [set, setSet] = createSignal(new Set<T>(initialValues));

  const add = (value: T) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      newSet.add(value);
      return newSet;
    });
  };

  const remove = (value: T) => {
    setSet((prev) => {
      const newSet = new Set(prev);
      newSet.delete(value);
      return newSet;
    });
  };

  const clear = () => {
    setSet(new Set<T>());
  };

  return {
    set,
    add,
    remove,
    clear,
  };
}
