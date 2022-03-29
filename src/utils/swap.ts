const swap = (arr: any[], i: number, j: number) => {
  if (i < 0 || j < 0 || i >= arr.length || j >= arr.length) 
    throw TypeError(`i or j out of bounds: i:${i}, j:${j}, length:${arr.length}`);

  [arr[i], arr[j]] = [arr[j], arr[i]];
}

export default swap