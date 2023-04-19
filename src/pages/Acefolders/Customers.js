import React, { useEffect, useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { URL } from "../../Apiurls"
import axios from "axios"
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import barcode from "../../assets/images/letast/barcode.jpg"
import Barcode from "react-barcode";


const ResponsiveTables = () => {

    const [show, setshow] = useState(false)
    const [show2, setshow2] = useState(false)
    const toggle2 = () => setshow2(!show2);
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);

    const [show12, setshow12] = useState(false)
    const toggle12 = () => setshow12(!show12);

    const [show13, setshow13] = useState(false)
    const toggle13 = () => setshow13(!show13);


    const [form, setform] = useState([])
    const [cust, setcust] = useState([])
    const [codes, setcodes] = useState([])
    const [form1, setform1] = useState([])
    console.log(form1)

    const handleChange = (e) => {
        let myUser = { ...form };
        myUser[e.target.name] = e.target.value;
        setform(myUser);
    };
    const handleChange1 = (e) => {
        let myUser = { ...form1 };
        myUser[e.target.name] = e.target.value;
        setform1(myUser);
    };

    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    const permissioins = data.user.permissions[0]
    const roles = data.user.role
    console.log(permissioins)

    const getAllCustomers = () => {
        var token = datas;
        axios.post(URL.getallCustomers, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setcust(res.data.CustomerResult)
        })
    }

    const custsearch = (e) => {
        const myUser = { ...form }
        myUser[e.target.name] = e.target.value
        setform(myUser)

        const token = datas
        console.log(token)
        axios.post(`http://103.186.185.77:5027/acebatting/adminportal/customer/searchcustomer?searchQuery=${e.target.value}`, {},
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        ).then((res) => {
            if (res.status === 200) {
                // toast.success(res.data.message);
                console.log(res.data)
                setcust(res.data.CustomerResult)
            }
        },
            (error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                }
            }
        )

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

    const addCust = () => {
        var token = datas;
        const custdata = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            countryCode: form.countryCode,
            password: form.password,
            gender: form.gender,
        }
        axios.post(URL.addCustomer, custdata, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                toast.success(res.data.message)
                setform("")
                getAllCustomers()
                setshow(false)
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
        addCust()
    }

    const editCust = () => {
        var token = datas;
        const custdata = {
            firstName: form1.firstName,
            lastName: form1.lastName,
            email: form1.email,
            phone: form1.phone,
            countryCode: form1.countryCode,
            status: form1.status,
            gender: form1.gender,
        }
        axios.put(URL.editCustomer + "/" + form1._id, custdata, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                toast.success(res.data.message)
                setform1("")
                getAllCustomers()
                setshow1(false)
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
        editCust()
    }

    const usedata = (data) => {
        setshow1(true)
        setform1(data)
    }

    const usedatabarcode = (data) => {
        setshow2(true)
        setform1(data)
    }

    useEffect(() => {
        getAllCustomers()
        getCountrycodes()
    }, [])

    const [listPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)

    const pagesVisited = pageNumber * listPerPage
    const lists = cust.slice(pagesVisited, pagesVisited + listPerPage)
    const pageCount = Math.ceil(cust.length / listPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }


    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Customers" />
                    {permissioins.customerView === true || roles === "admin" ? (

                        <Row>
                            <Col>
                                {show == true ? (
                                    <Card className="p-4">
                                        <Form onSubmit={(e) => { formsubmit(e) }}>
                                            <h5>Add New Customer</h5>
                                            <Row>
                                                <Col md="3">
                                                    <Label>First Name</Label>  <span className="text-danger">*</span>
                                                    <Input name="firstName" onChange={(e) => { handleChange(e) }} required type="text" placeholder="Enter First Name" />
                                                </Col>
                                                <Col md="3">
                                                    <Label>Last Name</Label>  <span className="text-danger">*</span>
                                                    <Input name="lastName" onChange={(e) => { handleChange(e) }} required type="text" placeholder="Enter Last Name" />
                                                </Col>
                                                <Col md="3">
                                                    <Label>Email Id</Label> <span className="text-danger">*</span>
                                                    <Input name="email" onChange={(e) => { handleChange(e) }} required type="email" placeholder="Enter Email" />
                                                </Col>
                                                <Col md="3">
                                                    <Label>Mobile No</Label> <span className="text-danger">*</span>
                                                    <div className="input-group mb-3">
                                                        <div className="input-group-prepend">
                                                            <select style={{ width: "70px" }} value={form.countryCode} name="countryCode" onChange={(e) => { handleChange(e) }} required className="form-select">
                                                                <option required value="">Choose</option>
                                                                {codes.map((data, key) =>
                                                                (
                                                                    <option key={key} value={data.countryCode}>{data.countryCode}</option>
                                                                )
                                                                )}
                                                            </select>
                                                        </div>
                                                        <Input name="phone" onChange={(e) => { handleChange(e) }} required type="number" className="form-control" placeholder="Enter Mobile No" aria-label="Username" aria-describedby="basic-addon1" />
                                                    </div>
                                                </Col>
                                                {/* <Col md="3">
                                                <Label>Password</Label> <span className="text-danger">*</span>
                                                <Input name="password" onChange={(e) => { handleChange(e) }} required type="password" placeholder="Enter password" />
                                            </Col> */}
                                                <Col md="3" className="mt-2">
                                                    <Label>Gender</Label> <span className="text-danger">*</span>
                                                    {/* <Input required type="text" placeholder="Enter Email" /> */}
                                                    <Row className="mt-2 ml-2">
                                                        <div className="form-check col">
                                                            <input onChange={(e) => { handleChange(e) }} name="gender" className="form-check-input" type="radio" id="exampleRadios1" value="male" />
                                                            <label className="form-check-label" htmlFor="exampleRadios1">
                                                                Male
                                                            </label>
                                                        </div>
                                                        <div className="form-check col">
                                                            <input onChange={(e) => { handleChange(e) }} name="gender" className="form-check-input" type="radio" id="exampleRadios2" value="female" />
                                                            <label className="form-check-label" htmlFor="exampleRadios2">
                                                                Female
                                                            </label>
                                                        </div>

                                                    </Row>
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
                                                {permissioins.customerAdd === true || roles === "admin" ? (
                                                    <Button onClick={() => { setshow(!show) }} color="primary" >New Customer <i className="bx bx-user-plus"></i></Button>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col>
                                                <div style={{ float: "right" }}>
                                                    <Input
                                                        name="search"
                                                        value={form.search}
                                                        onChange={custsearch}
                                                        type="search" placeholder="Search..." />
                                                </div>
                                            </Col>
                                        </Row>

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
                                                        {/* <th>
                                                            Wallet balls
                                                        </th> */}
                                                        <th>
                                                            Status
                                                        </th>
                                                        <th>
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {lists.map((data, key) => (
                                                        <tr key={key}>
                                                            <th scope="row">
                                                                {((pageNumber - 1) * 10) + key + 11}
                                                            </th>
                                                            <td>
                                                                {data.firstName}
                                                            </td>
                                                            <td>
                                                                {data.lastName}
                                                            </td>
                                                            <td>
                                                                {data.email}
                                                            </td>
                                                            <td>
                                                                {data.countryCode} {data.phone}
                                                            </td>
                                                            {/* <td>
                                                                <span onClick={toggle13} type="button"> <i className="fa fa-minus-circle m-1 text-danger" aria-hidden="true"></i></span>
                                                                0
                                                                <span onClick={toggle12} type="button">  <i className="fa fa-plus-circle m-1 text-success" aria-hidden="true"></i> </span>
                                                            </td> */}

                                                            <td>
                                                                {data.status}
                                                            </td>
                                                            <td>
                                                                {permissioins.customerEdit === true || roles === "admin" ? (
                                                                    <Button onClick={() => { usedata(data) }} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>
                                                                ) : ("")}
                                                                <Button onClick={() => { usedatabarcode(data) }} size="sm" className="m-1" outline color="primary"><i style={{ fontSize: " 14px" }} className="fa fa-barcode"></i></Button>
                                                            </td>
                                                        </tr>
                                                    ))}


                                                </tbody>
                                            </Table>
                                            <Col sm='12'>
                                                <div className='d-flex mt-3 mb-1' style={{ float: 'right' }}>
                                                    <ReactPaginate
                                                        previousLabel={"Previous"}
                                                        nextLabel={"Next"}
                                                        pageCount={pageCount}
                                                        onPageChange={changePage}
                                                        containerClassName={"pagination"}
                                                        previousLinkClassName={"previousBttn"}
                                                        nextLinkClassName={"nextBttn"}
                                                        disabledClassName={"disabled"}
                                                        activeClassName={"active"}
                                                        total={lists.length}

                                                    />
                                                </div>
                                            </Col>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <Card>
                            <h5 className="text-center p-1">You don't have permission to access</h5>
                        </Card>
                    )}
                </div>
                <Toaster />
            </div>
            <Modal isOpen={show1} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Customer Details</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => { formeditsubmit(e) }}>
                        <Row>
                            <Col md="6">
                                <Label>First Name</Label>  <span className="text-danger">*</span>
                                <Input value={form1.firstName} name="firstName" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter First Name" />
                            </Col>
                            <Col md="6">
                                <Label>Last Name</Label>  <span className="text-danger">*</span>
                                <Input value={form1.lastName} name="lastName" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Last Name" />
                            </Col>
                            <Col md="6">
                                <Label>Email Id</Label> <span className="text-danger">*</span>
                                <Input value={form1.email} name="email" onChange={(e) => { handleChange1(e) }} required type="email" placeholder="Enter Email" />
                            </Col>
                            <Col md="6">
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
                            <Col md="6" className="mt-2">
                                <Label>Gender</Label> <span className="text-danger">*</span>
                                {/* <Input required type="text" placeholder="Enter Email" /> */}
                                <Row className="mt-2">
                                    <div className="form-check col">
                                        <input defaultChecked={form1.gender == "male"} onChange={(e) => { handleChange1(e) }} name="gender" className="form-check-input" type="radio" id="exampleRadios1" value="male" />
                                        <label className="form-check-label" htmlFor="exampleRadios1">
                                            Male
                                        </label>
                                    </div>
                                    <div className="form-check col">
                                        <input defaultChecked={form1.gender == "female"} onChange={(e) => { handleChange1(e) }} name="gender" className="form-check-input" type="radio" id="exampleRadios2" value="female" />
                                        <label className="form-check-label" htmlFor="exampleRadios2">
                                            Female
                                        </label>
                                    </div>

                                </Row>
                            </Col>

                            <Col md="6">
                                <Label>Status</Label> <span className="text-danger">*</span>
                                <select value={form1.status} required onChange={(e) => { handleChange1(e) }} name="status" className="form-select">
                                    <option value="">Select</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                </select>
                                {/* <Input name="s" onChange={(e) => { handleChange(e) }} required type="password" placeholder="Enter password" /> */}
                            </Col>
                        </Row>
                        <div className="text-end mt-4">
                            <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={() => { setshow1(!show1) }} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </Form>
                </ModalBody>

            </Modal>

            <Modal isOpen={show2} toggle={toggle2}>
                {/* <ModalHeader toggle={toggle2}></ModalHeader> */}
                <ModalBody>
                    {/* <div>
                        <img src={barcode} style={{ width: "275px", height: "300px" }} />
                    </div> */}
                    <div style={{ width: "470px" }} className="text-center mt-3">
                        <Barcode width={1} style={{ width: "470px" }} value={form1._id} />
                    </div>

                    <div className="text-end mt-4">
                        {/* <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button> */}
                        <Button type="button" onClick={() => { setshow2(!show2) }} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>
                    </div>
                </ModalBody>

            </Modal>

            <Modal size="sm" isOpen={show12} toggle={toggle12}>
                <ModalHeader toggle={toggle12}>Credit Balls</ModalHeader>
                <ModalBody>
                    <div>
                        <div >
                            <form>
                                <label>Credit Balls</label>
                                <input required placeholder="Enter Balls" type="number" className="form-control" />
                            </form>
                        </div>
                        <div className="text-end mt-2">
                            <Button type="button" onClick={toggle12} color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={toggle12} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </div>

                </ModalBody>

            </Modal>
            <Modal size="sm" isOpen={show13} toggle={toggle13}>
                <ModalHeader toggle={toggle13}>Debit Balls</ModalHeader>
                <ModalBody>
                    <div>
                        <div >
                            <form>
                                <label>Debit Balls</label>
                                <input required placeholder="Enter Balls" type="number" className="form-control" />
                            </form>
                        </div>
                        <div className="text-end mt-2">
                            <Button type="button" onClick={toggle12} color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={toggle12} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </div>

                </ModalBody>

            </Modal>

        </React.Fragment>
    );
};

export default ResponsiveTables;
