import React from "react";
import BarChart from "./BarChart";

function IntensitySectorBarChart({ sector }) {
  let temp = {};
  let data = [];
  sector.map((e) => {
    if (isNaN(temp[e.sector])) temp[e.sector] = 1;
    else temp[e.sector]++;
  });
  let sum=0;
  for (var key in temp) {
    sum += temp[key];
    data.push({ label: key === "" ? "Unknown" : key, value: temp[key] });
  }

  return (
    <BarChart
      data={data}
      label1={"Intensity Count"}
      label2={"Sector"}
      clas={3}
      heading={"Sector-Wise Intensity"}
      range={600}
      multiplier={2.7}
      svgwidth={600}
      svgheight={850}
      span={200}
      average={Math.round(sum/data.length)}
    />
  );
}

export default IntensitySectorBarChart;
