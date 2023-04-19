import React, { useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/letast/acelogo.png"
// import { Cost } from "pages/Tables/EditableCol";
import Select from 'react-select'
import Flatpickr from 'react-flatpickr'

const ResponsiveTables = () => {

    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);
    const [form, setform] = useState([])
    console.log(form)
    const handleChange = (e) => {
        const myUser = { ...form }
        myUser[e.target.name] = e.target.value
        setform(myUser)
    }
    const options = [
        { value: 'PushkarSALVI', label: 'Pushkar SALVI' },
        { value: 'Balu', label: 'Balu' },
        { value: 'Sateesh', label: 'Sateesh' }
    ]

    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Sell a plan" />
                    <Row>
                        <Col>
                            <Card className="p-4">
                                <Form>
                                    <Row>
                                        <Col md="3" className="mt-2">
                                            <Label> Select Customers</Label>  <span className="text-danger">*</span>
                                            <Select
                                                required
                                                name="customerId"
                                                options={options} />
                                        </Col>
                                        <Col md="3" className="mt-2">
                                            <Label> Select Plans</Label>  <span className="text-danger">*</span>
                                            <select
                                                name="plans"
                                                onChange={(e) => { handleChange(e) }}
                                                className="form-select">
                                                <option value="select">Select</option>
                                                <option value="Pay as you go">Pay as you go</option>
                                                <option value="Basic">Basic</option>
                                                <option value="Pro">Pro</option>
                                                <option value="CircketBeginners">Circket - Beginners</option>
                                                <option value="BaseballBeginners">Baseball- Beginners</option>
                                                <option value="BaseballBeginners">Line Rental</option>
                                            </select>
                                        </Col>
                                        <Col md="3" className="mt-2">
                                            <Label> Start Date</Label>  <span className="text-danger">*</span>
                                            <Flatpickr
                                                placeholder="Select date"
                                                // value={dates}
                                                id='range-picker'
                                                className="form-control"
                                                // onChange={(e) => { convert(e) }}
                                                options={{
                                                    mode: "range",
                                                    dateFormat: "d, M, Y"
                                                }}
                                            />
                                        </Col>
                                        <Col md="3" className="mt-2">
                                            <Label>Collect Payment</Label>  <span className="text-danger">*</span>
                                            <select
                                                name="plans"
                                                onChange={(e) => { handleChange(e) }}
                                                className="form-select">
                                                <option value="select">Select</option>
                                                <option value="markaspaid">Mark as paid</option>
                                                <option value="markasunpaid">Mark as unpaid</option>
                                            </select>
                                        </Col>

                                    </Row>
                                    <div className="text-end mt-3">
                                        <Button onClick={toggle} color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                                        <Link to="/subscribe">
                                            <Button type="button" color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>
                                        </Link>
                                    </div>
                                </Form>
                            </Card>

                            {form.plans !== "select" ? (
                                <Card>
                                    <CardBody>
                                        <h5>Purchase overview</h5> <hr />
                                        <Row>
                                            <Col>
                                                <div>
                                                    <span style={{ fontSize: "14px" }}>Plan purchased</span><br />
                                                    <span style={{ fontSize: "17px", color: "#d9a94f" }}>Line Rental</span>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div>
                                                    <span style={{ fontSize: "14px" }}>Start date</span><br />
                                                    <span style={{ fontSize: "17px", color: "#d9a94f" }}>21/2/2023</span>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div>
                                                    <span style={{ fontSize: "14px" }}>Valid until</span><br />
                                                    <span style={{ fontSize: "17px", color: "#d9a94f" }}>Until Canceled</span>
                                                </div>
                                            </Col>
                                            <Col>
                                                <div>
                                                    <span style={{ fontSize: "14px" }}>Price</span><br />
                                                    <span style={{ fontSize: "17px", color: "#d9a94f" }}>$20.00</span>
                                                </div>
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            ) : (
                                ""
                            )}
                        </Col>
                    </Row>
                </div>
            </div>
            <Modal isOpen={show1} toggle={toggle}>
                <ModalHeader style={{borderBottom:"none"}} toggle={toggle}>Confirm this purchase?</ModalHeader>
                <ModalBody>
                    <div>
                        <p>You have created the following purchase:</p>
                        <Row>
                            <Col md="4">
                            <Label>Plan Holder:</Label><br/>
                            <Label>Plan name:</Label><br/>
                            <Label>Payment:</Label><br/>
                            <Label>Payment Status:</Label><br/>
                            </Col>
                            <Col md="8">
                            <Label>bala@claritaz.com</Label><br/>
                            <Label>Line Rental</Label><br/>
                            <Label>Offline</Label><br/>
                            <Label>Paid</Label><br/>
                            </Col>

                        </Row>
                        <div className="text-end mt-2">
                           <Link to="/subscribe">
                           <Button type="submit" color="success m-1" outline>Confirm <i className="bx bx-check-circle"></i></Button>
                            </Link> 
                            <Button type="button" onClick={toggle} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </div>

                </ModalBody>

            </Modal>

        </React.Fragment>
    );
};

export default ResponsiveTables;
