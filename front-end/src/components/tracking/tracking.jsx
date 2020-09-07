import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { connect } from 'react-redux';
import { currentUser } from '../../redux/actions';
import { fetchWithToken } from '../../api'

import Navbar from '../nav-bar/Navbar.jsx';

import './tracking.css';

function Tracking(props) {
  let [weight, setWeight] = useState();

  function createChartOptions() {
    return  {
      xAxis: {
        type: 'datetime',
      },
      yAxis: {
        title: { text: 'Weight [kg]' }
      },
      series: [
        { data: weight, name: 'weight' }
      ],
      title: { text: "Weight Tracking" },
    }
  }

  const [chartOptions, setChartOptions] = useState(createChartOptions());

  useEffect(() => {
    // getti ng weight and dates info from database
    fetchWithToken('/api/weight/' + props.currentUser.email, props.currentUser.fitToken, {
      method: 'get',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(response => {
        setWeight(weight = response.map(x => [Date.parse(x.date), x.weight]));
        setChartOptions(createChartOptions())
      })
  }, []);

  return (
    <div className="meal-container">
      <Navbar transparent className="meal-nav" />
      <div
        className="absolute top-0 w-full h-full bg-gray-900 "
        style={{
          backgroundImage:
            "url(graph.jpg)",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat"
        }}
      ></div>
      {weight && (
     <div className=" container mx-auto px-4 h-full container-recipe" >
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full px-4">
            <div className=" relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
              <div className="container-form-recipe rounded-t mb-0 px-6 py-6 ">
                  <div>
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={chartOptions}
                    />
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>)}
    </div>
  )
}
const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(Tracking);