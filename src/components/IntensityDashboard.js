import React, { useEffect, useState } from "react";
import "../styles/intensitydashboard.css";
import IntensityBasicBarChart from "../charts/IntensityBasicBarChart";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import IntensityPestleChart from "../charts/IntensityPestleChart";
import IntensitySectorBarChart from "../charts/IntensitySectorBarChart";
import IntensityYearLineChart from "../charts/IntensityYearLineChart";
import IntensityRegionChart from "../charts/IntensityRegionChart";

function IntensityDashboard({ data }) {
  return (
    <div className="container-fluid intensity p-0">
      <div className="row mt-3">
        <div className="col-6">
          <IntensityBasicBarChart intensity={data} />
        </div>
        <div className="col-6">
          <IntensityPestleChart pestle={data} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-6">
          <IntensitySectorBarChart sector={data} />
        </div>
        <div className="col-6">
          <IntensityYearLineChart year={data} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12">
          <IntensityRegionChart region={data} />
        </div>
      </div>
    </div>
  );
}

export default IntensityDashboard;
