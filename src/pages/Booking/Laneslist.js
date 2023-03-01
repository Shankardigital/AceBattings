import React, { useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import img1 from "../../assets/images/letast/acelogo.png"
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
                    <Breadcrumbs title="Booking list" breadcrumbItem="Booking list" />
                    <Row>
                        <Col md={12}>
                            <Card>
                                <CardBody>
                                    <Row>
                                        <Col>
                                            {/* <Button onClick={() => { setshow(!show) }} color="primary" >New User <i className="bx bx-user-plus"></i></Button> */}
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
                                                        Date
                                                    </th>
                                                    <th>
                                                        Time
                                                    </th>
                                                    <th>
                                                        Name
                                                    </th>
                                                    <th>
                                                        Lane Number
                                                    </th>
                                                    <th>
                                                        Amount
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
                                                       28-02-23
                                                    </td>
                                                    <td>
                                                        8pm
                                                    </td>
                                                    <td>
                                                        Lane Rental
                                                    </td>
                                                    <td>
                                                        5
                                                        {/* <img src={img1} style={{ width: "80px" }} /> */}
                                                    </td>
                                                    <td>
                                                       $103
                                                    </td>

                                                    
                                                    <td>
                                                        {/* <Button onClick={toggle} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button> */}
                                                        <Button onClick={toggle} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                      2
                                                    </th>
                                                    <td>
                                                       28-02-23
                                                    </td>
                                                    <td>
                                                        8pm
                                                    </td>
                                                    <td>
                                                        Lane Rental
                                                    </td>
                                                    <td>
                                                        5
                                                        {/* <img src={img1} style={{ width: "80px" }} /> */}
                                                    </td>
                                                    <td>
                                                       $103
                                                    </td>

                                                    
                                                    <td>
                                                        {/* <Button onClick={toggle} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button> */}
                                                        <Button onClick={toggle} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        3
                                                    </th>
                                                    <td>
                                                       28-02-23
                                                    </td>
                                                    <td>
                                                        8pm
                                                    </td>
                                                    <td>
                                                        Lane Rental
                                                    </td>
                                                    <td>
                                                        5
                                                        {/* <img src={img1} style={{ width: "80px" }} /> */}
                                                    </td>
                                                    <td>
                                                       $103
                                                    </td>

                                                    
                                                    <td>
                                                        {/* <Button onClick={toggle} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button> */}
                                                        <Button onClick={toggle} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        4
                                                    </th>
                                                    <td>
                                                       28-02-23
                                                    </td>
                                                    <td>
                                                        8pm
                                                    </td>
                                                    <td>
                                                        Lane Rental
                                                    </td>
                                                    <td>
                                                        5
                                                        {/* <img src={img1} style={{ width: "80px" }} /> */}
                                                    </td>
                                                    <td>
                                                       $103
                                                    </td>

                                                    
                                                    <td>
                                                        {/* <Button onClick={toggle} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button> */}
                                                        <Button onClick={toggle} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th scope="row">
                                                        5
                                                    </th>
                                                    <td>
                                                       28-02-23
                                                    </td>
                                                    <td>
                                                        8pm
                                                    </td>
                                                    <td>
                                                        Lane Rental
                                                    </td>
                                                    <td>
                                                        5
                                                        {/* <img src={img1} style={{ width: "80px" }} /> */}
                                                    </td>
                                                    <td>
                                                       $103
                                                    </td>

                                                    
                                                    <td>
                                                        {/* <Button onClick={toggle} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button> */}
                                                        <Button onClick={toggle} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
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
            <Modal size="sm" isOpen={show1} toggle={toggle}>
                {/* <ModalHeader toggle={toggle}></ModalHeader> */}
                <ModalBody>
                <div>
                        <div className="text-center">
                        <img style={{width:"280px"}} src={trash}/>
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
