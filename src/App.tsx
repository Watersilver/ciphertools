import matrix14x14pairs from "./dagapeyef/matrix14x14pairs.json"

import { observer } from "mobx-react-lite";
import store from "./store"

import {forbidAdjacency} from "./utils/constrainedPermute"
import { useRef, useState } from "react";

import MutableTable from "./MutableTable"

store.plaintext.set({type: "default", content: "D'Agapeyeff"});

let permutationsCount = 0;
const getPermutations = (matrix: ReadonlyArray<ReadonlyArray<string>>) => {
  const all: Map<string, ReadonlyArray<ReadonlyArray<string>>> = new Map();
  forbidAdjacency(matrix, p => {
    console.log(++permutationsCount);
    const perm = p.map(key => matrix[key]);
    all.set(JSON.stringify(perm), perm);
  });

  return all;
}

type Table = {
  rows: ReadonlyArray<ReadonlyArray<string>>,
  setCell: (row: number, column: number, value: string) => void,
  rowCount: number,
  columnCount: number,
  insertRow: () => void,
  insertColumn: () => void
};

const App = observer(() => {
  const [permutations, setPermutations] = useState<ReadonlyArray<ReadonlyArray<string>>[]>();

  const tRef = useRef<Table>();

  return <div>
    <div
      style={{
        margin: 20
      }}
    >
      <MutableTable
        exposeState={(table: Table) => {tRef.current = table}}
      />
    </div>
    <div>
      <button
        onClick={() => {
          const table = tRef.current;
          if (!table) return;

          matrix14x14pairs.forEach((col, j) => {
            col.forEach((cell, i) => {
              while (i + 1 > table.rowCount) {
                table.insertRow();
              }
              while (j + 1 > table.columnCount) {
                table.insertColumn();
              }

              table.setCell(i, j, cell);
            })
          })
        }}
        style={{
          margin: 20,
          height: 32
        }}
      >
        D'Agapeyef
      </button>
    </div>
    <div>
      <button
        onClick={() => {
          const table = tRef.current;
          if (!table) return;

          const matrix: string[][] = [];

          for (let col = 0; col < table.columnCount; col++) {
            matrix.push([]);
          }

          for (const col of matrix) {
            for (let row = 0; row < table.rowCount; row++) {
              col.push("");
            }
          }

          table.rows.forEach((rVal, row) => {
            rVal.forEach((cVal, col) => {
              matrix[col][row] = cVal;
            })
          });

          setPermutations(
            [...getPermutations(matrix)].map(([_, permutation]) => permutation)
          );
        }}
        style={{
          margin: 20,
          height: 32
        }}
      >
        Compute Permutations
      </button>
    </div>
    <div
      style={{
        backgroundColor: "white",
        borderRadius: 5
      }}
    >
      {
        !permutations ?
        "Awaiting computation..." :
        permutations.length > 0 ?
        [...permutations].map(permutation => <div key={JSON.stringify(permutation)}>{permutation}</div>) :
        "Empty!"
      }
    </div>
  </div>
})

export default App