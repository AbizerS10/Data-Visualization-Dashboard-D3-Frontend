import React from "react";
import BarChart from "./BarChart";

function IntensityPestleChart({ pestle }) {
  let temp = {};
  let data = [];
  pestle.map((e) => {
    if (isNaN(temp[e.pestle])) temp[e.pestle] = 1;
    else temp[e.pestle]++;
  });

  for (var key in temp) {
    data.push({ label: key === "" ? "Unknown" : key, value: temp[key] });
  }

  return (
    <BarChart
      data={data}
      label1={"Intensity Count"}
      label2={"Pestle"}
      clas={2}
      heading={"Pestle-Wise Intensity"}
      range={400}
      multiplier={2.1}
      svgwidth={550}
      svgheight={740}
      span={0}
    />
  );
}

export default IntensityPestleChart;
