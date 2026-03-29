"use client";

import React, { useCallback, useEffect, useState } from "react";
import { FilterIcon } from "lucide-react";
import { lectureArray2Filter } from "@/utils/lectureArray2Filter";
import type { LotteryCourseStatus } from "@/types/lotteryCourse";
import type { Filters, FilterTarget } from "@/types/filter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

const KEY_LABEL_MAP: Partial<Record<keyof FilterTarget, string>> = {
  title: "講義名",
  category: "科目区分",
  teacher: "担当教員",
  target: "対象学生",
};

type FilterProps = {
  lectures: LotteryCourseStatus[];
  applyFilter: React.Dispatch<React.SetStateAction<LotteryCourseStatus[]>>;
};

/**
 * フィルター UI コンポーネント。
 * shadcn/ui の Dialog + Checkbox で実装。
 * AppBar の children として注入して使用する。
 */
export default function Filter({
  lectures,
  applyFilter,
}: FilterProps): React.ReactNode {
  const filterOptions = lectureArray2Filter(lectures);
  const [selectedFilters, setSelectedFilters] = useState<Filters>([]);

  useEffect(() => {
    if (selectedFilters.length === 0) {
      applyFilter(lectures);
    } else {
      applyFilter(
        lectures.filter((lec) =>
          selectedFilters.some((f) => lec[f.key] === f.value),
        ),
      );
    }
  }, [selectedFilters, lectures, applyFilter]);

  const toggleFilter = useCallback((key: keyof FilterTarget, value: string) => {
    setSelectedFilters((prev) => {
      const exists = prev.some((f) => f.key === key && f.value === value);
      if (exists) {
        return prev.filter((f) => !(f.key === key && f.value === value));
      }
      return [...prev, { key, value }];
    });
  }, []);

  // Group options by key in defined display order
  const orderedKeys = (
    Object.keys(KEY_LABEL_MAP) as (keyof FilterTarget)[]
  ).filter((k) => KEY_LABEL_MAP[k] !== undefined);
  const grouped = orderedKeys.reduce<
    Partial<Record<keyof FilterTarget, string[]>>
  >((acc, key) => {
    acc[key] = filterOptions
      .filter((opt) => opt.key === key)
      .map((opt) => opt.value as string);
    return acc;
  }, {});

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex items-center gap-1 rounded px-2 py-1 text-sm hover:opacity-80 text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary-foreground"
          aria-label="フィルターを開く"
        >
          <FilterIcon className="h-4 w-4" />
          フィルター
          {selectedFilters.length > 0 && (
            <span className="ml-0.5">({selectedFilters.length})</span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>フィルター</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto">
          {orderedKeys.map((key) => {
            const values = grouped[key] ?? [];
            if (values.length === 0) return null;
            return (
              <div key={key}>
                <h3 className="font-bold text-sm mb-1">{KEY_LABEL_MAP[key]}</h3>
                <div className="space-y-1">
                  {values.map((value) => (
                    <label
                      key={value}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <Checkbox
                        checked={selectedFilters.some(
                          (f) => f.key === key && f.value === value,
                        )}
                        onCheckedChange={() => toggleFilter(key, value)}
                      />
                      {value}
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
