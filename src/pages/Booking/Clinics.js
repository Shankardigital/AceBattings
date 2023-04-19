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

const Clinics = () => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);

    const [form, setform] = useState([])
    const [role, setroles] = useState([])
    const [clinic, setclinic] = useState([])
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


    const getClinics = () => {
        var token = datas;
        axios.post(URL.getallclinics, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setclinic(res.data.clinicResult)
        })
    }

    const getAllRoles = () => {
        var token = datas;
        axios.post(URL.allactiverole, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setroles(res.data.roleResult)
        })
    }

    // const custsearch = (e) => {
    //     const myUser = { ...form }
    //     myUser[e.target.name] = e.target.value
    //     setform(myUser)

    //     const token = datas
    //     console.log(token)
    //     axios.post(URL.searchuserdata + `${e.target.value}`, {},
    //         {
    //             headers: { Authorization: `Bearer ${token}` }
    //         }
    //     ).then((res) => {
    //         if (res.status === 200) {
    //             // toast.success(res.data.message);
    //             console.log(res.data)
    //             setusers(res.data.profilesResult)
    //         }
    //     },
    //         (error) => {
    //             if (error.response && error.response.status === 400) {
    //                 toast.error(error.response.data.message);
    //             }
    //         }
    //     )

    // }

    const getCountrycodes = () => {
        var token = datas;
        axios.post(URL.getallCountrycodes, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setcodes(res.data.countrycodes)
        })
    }

    const addUsers = () => {
        var token = datas;
        const userdata = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            countryCode: form.countryCode,
            password: form.password,
            role: form.role,
        }
        axios.post(URL.addUsers, userdata, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setform("")
            getClinics()
            setshow(false)
            // setcodes(res.data.countrycodes)

        })
    }

    const formsubmit = (e) => {
        e.preventDefault()
        addUsers()
    }

    const editUsers = () => {
        var token = datas;
        const userdata = {
            firstName: form1.firstName,
            lastName: form1.lastName,
            email: form1.email,
            phone: form1.phone,
            countryCode: form1.countryCode,
            status: form1.status,
            role: form.role,
        }
        axios.put(URL.editUsers + "/" + form1._id, userdata, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setform1("")
            getClinics()
            setshow1(false)
            // setcodes(res.data.countrycodes)

        })
    }

    const formeditsubmit = (e) => {
        e.preventDefault()
        editUsers()
    }

    const usedata = (data) => {
        setshow1(true)
        setform1(data)
    }

    useEffect(() => {
        getClinics()
        getCountrycodes()
        getAllRoles()
    }, [])

    const [listPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)

    const pagesVisited = pageNumber * listPerPage
    const lists = clinic.slice(pagesVisited, pagesVisited + listPerPage)
    const pageCount = Math.ceil(clinic.length / listPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }


    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Clinics" />
                    {permissioins.empView === true || roles === "admin" ? (
                        <Row>
                            <Col>
                                {show == true ? (
                                    <Card className="p-4">
                                        <Form onSubmit={(e) => { formsubmit(e) }}>
                                            <h5>Add New Clinic</h5>
                                            <Row>
                                                <Col className="mt-2" md="3">
                                                    <Label>Name</Label>  <span className="text-danger">*</span>
                                                    <Input name="Name" onChange={(e) => { handleChange(e) }} required type="text" placeholder="Enter Name" />
                                                </Col>
                                                <Col className="mt-2" md="3">
                                                    <Label>Date</Label>  <span className="text-danger">*</span>
                                                    <Input name="Date" onChange={(e) => { handleChange(e) }} required type="date" placeholder="Enter Date" />
                                                </Col>
                                                <Col className="mt-2" md="3">
                                                    <Label>Time</Label> <span className="text-danger">*</span>
                                                    <Input name="time" onChange={(e) => { handleChange(e) }} required type="time" className="form-control" placeholder="Enter Time" />
                                                </Col>

                                                <Col className="mt-2" md="3">
                                                    <Label>Amount</Label> <span className="text-danger">*</span>
                                                    <Input name="amount" onChange={(e) => { handleChange(e) }} required type="text" placeholder="Enter Amount" />
                                                </Col>

                                                <Col className="mt-2" md="3">
                                                    <Label>Image</Label> <span className="text-danger">*</span>
                                                    <Input name="Image" onChange={(e) => { handleChange(e) }} required type="file" placeholder="Enter Image" />
                                                </Col>
                                                <Col className="mt-2" md="3">
                                                    <Label>Description</Label> <span className="text-danger">*</span>
                                                    <textarea name="Description" className="form-control" onChange={(e) => { handleChange(e) }} required type="text" placeholder="Enter Description" />
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
                                                {permissioins.empAdd === true || roles === "admin" ? (
                                                    <Button onClick={() => { setshow(!show) }} color="primary" >New Employee <i className="bx bx-user-plus"></i></Button>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col>
                                                <div style={{ float: "right" }}>
                                                    <Input
                                                        name="search"
                                                        value={form.search}
                                                        // onChange={custsearch}
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
                                                            Name
                                                        </th>
                                                        <th>
                                                            Date
                                                        </th>
                                                        <th>
                                                            Time
                                                        </th>
                                                        <th>
                                                            Amount
                                                        </th>
                                                        <th>
                                                            Image
                                                        </th>
                                                        <th>
                                                            Description
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
                                                    {lists.map((data, key) => (
                                                        <tr key={key}>
                                                            <th scope="row">
                                                                {((pageNumber - 1) * 10) + key + 11}
                                                            </th>
                                                            <td>
                                                                Clinic
                                                                {/* {data.firstName} */}
                                                            </td>
                                                            <td>
                                                                24-03-2023
                                                                {/* {data.lastName} */}
                                                            </td>
                                                            <td>
                                                                18:50
                                                                {/* {data.email} */}
                                                            </td>
                                                            <td>
                                                                $ 20
                                                                {/* {data.countryCode} {data.phone} */}
                                                            </td>
                                                            <td>
                                                                <img src="" style={{ width: "70px" }} />
                                                            </td>
                                                            <td>
                                                                Testing purpose
                                                                {/* {data.role} */}
                                                            </td>
                                                            <td>

                                                                {data.status}
                                                            </td>
                                                            <td>
                                                                {permissioins.empEdit === true || roles === "admin" ? (

                                                                    <Button onClick={() => { usedata(data) }} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {/* <Button size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button> */}

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
                <ModalHeader toggle={toggle}>Edit Clinic Details</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => { formeditsubmit(e) }}>
                        <Row>
                            <Col className="mt-2" md="6">
                                <Label>Name</Label>  <span className="text-danger">*</span>
                                <Input name="Name" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Name" />
                            </Col>
                            <Col className="mt-2" md="6">
                                <Label>Date</Label>  <span className="text-danger">*</span>
                                <Input name="Date" onChange={(e) => { handleChange1(e) }} required type="date" placeholder="Enter Date" />
                            </Col>
                            <Col className="mt-2" md="6">
                                <Label>Time</Label> <span className="text-danger">*</span>
                                <Input name="time" onChange={(e) => { handleChange1(e) }} required type="time" className="form-control" placeholder="Enter Time" />
                            </Col>

                            <Col className="mt-2" md="6">
                                <Label>Amount</Label> <span className="text-danger">*</span>
                                <Input name="amount" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Amount" />
                            </Col>

                            <Col className="mt-2" md="6">
                                <Label>Image</Label> <span className="text-danger">*</span>
                                <Input name="Image" onChange={(e) => { handleChange1(e) }} required type="file" placeholder="Enter Image" />
                            </Col>
                            <Col className="mt-2" md="6">
                                <Label>Description</Label> <span className="text-danger">*</span>
                                <textarea name="Description" className="form-control" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Description" />
                            </Col>

                        </Row>
                        <div className="text-end mt-3">
                            <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={() => { setshow(!show) }} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </Form>
                </ModalBody>

            </Modal>
        </React.Fragment>
    );
};

export default Clinics;
