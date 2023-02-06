import * as d3 from "d3";
import { useEffect } from "react";

function PackedBubbleChart({
  data,
  name = ([x]) => x,
  label = name,
  value = ([, y]) => y,
  group,
  title,
  link,
  linkTarget = "_blank",
  width = width,
  height = 700,
  padding = 18,
  margin = 0,
  marginTop = margin,
  marginRight = margin,
  marginBottom = margin,
  marginLeft = margin,
  groups, //
  colors = d3.schemeTableau10,
  fill = "#ccc",
  fillOpacity = 0.7,
  stroke = "white",
  strokeWidth = "2px",
  strokeOpacity = "0.5",
} = {}) {
  const createChart = () => {
    const D = d3.map(data, (d) => d);
    const V = d3.map(data, value);
    const G = group == null ? null : d3.map(data, group);
    const I = d3.range(V.length).filter((i) => V[i] > 0);

    if (G && groups === undefined) groups = I.map((i) => G[i]);
    groups = G && new d3.InternSet(groups);

    const color = G && d3.scaleOrdinal(groups, colors);

    const L = label == null ? null : d3.map(data, label);
    const T =
      title === undefined ? L : title == null ? null : d3.map(data, title);

    const root = d3
      .pack()
      .size([width + 100, height + 100])
      .padding(padding)(d3.hierarchy({ children: I }).sum((i) => V[i]));

    const svg = d3
      .select("#svgs")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 50, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;")
      .attr("fill", "currentColor")
      .attr("font-size", 10)
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle");

    const leaf = svg
      .selectAll("a")
      .data(root.leaves())
      .join("a")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    leaf
      .append("circle")
      .attr("stroke", stroke)
      .attr("stroke-width", strokeWidth)
      .attr("stroke-opacity", strokeOpacity)
      .attr("fill", G ? (d) => color(G[d.data]) : fill == null ? "none" : fill)
      .attr("fill-opacity", fillOpacity)
      .attr("r", (d) => d.r);

    if (T) leaf.append("title").text((d) => T[d.data]);

    if (L) {
      const uid = `O-${Math.random().toString(16).slice(2)}`;

      leaf
        .append("clipPath")
        .attr("id", (d) => `${uid}-clip-${d.data}`)
        .append("circle")
        .attr("r", (d) => d.r);

      leaf
        .append("text")
        .selectAll("tspan")
        .data((d) => `${L[d.data]}`.split(/\n/g))
        .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i, D) => `${i - D.length / 2 + 0.85}em`)
        .attr("fill-opacity", (d, i, D) => (i === D.length - 1 ? 0.7 : null))
        .text((d) => d);

      Object.assign(svg, { scales: { color } });
    }
  };

  useEffect(() => {
    createChart();
  }, [data.length]);

  return <svg id="svgs"></svg>;
}

export default PackedBubbleChart;
