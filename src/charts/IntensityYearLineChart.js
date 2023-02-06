import React, { useEffect, useState } from "react";
import LineChart from "./LineChart";

function IntensityYearLineChart({ year }) {
  const [data, setData] = useState([]);
  const sdata = [],
    edata = [];

  const sarr = {},
    earr = {};

  year.map((e) => {
    let i = e.intensity === "" ? 0 : e.intensity;
    if (e.start_year !== "")
      if (isNaN(sarr[e.start_year])) sarr[e.start_year] = i;
      else sarr[e.start_year] += i;
    if (e.end_year !== "")
      if (isNaN(earr[e.end_year])) earr[e.end_year] = i;
      else earr[e.end_year] += i;
  });

  for (let key in sarr) {
    sdata.push({ date: key, price: sarr[key] });
  }

  for (let key in earr) {
    edata.push({ date: key, price: earr[key] });
  }

  return (
    <div>
      <LineChart data={data.length ? data : sdata} />
      <div className="text-center">
        <button className="btn btn-primary me-2" onClick={() => setData(sdata)}>
          start_year
        </button>
        <button className="btn btn-primary" onClick={() => setData(edata)}>
          end_year
        </button>
      </div>
    </div>
  );
}

export default IntensityYearLineChart;
