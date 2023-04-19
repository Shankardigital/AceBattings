import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardBody,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";

import classNames from "classnames";

//import Charts
import StackedColumnChart from "./StackedColumnChart";

//import action
import { getChartsData as onGetChartsData } from "../../store/actions";

import modalimage1 from "../../assets/images/product/img-7.png";
import modalimage2 from "../../assets/images/product/img-4.png";

// Pages Components
import WelcomeComp from "./WelcomeComp";
import MonthlyEarning from "./MonthlyEarning";
import SocialSource from "./SocialSource";
import ActivityComp from "./ActivityComp";
import TopCities from "./TopCities";
import LatestTranaction from "./LatestTranaction";
import MiniWidget from "../Dashboard-crypto/mini-widget";
import Bookearnings from "./Bookearnings"
import Saleschat from "./Saleschat"
import axios from "axios";
import { URL } from "Apiurls";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";


//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

const Dashboard = props => {
  const [modal, setmodal] = useState(false);
  const [subscribemodal, setSubscribemodal] = useState(false);

  const { chartsData } = useSelector(state => ({
    chartsData: state.Dashboard.chartsData
  }));

  const reports = [
    { title: "Orders", iconClass: "bx-copy-alt", description: "1,235" },
    { title: "Revenue", iconClass: "bx-archive-in", description: "$35, 723" },
    {
      title: "Average Price",
      iconClass: "bx-purchase-tag-alt",
      description: "$16.2",
    },
  ];

  useEffect(() => {
    // setTimeout(() => {
    //   setSubscribemodal(true);
    // }, 2000);
  }, []);

  const [periodData, setPeriodData] = useState([]);
  const [periodType, setPeriodType] = useState("yearly");

  useEffect(() => {
    setPeriodData(chartsData);
  }, [chartsData]);

  const onChangeChartPeriod = pType => {
    setPeriodType(pType);
    dispatch(onGetChartsData(pType));
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(onGetChartsData("yearly"));
  }, [dispatch]);

  //meta title


  var gets = localStorage.getItem("authUser");
  var data = JSON.parse(gets);
  var datas = data.token;
  const permissioins = data.user.permissions[0]
  const roles = data.user.role

  const [user, setuser] = useState([])
  const [bookings, setbookings] = useState([])
  const [bookamount, setbookamount] = useState('')
  console.log(bookamount)
  const [pieChart, setpieChart] = useState({})
  const [graph, setgraph] = useState()
  const [latest10BookingDocuments, setlatest10BookingDocuments] = useState([])

  const dashboarddata = () => {
    const token = datas
    axios.post(URL.getdashboard, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      console.log(res.data)
      setuser(res.data.customerCount)
      setbookings(res.data.bookingCount)
      if (typeof res.data.totalBookingPayment === 'string' && !isNaN(res.data.totalBookingPayment)) {
        const totalBookingPaymentFloat = parseFloat(res.data.totalBookingPayment);
        setbookamount(totalBookingPaymentFloat.toFixed(2));
      }
      // setbookamount(res.data.parseInt(totalBookingPayment.toFixed(2)))
      setpieChart(res.data.pieChart)
      setgraph(res.data.graph)
      setlatest10BookingDocuments(res.data.latest10BookingDocuments)

    })
  }


  useEffect(() => {
    dashboarddata()
  }, [])


  const series1 = [
    { name: "BTC", data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14] },
  ]
  const options1 = {
    chart: { sparkline: { enabled: !0 } },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#f1b44c"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: !1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [25, 100, 100, 100],
      },
    },
    tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
  }

  //Etherium Chart
  const series2 = [
    { name: "ETH", data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54] },
  ]
  const options2 = {
    chart: { sparkline: { enabled: !0 } },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#34c38f"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: !1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [25, 100, 100, 100],
      },
    },
    tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
  }

  //LiteCoin Chart
  const series3 = [
    { name: "LTC", data: [35, 53, 93, 47, 54, 24, 47, 75, 65, 19, 14] },
  ]
  const options3 = {
    chart: { sparkline: { enabled: !0 } },
    stroke: { curve: "smooth", width: 2 },
    colors: ["#50a5f1"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        inverseColors: !1,
        opacityFrom: 0.45,
        opacityTo: 0.05,
        stops: [25, 100, 100, 100],
      },
    },
    tooltip: { fixed: { enabled: !1 }, x: { show: !1 }, marker: { show: !1 } },
  }

  const reports1 = [
    {
      title: "Users",
      icon: "bx bx-user-circle",
      color: "info",
      value: user,
      // desc: "+ 1.792 ( 0.1 % )",
      series: series3,
      options: options3,
      // arrowUpDown: 'mdi mdi-arrow-up ms-1 text-success'
    },
    {
      title: "Bookings",
      icon: "bx bx-tennis-ball",
      color: "warning",
      value: bookings,
      // desc: "+ 0.0012 ( 0.2 % )",
      series: series1,
      options: options1,
      // arrowUpDown: 'mdi mdi-arrow-up ms-1 text-success'
    },
    {
      title: "Total Payments",
      icon: "bx bx-dollar-circle",
      color: "success",
      value: bookamount,
      // desc: "- 4.102 ( 0.1 % )",
      series: series2,
      options: options2,
      // arrowUpDown: 'mdi mdi-arrow-down ms-1 text-danger'
    },

    // {
    //   title: "Bitcoin",
    //   icon: "mdi mdi-bitcoin",
    //   color: "warning",
    //   value: "$ 57,986.76",
    //   desc: "+ 0.0012 ( 0.2 % )",
    //   series: series1,
    //   options: options1,
    //   arrowUpDown : 'mdi mdi-arrow-up ms-1 text-success'
    // },
  ];

  const [qrcode, setqrcode] = useState([])
  console.log(qrcode)

  const qrcodedata = (data) => {
    setqrcode(data)
    setSubscribemodal(true)
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs
            title={props.t("Dashboards")}
            breadcrumbItem={props.t("Dashboard")}
          />
          {permissioins.dashview === true || roles === "admin" ? (
            <div>
              <Row>
                <MiniWidget reports={reports1} />
              </Row>

              {/* <Row>
            <Col xl="4">
              <SocialSource />
            </Col>
            <Col xl="4">
              <ActivityComp />
            </Col>

            <Col xl="4">
              <TopCities />
            </Col>
          </Row> */}
              <Row>
                {/* earning */}
                <Bookearnings graph={graph} />

                {/* sales anytics */}
                <Saleschat pieChart={pieChart} />
              </Row>
              <Row>
                <Col lg="12">
                  <Card>
                    <CardBody>
                      <h4 className="card-title mb-4">Latest Booking </h4>
                      <div className="table-rep-plugin mt-4">
                        <Table hover bordered responsive>
                          <thead style={{ background: "#eff2f7" }}>
                            <tr>
                              <th>
                                Sl No
                              </th>
                              <th>
                                Booking No
                              </th>
                              <th>
                                Plan Name
                              </th>
                              <th>
                                Customer
                              </th>
                              <th>
                                Date
                              </th>
                              <th>
                                Amount
                              </th>
                              <th>
                                QR Code
                              </th>

                            </tr>
                          </thead>
                          <tbody>
                            {latest10BookingDocuments.map((data, key) => (
                              <tr key={key}>
                                <th scope="row">
                                  {key + 1}
                                </th>

                                <td>
                                  {data.bookingNo}
                                </td>
                                <td>
                                  {data.planName}
                                </td>
                                <td>
                                  {data.customerName}
                                </td>
                                <td>
                                  {data.date == null || data.date == undefined ? (
                                    <span>{data.startDate.slice(0, 9)}</span>
                                  ):(
                                    <span>{data.date}</span>
                                  )}
                                </td>
                                <td>
                                  $ {data.totalAmount}
                                </td>
                                <td>
                                  <button onClick={() => { qrcodedata(data) }} type="button" className="m-1 btn btn-outline-primary btn-sm"><i className="fa fa-qrcode" style={{ fontSize: "14px" }}></i></button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </CardBody>
                  </Card>
                  {/* <LatestTranaction  latest10BookingDocuments={latest10BookingDocuments} /> */}
                </Col>
              </Row>
            </div>
          ) : (
            <Card>
              <h5 className="text-center p-1">You don't have permission to access</h5>
            </Card>
          )}
        </Container>
      </div>

      {/* subscribe ModalHeader */}
      <Modal
        isOpen={subscribemodal}
        role="dialog"
        autoFocus={true}
        centered
        data-toggle="modal"
        size="sm"
        toggle={() => {
          setSubscribemodal(!subscribemodal);
        }}
      >
        <div>
          <ModalHeader
            className="border-bottom-0"
            toggle={() => {
              setSubscribemodal(!subscribemodal);
            }}
          ></ModalHeader>
        </div>
        <div className="modal-body">
          <div className="text-center">
            <img style={{ width: "200px" }} src={`http://103.186.185.77:5027/${qrcode.qrCode}`} />
          </div>
        </div>
      </Modal>

    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
