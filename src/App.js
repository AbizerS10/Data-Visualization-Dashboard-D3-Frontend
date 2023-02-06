import { Route, Routes } from "react-router-dom";
import IntensityDashboard from "./components/IntensityDashboard";
import HeaderBar from "./components/HeaderBar";
import axios from "axios";
import Home from "./components/Home";
import LikelihoodDashboard from "./components/LikelihoodDashboard";
import { useEffect, useState } from "react";

axios.defaults.baseURL = "https://d3dashboard.onrender.com/api";
function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (req, res) => {
      try {
        const data = await axios.get("/all_data");
        setData(data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <HeaderBar>
        <Routes>
          <Route
            exact
            path="/intensity_analysis"
            element={<IntensityDashboard data={data} />}
          />
          <Route
            exact
            path="/likelihood_analysis"
            element={<LikelihoodDashboard data={data} />}
          />
          <Route path="/" element={<Home data={data} />} />
        </Routes>
      </HeaderBar>
    </div>
  );
}

export default App;
