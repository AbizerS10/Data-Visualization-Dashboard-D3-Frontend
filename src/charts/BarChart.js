import React, { useEffect } from "react";
import * as d3 from "d3";
import "../styles/barchart.css";

function BarChart({
  data,
  label1,
  label2,
  clas,
  heading,
  range,
  multiplier,
  svgwidth,
  svgheight,
  span,
  average,
}) {
  const createChart = () => {
    const svg = d3.select(`.svg${clas}`);

    const margin = 100;
    const width = 700 - 2 * margin;
    const height = 500 - 2 * margin;

    const chart = svg
      .append("g")
      .attr("transform", `translate(${margin}, ${margin})`);

    const xScale = d3
      .scaleBand()
      .range([0, width + span])
      .domain(data.map((s) => s.label))
      .padding(0.3);

    const yScale = d3.scaleLinear().range([height, 0]).domain([0, range]);

    const makeYLines = () => d3.axisLeft().scale(yScale);

    chart
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-65)");

    chart.append("g").call(d3.axisLeft(yScale));

    if (average) {
      chart
        .append("line")
        .attr("id", `average${clas}`)
        .attr("x1", 0)
        .attr("y1", range / 1.85 - average)
        .attr("x2", width + span)
        .attr("y2", range / 1.85 - average);
      svg
        .append("line")
        .attr("id", `average${clas}`)
        .attr("x1", width + margin)
        .attr("y1", margin - 25)
        .attr("x2", width + margin + 40)
        .attr("y2", margin - 25);
      svg
        .append("text")
        .attr("class", "source")
        .attr("x", 1.5 * width - margin)
        .attr("y", height - 2.2 * margin)
        .attr("text-anchor", "start")
        .text(`Average (${average})`);
    }

    chart
      .append("g")
      .attr("class", "grid")
      .call(
        makeYLines()
          .tickSize(-width - span, 0, 0)
          .tickFormat("")
      );

    const barGroups = chart.selectAll().data(data).enter().append("g");

    barGroups
      .append("rect")
      .attr("class", `bar${clas}`)
      .attr("x", (g) => xScale(g.label))
      .attr("y", (g) => yScale(g.value))
      .attr("height", (g) => height - yScale(g.value))
      .attr("width", xScale.bandwidth())
      .on("mouseenter", function (actual, i) {
        d3.selectAll(`.value${clas}`).attr("opacity", 0);

        d3.select(this)
          .transition()
          .duration(300)
          .attr("opacity", 0.6)
          .attr("x", (a) => xScale(a.label) - 5)
          .attr("width", xScale.bandwidth() + 10);

        const y = yScale(i.value);

        const line = chart
          .append("line")
          .attr("id", `limit${clas}`)
          .attr("x1", 0)
          .attr("y1", y)
          .attr("x2", width + span)
          .attr("y2", y);

        barGroups
          .append("text")
          .attr("class", `divergence${clas}`)
          .attr("x", (a) => xScale(a.label) + xScale.bandwidth() / 2)
          .attr("y", (a) => yScale(a.value) - 10)
          .attr("fill", "white")
          .attr("text-anchor", "middle")
          .text((a, idx) => {
            const divergence = (a.value - i.value).toFixed(1);
            let text = "";
            if (divergence > 0) text += "+";
            text += `${divergence}%`;

            return idx !== i ? text : "";
          });
      })
      .on("mouseleave", function () {
        d3.selectAll(`.value${clas}`).attr("opacity", 1);

        d3.select(this)
          .transition()
          .duration(300)
          .attr("opacity", 1)
          .attr("x", (a) => xScale(a.label))
          .attr("width", xScale.bandwidth());

        chart.selectAll(`#limit${clas}`).remove();
        chart.selectAll(`.divergence${clas}`).remove();
      });

    barGroups
      .append("text")
      .attr("class", `value${clas}`)
      .attr("x", (a) => xScale(a.label) + xScale.bandwidth() / 2)
      .attr("y", (a) => yScale(a.value) - 10)
      .attr("text-anchor", "middle")
      .text((a) => a.value);

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", -(height / 2) - margin)
      .attr("y", margin / 2.4)
      .attr("transform", "rotate(-90)")
      .attr("text-anchor", "middle")
      .text(`${label1}`);

    svg
      .append("text")
      .attr("class", "label")
      .attr("x", width / 2 + margin - 20)
      .attr("y", height + margin * multiplier)
      .attr("text-anchor", "middle")
      .text(`${label2}`);

    svg
      .append("text")
      .attr("class", "title")
      .attr("x", width / 2 + margin)
      .attr("y", 40)
      .attr("text-anchor", "middle")
      .text(`${heading}`);
  };

  useEffect(() => {
    if (clas === 5) d3.select(`svg.svg${clas}`).selectChildren().remove();
    createChart();
  }, [data]);

  return data.length ? (
    <div id="layout">
      <div id="container">
        <svg
          className={`svg${clas}`}
          viewBox={`0 0 ${svgheight} ${svgwidth}`}
        />
      </div>
    </div>
  ) : (
    <p className="text-center fs-1 text-danger">No Data Found</p>
  );
}

export default BarChart;
