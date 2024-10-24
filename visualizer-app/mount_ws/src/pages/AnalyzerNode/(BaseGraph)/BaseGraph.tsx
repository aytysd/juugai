import React from 'react';

export interface GraphPoint {
  x: number;
  y: number;
}

interface PagePoint {
  x: number;
  y: number;
}

interface BaseGraphProps {
  padding: number;
  width: number;
  height: number;
}


export default class BaseGraph {
  padding: number;
  graphWidth: number;
  graphHeight: number;

  graphXMin: number;
  graphYMin: number;
  graphXMax: number;
  graphYMax: number;

  graphCenterPoint: PagePoint;

  constructor(props: BaseGraphProps) {
    this.padding = props.padding;
    this.graphWidth = props.width;
    this.graphHeight = props.height;

    this.graphCenterPoint = this.calcCenterPoint();

    this.graphXMin = (-1) * props.width / 2;
    this.graphXMax = props.width / 2;
    this.graphYMin = (-1) * props.height / 2;
    this.graphYMax = props.height / 2;
  }

  scaleX(x: number) {
    return this.convertGraph2PageCoordinates({ x: x, y: 0 }).x;
  };

  scaleY(y: number) {
    return this.convertGraph2PageCoordinates({ x: 0, y: y }).y;
  };

  draw({children}: {children: React.ReactNode}): JSX.Element {
    const generateTickArray = (start: number, end: number, count: number): number[] => {
      const step = (end - start) / (count - 1);
      return Array.from({ length: count }, (_, index) => {
        const value = start + step * index;
        return Number(value.toFixed(2)); // 小数点以下2桁に丸める
      });
    }


    return (
      <svg width={this.graphWidth} height={this.graphHeight}>

        {/* x = 0 の直線 */}
        <line
          x1={this.scaleX(0)}
          y1={this.scaleY(this.graphYMin)}
          x2={this.scaleX(0)}
          y2={this.scaleY(this.graphYMax)}
          stroke="red"
          strokeWidth="1"
        />

        {/* y = 0 の直線 */}
        <line
          x1={this.scaleX(this.graphXMin)}
          y1={this.scaleY(0)}
          x2={this.scaleX(this.graphXMax)}
          y2={this.scaleY(0)}
          stroke="red"
          strokeWidth="1"
        />

        {/* グリッド線 */}
        {generateTickArray(0, 1, 25).map((tick) => {
          return (
            <React.Fragment key={tick}>
              <line
                x1={this.scaleX(this.graphXMin + (this.graphXMax - this.graphXMin) * tick)}
                y1={this.scaleY(this.graphYMin)}
                x2={this.scaleX(this.graphXMin + (this.graphXMax - this.graphXMin) * tick)}
                y2={this.scaleY(this.graphYMax)}
                stroke="lightgray"
                strokeDasharray="5,5"
              />
              <line
                x1={this.scaleX(this.graphXMin)}
                y1={this.scaleY(this.graphYMin + (this.graphYMax - this.graphYMin) * tick)}
                x2={this.scaleX(this.graphXMax)}
                y2={this.scaleY(this.graphYMin + (this.graphYMax - this.graphYMin) * tick)}
                stroke="lightgray"
                strokeDasharray="5,5"
              />
              <text
                x={this.scaleX(0)}
                y={this.scaleY(this.graphYMin + (this.graphYMax - this.graphYMin) * tick)}
                textAnchor="end"
                fontSize="10"
                fill="gray"
                dominantBaseline="middle"
              >
                {this.graphYMin + (this.graphYMax - this.graphYMin) * tick}
              </text>

              <text
                x={this.scaleX(this.graphXMin + (this.graphXMax - this.graphXMin) * tick)}
                y={this.scaleY(0)}
                textAnchor="end"
                fontSize="10"
                fill="gray"
                dominantBaseline="middle"
              >
                {this.graphYMin + (this.graphYMax - this.graphYMin) * tick}
              </text>
            </React.Fragment>
          )})}


        {/* 軸ラベル */}
        <text x={this.graphWidth / 2} y={this.graphHeight - 10} textAnchor="middle">X軸</text>
        <text x={10} y={this.graphHeight / 2} textAnchor="middle" transform={`rotate(-90, 10, ${this.graphHeight / 2})`}>Y軸</text>
        <circle
          cx={this.scaleX(43)}
          cy={this.scaleY(123)}
          r="4"
          fill="blue"
        />
      </svg>
    );

  }

  addPoint(data: GraphPoint): React.ReactNode {
    console.log(`${data.x}`);
    return (
      <circle
        cx={this.scaleX(data.x)}
        cy={this.scaleY(data.y)}
        r="4"
        fill="blue"
      />

    )

  }

  calcCenterPoint(): PagePoint {
    const centerX = this.padding + this.graphWidth / 2;
    const centerY = this.padding + this.graphHeight / 2;

    return {
      x: centerX,
      y: centerY
    };
  }

  convertGraph2PageCoordinates(p: GraphPoint): PagePoint {
    const pageX = this.graphCenterPoint.x + p.x;
    const pageY = this.graphCenterPoint.y - p.y;

    return {
      x: pageX,
      y: pageY
    };
  }


};
