"use client";

type Node = [number, number];
type Cluster = { nodes: Node[]; lines: [number, number][]; filled: number[] };

// Small orange wireframe clusters echoing the node-diagrams on the book
// covers, scattered around the edges of the frame so they never compete
// with the centered word. One cluster reveals per scroll stage.
export const networkClusters: Cluster[] = [
  {
    nodes: [
      [130, 110],
      [230, 90],
      [190, 190],
      [90, 210],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 0],
      [2, 3],
    ],
    filled: [2],
  },
  {
    nodes: [
      [1420, 130],
      [1500, 90],
      [1470, 210],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 0],
    ],
    filled: [1],
  },
  {
    nodes: [
      [1500, 430],
      [1560, 500],
      [1460, 540],
      [1540, 590],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
    ],
    filled: [1],
  },
  {
    nodes: [
      [1360, 760],
      [1460, 800],
      [1300, 840],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 0],
    ],
    filled: [0],
  },
  {
    nodes: [
      [200, 770],
      [280, 820],
      [120, 850],
      [240, 690],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 0],
      [0, 3],
    ],
    filled: [0],
  },
  {
    nodes: [
      [80, 440],
      [150, 500],
      [70, 560],
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 0],
    ],
    filled: [1],
  },
];

// revealed alongside the final "BEYOND THE PROMPT" moment — long lines
// tying the peripheral clusters together, reading as the system completing.
export const completionLines: [Node, Node][] = [
  [
    [190, 190],
    [80, 440],
  ],
  [
    [1470, 210],
    [1500, 430],
  ],
  [
    [1540, 590],
    [1360, 760],
  ],
  [
    [70, 560],
    [200, 770],
  ],
];

function length([x1, y1]: Node, [x2, y2]: Node) {
  return Math.hypot(x2 - x1, y2 - y1);
}

type Props = {
  registerCluster: (index: number, el: SVGGElement | null) => void;
  registerCompletion: (index: number, el: SVGLineElement | null) => void;
};

export function ScrollNetwork({ registerCluster, registerCompletion }: Props) {
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    >
      {networkClusters.map((cluster, ci) => (
        <g key={ci} ref={(el) => registerCluster(ci, el)}>
          {cluster.lines.map(([a, b], li) => {
            const [x1, y1] = cluster.nodes[a];
            const [x2, y2] = cluster.nodes[b];
            const len = length(cluster.nodes[a], cluster.nodes[b]);
            return (
              <line
                key={li}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="#FF5A1F"
                strokeWidth={1.5}
                strokeDasharray={len}
                strokeDashoffset={len}
                data-network-line=""
              />
            );
          })}
          {cluster.nodes.map(([x, y], ni) =>
            cluster.filled.includes(ni) ? (
              <rect key={ni} x={x - 4} y={y - 4} width={8} height={8} fill="#FF5A1F" data-network-node="" />
            ) : (
              <rect
                key={ni}
                x={x - 4}
                y={y - 4}
                width={8}
                height={8}
                fill="none"
                stroke="#F4F0E8"
                strokeWidth={1.5}
                data-network-node=""
              />
            )
          )}
        </g>
      ))}

      {completionLines.map(([from, to], i) => {
        const len = length(from, to);
        return (
          <line
            key={i}
            ref={(el) => registerCompletion(i, el)}
            x1={from[0]}
            y1={from[1]}
            x2={to[0]}
            y2={to[1]}
            stroke="#FF5A1F"
            strokeWidth={1}
            strokeDasharray={len}
            strokeDashoffset={len}
          />
        );
      })}
    </svg>
  );
}
