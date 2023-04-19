import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import ReactApexChart from "react-apexcharts";

//actions
import { getEarningChartsData } from "../../store/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

function Earning(props) {
  const dispatch = useDispatch();

  const { earningChartData } = useSelector(state => ({
    earningChartData: state.DashboardSaas.earningChartData,
  }));
  console.log(props.graph)

  // const options = {
  //   chart: {
  //     toolbar: "false",
  //     dropShadow: {
  //       enabled: !0,
  //       color: "#000",
  //       top: 18,
  //       left: 7,
  //       blur: 8,
  //       opacity: 0.2,
  //     },
  //   },
  //   dataLabels: {
  //     enabled: !1,
  //   },
  //   colors: ["#e9c686"],
  //   stroke: {
  //     curve: "smooth",
  //     width: 3,
  //   },
  // };

  // const series = [
  //   {
  //     name: "Series 1",
  //     data: [10, 18, 10, 85, 2, 10],
  //   },
  // ];

  
  const options = {
    chart: {
      toolbar: { show: false },
      zoom: { enabled: false },
      type: 'line',
      dropShadow: {
        enabled: true,
        top: 18,
        left: 2,
        blur: 5,
        opacity: 0.2
      },
      offsetX: -10
    },
    stroke: {
      curve: 'smooth',
      width: 4
    },
    grid: {
      borderColor: '#ebe9f1',
      padding: {
        top: -20,
        bottom: 5,
        left: 20
      }
    },
    legend: {
      show: false
    },
    colors: ['#e9c686'],
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        inverseColors: false,
        gradientToColors: [props.primary],
        shadeIntensity: 1,
        type: 'horizontal',
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 10000, 10000, 10000]
      }
    },
    markers: {
      size: 0,
      hover: {
        size: 5
      }
    },
    xaxis: {
      labels: {
        offsetY: 5,
        style: {
          colors: '#e9c686',
          fontSize: '0.857rem',
          fontFamily: 'Montserrat'
        }
      },
      axisTicks: {
        show: false
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false
      },
      tickPlacement: 'on'
    },
    yaxis: {
      tickAmount: 8,
      labels: {
        style: {
          colors: '#e9c686',
          fontSize: '0.857rem',
          fontFamily: 'Montserrat'
        },
        formatter(val) {
          // .toFixed(1)
          return val > 999 ? `${(val / 1000)}k` : val
        }
      }
    },
    tooltip: {
      x: { show: false }
    }
  },
    series = [
      {
        name: 'Sales',
        data: props.graph
      }
    ]

  /*
  call api action to receive data
  */
  useEffect(() => {
    dispatch(getEarningChartsData("jan"));
  }, [dispatch]);

  const [seletedMonth, setSeletedMonth] = useState("jan");
  const onChangeMonth = value => {
    setSeletedMonth(value);
    dispatch(getEarningChartsData(value));
  };

  return (
    <React.Fragment>
      <Col xl="6">
        <Card>
          <CardBody>
            <div className="clearfix">
             
              <h4 className="card-title mb-4">Earning</h4>
            </div>

            <Row>
              

              <Col lg="12">
                <div id="line-chart" dir="ltr">
                  <ReactApexChart
                    series={series}
                    options={options}
                    type="line"
                    height={320}
                    className="apex-charts"
                  />
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
}

export default Earning;
