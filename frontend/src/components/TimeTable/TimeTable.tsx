import React from "react";

/**
 * cellGetter: 与えられた全体データ `datum` から、指定した行 `row` と列 `col` に対応するセルの値を取得する関数の型。
 * 型パラメータ:
 *  - T: 全体データの型
 *  - R: 行要素の型
 *  - C: 列要素の型
 */
export type CellGetter<T, R, C> = (datum: T, row: R, col: C) => T;

/**
 * rowRendererProps: 各行を描画する際に渡されるプロパティ。
 *  - row: 現在の行要素
 *  - children: その行に含まれる列セルを表す React ノード群
 */
export type RowRendererProps<R> = {
  row: R;
  children: React.ReactNode;
};

/**
 * rowRenderer: 行全体を描画する関数の型。
 * row と children を受け取り、行を表す React ノードを返す。
 */
type RowRenderer<R> = ({
  row,
  children,
}: RowRendererProps<R>) => React.ReactNode;

/**
 * cellRendererProps: 各セルを描画する際に渡されるプロパティ。
 *  - data: セルに表示するデータ
 *  - col: 当該セルの列要素
 */
export type CellRendererProps<T, C> = {
  data: T;
  col: C;
};

/**
 * cellRenderer: セルを描画する関数の型。
 */
type CellRenderer<T, C> = ({
  data,
  col,
}: CellRendererProps<T, C>) => React.ReactNode;

/**
 * rowLabel: 行ラベルを描画する関数の型。行要素を受け取りラベル用の React ノードを返す。
 */
type RowLabel<R> = ({ row }: { row: R }) => React.ReactNode;

/**
 * columnLabel: 列ラベルを描画する関数の型。列要素を受け取りラベル用の React ノードを返す。
 */
type ColumnLabel<C> = ({ col }: { col: C }) => React.ReactNode;

/**
 * TimeTableProps: TimeTable コンポーネントが受け取る props の型定義。
 *  - datum: テーブル全体に関するデータ（セル取得で参照）
 *  - rowElements: 行を表す要素配列
 *  - columnElements: 列を表す要素配列
 *  - cellGetter: セルデータを取得する関数
 *  - rowRenderer: 行を描画する関数
 *  - cellRenderer: セルを描画する関数
 *  - rowLabel: (省略可) 各行のラベル描画関数
 *  - columnLabel: (省略可) 各列のラベル描画関数
 *  - className: オプションのルート要素クラス名
 */
type TimeTableProps<T, R, C> = {
  datum: T;
  rowElements: R[];
  columnElements: C[];
  cellGetter: CellGetter<T, R, C>;
  rowRenderer: RowRenderer<R>;
  cellRenderer: CellRenderer<T, C>;
  rowLabel?: RowLabel<R>;
  columnLabel?: ColumnLabel<C>;
  className?: string;
};

/**
 * TimeTable コンポーネント
 *
 * 汎用的な行×列テーブルレンダラ。行・列の配列と、
 * セルごとのデータ取得関数および描画関数を受け取り、
 * 指定のレンダラで行とセルを構築する。
 *
 * 実装詳細:
 *  - 外側は `props.rowElements` をループして各行を生成
 *  - 各行内で `props.columnElements` をループしてセルを生成
 *  - 必要に応じて `rowLabel` / `columnLabel` を先に描画する
 *  - React.Fragment を使い、map のキーは `String(row)` や `String(col)` を使用
 */
export default function TimeTable<T, R, C>(props: TimeTableProps<T, R, C>) {
  return (
    <div className={props.className}>
      {props.rowElements.map((row) => (
        <React.Fragment key={String(row)}>
          {/* 行ラベル（あれば表示） */}
          {props.rowLabel && props.rowLabel({ row })}
          {/* 行本体: 子要素として列セル群を渡す */}
          {props.rowRenderer({
            row,
            children: props.columnElements.map((col) => (
              <React.Fragment key={String(col)}>
                {/* 列ラベル（あれば表示） */}
                {props.columnLabel && props.columnLabel({ col })}
                {/* セル本体: datum と行/列情報から値を取得して描画 */}
                {props.cellRenderer({
                  col,
                  data: props.cellGetter(props.datum, row, col),
                })}
              </React.Fragment>
            )),
          })}
        </React.Fragment>
      ))}
    </div>
  );
}
