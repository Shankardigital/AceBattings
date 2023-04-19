import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";

const SalesAnalytics = props => {

  const series = [props.pieChart.payAsYouGoPay, props.pieChart.teamSubscriptionPay, props.pieChart.membershipPay, props.pieChart.rentalLinePie, props.pieChart.rentalEquipmentPie, props.pieChart.classesPay, props.pieChart.clinicsPay];
  // const series = [20, 20, 185, 52, 65, 50, 89,];
  const options = {
    labels: ["Pay as You Go", "Team Subscription", "Membership", "Rental Line", "Rental Equipment", "Classes", "Clinics" ],
    colors: ["#e9c686", "#34c38f", "#f46a6a", "#BFCCB5", "#7C96AB", "#D14D72", "#785f50"],
    // legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };
//   const [pieChart, setpieChart]= useState([])
  console.log(props.pieChart.classesPay)

  return (
    <React.Fragment>
      <Col xl="6">
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Booking Analytics</h4>

            <div>
              <div id="donut-chart">
                <ReactApexChart
                  options={options}
                  series={series}
                  type="donut"
                  height={260}
                  className="apex-charts"
                />
              </div>
            </div>

            <div className="text-center text-muted">
              <Row>
                <Col >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-primary me-1" /> Pay as You Go
                    </p>
                    <b>$ {props.pieChart.payAsYouGoPay}</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success me-1" /> Team Subscription
       
                    </p>
                    <b>$ {props.pieChart.teamSubscriptionPay}</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Membership
                 
                    </p>
                    <b>$ {props.pieChart.membershipPay}</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i style={{color:"#BFCCB5"}} className="mdi mdi-circle  me-1" /> Rental Line
                  
                    </p>
                    <b>$ {props.pieChart.rentalLinePie}</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i style={{color:"#7C96AB"}} className="mdi mdi-circle  me-1" /> Rental Equipment
                  
                    </p>
                    <b>$ {props.pieChart.rentalEquipmentPie}</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i style={{color:"#D14D72"}} className="mdi mdi-circle me-1" /> Classes
                
                    </p>
                    <b>$ {props.pieChart.classesPay}</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i style={{color:"#785f50"}} className="mdi mdi-circle me-1" /> Clinics
             
                    </p>
                    <b>$ {props.pieChart.clinicsPay}</b>
                  </div>
                </Col>
              </Row>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default SalesAnalytics;
