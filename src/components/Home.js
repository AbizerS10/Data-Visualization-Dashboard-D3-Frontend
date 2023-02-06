import React, { useEffect, useState } from "react";

function Home({ data }) {
  console.log(data);
  const [dat, setDat] = useState([]);

  useEffect(() => {
    setDat(data.slice(0, 5));
  }, [data]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-5">First 5 rows of data</h1>
      <div className="row">
        <div className="col-12 table-responsive">
          {data.length ? (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  {dat.length &&
                    Object.keys(dat[0]).map((key) => {
                      if (key !== "_id") return <th scope="col">{key}</th>;
                    })}
                </tr>
              </thead>
              <tbody>
                {dat.map((obj, i) => {
                  return (
                    <tr>
                      <th scope="row">{i + 1}</th>
                      <td>{obj.end_year}</td>
                      <td>{obj.intensity}</td>
                      <td>{obj.sector}</td>
                      <td>{obj.topic}</td>
                      <td>{obj.insight}</td>
                      <td>{obj.url}</td>
                      <td>{obj.region}</td>
                      <td>{obj.start_year}</td>
                      <td>{obj.impact}</td>
                      <td>{obj.added}</td>
                      <td>{obj.published}</td>
                      <td>{obj.country}</td>
                      <td>{obj.relevance}</td>
                      <td>{obj.pestle}</td>
                      <td>{obj.source}</td>
                      <td>{obj.title}</td>
                      <td>{obj.likelihood}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <p className="text-center fs-1">Loading....</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
