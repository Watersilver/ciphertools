import swap from "./swap";

const permuteRecursively = <T>(arr: T[], l: number, r: number, onPermutationDone: (arr: ReadonlyArray<T>) => void) => { 
  // Permutation done!
  if (l === r) {
    onPermutationDone(arr);
    return;
  }

  // Recursively generate all permutations
  for (let i = l; i <= r; i++) {
    swap(arr, l, i);
    permuteRecursively(arr, l + 1, r, onPermutationDone);
    swap(arr, l, i);
  }
}

const permute = <T>(set: Set<T>, onPermutationDone: (arr: ReadonlyArray<T>) => void) => {

  const arr = [...set];
  permuteRecursively(arr, 0, arr.length - 1, onPermutationDone);
}

export default permute