import React, { useEffect, useState } from "react";
import BarChart from "./BarChart";

function LikelihoodCountryBarChart({ country }) {
  const [sector, setSector] = useState("");
  const [data, setData] = useState([]);

  const createOptions = () => {
    let ans = [];
    const sectors = new Set();
    country.forEach((e) => sectors.add(e.sector));
    sectors.forEach((v) => v !== "" && ans.push(v));
    return ans;
  };

  useEffect(() => {
    const buildData = (callback) => {
      let tdata = [];
      let temp = {};
      country.forEach((e) => {
        if (
          e.sector.localeCompare(sector) === 0 &&
          e.country !== "" &&
          e.likelihood !== ""
        ) {
          let ar = e.country.split(" ");
          let a = [];
          let s = e.country;
          if (ar.length > 1) {
            ar.forEach((e) => {
              a.push(e[0]);
            });
            s = a.join("");
          }
          if (temp[s] === undefined) temp[s] = [e.likelihood, 1];
          else {
            temp[s][0] += e.likelihood;
            temp[s][1]++;
          }
        }
      });
      for (var key in temp) {
        tdata.push({
          label: key,
          value:
            Math.round((temp[key][0] / temp[key][1] + Number.EPSILON) * 100) /
            100,
        });
      }
      callback(tdata);
    };
    buildData(setData);
  }, [sector]);

  return (
    <div>
      <BarChart
        data={data}
        label1={"Average Likelihood"}
        label2={"Countries"}
        clas={5}
        heading={"Country-wise likelihood for each sector"}
        range={4}
        multiplier={2}
        svgwidth={550}
        svgheight={1060}
        span={400}
      />
      <select
        className="form-select"
        aria-label="Default select example top-50"
        onChange={(e) => {
          setSector(e.target.value);
        }}
      >
        {createOptions().map((v, i) => {
          return (
            <option key={i} value={v}>
              {v}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default LikelihoodCountryBarChart;
