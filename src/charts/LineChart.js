import React, { useState } from "react";
import * as d3 from "d3";
import "../styles/linechart.css";

function LineChart({ data }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const margin = { top: 30, right: 50, bottom: 40, left: 60 },
    width = 450 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom,
    color = "#2F4A6D";

  const yMinValue = d3.min(data, (d) => d.price),
    yMaxValue = d3.max(data, (d) => d.price);

  const xMin = d3.min(data, (d) => parseInt(d.date)),
    xMax = d3.max(data, (d) => parseInt(d.date));

  const getX = d3
    .scaleLinear()
    .range([margin.left + 10, width + margin.left])
    .domain([xMin - 5, xMax]);

  const getY = d3
    .scaleLinear()
    .domain([0, yMaxValue + 400])
    .range([height, 0]);

  const getXAxis = (ref) => {
    const xAxis = d3.axisBottom(getX);
    d3.select(ref).call(xAxis);
  };

  const getYAxis = (ref) => {
    const yAxis = d3.axisLeft(getY).tickSize(-width).tickPadding(7);
    d3.select(ref).call(yAxis);
  };

  const linePath = d3
    .line()
    .x((d) => getX(d.date))
    .y((d) => getY(d.price))
    .curve(d3.curveMonotoneX)(data);

  const areaPath = d3
    .area()
    .x((d) => getX(d.date))
    .y0((d) => getY(d.price))
    .y1(() => getY(yMinValue - 1))
    .curve(d3.curveMonotoneX)(data);

  const handleMouseMove = (e) => {
    const bisect = d3.bisector((d) => d.date).left,
      x0 = getX.invert(d3.pointer(e, this)[0]),
      index = bisect(data, x0, 0);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="wrapper1">
      <svg
        viewBox={`-10 -${margin.top} ${width + margin.left + margin.right} 
        ${height + margin.top + margin.bottom}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        // x- and y-axes
        <g
          className="axis1"
          ref={getYAxis}
          transform={`translate(${margin.left},0)`}
        />
        <g
          className="axis1 xAxis1"
          ref={getXAxis}
          transform={`translate(0,${height})`}
        />
        // area and line paths
        <path fill={color} d={areaPath} opacity={0.4} />
        <path strokeWidth={3} fill="none" stroke={color} d={linePath} />
        // y-axis label
        <text
          transform={"rotate(-90)"}
          x={-margin.top - height / 2}
          y={0}
          id="label"
          dy="1em"
        >
          Total Intensity
        </text>
        // chart title
        <text x={width / 2 + 20} y={0 - margin.top / 2 + 10} textAnchor="middle" id="title">
          Intensity-Year Distribution
        </text>
        {data.map((item, index) => {
          return (
            <g key={index}>
              // hovering text
              <text
                fill="#2F4A6D"
                x={getX(item.date)}
                y={getY(item.price) - 10}
                textAnchor="middle"
              >
                {index === activeIndex ? item.price : ""}
              </text>
              // hovering circle
              <circle
                cx={getX(item.date)}
                cy={getY(item.price)}
                r={index === activeIndex ? 6 : 4}
                fill={color}
                strokeWidth={index === activeIndex ? 2 : 0}
                stroke="#fff"
                style={{ transition: "ease-out .1s" }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export default LineChart;
