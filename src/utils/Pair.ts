type PairItem = number | string;

class Pair<T extends PairItem> {
  readonly array: [T, T];
  readonly string: string;

  constructor(pair: Pair<T>);
  constructor(pair: [T, T]);
  constructor(n1: T, n2: T);
  constructor(...args: [[T, T]] | [T, T] | [Pair<T>]) {
    if (args.length === 1) {
      if (Array.isArray(args[0])) {
        this.array = args[0].sort();
      } else {
        this.array = [...args[0].array];
        this.string = args[0].string;
        return;
      }
    } else {
      this.array = args.sort();
    }

    this.string = this.array.join(",");
  }

  equals(...args: [Pair<T>] | [[T, T]] | [T, T]) {
    const p = args.length === 1 ? args[0] : args;
    const sorted = Array.isArray(p) ? p.sort() : p.array;

    return sorted[0] === this.array[0] && sorted[1] === this.array[1];
  }

  *[Symbol.iterator]() {
    yield [this.array[0], this.array[1]];
    yield [this.array[1], this.array[0]];
  }
}

export default Pair