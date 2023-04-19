import React from "react";
import { Row, Col, Card, CardBody } from "reactstrap";
import ReactApexChart from "react-apexcharts";

const SalesAnalytics = props => {
  const series = [56, 38, 26, 20, 15, 13, 50];
  const options = {
    labels: ["Pay as You Go", "Team Subcription", "Membership", "Rental Line", "Rental Equipment", "Classes", "Clinics" ],
    colors: ["#e9c686", "#34c38f", "#f46a6a", "#f1f3f4", "#b9e2f7", "#f7e0db", "#785f50"],
    legend: { show: !1 },
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
        },
      },
    },
  };

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
                    <b>$ 2,132</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-success me-1" /> Team Subcription
       
                    </p>
                    <b>$ 1,763</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Membership
                 
                    </p>
                    <b>$ 973</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Rental Line
                  
                    </p>
                    <b>$ 973</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Rental Equipment
                  
                    </p>
                    <b>$ 973</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Classes
                
                    </p>
                    <b>$ 973</b>
                  </div>
                </Col>
                <Col  >
                  <div className="mt-4">
                    <p className="mb-2 text-truncate">
                      <i className="mdi mdi-circle text-danger me-1" /> Clinics
             
                    </p>
                    <b>$ 973</b>
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
