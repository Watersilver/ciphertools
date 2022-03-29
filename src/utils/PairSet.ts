import Pair from "./Pair";

class PairSet<T extends number | string> implements Set<Pair<T>> {
  private map: Map<string, Pair<T>> = new Map();

  constructor(pairs?: ReadonlyArray<Pair<T>> | ReadonlySet<Pair<T>>) {
    if (pairs) for (const pair of pairs) {
      this.add(pair);
    }
  }

  get size() {
    return this.map.size;
  }

  add(pair: Pair<T>) {
    this.map.set(pair.string, new Pair(pair));

    return this;
  }

  delete(pair: Pair<T>) {
    return this.map.delete(pair.string);
  }

  has(pair: Pair<T>) {
    return this.map.has(pair.string);
  }

  clear() {
    return this.map.clear();
  }

  forEach(callbackfn: (value: Pair<T>, value2: Pair<T>, set: Set<Pair<T>>) => void, thisArg?: any): void {
    const wrappedCB = (value: Pair<T>) => callbackfn(value, value, this);
    return this.map.forEach(wrappedCB, thisArg);
  }

  private * entriesGenerator(): Generator<[Pair<T>, Pair<T>], void, unknown> {
    for (const v of this.map.values()) {
      yield [v, v];
    }
  }
  entries(): IterableIterator<[Pair<T>, Pair<T>]> {
    return this.entriesGenerator();
  }

  keys() {
    return this.map.values();
  }

  values() {
    return this.map.values();
  }

  [Symbol.iterator]() {
    return this.map.values();
  }

  get [Symbol.toStringTag]() {
    return "[object PairSet]"
  }
}

interface ReadonlyPairSet<T extends number | string> extends ReadonlySet<Pair<T>> {}

export default PairSet

export type {ReadonlyPairSet}