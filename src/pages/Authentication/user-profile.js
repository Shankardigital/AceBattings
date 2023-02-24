import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  CardFooter,
  Form,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  CardText,
  CardTitle,
  FormGroup,
} from "reactstrap";
import classnames from "classnames";
// import { ToastContainer, toast } from 'react-toastify';

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
// import pback from "../../assets/images/latest/pback.jpg";

//redux
import { useSelector, useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

//Import Breadcrumb
import Breadcrumb from "../../components/Common/Breadcrumb";

import avatar from "../../assets/images/users/avatar-1.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { Link } from "react-router-dom";
// import { URL } from "../../Apiurl";
import axios from "axios";


const UserProfile = () => {

  //meta title
  // document.title = "Profile | Logic Cars";
  const [form, setform] = useState([])
  const [form1, setform1] = useState([])
  const [Files1, setFiles1] = useState("");


  const changeHandler1 = (e) => {
    setFiles1(e.target.files);
};

  const handleChange1 = (e) => {
    let myUser = { ...form1 };
    myUser[e.target.name] = e.target.value;
    setform1(myUser);
};
  const handleChange = (e) => {
    let myUser = { ...form };
    myUser[e.target.name] = e.target.value;
    setform(myUser);
};

const [activeTab1, setactiveTab1] = useState("5");
const toggle1 = tab => {
  if (activeTab1 !== tab) {
    setactiveTab1(tab);
  }
};

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb title="Ace Batting" breadcrumbItem="Profile" />

          <Row>
            <Col lg="12">
              {/* {error && error ? <Alert color="danger">{error}</Alert> : null}
              {success ? <Alert color="success">{success}</Alert> : null} */}

              <Card>
                <CardBody>
                  {/* <CardBody style={{ backgroundImage: `url(${pback})` }}> */}
                  <div className="">
                    <Row>
                      <Col md={12}>
                        <div className="text-primary">
                          <h5 className="text-primary"></h5>
                          <p></p>
                        </div>

                        {/* <img style={{ height: "150px", width: "100%" }} src={avatar} alt="" className="img-fluid" /> */}
                      </Col>
                    </Row>
                  </div>
                  <div>
                    <Row>
                      <Col md={2}>
                        <Link to="#" className="auth-logo-light">
                          <div className="avatar-md1 profile-user-wid mb-4">
                            <span className="ml-5">
                              <img
                                src={avatar}
                                alt=""
                                className="avatar-md1 rounded-circle img-thumbnail"
                                height="34"
                              />
                            </span>

                          </div>
                        </Link>
                      </Col>
                      <Col md={4}>
                        <div className="mt-3">
                          <div className="row">
                            <div className="col col-sm-3">
                              <label>Name</label><br />
                              <label>Email </label>
                            </div>
                            <div className="col">
                              <label>:  Senkar</label><br />
                              <label>:  senakr@gmail.com</label><br />
                            </div>
                          </div>
                          <p></p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mt-3">
                          <Nav pills className="navtab-bg nav-justified">
                            <NavItem >
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: activeTab1 === "5",
                                })}
                                onClick={() => {
                                  toggle1("5");
                                }}
                              >
                                My Profile
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: activeTab1 === "6",
                                })}
                                onClick={() => {
                                  toggle1("6");
                                }}
                              >
                                Edit Profile
                              </NavLink>
                            </NavItem>
                            <NavItem>
                              <NavLink
                                style={{ cursor: "pointer" }}
                                className={classnames({
                                  active: activeTab1 === "7",
                                })}
                                onClick={() => {
                                  toggle1("7");
                                }}
                              >
                                Change Password
                              </NavLink>
                            </NavItem>

                          </Nav>
                        </div>
                      </Col>
                    </Row>

                  </div>

                </CardBody>

                <div className="mb-5">
                  {/* <CardTitle className="h4">Justify Tabs</CardTitle>
                  <p className="card-title-desc">
                    Use the tab JavaScript plugin—include it individually or
                    through the compiled{" "}
                    <code className="highlighter-rouge">bootstrap.js</code>{" "}
                    file—to extend our navigational tabs and pills to create
                    tabbable panes of local content, even via dropdown menus.
                  </p> */}



                  <TabContent activeTab={activeTab1} className="p-3 text-muted">
                    <TabPane tabId="5">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            <h5> About</h5>
                            <p><b>Welcome</b></p>
                            A personal profile is something that gives whoever wants to
                            hire you or needs your services the first impression<br /> that you are
                            the best candidate for this website.These sites take things to the next level.

                            <Row className="mt-4">
                              <Col md={8}>
                                <Row >
                                  <Col md={4}>
                                    <p><b>Full Name</b></p>
                                    <p><b>Email</b></p>
                                    <p><b>Phone</b></p>
                                    <p><b>Role</b></p>
                                    <p><b>Address</b></p>
                                  </Col>
                                  <Col md={8}>
                                    <p><b>:</b><span> Senkar</span></p>
                                    <p><b>:</b><span> senkar@gmail.com</span></p>
                                    <p><b>:</b><span>  698265855</span></p>
                                    <p><b>:</b><span>  Admin</span></p>
                                    <p><b>:</b><span> Kphb colony</span></p>
                                  </Col>
                                </Row>
                                {/* <p>First name: freedomadmin</p>
                              <p>Last name: freedomadmin</p>
                              <p>Email: freedomadmin@gmail.com</p>
                              <p>Phone: 986546544</p>
                              <p>Address: </p> */}
                              </Col>
                              <Col md={6}></Col>
                            </Row>
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                    <TabPane tabId="6">
                      <form onSubmit={(e) => { handleSubmit1(e) }} >

                        <h5>Edit Profile</h5>
                        <Row>
                          <Col md={3}>
                            <Label htmlFor="validationCustom01">Name <span className="text-danger">*</span></Label>
                            <Input
                              name="name"
                              placeholder="Enter Name"
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              required
                              value={form1.name}
                              onChange={(e) => {
                                handleChange1(e);
                            }}
                            />
                          </Col>
                          <Col md={3}>
                            <Label htmlFor="validationCustom01">Email <span className="text-danger">*</span></Label>
                            <Input
                              name="email"
                              placeholder="Enter Email"
                              type="email"
                              className="form-control"
                              id="validationCustom01"
                              value={form1.email}
                              onChange={(e) => {
                                handleChange1(e);
                            }}
                              required
                            />
                          </Col>
                          <Col md={3}>
                            <Label htmlFor="validationCustom01">Phone No. <span className="text-danger">*</span></Label>
                            <Input
                              name="phone"
                              placeholder="Enter Number"
                              type="number"
                              className="form-control"
                              id="validationCustom01"
                              value={form1.phone}
                              onChange={(e) => {
                                handleChange1(e);
                            }}
                            />
                          </Col>
                          <Col md={3}>
                            <Label htmlFor="validationCustom01">Profile <span className="text-danger">*</span></Label>
                            <Input
                              name="profilePic"
                              type="file"
                              className="form-control"
                              id="validationCustom01"
                              // value={form1.profilePic}
                              onChange={changeHandler1}
                            />
                          </Col>
                        
                        </Row>
                        <Row className="mt-3
                         mb-3">
                          <Col md={12}>
                          <Label htmlFor="validationCustom01">Address <span className="text-danger">*</span></Label>
                            <textarea
                              name="address"
                              placeholder="Enter Address"
                              type="text"
                              className="form-control"
                              id="validationCustom01"
                              value={form1.address}
                              onChange={(e) => {
                                handleChange1(e);
                            }}
                            />
                          </Col>
                        </Row>



                        <div style={{ float: "right" }}>
                          <Button color="primary" type="submit">
                            Submit
                          </Button>
                        </div>
                      </form>
                    </TabPane>
                    <TabPane tabId="7">
                      <form 
                      // onSubmit={(e) => { handleSubmit(e) }}
                       >
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              <h5>Change Password</h5>

                              <Row className="mt-3">
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="validationCustom01">Current Password <span className="text-danger">*</span></Label>
                                    <Input
                                      name="old_password"
                                      placeholder="Current Password"
                                      type="password"
                                      className="form-control"
                                      id="validationCustom01"
                                      value={form.old_password}
                                      onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="validationCustom02">New Password <span className="text-danger">*</span></Label>
                                    <Input
                                      name="new_password"
                                      placeholder="New Password"
                                      type="password"
                                      className="form-control"
                                      id="validationCustom02"
                                      value={form.new_password}
                                      onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    />
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="validationCustom02">Confirm Password <span className="text-danger">*</span></Label>
                                    <Input
                                      name="confirm_password"
                                      placeholder="Confirm Password"
                                      type="password"
                                      className="form-control"
                                      id="validationCustom02"
                                      value={form.confirm_password}
                                      onChange={(e) => {
                                        handleChange(e);
                                    }}
                                  
                                    />
                                  </FormGroup>
                                </Col>
                              </Row>
                            </CardText>
                          </Col>
                        </Row>
                        <div style={{ float: "right" }}>
                          <Button color="primary" type="submit">
                            Submit
                          </Button>

                        </div>
                      </form>
                    </TabPane>

                    <TabPane tabId="8">
                      <Row>
                        <Col sm="12">
                          <CardText className="mb-0">
                            Trust fund seitan letterpress, keytar raw denim
                            keffiyeh etsy art party before they sold out master
                            cleanse gluten-free squid scenester freegan cosby
                            sweater. Fanny pack portland seitan DIY, art party
                            locavore wolf cliche high life echo park Austin.
                            Cred vinyl keffiyeh DIY salvia PBR, banh mi before
                            they sold out farm-to-table VHS viral locavore cosby
                            sweater. Lomo wolf viral, mustache readymade
                            thundercats keffiyeh craft beer marfa ethical. Wolf
                            salvia freegan, sartorial keffiyeh echo park vegan.
                          </CardText>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabContent>

                </div>
              </Card>
            </Col>
          </Row>
        </Container>
        {/* <ToastContainer/> */}
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
