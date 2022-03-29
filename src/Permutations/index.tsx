import { useMemo, useState } from "react";

type PermutationsType = {
  readonly matrix: ReadonlyArray<ReadonlyArray<string>>;
  readonly set: ReadonlySet<ReadonlyArray<number>>;
};

const Permutation = ({
  matrix,
  permutation,
  expansionState
}: {
  matrix: ReadonlyArray<ReadonlyArray<string>>;
  permutation: ReadonlyArray<number>;
  expansionState?: {
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  }
}) => {
  const [$expanded, $setExpanded] = useState<boolean>(false);

  const expanded = expansionState ? expansionState.expanded : $expanded;
  const setExpanded = expansionState ? expansionState.setExpanded : $setExpanded;

  return <div>
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      backgroundColor: "white",
      borderRadius: 4,
      padding: 10,
    }}
  >
    <button onClick={() => setExpanded(prev => !prev)} type="button">{expanded ? "collapse" : "expand"}</button>
    {
      expanded ?
      <div>{
        <table>
          <thead>
            <tr>
              {permutation && permutation.map(col => {
                return <th key={col}>{col + 1}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {matrix[0] && matrix[0].map((_, row) => {
              return <tr key={row}>
                {matrix.map((_, col) => {
                  return <td
                    key={col}
                    style={{
                      borderRadius: 2,
                      backgroundColor: "#246",
                      color: "white",
                      fontWeight: "bold",
                      padding: 4
                    }}
                  >
                    {matrix[permutation[col]][row]}
                  </td>
                })}
              </tr>
            })}
          </tbody>
        </table>
      }</div> :
      <div
        style={{
          display: "flex",
          margin: 5,
          gap: 3
        }}
      >
        {permutation.map(column => {
          return <span
            key={column}
            style={{
              borderRadius: 2,
              backgroundColor: "#246",
              color: "white",
              fontWeight: "bold",
              padding: 4
            }}
          >
            {column + 1}
          </span>
        })}
      </div>
    }
    {expanded ? <button onClick={() => setExpanded(false)} type="button">collapse</button> : undefined}
  </div>
  </div>;
};

const Permutations = ({
  permutations
}: {
  permutations: PermutationsType
}) => {
  const jsx = useMemo(() => {
    return [...permutations.set].map(permutation => {
      return <Permutation
        key={JSON.stringify(permutation)}
        permutation={permutation}
        matrix={permutations.matrix}
      />
    })
  }, [permutations]);

  return <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      gap: 20,
      justifyContent: "space-around"
    }}
  >
    {jsx}
  </div>;
};

export default Permutations