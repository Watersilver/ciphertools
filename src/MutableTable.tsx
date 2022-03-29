import { faAdd, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { makeAutoObservable } from "mobx"
import { observer } from "mobx-react-lite";
import { useState } from "react";

class Table {
  private r: string[][] = [];
  private colCount = 0;

  constructor() {
    makeAutoObservable(this);

    this.insertColumn();
    this.insertRow();
  }

  get rows(): ReadonlyArray<ReadonlyArray<string>> {
    return this.r;
  }

  get rowCount() {
    return this.r.length;
  }

  get columnCount() {
    return this.colCount;
  }

  setCell(row: number, column: number, value: string) {
    this.r[row][column] = value;
  }

  insertRow(position?: number) {
    const newRow = [];

    for (let i = 0; i < this.colCount; i++) {
      newRow.push("");
    }

    if (position === undefined) {
      this.r.push(newRow);
      return;
    }

    if (position > this.r.length) console.warn("Trying to insert row to too high index. Will just push.");
    if (position < 0) console.warn("Trying to insert row to negative index. Will just unshift.");

    this.r.splice(position, 0, newRow);
  }

  deleteRow(position?: number) {
    if (this.rowCount === 1) return;

    if (position === undefined) {
      this.r.pop();
      return;
    }

    if (position > this.r.length) {
      console.warn("Trying to delete row to too high index. Will just pop.");
      position = this.r.length - 1;
    }
    if (position < 0) {
      console.warn("Trying to delete row to negative index. Will just shift.");
      position = 0;
    }

    this.r.splice(position, 1);
  }

  insertColumn(position?: number) {
    this.colCount++;

    if (position === undefined) {
      position = this.colCount;
    }

    if (position > this.colCount) console.warn("Trying to insert column to too high index. Will just push.");
    if (position < 0) console.warn("Trying to insert column to negative index. Will just unshift.");

    for (const row of this.r) {
      row.splice(position, 0, "");
    }
  }

  deleteColumn(position?: number) {
    if (this.colCount === 1) return;

    this.colCount--;

    if (position === undefined) {
      position = this.colCount - 1;
    }

    if (position > this.colCount) {
      console.warn("Trying to delete column to too high index. Will just pop.");
      position = this.colCount - 1;
    }
    if (position < 0) {
      console.warn("Trying to delete column to negative index. Will just shift.");
      position = 0;
    }

    for (const row of this.r) {
      row.splice(position, 1);
    }
  }
}

const MutableTable = observer(({
  exposeState
}: {
  exposeState?: (table: Table) => void;
}) => {
  const [table] = useState(() => {
    const t = new Table();
    if (exposeState) exposeState(t);
    return t;
  });

  const cells = table.rows.flatMap((row, i) => {
    return row.map((cell, j) => {
      return <input
      key={`${i}_${j}`}
      onChange={e => {table.setCell(i, j, e.target.value)}}
      value={cell}
      style={{
        height: 32,
        borderRadius: 2,
        border: "none",
        margin: 4,
        backgroundColor: "#246",
        color: "white",
        fontWeight: "bold",
        minWidth: 0
      }}
      />
    })
  })

  return <div
    style={{
      display: "grid",
      gridTemplateColumns: `repeat(${table.columnCount}, 1fr) auto auto`
    }}
  >
    {cells}
    <button
      style={{
        width: 48,
        gridColumnStart: table.columnCount + 1,
        gridColumnEnd: table.columnCount + 2,
        gridRowStart: 1,
        gridRowEnd: table.rowCount + 1,
        backgroundColor: "#6f9",
        border: "none",
        fontWeight: "bold",
        borderRadius: 8
      }}
      onClick={() => table.insertColumn()}
    >
      {<FontAwesomeIcon icon={faAdd} />}
    </button>
    <button
      style={{
        width: 48,
        gridColumnStart: table.columnCount + 2,
        gridColumnEnd: table.columnCount + 3,
        gridRowStart: 1,
        gridRowEnd: table.rowCount + 1,
        backgroundColor: "#f69",
        border: "none",
        fontWeight: "bold",
        borderRadius: 8
      }}
      onClick={() => table.deleteColumn()}
    >
      {<FontAwesomeIcon icon={faMinus} />}
    </button>
    <button
      style={{
        height: 48,
        gridColumnStart: 1,
        gridColumnEnd: table.columnCount + 1,
        gridRowStart: table.rowCount + 1,
        gridRowEnd: table.rowCount + 2,
        backgroundColor: "#6f9",
        border: "none",
        fontWeight: "bold",
        borderRadius: 8
      }}
      onClick={() => table.insertRow()}
    >
      {<FontAwesomeIcon icon={faAdd} />}
    </button>
    <button
      style={{
        height: 48,
        gridColumnStart: 1,
        gridColumnEnd: table.columnCount + 1,
        gridRowStart: table.rowCount + 2,
        gridRowEnd: table.rowCount + 3,
        backgroundColor: "#f69",
        border: "none",
        fontWeight: "bold",
        borderRadius: 8
      }}
      onClick={() => table.deleteRow()}
    >
      {<FontAwesomeIcon icon={faMinus} />}
    </button>
  </div>;
})

export default MutableTable