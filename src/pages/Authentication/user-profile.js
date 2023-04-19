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
import avatar1 from "../../assets/images/letast/background.jpg";
// actions
import { editProfile, resetProfileFlag } from "../../store/actions";
import { Link } from "react-router-dom";
// import { URL } from "../../Apiurl";
import axios from "axios";
import { URL } from "../../Apiurls";
import toast, { Toaster } from 'react-hot-toast';


const UserProfile = () => {

  //meta title
  // document.title = "Profile | Logic Cars";
  const [form, setform] = useState([])
  const [form1, setform1] = useState([])
  const [codes, setcodes] = useState([])
  const [Files, setFiles] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [passwordType1, setPasswordType1] = useState("password");
  const [passwordType12, setPasswordType12] = useState("password");

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

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }
  const togglePassword1 = () => {
    if (passwordType1 === "password") {
      setPasswordType1("text")
      return;
    }
    setPasswordType1("password")
  }
  const togglePassword12 = () => {
    if (passwordType12 === "password") {
      setPasswordType12("text")
      return;
    }
    setPasswordType12("password")
  }

  var gets = localStorage.getItem("authUser");
  var data = JSON.parse(gets);
  var datas = data.token;
  console.log(datas)

  const getadmindata = () => {
    var token = datas;
    axios.post(URL.admindata, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      console.log(res.data)
      setform1(res.data.profileResult)
    })
  }

  const getCountrycodes = () => {
    var token = datas;
    axios.post(URL.getallCountrycodes, {}, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      console.log(res.data)
      setcodes(res.data.countrycodes)
    })
  }

  const changePSW = () => {
    var token = datas;
    const userdata = {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
      confirmPassword: form.confirmPassword,
    }
    axios.post(URL.changePSW, userdata, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        console.log(res.data)
        setform("")
        cleardata()
      }
    },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      }
    )
  }

  const formsubmit = (e) => {
    e.preventDefault()
    changePSW()
    cleardata()
  }

  const cleardata = () => {
    setform({
      oldPassword : "",
      newPassword : "",
      confirmPassword : "",
    })
  }

  const editUsers = () => {
    var token = datas;
    const userdata = {
      firstName: form1.firstName,
      lastName: form1.lastName,
      email: form1.email,
      phone: form1.phone,
      countryCode: form1.countryCode,
      address: form1.address,
    }
    axios.put(URL.editadmindata, userdata, {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        console.log(res.data);
        getadmindata()
      }
    },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      }
    )
  }

  const formeditsubmit = (e) => {
    e.preventDefault()
    editUsers()
  }

  const profileimg = () => {
    const token = datas
    const dataArray = new FormData()
    for (let i = 0; i < Files.length; i++) {
      dataArray.append("avatar", Files[i])
    }
    axios.put(URL.editadminimg, dataArray,
      {
        headers: { Authorization: `Bearer ${token}` }
      }, {}
    ).then((res) => {
      if (res.status === 200) {
        toast.success(res.data.message);
        console.log(res.data);
        getadmindata()
      }
    },
      (error) => {
        if (error.response && error.response.status === 400) {
          toast.error(error.response.data.message);
        }
      }
      )

  }


  const changeHandler = (e) => {
    const file = e.target.files
    console.log(file)
    const ext = file[0].name.split(".").pop()
    const type = ext
    console.log(type)
    if (
      type === "jpg" ||
      type === "jpeg" ||
      type === "png" 
    ) {
      setFiles(e.target.files)
      console.log(e.target.files)
      console.log("e.target.files")
    } else {
      e.target.value = null
      toast.error("file format not supported. Pls choose jpg/jpeg/png")
    }
    // setFiles(e.target.files)
    profileimg()
  }

  useEffect(() => {
    getadmindata()
    getCountrycodes()
  }, [])



  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumb href="/dashboard" title="Ace Batting" breadcrumbItem="Profile" />

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

                        <img style={{ height: "170px", width: "100%" }} src={avatar1} alt="" className="img-fluid" />
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
                                height="30"
                              />
                            </span>

                          </div>
                        </Link>
                      </Col>
                      <Col md={4}>
                        <div className="mt-3">
                          <div className="row">
                            <div className="col col-sm-2">
                              <label>Name</label><br />
                              <label>Email </label>
                            </div>
                            <div className="col col-sm-10">
                              <label>:{form1.fullName}</label><br />
                              <label>:{form1.email}</label><br />
                            </div>
                          </div>
                          <Button tag={Label} className='mb-75 me-75 mt-3' size='sm' color='primary'>
                            Upload   <i className="fas fa-cloud-upload-alt"></i>
                            <Input name="avatar" type='file'
                             onChange={changeHandler}
                              hidden accept='image/*' />
                          </Button>
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
                                    <p><b>:</b><span> {form1.fullName}</span></p>
                                    <p><b>:</b><span> {form1.email}</span></p>
                                    <p><b>:</b><span> {form1.countryCode} {form1.phone}</span></p>
                                    <p><b>:</b><span>  {form1.role}</span></p>
                                    <p><b>:</b><span> {form1.address}</span></p>
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
                      <form onSubmit={(e) => { formeditsubmit(e) }} >

                        <h5>Edit Profile</h5>
                        <Row>
                          <Col md="3">
                            <Label>First Name</Label>  <span className="text-danger">*</span>
                            <Input value={form1.firstName} name="firstName" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter First Name" />
                          </Col>
                          <Col md="3">
                            <Label>Last Name</Label>  <span className="text-danger">*</span>
                            <Input value={form1.lastName} name="lastName" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Last Name" />
                          </Col>
                          <Col md="3">
                            <Label>Email Id</Label> <span className="text-danger">*</span>
                            <Input value={form1.email} name="email" onChange={(e) => { handleChange1(e) }} required type="email" placeholder="Enter Email" />
                          </Col>
                          <Col md="3">
                            <Label>Mobile No</Label> <span className="text-danger">*</span>
                            <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                <select value={form1.countryCode} style={{ width: "70px" }} name="countryCode" onChange={(e) => { handleChange1(e) }} required className="form-select">
                                  {codes.map((data, key) =>
                                  (
                                    <option key={key} value={data.countryCode}>{data.countryCode}</option>
                                  )
                                  )}
                                </select>
                              </div>
                              <Input value={form1.phone} name="phone" onChange={(e) => { handleChange1(e) }} required type="number" className="form-control" placeholder="Enter Mobile No" aria-label="Username" aria-describedby="basic-addon1" />
                            </div>
                          </Col>

                        </Row>
                        <Row className="mt-3
                         mb-3">
                          <Col md={12}>
                            <Label htmlFor="validationCustom01">Address </Label>
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
                        onSubmit={(e) => { formsubmit(e) }}
                      >
                        <Row>
                          <Col sm="12">
                            <CardText className="mb-0">
                              <h5>Change Password</h5>
                              <Row className="mt-3">
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="validationCustom01">Current Password <span className="text-danger">*</span></Label>
                                    {/* <Input
                                      name="old_password"
                                      placeholder="Current Password"
                                      type="password"
                                      className="form-control"
                                      id="validationCustom01"
                                      value={form.old_password}
                                      onChange={(e) => {
                                        handleChange(e);
                                    }}
                                    
                                    /> */}
                                    <div className="input-group">
                                      <input
                                        onChange={(e) => {
                                          handleChange(e);
                                        }}
                                        value={form.oldPassword}
                                        type={passwordType} name="oldPassword" className="form-control" placeholder="Password" />
                                      <div className="input-group-btn">
                                        <button type="button" className="btn btn-outline-primary" onClick={() => { togglePassword() }}>
                                          {passwordType === "password" ? <i className="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}
                                        </button>
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="validationCustom02">New Password <span className="text-danger">*</span></Label>
                                    {/* <Input
                                      name="new_password"
                                      placeholder="New Password"
                                      type="password"
                                      className="form-control"
                                      id="validationCustom02"
                                      value={form.new_password}
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}
                                    /> */}
                                    <div className="input-group">
                                      <input
                                        onChange={(e) => {
                                          handleChange(e);
                                        }}
                                        value={form.newPassword}
                                        type={passwordType1} name="newPassword" className="form-control" placeholder="Password" />
                                      <div className="input-group-btn">
                                        <button type="button" className="btn btn-outline-primary" onClick={() => { togglePassword1() }}>
                                          {passwordType1 === "password" ? <i className="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}
                                        </button>
                                      </div>
                                    </div>

                                  </FormGroup>
                                </Col>
                                <Col md="4">
                                  <FormGroup className="mb-3">
                                    <Label htmlFor="validationCustom02">Confirm Password <span className="text-danger">*</span></Label>
                                    {/* <Input
                                      name="confirm_password"
                                      placeholder="Confirm Password"
                                      type="password"
                                      className="form-control"
                                      id="validationCustom02"
                                      value={form.confirm_password}
                                      onChange={(e) => {
                                        handleChange(e);
                                      }}

                                    /> */}
                                    <div className="input-group">
                                      <input type={passwordType12}
                                        onChange={(e) => {
                                          handleChange(e);
                                        }}
                                        value={form.confirmPassword}
                                        name="confirmPassword" className="form-control" placeholder="Password" />
                                      <div className="input-group-btn">
                                        <button type="button" className="btn btn-outline-primary" onClick={() => { togglePassword12() }}>
                                          {passwordType12 === "password" ? <i className="fa fa-eye-slash" aria-hidden="true" /> : <i className="fa fa-eye" aria-hidden="true" />}
                                        </button>
                                      </div>
                                    </div>
                                  </FormGroup>
                                </Col>
                              </Row>

                            </CardText>
                          </Col>
                        </Row>
                        <div style={{ float: "right" }}>
                          <Button color="primary" type="submit">
                            Submit <i className="fa fa-check-circle" aria-hidden="true"></i>
                          </Button>
                        </div>
                      </form>
                    </TabPane>

                    {/* <TabPane tabId="8">
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
                    </TabPane> */}
                  </TabContent>

                </div>
              </Card>
            </Col>
          </Row>
          <Toaster />
        </Container>
        {/* <ToastContainer/> */}
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
