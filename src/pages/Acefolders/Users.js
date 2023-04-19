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

const ResponsiveTables = () => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);

    const [form, setform] = useState([])
    const [role, setroles] = useState([])
    const [users, setusers] = useState([])
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


    const getAllusers = () => {
        var token = datas;
        axios.post(URL.getallUsers, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setusers(res.data.profilesResult)
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

    const custsearch = (e) => {
        const myUser = { ...form }
        myUser[e.target.name] = e.target.value
        setform(myUser)

        const token = datas
        console.log(token)
        axios.post(URL.searchuserdata + `${e.target.value}`, {},
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        ).then((res) => {
            if (res.status === 200) {
                // toast.success(res.data.message);
                console.log(res.data)
                setusers(res.data.profilesResult)
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

    const addUsers = () => {
        var token = datas;
        const userdata = {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            phone: form.phone,
            countryCode: form.countryCode,
            // password: form.password,
            role: form.role,
        }
        axios.post(URL.addUsers, userdata, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                toast.success(res.data.message)
                setform("")
                getAllusers()
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
            role: form1.role,
        }
        axios.put(URL.editUsers + "/" + form1._id, userdata, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                toast.success(res.data.message)
                setform1("")
                getAllusers()
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
        editUsers()
    }

    const usedata = (data) => {
        setshow1(true)
        setform1(data)
    }

    useEffect(() => {
        getAllusers()
        getCountrycodes()
        getAllRoles()
    }, [])

    const [listPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)

    const pagesVisited = pageNumber * listPerPage
    const lists = users.slice(pagesVisited, pagesVisited + listPerPage)
    const pageCount = Math.ceil(users.length / listPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }


    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Employees" />
                    {permissioins.empView === true || roles === "admin" ? (
                        <Row>
                            <Col>
                                {show == true ? (
                                    <Card className="p-4">
                                        <Form onSubmit={(e) => { formsubmit(e) }}>
                                            <h5>Add New Employee</h5>
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
                                                                    <option required key={key} value={data.countryCode}>{data.countryCode}</option>
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
                                                <Col md="3">
                                                    <Label> Roles</Label> <span className="text-danger">*</span>
                                                    <select name="role" onChange={(e) => { handleChange(e) }} className="form-select">
                                                        <option value="">Select</option>
                                                        {role.map((data, key) =>
                                                        (
                                                            <option required key={key} value={data.role}>{data.role}</option>
                                                        )
                                                        )}
                                                    </select>
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
                                                        <th>
                                                            Role
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
                                                            <td>
                                                                {data.role}
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
                <ModalHeader toggle={toggle}>Edit Employee Details</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => { formeditsubmit(e) }}>
                        <Row>
                            <Col md="6">
                                <Label>First Name</Label>  <span className="text-danger">*</span>
                                <Input value={form1.firstName} name="firstName" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter First Name" />
                            </Col>
                            <Col md="6">
                                <Label>Last Name</Label>  <span className="text-danger">*</span>
                                <Input className="mb-3" value={form1.lastName} name="lastName" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Last Name" />
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
                            <Col md="6">
                                <Label> Roles</Label> <span className="text-danger">*</span>
                                <select value={form1.role} name="role" onChange={(e) => { handleChange1(e) }} className="form-select">
                                    <option value="">Select</option>
                                    {role.map((data, key) =>
                                    (
                                        <option required key={key} value={data.role}>{data.role}</option>
                                    )
                                    )}
                                </select>
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
                        <div className="text-end mt-3">
                            <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={() => { setshow1(!show1) }} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </Form>
                </ModalBody>

            </Modal>
        </React.Fragment>
    );
};

export default ResponsiveTables;
