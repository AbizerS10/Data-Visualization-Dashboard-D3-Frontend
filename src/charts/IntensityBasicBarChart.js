import React from "react";
import BarChart from "./BarChart";

function IntensityBasicBarChart({ intensity }) {
  const data = [];

  const arr = new Array(6).fill(0);

  intensity.map((e) => {
    if (e.intensity === "") arr[5]++;
    else arr[Math.floor(e.intensity / 20)]++;
  });

  arr.map((e, i) => {
    let t = i < 5 ? i * 20 + " to " + (i + 1) * 20 : "Unknown";
    data.push({ label: t, value: e });
  });

  return (
    <BarChart
      data={data}
      label1={"Intensity Count"}
      label2={"Intensity"}
      clas={1}
      heading={"Distribution of Intensity"}
      range={900}
      multiplier={2.0}
      svgwidth={550}
      svgheight={750}
      span={0}
    />
  );
}

export default IntensityBasicBarChart;
