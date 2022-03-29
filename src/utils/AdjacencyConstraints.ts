import PairSet from "./PairSet"
import Pair from "./Pair"

import type { ReadonlyPairSet } from "./PairSet"

/**
* Each constraint provided represents two values that may not appear next to each other.
*/
class AdjacencyConstraints {
  readonly keys: ReadonlySet<number>;
  readonly sortedKeys: ReadonlyArray<number>;
  private readonly constraints: ReadonlyPairSet<number>;

  private readonly __byKey: Record<number, ReadonlyArray<Pair<number>>>;

  constructor(keys: ReadonlySet<number>, constraints: ReadonlyPairSet<number>) {
    // Copy to ensure outside mutations won't impact keys
    this.keys = new Set(keys);
    this.constraints = new PairSet(constraints);

    const byKey: Record<number, Pair<number>[]> = {};
    for (const constraint of this.constraints) {
      for (const [p1, p2] of constraint) {
        if (byKey[p1]) {
          byKey[p1].push(new Pair(p1, p2));
        } else {
          byKey[p1] = [new Pair(p1, p2)];
        }
      }
    }
    this.__byKey = byKey;

    this.sortedKeys = [...this.keys]
    .map(key => {
      return {key, length: this.byKey(key).length}
    })
    .sort((a, b) => b.length - a.length)
    .map(data => data.key);
  }

  has(k1: number | Pair<number> | [number, number], k2?: number) {
    if (typeof k1 !== "number") {
      return this.constraints.has(k1 instanceof Pair ? k1 : new Pair(k1));
    } else {
      if (k2 === undefined) return !!this.__byKey[k1];

      return this.constraints.has(new Pair(k1, k2));
    }
  }

  byKey(k: number): ReadonlyArray<Pair<number>> {
    return this.__byKey[k] || [];
  }

  extend({
    removeKeys,
    addConstraints
  }: {
    removeKeys?: ReadonlySet<number>,
    addConstraints?: ReadonlyPairSet<number>
  }) {
    const c = new PairSet(this.constraints);
    if (addConstraints) for (const constraint of addConstraints) {
      c.add(constraint);
    }

    const k = new Set(this.keys);
    if (removeKeys) for (const key of removeKeys) {
      k.delete(key);

      for (const constraint of this.byKey(key)) {
        c.delete(constraint);
      }
    }

    return new AdjacencyConstraints(k, c);
  }

  clone() {
    return this.extend({});
  }
};

export default AdjacencyConstraints