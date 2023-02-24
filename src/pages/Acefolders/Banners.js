import React, { useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img1 from "../../assets/images/letast/acelogo.png"

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
                    <Breadcrumbs title="Banners" breadcrumbItem="Banners" />
                    <Row>
                        <Col>
                            {show == true ? (
                                <Card className="p-4">
                                    <Form>
                                        <h5>Add New</h5>
                                        <Row>
                                            <Col md="3">
                                                <Label> Name</Label>  <span className="text-danger">*</span>
                                                <Input required type="text" placeholder="Enter Name" />
                                            </Col>
                                            <Col md="3">
                                                <Label>Images</Label>  <span className="text-danger">*</span>
                                                <Input required type="file" placeholder="Enter Last Name" />
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
                                                         Name
                                                    </th>
                                                    <th>
                                                        Images
                                                    </th>
                                                    <th>
                                                        Status
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
                                                       <img src={img1} style={{width:"80px"}} />
                                                    </td>
                                                   
                                                    <td>
                                                        <span className="text-success">
                                                        Active
                                                        </span>
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
                                                       <img src={img1} style={{width:"80px"}} />
                                                    </td>
                                                   
                                                    <td>
                                                        <span className="text-success">
                                                        Active
                                                        </span>
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
                                                       <img src={img1} style={{width:"80px"}} />
                                                    </td>
                                                   
                                                    <td>
                                                        <span className="text-success">
                                                        Active
                                                        </span>
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
                <ModalHeader toggle={toggle}>Edit Bannerss</ModalHeader>
                <ModalBody>
                    <Form>
                        <div>
                            <div>
                                <Label> Name</Label> <span className="text-danger">*</span>
                                <Input required type="text" placeholder="Enter Name" />
                            </div>
                            <div >
                                <Label>Image</Label>  <span className="text-danger">*</span>
                                <Input required type="file" placeholder="Enter Last Name" />
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
