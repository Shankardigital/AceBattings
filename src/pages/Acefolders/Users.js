import React, { useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

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
                    <Breadcrumbs title="User Management" breadcrumbItem="User Management" />
                    <Row>
                        <Col>
                            {show == true ? (
                                <Card className="p-4">
                                    <Form>
                                        <h5>Add New User</h5>
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
                            )}
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            <Button onClick={() => { setshow(!show) }} color="primary" >New User <i className="bx bx-user-plus"></i></Button>
                                        </Col>
                                        <Col>
                                            <div style={{ float: "right" }}>
                                                <Input type="search" placeholder="Search..." />
                                            </div>
                                        </Col>
                                    </Row>
                                    {/* <CardTitle>Example </CardTitle>
                  <CardSubtitle className="mb-3">
                    This is an experimental awesome solution for responsive
                    tables with complex data.
                  </CardSubtitle> */}

                                    <div className="table-rep-plugin mt-4">
                                        <Table hover bordered responsive>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Sl No
                                                    </th>
                                                    <th>
                                                        First Name
                                                    </th>
                                                    <th>
                                                        Last Name
                                                    </th>
                                                    <th>
                                                        Email
                                                    </th>
                                                    <th>
                                                        Mobile No
                                                    </th>
                                                    <th>
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th scope="row">
                                                        1
                                                    </th>
                                                    <td>
                                                        Mark
                                                    </td>
                                                    <td>
                                                        Otto
                                                    </td>
                                                    <td>
                                                        Mark@gmail.com
                                                    </td>
                                                    <td>
                                                        +1 9489145560
                                                    </td>
                                                    <td>
                                                        <Button onClick={toggle} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>
                                                        <Button size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        2
                                                    </th>
                                                    <td>
                                                        Jacob
                                                    </td>
                                                    <td>
                                                        Thornton
                                                    </td>
                                                    <td>
                                                        Jacob@gmail.com
                                                    </td>
                                                    <td>
                                                        +1 9489145560
                                                    </td>
                                                    <td>
                                                        <Button onClick={toggle} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>
                                                        <Button size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        3
                                                    </th>
                                                    <td>
                                                        Larry
                                                    </td>
                                                    <td>
                                                        the Bird
                                                    </td>
                                                    <td>
                                                        Larry@gmail.com
                                                    </td>
                                                    <td>
                                                        +1 9489145560
                                                    </td>
                                                    <td>
                                                        <Button onClick={toggle} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>
                                                        <Button size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
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
                <ModalHeader toggle={toggle}>Edit User Details</ModalHeader>
                <ModalBody>
                    <Form>
                        <div>
                            <div>
                                <Label>First Name</Label> <span className="text-danger">*</span>
                                <Input required type="text" placeholder="Enter First Name" />
                            </div>
                            <div >
                                <Label>Last Name</Label>  <span className="text-danger">*</span>
                                <Input required type="text" placeholder="Enter Last Name" />
                            </div>
                            <div>
                                <Label>Email Id</Label>  <span className="text-danger">*</span>
                                <Input required type="text" placeholder="Enter Email" />
                            </div>
                            <div>
                                <Label>Mobile No</Label>  <span className="text-danger">*</span>
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
