import React, { useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/letast/acelogo.png"
import { Cost } from "pages/Tables/EditableCol";

const ResponsiveTables = () => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);

    const [inputList, setInputList] = useState([{ itemName: "" }])
    console.log(inputList)
  
    const handleInputChange = (e, index) => {
      const { name, value } = e.target
      const list = [...inputList]
      list[index][name] = value
      setInputList(list)
  
    }
  
    // handle click event of the Remove button
    const handleRemoveClick = index => {
      const list = [...inputList]
      list.splice(index, 1)
      setInputList(list)
    }
  
  
    // handle click event of the Add button
    const handleAddClick = () => {
      setInputList([...inputList, { itemName: "" }])
    }

    const [form, setform] = useState([])
  console.log(form)
    const handleChange = (e) => {
      const myUser = { ...form }
      myUser[e.target.name] = e.target.value
      setform(myUser)
    }

    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="New Plan" breadcrumbItem="New Plan" />
                    <Row>
                        <Col>
                            <Card className="p-4">
                                <Form>
                                    {/* <h5>Add New Plan</h5> */}
                                    <Row>
                                        <Col md="4" className="mt-2">
                                            <Label> Name</Label>  <span className="text-danger">*</span>
                                            <Input required type="text" placeholder="Enter Name" />
                                        </Col>
                                        <Col md="4" className="mt-2">
                                            <Label>Type</Label>  <span className="text-danger">*</span>
                                            {/* <Input required type="text" placeholder="Enter Last Name" /> */}
                                            <select
                                            onChange={(e) => {
                                                handleChange(e)
                                              }}
                                            name="types" className="form-select">
                                                <option value="">Select</option>
                                                <option value="PayasYouGo">Pay as You Go</option>
                                                <option value="Membership">Membership</option>
                                                <option value="RentalLine">Rental Line</option>
                                                <option value="Classes">Classes</option>
                                            </select>
                                        </Col>
                                        {form.types == "Membership" || form.types == "Classes" ?(
                                          ""
                                        ): (
<Col md="4" className="mt-2">
                                          <Label>Game Type</Label> <span className="text-danger">*</span>
                                          {/* <Input required type="text" placeholder="Enter Email" /> */}
                                          <Row className="mt-2">
                                              <div className="form-check col">
                                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" defaultValue="option1" defaultChecked />
                                                  <label className="form-check-label" htmlFor="exampleRadios1">
                                                      Both
                                                  </label>
                                              </div>
                                              <div className="form-check col">
                                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" defaultValue="option2" />
                                                  <label className="form-check-label" htmlFor="exampleRadios2">
                                                      Base Ball
                                                  </label>
                                              </div>
                                              <div className="form-check col">
                                                  <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" defaultValue="option3" />
                                                  <label className="form-check-label" htmlFor="exampleRadios3">
                                                      Cricket
                                                  </label>
                                              </div>
                                          </Row>
                                      </Col>
                                        )
                                        }
                                        
                                        <Col md="4" className="mt-2">
                                            <Label>Price</Label> <span className="text-danger">*</span>
                                            <Input required type="text" placeholder="Enter Price" />
                                        </Col>
                                        <Col md="4" className="mt-2">
                                            <Label>Ball Credits</Label> <span className="text-danger">*</span>
                                            <Input required type="text" placeholder="Enter Price" />
                                        </Col>
                                        <Col md="4" className="mt-2">
                                            <Label>Image</Label> <span className="text-danger">*</span>
                                            <Input required type="file" placeholder="Enter Price" />
                                        </Col>
                                    </Row>
                                    {/* <div>
                                        <Label>Description</Label>
                                        <textarea className="form-control" required type="file" placeholder="Enter Price" />
                                    </div> */}
                                    <div className="mt-4">
                                        <Label>What's Included</Label>
                                        <Row>
                                            {inputList.map((x, i) => {
                                                return (
                                                    <div key={i} className="box row">
                                                        <Col md='5' sm='12' className='mb-1'>
                                                            {/* <Label className='form-label' for='nameMulti'>
                                                                Item Name <span className="text-danger">*</span>
                                                            </Label> */}
                                                            <Input type='text' id='nameMulti' placeholder='Enter Name' name="itemName"
                                                                value={x.itemName}
                                                                onChange={e => handleInputChange(e, i)}
                                                                required
                                                            // pattern="^[a-zA-Z]*$"
                                                            />
                                                        </Col>
                                                        <Col sm="3">
                                                            <div className="btn-box">
                                                                {inputList.length !== 1 && <button
                                                                    className="mr10 btn btn-outline-danger btn-sm m-1"
                                                                    onClick={() => handleRemoveClick(i)}>Remove <i className="bx bx-x-circle"></i></button>}
                                                                {inputList.length - 1 === i && <button className="btn btn-sm btn-outline-info m-1" onClick={handleAddClick}>Add <i className="bx bx-plus-circle"></i></button>}
                                                            </div>
                                                        </Col>

                                                    </div>
                                                )
                                            })}
                                        </Row>
                                    </div>
                                    <div className="text-end">
                                        <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                                       <Link to="/plans">
                                       <Button type="button" onClick={() => { setshow(!show) }} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>
                                        </Link> 

                                    </div>
                                </Form>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>

        </React.Fragment>
    );
};

export default ResponsiveTables;
