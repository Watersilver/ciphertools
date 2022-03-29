import AdjacencyConstraints from "../AdjacencyConstraints"
import Pair from "../Pair";
import PairSet from "../PairSet"

/**
 * @param matrix 2D Matrix to be constrained
 * @param callback If it returns true for a pair of matrix cells, matrix indexes will be added to constraints
 */
const getAdjacencyConstraintsFromMatrix = (
  matrix: ReadonlyArray<ReadonlyArray<string>>,
  callback: (cell: string, other: string, row: number, col: number, i: number) => boolean
) => {
  const ps = new PairSet<number>();
  const keys: Set<number> = new Set();

  // For every row of every column
  for (let col = 0; col < matrix.length; col++) {
    keys.add(col);
    for (let row = 0; row < matrix[col].length; row++) {
      const cell = matrix[col][row];

      // compare each cell with the ones to its right
      for (let i = col + 1; i < matrix.length; i++) {
        const other = matrix[i][row];

        // Can't be adjacent if they are equal
        if (callback(cell, other, row, col, i)) {
          ps.add(new Pair(col, i));
        }
      }
    }
  }

  const ac = new AdjacencyConstraints(keys, ps);

  return ac;
}

export default getAdjacencyConstraintsFromMatrix