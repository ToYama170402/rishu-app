import { For, JSX } from "solid-js";

type timeTableProps<T, R, C> = {
  datum: T[];
  rowElements: R[];
  columnElements: C[];
  cellGetter: (datum: T[], row: R, col: C) => T[];
  rowRenderer: ({
    row,
    children,
  }: {
    row: R;
    children: JSX.Element;
  }) => JSX.Element;
  cellRenderer: ({ data, col }: { data: T[]; col: C }) => JSX.Element;
  rowLabel?: ({ row }: { row: R }) => JSX.Element;
  columnLabel?: ({ col }: { col: C }) => JSX.Element;
  class?: string;
};

export default function TimeTable<T, R, C>(props: timeTableProps<T, R, C>) {
  return (
    <div class={props.class}>
      <For each={props.rowElements}>
        {(row) => (
          <>
            {props.rowLabel && <props.rowLabel row={row} />}
            <props.rowRenderer row={row}>
              <For each={props.columnElements}>
                {(col) => (
                  <>
                    {props.columnLabel && <props.columnLabel col={col} />}
                    <props.cellRenderer
                      col={col}
                      data={props.cellGetter(props.datum, row, col)}
                    />
                  </>
                )}
              </For>
            </props.rowRenderer>
          </>
        )}
      </For>
    </div>
  );
}
