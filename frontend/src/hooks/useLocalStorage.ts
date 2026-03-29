"use client";

import { useCallback, useState } from "react";

/**
 * `localStorage` と同期する React カスタムフック。
 * SolidJS の `createLocalStorageSignal` に相当する。
 *
 * @param key - localStorage のキー
 * @param initialValue - localStorage に値がない場合の初期値
 * @returns `[storedValue, setValue]` のタプル
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: (val: T) => T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: (val: T) => T) => {
      try {
        const valueToStore = setStoredValue(value);
        if (typeof window !== "undefined") {
          localStorage.setItem(key, JSON.stringify(valueToStore));
        }
      } catch (err) {
        console.error("useLocalStorage: failed to write", err);
      }
    },
    [key],
  );

  return [storedValue, setValue];
}
