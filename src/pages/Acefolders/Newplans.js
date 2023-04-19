import React, { useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from "react-router-dom";
import img1 from "../../assets/images/letast/acelogo.png";
import axios from "axios";
import { URL } from "../../Apiurls";
import { useHistory } from "react-router-dom";
// import { Cost } from "pages/Tables/EditableCol";
import toast, { Toaster } from 'react-hot-toast';
import Plans from "./Plans"

const ResponsiveTables = () => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);

    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    console.log(datas)

    const [inputList, setInputList] = useState([{ value: "" }])
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
        setInputList([...inputList, { value: "" }])
    }

    const [form, setform] = useState([])
    console.log(form)
    const [Files, setFiles] = useState("");
    let history = useHistory();

    const handleChange = (e) => {
        const myUser = { ...form }
        myUser[e.target.name] = e.target.value
        setform(myUser)
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

    const Addplans = () => {

        const data12 = inputList.map((x) => (
            {
                value: (x.value)
            }
        ))

        console.log(data12);
        const token = datas
        const dataArray = new FormData()
        dataArray.append("name", form.name)
        dataArray.append("gameType", form.gameType)
        dataArray.append("type", form.type)
        form.type == "Classes" ? dataArray.append("stage", form.stage) : null
        dataArray.append("price", form.price)
        dataArray.append("ballCredits", form.ballCredits)
        dataArray.append("tax", form.tax)
        dataArray.append("orderRenewal", form.orderRenewal)
        dataArray.append("whatsIncluded", JSON.stringify(data12))

        for (let i = 0; i < Files.length; i++) {
            dataArray.append("image", Files[i])
        }

        axios.post(URL.addPlans, dataArray,
            {
                headers: { Authorization: `Bearer ${token}` }
            },
        ).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
                console.log(res.data);
                history.push("/plans")
                setform("")
                setFiles("")
                return <Plans message={res.data.message} duration={2000} />

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
        Addplans()
    }

    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="New Plan" />
                    <Row>
                        <Col>
                            <Card className="p-4">
                                <Form onSubmit={(e) => { formsubmit(e) }}>
                                    {/* <h5>Add New Plan</h5> */}
                                    <Row>
                                        <Col md="4" className="mt-2">
                                            <Label> Name</Label>  <span className="text-danger">*</span>
                                            <Input onChange={(e) => { handleChange(e) }} name="name" required type="text" placeholder="Enter Name" />
                                        </Col>
                                        <Col md="4" className="mt-2">
                                            <Label>Type</Label>  <span className="text-danger">*</span>
                                            {/* <Input required type="text" placeholder="Enter Last Name" /> */}
                                            <select
                                            required
                                                onChange={(e) => {
                                                    handleChange(e)
                                                }}
                                                name="type" className="form-select">
                                                <option value="">Select</option>
                                                <option value="PayasYouGo">Pay as You Go</option>
                                                <option value="Team_subcription">Team Subscription</option>
                                                <option value="Membership">Membership</option>
                                                <option value="RentalLine">Rental Line</option>
                                                <option value="Classes">Classes</option>
                                                <option value="Clinics">Clinics</option>
                                                <option value="RentalEquipment">Rental Equipment</option>
                                            </select>
                                        </Col>
                                        {form.type == "Membership" || form.type == "Classes" || form.type == "Team_subcription" ? (
                                            ""
                                        ) : (
                                            <Col md="4" className="mt-2">
                                                <Label>Game Type</Label> <span className="text-danger">*</span>
                                                {/* <Input required type="text" placeholder="Enter Email" /> */}

                                                <select
                                                required
                                                    onChange={(e) => {
                                                        handleChange(e);
                                                    }}
                                                    value={form.gameType}
                                                    name="gameType"
                                                    className="form-select">
                                                    <option value="">Select</option>
                                                    <option value="baseball">Baseball</option>
                                                    <option value="circket"> Cricket</option>
                                                </select>
                                            </Col>
                                        )
                                        }

                                        {form.type == "Classes" ? (
                                            <>
                                                <Col md="4" className="mt-2">
                                                    <Label>Game Type</Label> <span className="text-danger">*</span>
                                                    {/* <Input required type="text" placeholder="Enter Email" /> */}
                                                    <select
                                                    required
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                        }}
                                                        value={form.gameType}
                                                        name="gameType"
                                                        className="form-select">
                                                        <option value="">Select</option>
                                                        <option value="baseball">Baseball</option>
                                                        <option value="circket"> Cricket</option>
                                                    </select>
                                                </Col>
                                                <Col md="4" className="mt-2">
                                                    <Label>Stage</Label> <span className="text-danger">*</span>
                                                    {/* <Input required type="text" placeholder="Enter Email" /> */}
                                                    <select
                                                    required
                                                        onChange={(e) => {
                                                            handleChange(e)
                                                        }}
                                                        name="stage" className="form-select">
                                                        <option value="">Select</option>
                                                        <option value="Beginner">Beginner</option>
                                                        <option value="Intermediate">Intermediate</option>
                                                        <option value="Advanced">Advanced</option>
                                                    </select>
                                                </Col>
                                            </>
                                        ) : (
                                            ""
                                        )
                                        }

                                        <Col md="4" className="mt-2">
                                            <Label>Price</Label> <span className="text-danger">*</span>
                                            <Input onChange={(e) => { handleChange(e) }} name="price" required type="text" placeholder="Enter Price" />
                                        </Col>
                                        <Col md="4" className="mt-2">
                                            <Label>Ball Credits</Label> <span className="text-danger">*</span>
                                            <Input onChange={(e) => { handleChange(e) }} name="ballCredits" required type="text" placeholder="Enter Ball" />
                                        </Col>
                                        <Col md="4" className="mt-2">
                                            <Label>Image</Label>
                                            <Input onChange={changeHandler} name="image" type="file" />
                                        </Col>

                                        <Col md="4" className="mt-2">
                                            <Label>Tax (%)</Label> <span className="text-danger">*</span>
                                            <Input onChange={(e) => { handleChange(e) }} name="tax" required type="number" placeholder="Enter Tax" />
                                        </Col>
                                        <Col md="4" className="mt-2">
                                            <Label>Order Renewal</Label> <span className="text-danger">*</span>
                                            <select
                                            required
                                                onChange={(e) => {
                                                    handleChange(e);
                                                }}
                                                value={form.orderRenewal}
                                                name="orderRenewal"
                                                className="form-select">
                                                <option value="">Select</option>
                                                <option value="rene">Renewal</option>
                                                <option value="nonrene"> Non Renewal</option>
                                            </select>
                                            {/* <Input onChange={(e)=>{handleChange(e)}} name="ballCredits" required type="text" placeholder="Enter Price" /> */}
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
                                                            <Input type='text' id='nameMulti' placeholder='Enter Name' name="value"
                                                                value={x.value}
                                                                onChange={e => handleInputChange(e, i)}
                                                                required
                                                            // pattern="^[a-zA-Z]*$"
                                                            />
                                                        </Col>
                                                        <Col sm="3">
                                                            <div className="btn-box">
                                                                {inputList.length !== 1 && <button
                                                                    className="mr10 btn btn-outline-danger btn-sm m-1" type="button"
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
            <Toaster />
        </React.Fragment>
    );
};

export default ResponsiveTables;
