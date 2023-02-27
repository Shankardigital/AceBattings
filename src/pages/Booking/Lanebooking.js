import React, { useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import img1 from "../../assets/images/letast/acelogo.png"

const ResponsiveTables = () => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);
    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Lane Booking" breadcrumbItem="Lane Booking" />
                    <Row>

                     
                        {/* <Col md={4}>
                            <Card className="p-4">
                                <Form>
                                    <h5>Add New</h5>
                                    <div>
                                        <div className="mt-3">
                                            <Label> Name</Label>  <span className="text-danger">*</span>
                                            <Input required type="text" placeholder="Enter Name" />
                                        </div>
                                        <div className="mt-3">
                                            <Label>Lane Number</Label>  <span className="text-danger">*</span>
                                            <Input required type="text" placeholder="Enter Last Name" />
                                        </div>

                                    </div>
                                    <div className="text-end mt-3">
                                        <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                                        <Button type="button"  color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                                    </div>
                                </Form>
                            </Card>
                        </Col> */}
                        <Col md={12}>

                        {show == true ? (
                            <Card className="p-4">
                                <Form>
                                    <Row>
                                        <Col md={3}>
                                            <Label >Date</Label>
                                            <Input type="date" />
                                        </Col>
                                        <Col md={3}>
                                            <div className="text-end mt-4">
                                                <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                                                <Button type="button" onClick={() => { setshow(!show) }} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                                            </div>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>
                        ) : ("")}

                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Button onClick={() => { setshow(!show) }} color="primary" >Date <i className="fa fa-calendar" aria-hidden="true"></i></Button>
                                        </Col>
                                        {/* <Col>
                                            <div style={{ float: "right" }}>
                                                <Input type="search" placeholder="Search..." />
                                            </div>
                                        </Col> */}
                                    </Row>
                                    {/* <CardTitle>Example </CardTitle>
                  <CardSubtitle className="mb-3">
                    This is an experimental awesome solution for responsive
                    tables with complex data.
                  </CardSubtitle> */}

                                    <div className="table-rep-plugin mt-4">
                                        <Table bordered responsive>
                                            <thead>
                                                <tr className="text-center">
                                                    <th style={{width:"120px"}}>
                                                        Lane
                                                    </th>
                                                    <th>
                                                        01
                                                    </th>
                                                    <th>
                                                        02
                                                    </th>
                                                    <th>
                                                        03
                                                    </th>
                                                    <th>
                                                        04
                                                    </th>
                                                    <th>
                                                        05
                                                    </th>
                                                    <th>
                                                        06
                                                    </th>
                                                    <th>
                                                        07
                                                    </th>
                                                    <th>
                                                        08
                                                    </th>
                                                    <th>
                                                        09
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="text-center">
                                                    <td  className="" >8 - 9 Am</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td  className="" > 9 - 10 Am</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td  className="" > 10 - 11 Am</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" > 11 - 12 Am</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" >12 - 1 pm</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" >1 - 2 pm</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" >2 - 3 pm</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" >3 - 4 pm</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" >4 - 5 pm</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" >5 - 6 pm</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" >6 - 7 pm</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" >7 - 8 pm</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" >8 - 9 pm</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                </tr>
                                                <tr className="text-center">
                                                    <td className="" >9 - 10 pm</td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
                                                    <td className="tabpad"><input className="tableinput form-check-input"  type="checkbox"/></td>
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
                <ModalHeader toggle={toggle}>Edit Lane Booking</ModalHeader>
                <ModalBody>
                    <Form>
                        <div>
                            <div>
                                <Label> Name</Label> <span className="text-danger">*</span>
                                <Input required type="text" placeholder="Enter Name" />
                            </div>
                            <div >
                                <Label>Lane Number</Label>  <span className="text-danger">*</span>
                                <Input required type="text" placeholder="Enter Number" />
                            </div>

                        </div>
                        <div className="text-end">
                            <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={toggle} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </Form>
                </ModalBody>

            </Modal>
        </React.Fragment>
    );
};

export default ResponsiveTables;
