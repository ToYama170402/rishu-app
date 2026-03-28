import React from "react";

import { cn } from "@/lib/utils";

/** セルのレンダリングに渡される props */
export type RenderCellProps<T> = {
  /** x 軸（列）の値（例: 曜日） */
  xFragment: unknown;
  /** y 軸（行）の値（例: 時限） */
  yFragment: unknown;
  /** このセルに対応するデータ配列（0件の場合もある） */
  dataFragment: T[];
};

/** 列コンテナのレンダリングに渡される props */
export type RenderColumnProps = {
  /** この列の x 軸の値（例: 曜日） */
  xFragment: unknown;
  children: React.ReactNode;
};

type TimeTableProps<T> = {
  /** 表示するデータ配列 */
  data: T[];
  /** x 軸（列方向）の値の配列（例: 曜日の配列） */
  xArray: unknown[];
  /** y 軸（行方向）の値の配列（例: 時限の配列） */
  yArray: unknown[];
  /**
   * データアイテムの x 軸の値を取得するキー。
   * ドット記法によるネストされたプロパティアクセスに対応（例: "dateTime.day"）
   */
  xKey: string;
  /**
   * データアイテムの y 軸の値を取得するキー。
   * ドット記法によるネストされたプロパティアクセスに対応（例: "dateTime.period"）
   */
  yKey: string;
  className?: string;
  /** セルのレンダリングコンポーネント */
  RenderCell: React.ComponentType<RenderCellProps<T>>;
  /** 列コンテナのレンダリングコンポーネント */
  RenderColumn: React.ComponentType<RenderColumnProps>;
  /** 全体コンテナのレンダリングコンポーネント */
  TimeTableContainer: React.ComponentType<{ children: React.ReactNode }>;
};

/**
 * ドット記法で指定されたキーを使ってオブジェクトからネストされた値を取得する。
 *
 * @example getNestedValue({ dateTime: { day: "月" } }, "dateTime.day") // => "月"
 */
function getNestedValue(obj: unknown, key: string): unknown {
  return key
    .split(".")
    .reduce(
      (acc, k) =>
        acc != null && typeof acc === "object"
          ? (acc as Record<string, unknown>)[k]
          : undefined,
      obj
    );
}

/**
 * 汎用時間割グリッドコンポーネント。
 *
 * x 軸（列）と y 軸（行）の値の配列を受け取り、各セルに対応するデータを
 * `xKey`/`yKey` で絞り込んでレンダリングする。
 * セル・列・コンテナのレンダリングは props でカスタマイズできる。
 */
const TimeTable = <T,>({
  data,
  xArray,
  yArray,
  xKey,
  yKey,
  className,
  RenderCell,
  RenderColumn,
  TimeTableContainer,
}: TimeTableProps<T>) => {
  return (
    <TimeTableContainer>
      <div className={cn("flex flex-row", className)}>
        {xArray.map((xFragment) => (
          <RenderColumn xFragment={xFragment} key={String(xFragment)}>
            {yArray.map((yFragment) => {
              const dataFragment = data.filter((item) => {
                const xValue = getNestedValue(item, xKey);
                const yValue = getNestedValue(item, yKey);
                return xValue === xFragment && yValue === yFragment;
              });
              return (
                <RenderCell
                  xFragment={xFragment}
                  yFragment={yFragment}
                  dataFragment={dataFragment}
                  key={String(yFragment)}
                />
              );
            })}
          </RenderColumn>
        ))}
      </div>
    </TimeTableContainer>
  );
};

export default TimeTable;
