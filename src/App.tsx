import matrix14x14pairs from "./dagapeyef/matrix14x14pairs.json"
import allPermsNoDigrams from "./dagapeyef/allPermutationsNoDigrams.json"

import { observer } from "mobx-react-lite";
import store from "./store"

import {forbidAdjacency} from "./utils/constrainedPermute"
import { useRef, useState } from "react";

import MutableTable from "./MutableTable"
import Permutations from "./Permutations";

store.plaintext.set({type: "default", content: "D'Agapeyeff"});

type PermutationsType = {
  readonly matrix: ReadonlyArray<ReadonlyArray<string>>;
  readonly set: ReadonlySet<ReadonlyArray<number>>;
}

const getPermutations = (matrix: ReadonlyArray<ReadonlyArray<string>>): PermutationsType => {
  const result = {
    matrix: [...[...matrix]],
    set: new Set<ReadonlyArray<number>>()
  }

  const perms = new Map<string, ReadonlyArray<number>>();
  forbidAdjacency(matrix, p => {
    perms.set(JSON.stringify(p), [...p]);
  });
  
  result.set = new Set<ReadonlyArray<number>>([...perms.values()]);

  console.log({
    matrix: result.matrix,
    set: [...result.set]
  })

  return result;
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
  const [permutations, setPermutations] = useState<PermutationsType>();

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
            getPermutations(matrix)
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
    <div style={{backgroundColor: "white"}}>
      <div
        style={{
          padding: 10,
          fontSize: "large",
          fontWeight: "bold"
        }}
      >
        Cached permutations
      </div>
      <button
        onClick={() => {
          setPermutations({
            matrix: allPermsNoDigrams.matrix,
            set: new Set(allPermsNoDigrams.set)
          });
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
      {
        !permutations ?
        <div style={{backgroundColor: "white"}}>Awaiting computation...</div> :
        permutations.set.size > 0 ?
        <Permutations permutations={permutations} /> :
        <div style={{backgroundColor: "white"}}>Empty</div>
      }
    </div>
  </div>
})

export default App