import React, { createContext, useContext } from 'react';
import BaseGraph, { GraphPoint } from './BaseGraph';  // Graph クラスをインポート


interface BaseGraphComponentProps {
  width: number;
  height: number;
  padding: number;
  data: GraphPoint[];
  children?: React.ReactNode;
}

export const graphContext = createContext<BaseGraph | null>(null);

const BaseGraphComponent: React.FC<BaseGraphComponentProps> = ({ padding, width, height, data, children }) => {
  const graph = new BaseGraph({ padding, width, height });

  const generateTickArray = (start: number, end: number, count: number): number[] => {
    const step = (end - start) / (count - 1);
    return Array.from({ length: count }, (_, index) => {
      const value = start + step * index;
      return Number(value.toFixed(2));
    });
  };

  return (
    <graphContext.Provider value={graph}>
      <svg width={graph.graphWidth} height={graph.graphHeight}>
        <g>
          {/* x = 0 の直線 */}
          <line
            x1={graph.scaleX(0)}
            y1={graph.scaleY(graph.graphYMin)}
            x2={graph.scaleX(0)}
            y2={graph.scaleY(graph.graphYMax)}
            stroke="red"
            strokeWidth="1"
          />

          {/* y = 0 の直線 */}
          <line
            x1={graph.scaleX(graph.graphXMin)}
            y1={graph.scaleY(0)}
            x2={graph.scaleX(graph.graphXMax)}
            y2={graph.scaleY(0)}
            stroke="red"
            strokeWidth="1"
          />

          {/* グリッド線 */}
          {generateTickArray(0, 1, 25).map((tick) => (
            <React.Fragment key={tick}>
              <line
                x1={graph.scaleX(graph.graphXMin + (graph.graphXMax - graph.graphXMin) * tick)}
                y1={graph.scaleY(graph.graphYMin)}
                x2={graph.scaleX(graph.graphXMin + (graph.graphXMax - graph.graphXMin) * tick)}
                y2={graph.scaleY(graph.graphYMax)}
                stroke="lightgray"
                strokeDasharray="5,5"
              />
              <line
                x1={graph.scaleX(graph.graphXMin)}
                y1={graph.scaleY(graph.graphYMin + (graph.graphYMax - graph.graphYMin) * tick)}
                x2={graph.scaleX(graph.graphXMax)}
                y2={graph.scaleY(graph.graphYMin + (graph.graphYMax - graph.graphYMin) * tick)}
                stroke="lightgray"
                strokeDasharray="5,5"
              />
              <text
                x={graph.scaleX(0)}
                y={graph.scaleY(graph.graphYMin + (graph.graphYMax - graph.graphYMin) * tick)}
                textAnchor="end"
                fontSize="10"
                fill="gray"
                dominantBaseline="middle"
              >
                {graph.graphYMin + (graph.graphYMax - graph.graphYMin) * tick}
              </text>
              <text
                x={graph.scaleX(graph.graphXMin + (graph.graphXMax - graph.graphXMin) * tick)}
                y={graph.scaleY(0)}
                textAnchor="end"
                fontSize="10"
                fill="gray"
                dominantBaseline="middle"
              >
                {graph.graphXMin + (graph.graphXMax - graph.graphXMin) * tick}
              </text>
            </React.Fragment>
          ))}

          {/* 軸ラベル */}
          <text x={graph.graphWidth / 2} y={graph.graphHeight - 10} textAnchor="middle">X軸</text>
          <text x={10} y={graph.graphHeight / 2} textAnchor="middle" transform={`rotate(-90, 10, ${graph.graphHeight / 2})`}>Y軸</text>

          {/* データポイント */}
          {data.map((point, index) => (
            <circle
              key={index}
              cx={graph.scaleX(point.x)}
              cy={graph.scaleY(point.y)}
              r="4"
              fill="blue"
            />
          ))}

        </g>
        {children}
      </svg>

    </graphContext.Provider>
  );
};

export default BaseGraphComponent;