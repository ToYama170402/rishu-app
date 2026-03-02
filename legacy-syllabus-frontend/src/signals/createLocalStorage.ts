import { createSignal } from "solid-js";

export function createLocalStorageSignal<T>(key: string, initialValue: T) {
  const [signal, setSignal] = createSignal<T>(initialValue);

  // Load initial value from localStorage (check existence)
  if (typeof localStorage !== "undefined") {
    const storedValue = localStorage.getItem(key);
    if (storedValue) {
      setSignal(JSON.parse(storedValue));
    }
  }

  const setLocalStorageSignal = (value: T | ((v: T) => T)) => {
    setSignal((v) => {
      const newValue =
        typeof value === "function" ? (value as (v: T) => T)(v) : value;
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
      return newValue;
    });
  };

  return [signal, setLocalStorageSignal] as const;
}
