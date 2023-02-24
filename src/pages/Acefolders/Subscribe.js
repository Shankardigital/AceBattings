import React, { useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img1 from "../../assets/images/letast/acelogo.png";
import Invoice from "../../assets/images/letast/Invoice-0000004.pdf";
import trash from "../../assets/images/letast/trash.gif";
import { saveAs } from 'file-saver'

const ResponsiveTables = () => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);

    const downloadImage = () => {
        saveAs(Invoice) // Put your image url here.
    }
    // onClick={downloadImage}
    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Subscribes" breadcrumbItem="Subscribes" />
                    <Row>
                        <Col>
                            {/* {show == true ? (
                                <Card className="p-4">
                                    <Form>
                                        <h5>Add New Plan</h5>
                                        <Row>
                                            <Col md="3">
                                                <Label>First Name</Label>  <span className="text-danger">*</span>
                                                <Input required type="text" placeholder="Enter First Name" />
                                            </Col>
                                            <Col md="3">
                                                <Label>Last Name</Label>  <span className="text-danger">*</span>
                                                <Input required type="text" placeholder="Enter Last Name" />
                                            </Col>
                                            <Col md="3">
                                                <Label>Email Id</Label> <span className="text-danger">*</span>
                                                <Input required type="text" placeholder="Enter Email" />
                                            </Col>
                                            <Col md="3">
                                                <Label>Mobile No</Label> <span className="text-danger">*</span>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <select required className="form-select">
                                                            <option value="+1">+1 </option>
                                                            <option value="+1">+91 </option>
                                                            <option value="+1">+44 </option>
                                                        </select>
                                                    </div>
                                                    <Input required type="text" className="form-control" placeholder="Enter Mobile No" aria-label="Username" aria-describedby="basic-addon1" />
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="text-end">
                                            <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                                            <Button type="button" onClick={() => { setshow(!show) }} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                                        </div>
                                    </Form>
                                </Card>
                            ) : (
                                ""
                            )} */}
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Link to="/sellaplan">
                                                <Button color="primary" >Sell a Pricing Plan <i className="bx bx-plus-circle"></i></Button>
                                            </Link>
                                        </Col>
                                        <Col>
                                            <div style={{ float: "right" }}>
                                                <Input type="search" placeholder="Search..." />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="table-rep-plugin mt-4">
                                        <Table hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Sl No
                                                    </th>
                                                    <th>
                                                        Customer Names
                                                    </th>
                                                    <th>
                                                    Subscription details
                                                    </th>
                                                    <th>
                                                    Subscription start date
                                                    </th>
                                                    <th>
                                                    Subscription end date
                                                    </th>
                                                    <th>
                                                    Last payment status
                                                    </th>
                                                    <th>
                                                    Subscription status
                                                    </th>
                                                    <th>
                                                        Invoice
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">
                                                        1
                                                    </th>
                                                    <td>
                                                    Subscription status
                                                    </td>
                                                    <td>
                                                    Line Rental 
                                                    </td>
                                                    <td>
                                                    Feb 12, 2023
                                                    </td>
                                                    <td>
                                                    Until canceled
                                                    </td>
                                                    <td>
                                                        <Button size="sm" outline color="success">Paid</Button>
                                                    </td>
                                                    <td>
                                                        <span  className="text-success">Acive</span>
                                                    </td>
                                                    <td>
                                                        {/* <Link to="/editplan"> <Button size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button></Link> */}
                                                       {/* <a href={Invoice}> */}
                                                       <Button  onClick={downloadImage} size="sm" className="m-1" outline color="primary"><i style={{ fontSize: " 14px" }} className="bx bx-cloud-download"></i></Button>
                                                        {/* </a>  */}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                      2
                                                    </th>
                                                    <td>
                                                    Subscription status
                                                    </td>
                                                    <td>
                                                    Line Rental 
                                                    </td>
                                                    <td>
                                                    Feb 12, 2023
                                                    </td>
                                                    <td>
                                                    Until canceled
                                                    </td>
                                                    <td>
                                                        <Button size="sm" outline color="success">Paid</Button>
                                                    </td>
                                                    <td>
                                                        <span  className="text-success">Acive</span>
                                                    </td>
                                                    <td>
                                                        {/* <Link to="/editplan"> <Button size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button></Link> */}
                                                       {/* <a href={Invoice}> */}
                                                       <Button onClick={downloadImage} size="sm" className="m-1" outline color="primary"><i style={{ fontSize: " 14px" }} className="bx bx-cloud-download"></i></Button>
                                                        {/* </a>  */}
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        3
                                                    </th>
                                                    <td>
                                                    Subscription status
                                                    </td>
                                                    <td>
                                                    Line Rental 
                                                    </td>
                                                    <td>
                                                    Feb 12, 2023
                                                    </td>
                                                    <td>
                                                    Until canceled
                                                    </td>
                                                    <td>
                                                        <Button size="sm" outline color="success">Paid</Button>
                                                    </td>
                                                    <td>
                                                        <span className="text-success" >Acive</span>
                                                    </td>
                                                    <td>
                                                        {/* <Link to="/editplan"> <Button size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button></Link> */}
                                                       {/* <a href={Invoice}> */}
                                                       <Button onClick={downloadImage} size="sm" className="m-1" outline color="primary"><i style={{ fontSize: " 14px" }} className="bx bx-cloud-download"></i></Button>
                                                        {/* </a>  */}
                                                    </td>
                                                </tr>
                                               
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
            <Modal isOpen={show1} toggle={toggle}>
                <ModalHeader toggle={toggle}></ModalHeader>
                <ModalBody>
                <div>
                        <div className="text-center">
                        <img style={{width:"350px"}} src={trash}/>
                        </div>
                        <h5 className="text-center">Do you want delete</h5>
                        <div className="text-end mt-2">
                            <Button type="submit" color="danger m-1" outline>Yes <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={toggle} color="secondary m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </div>
                 
                </ModalBody>

            </Modal>
        </React.Fragment>
    );
};

export default ResponsiveTables;
