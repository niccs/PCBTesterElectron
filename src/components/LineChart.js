import React, {
  Component
} from 'react';
import {
  connect
} from 'react-redux';
import {
  Line
} from 'react-chartjs-2';

class LineChart extends Component {

  state = {
    LineChartData: {
      labels: [],
      datasets: [{
        type:"line",
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: ["1"],
      }]
    },
    chartOptions : {
      maintainAspectRatio: false,
     
    },
    scales: {
      xAxes: [
        {
          ticks: {
            autoSkip: true,
            maxTicksLimit: 10
          }
        }
      ]
    }
  }
  componentWillReceiveProps() {
    let value =[...this.props.serialData].pop() || "0";
    
    //console.log("valueee",value);
    let newDataSet = this.state.LineChartData.datasets[0];
    //newDataSet.data.push(value);
    const oldData = this.state.LineChartData.datasets[0].data;
      const newData = [ ...oldData] ;
      newData.push(value);

    // console.log("newwww",newDataSet.data)
    this.state.LineChartData.labels.push(new Date().toLocaleTimeString());
    // newDataSet.data = this.props.serialData;
    newDataSet.data = newData;
    // console.log("then",newDataSet)
    const newChartData = {
      datasets: [newDataSet],
      labels:[...this.state.LineChartData.labels]
      // labels: [this.state.LineChartData.labels.push(
      //   new Date().toLocaleTimeString()
      // )]

    };
    //console.log("lets see",this.state.lineChartData);
    

    if (this.state.LineChartData.datasets[0].data.length > 50) {
      this.state.LineChartData.datasets[0].data.shift();
      
      this.state.LineChartData.labels.shift();
    }
    this.setState({ lineChartData:newChartData});
    
    //myLineChart.update();

  }
  render() {
    // const newDataSet = { ...this.state.LineChartData.datasets[0]
    // };
    // const newLabels = [...this.state.LineChartData.labels];
    // newDataSet.data = this.props.serialData;
    // newLabels.push(
    //   new Date().toLocaleTimeString()
    // );
    // const newChartData = {
    //   ...this.state.LineChartData,
    //   datasets: [newDataSet],
    //   labels: newLabels

    // };
    // this.setState({ lineChartData: newChartData });
    // console.log("nixx", newChartData);
    return (

      <div >
        
      < Line data = {
        this.state.LineChartData
      } 
      options = {
        this.state.chartOptions
      }
      height = {
        300
      }
      width = {
        200
      }
      /> </div>
    );
  }
}

function mapStateToProps(state) {

  const serialData = (state.serialData);
  // console.log("nixx", serialData);
  return { serialData };
}

export default connect(mapStateToProps,null)(LineChart);
