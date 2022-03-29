import AdjacencyConstraints from "../AdjacencyConstraints"
import swap from "../swap"

import getAdjacencyConstraintsFromMatrix from "./getAdjacencyConstraintsFromMatrix"

// Pinakas N x N
// Sthles N
// List apo sthles pou den mporoun na kini8oun M
// Legal Sthles N - M

// An oi Legal sthles einai 0 exoume ena permutation

// Vres ta restrictions tou pinaka
// (sygkrish ka8e Legal Sthlhs me tis epomenes) O(n ^ 3)?

// Vres th sthlh me ta perissotera restrictions
// (sort tis sthles) O(nlogn)

// An ftasoume se atopo abort.

// Kane recursion gia ka8e legal 8esh
// vgazontas se ka8e recursion th
// sthlh pou xrhshmopoioume
const isSafe = (
  permutation: number[],
  adjacencyConstraints: AdjacencyConstraints,
  l: number,
  r: number
) => {

  // console.log("going from", permutation.join(", "));

  // Create permutation to test it
  swap(permutation, l, r);

  // Receive relevant permutation keys
  const k1_left = permutation[l - 1];
  const k1 = permutation[l];
  const k1_right = permutation[l + 1];

  const k2_left = permutation[r - 1];
  const k2 = permutation[r];
  const k2_right = permutation[r + 1];

  // console.log("to", permutation.join(", "));

  // console.log("swapped", k1, "with", k2);

  // Test permutation keys
  if (
    (k1_left !== undefined && adjacencyConstraints.has(k1, k1_left)) ||
    (k1_right !== undefined && adjacencyConstraints.has(k1, k1_right)) ||
    (k2_left !== undefined && adjacencyConstraints.has(k2, k2_left)) ||
    (k2_right !== undefined && adjacencyConstraints.has(k2, k2_right))
  ) {
    // Restore permutation
    swap(permutation, l, r);

    // console.log("=-=-=-=-=-=-=-=-=-=-=");
    // console.log("=-=-=-=STOPPED=-=-=-=");
    // console.log("=-=-=-=-=-=-=-=-=-=-=");

    // illegal move
    return false;
  }

  // Restore permutation
  swap(permutation, l, r);

  // console.log("=-=-=-=-=-=-=-=-=-=-=");
  // console.log("=-=-=-MOVING ON-=-=-=");
  // console.log("=-=-=-=-=-=-=-=-=-=-=");

  // legal move
  return true;
}

const fa = (
  matrix: ReadonlyArray<ReadonlyArray<string>>,
  permutation: number[],
  adjacencyConstraints: AdjacencyConstraints,
  l: number,
  r: number,
  onPermutationDone: (permutation: ReadonlyArray<number>) => void
) => {
  // We reach here only when permutation is valid
  if (l === r) {

    // console.log("=-=-=-=-=-=-=-=-=-=-=");
    // console.log("=-=-=-=-DONE=-=-=-=-=");
    // console.log("=-=-=-=-=-=-=-=-=-=-=");
    onPermutationDone(permutation);
    return;
  }

  // Fix all characters one by one
  for (let i = l; i <= r; i++) {

    // Fix str[i] only if it is a valid move.
    if (isSafe(permutation, adjacencyConstraints, l, i)) {
      swap(permutation, l, i);
      fa(matrix, permutation, adjacencyConstraints, l + 1, r, onPermutationDone);
      swap(permutation, l, i);
    }
  }
}

const forbidAdjacency = (
  matrix: ReadonlyArray<ReadonlyArray<string>>,
  onPermutationDone: (permutation: ReadonlyArray<number>) => void
) => {
  const permutation = matrix.map((_, i) => i);

  const adjacencyConstraints = getAdjacencyConstraintsFromMatrix(matrix, (cell1, cell2) => cell1 === cell2);

  console.log(adjacencyConstraints);

  fa(matrix, permutation, adjacencyConstraints, 0, permutation.length - 1, onPermutationDone);
}

export default forbidAdjacency