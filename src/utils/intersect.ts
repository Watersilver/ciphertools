const intersect = <T>(set1: ReadonlySet<T>, set2: ReadonlySet<T>) => {

  const intersection: Set<T> = new Set();

  for (const item1 of set1) {
    if (set2.has(item1)) {
      intersection.add(item1);
    }
  }

  for (const item2 of set2) {
    if (set1.has(item2)) {
      intersection.add(item2)
    }
  }

  return intersection;
}

export default intersect