import React from "react";
import BarChart from "./BarChart";

function LikelihoodTopicBarChart({ likelihood }) {
  const data = [];

  const temp = {};

  likelihood.map((e) => {
    if (e.topic !== "" && e.likelihood !== "") {
      if (temp[e.topic] === undefined)
        temp[e.topic] = [e.likelihood, 1];
      else {
        temp[e.topic][0] += e.likelihood;
        temp[e.topic][1]++;
      }
    }
  });

  let sortable = [];
  for (var key in temp) {
    sortable.push([key, Math.round((temp[key][0] / temp[key][1] + Number.EPSILON) * 100) /
    100]);
  }

  sortable.sort(function (a, b) {
    return b[1] - a[1];
  });

  sortable = sortable.slice(0, 10);

  sortable.map((e) => {
    data.push({
      label: e[0],
      value: e[1],
    });
  });

  return (
    <div>
      <BarChart
        data={data}
        label1={"Average Likelihood"}
        label2={"Topic"}
        clas={1}
        heading={"Top 10 Topics by Likelihood"}
        range={5}
        multiplier={2.0}
        svgwidth={550}
        svgheight={750}
        span={50}
      />
    </div>
  );
}

export default LikelihoodTopicBarChart;
