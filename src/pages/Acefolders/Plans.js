import React, { useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img1 from "../../assets/images/letast/acelogo.png"
import trash from "../../assets/images/letast/trash.gif"

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
                    <Breadcrumbs title="Plans / Packages" breadcrumbItem="Plans / Packages" />
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
                                            <Link to="/newplans">
                                                <Button color="primary" >New Plan <i className="bx bx-plus-circle"></i></Button>
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
                                                        Images
                                                    </th>
                                                    <th>
                                                        Name
                                                    </th>
                                                    <th>
                                                        Type
                                                    </th>
                                                    <th>
                                                        Game Type
                                                    </th>
                                                    <th>
                                                        Price
                                                    </th>
                                                    <th>
                                                        Ball Credits
                                                    </th>
                                                    <th>
                                                        What's Included
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
                                                        <img src={img1} style={{ width: "70px" }} />
                                                    </td>

                                                    <td>
                                                        Line Rental
                                                    </td>
                                                    <td>
                                                        Line Rental
                                                    </td>
                                                    <td>
                                                        Base Ball
                                                    </td>
                                                    <td>
                                                        $ 20
                                                    </td>
                                                    <td>
                                                        10
                                                    </td>
                                                    <td>
                                                        10 base Balls
                                                    </td>
                                                    <td>
                                                        <Link to="/editplan"> <Button size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button></Link>
                                                        <Button onClick={toggle} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        2
                                                    </th>
                                                    <td>
                                                        <img src={img1} style={{ width: "70px" }} />
                                                    </td>
                                                    <td>
                                                        Line Rental
                                                    </td>
                                                    <td>
                                                        Line Rental
                                                    </td>
                                                    <td>
                                                        Base Ball
                                                    </td>
                                                    <td>
                                                        $ 20
                                                    </td>
                                                    <td>
                                                        10
                                                    </td>
                                                    <td>
                                                        10 base Balls
                                                    </td>
                                                    <td>
                                                        <Link to="/editplan"> <Button size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button></Link>
                                                        <Button onClick={toggle} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        3
                                                    </th>
                                                    <td>
                                                        <img src={img1} style={{ width: "70px" }} />
                                                    </td>

                                                    <td>
                                                        Line Rental
                                                    </td>
                                                    <td>
                                                        Line Rental
                                                    </td>
                                                    <td>
                                                        Base Ball
                                                    </td>
                                                    <td>
                                                        $ 20
                                                    </td>
                                                    <td>
                                                        10
                                                    </td>
                                                    <td>
                                                        10 base Balls
                                                    </td>
                                                    <td>
                                                        <Link to="/editplan"> <Button size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button></Link>
                                                        <Button size="sm" onClick={toggle} className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
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
