import React from "react";
import { Line } from "react-chartjs-2";
import "./LineChartComponent.scss";

let data = {
  labels: [],
  datasets: [
    {
      label: "",
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 5,
      pointHoverRadius: 7,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

export default function LineChartComponent(props) {
  data.datasets[0].label = props.label;
  console.log("props", props.data);
  data.labels = [];
  data.datasets[0].data = [];
  props.data.map((prop) => {
    data.labels.push(prop.objectID);
    data.datasets[0].data.push(prop.points);
    return prop;
  });

  return (
    <div className="canvas-container">
      <Line data={data} options={options} />
    </div>
  );
}
