import React, { useEffect } from "react";
import PackedBubbleChart from "./PackedBubbleChart";

function IntensityRegionChart({ region }) {
  const data = [];

  const arr = {};

  region.map((e) => {
    let i = e.intensity === "" ? 0 : e.intensity;
    if (e.region !== "")
      if (isNaN(arr[e.region])) arr[e.region] = i;
      else arr[e.region] += i;
  });

  for (let key in arr) {
    data.push({ region: key, value: arr[key] });
  }

  return (
    <div style={{backgroundColor: "#2f4a6d"}}>
    <p className="text-center fs-2 fw-bold text-light p-3">Region-wise Intensity</p>
      <PackedBubbleChart
        data={data}
        label={(d) =>
          [d.region.split(" ").join("\n"), d.value.toLocaleString("en")].join(
            "\n"
          )
        }
        value={(d) => d.value}
        group={(d) => d.region}
        title={(d) => `${d.region}\n${d.value.toLocaleString("en")}`}
        width={1200}
      />
    </div>
  );
}

export default IntensityRegionChart;
