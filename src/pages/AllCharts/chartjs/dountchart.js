import React from "react"
import { Doughnut } from "react-chartjs-2"

const DountChart = () => {
  const data = {
    labels: ["Desktops", "Tablets"],
    datasets: [
      {
        data: [300, 210],
        backgroundColor: ["#e9c686", "#ebeff2"],
        hoverBackgroundColor: ["#e9c686", "#ebeff2"],
        hoverBorderColor: "#fff",
      },
    ],
  }

  return <Doughnut width={474} height={260} data={data} />
}

export default DountChart
