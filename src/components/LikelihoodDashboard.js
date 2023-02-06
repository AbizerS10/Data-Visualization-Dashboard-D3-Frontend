import React from 'react'
import LikelihoodTopicBarChart from '../charts/LikelihoodTopicBarChart'
import LikelihoodCountryBarChart from '../charts/LikelihoodCountryBarChart'

function LikelihoodDashboard({data}) {
  return (
    <div className="container-fluid intensity p-0">
      <div className="row mt-3">
        <div className="col-5">
          {data.length && <LikelihoodTopicBarChart likelihood={data} />}
        </div>
        <div className="col-7">
          {data.length && <LikelihoodCountryBarChart country={data} />}
        </div>
      </div>
    </div>
  )
}

export default LikelihoodDashboard