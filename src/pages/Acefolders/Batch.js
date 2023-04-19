import React, { useState, useEffect } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img1 from "../../assets/images/letast/acelogo.png";
import Invoice from "../../assets/images/letast/Invoice-0000004.pdf";
import trash from "../../assets/images/letast/trash.gif";
import { saveAs } from 'file-saver'
import axios from "axios";
import { URL } from "../../Apiurls";
import { useHistory } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Batch = () => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);

    const [batch, setbatch] = useState([])
    const [form, setform] = useState([])
    const [form1, setform1] = useState([])
    console.log(form1)

    const downloadImage = () => {
        saveAs(Invoice) // Put your image url here.
    }

    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    const permissioins = data.user.permissions[0]
    const roles = data.user.role


    const getBatchs = () => {
        var token = datas;
        axios.post(URL.getallbatchs, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setbatch(res.data.batchResult)
        },
            (error) => {
                if (error.response && error.response.status === 400) {
                    toast(error.response.data.message);
                } else if (error.response && error.response.status === 401) {
                    history.push("/login");
                }
            }

        )
    }

    const handleChange1 = (e) => {
        let myUser = { ...form1 };
        myUser[e.target.name] = e.target.value;
        setform1(myUser);
    };

    const handlechange = (e) => {
        let myUser = { ...form };
        myUser[e.target.name] = e.target.value;
        setform(myUser);
        console.log(myUser)
        var token = datas;
        axios
            .post(
                `http://103.186.185.77:5027/acebatting/adminportal/batch/searchbatch?searchQuery=${e.target.value}`,
                {},

                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setbatch(res.data.batchResult)
            });
    };

    const editBatch = () => {
        var token = datas;
        const batchdata = {
            batch: form1.batch,
            gameType: form1.gameType,
            days: form1.days,
            level: form1.level,
            instructorName: form1.instructorName,
            experience: form1.experience,
            status: form1.status,
            description: form1.description,
            timing: "",
        }
        axios.put(URL.editbatchbyid + "/" + form1._id, batchdata, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data)
                toast.success(res.data.message)
                setform1("")
                getBatchs()
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
        editBatch()
    }


    useEffect(() => {
        getBatchs()
    }, [])

    const [listPerPage] = useState(12);
    const [pageNumber, setPageNumber] = useState(0);

    const pagesVisited = pageNumber * listPerPage;
    const lists = batch.slice(pagesVisited, pagesVisited + listPerPage);
    const pageCount = Math.ceil(batch.length / listPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    const hiddenIds = ["Cricket"];
    const filteredData = batch.filter((item) => !hiddenIds.includes(item.gameType));
    const hiddenIds1 = ["Baseball"];
    const filteredData1 = batch.filter((item) => !hiddenIds1.includes(item.gameType));

    const usedata = (data) => {
        setshow1(true)
        setform1(data)
    }


    // onClick={downloadImage}
    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Batchs" />
                    {permissioins.batchview === true || roles === "admin" ? (

                        <Row>
                            <Col>

                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col>

                                            </Col>
                                            <Col>
                                                <div style={{ float: "right" }}>
                                                    <Input
                                                        name="search"
                                                        value={form.search}
                                                        onChange={handlechange}
                                                        type="search" placeholder="Search..." />
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
                                                            Name
                                                        </th>
                                                        <th>
                                                            Game Type
                                                        </th>
                                                        <th>
                                                            Level
                                                        </th>
                                                        <th>
                                                            No of Days
                                                        </th>
                                                        <th>
                                                            Actions
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td className="text-primary">
                                                            <b>Baseball</b>
                                                        </td>
                                                    </tr>
                                                    {filteredData.map((data, key) => (
                                                        <tr key={key}>
                                                            <th scope="row">
                                                                {(pageNumber - 1) * 10 + key + 11}
                                                            </th>
                                                            <td>
                                                                {data.batch}
                                                            </td>
                                                            <td>
                                                                {data.gameType}
                                                            </td>
                                                            <td>
                                                                {data.level}
                                                            </td>
                                                            <td>
                                                                {data.days}
                                                            </td>

                                                            <td>
                                                                {permissioins.batchedit === true || roles === "admin" ? (
                                                                    <Button onClick={() => { usedata(data) }} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>
                                                                ) : "-"}
                                                            </td>

                                                        </tr>
                                                    ))}
                                                    <tr>
                                                        <td className="text-primary">
                                                            <b>Cricket</b>
                                                        </td>
                                                    </tr>
                                                    {filteredData1.map((data, key) => (
                                                        <tr key={key}>
                                                            <th scope="row">
                                                                {(pageNumber - 1) * 10 + key + 11}
                                                            </th>
                                                            <td>
                                                                {data.batch}
                                                            </td>
                                                            <td>
                                                                {data.gameType}
                                                            </td>
                                                            <td>
                                                                {data.level}
                                                            </td>
                                                            <td>
                                                                {data.days}
                                                            </td>

                                                            <td>
                                                                {permissioins.batchedit === true || roles === "admin" ? (
                                                                    <Button onClick={() => { usedata(data) }} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>
                                                                ) : "-"}
                                                            </td>

                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table>
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
            </div>
            <Toaster />
            <Modal isOpen={show1} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Batch</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => { formeditsubmit(e) }}>
                        <Row>
                            <Col md="6">
                                <Label>First Name</Label>  <span className="text-danger">*</span>
                                <Input value={form1.batch} name="batch" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Batch Name" />
                            </Col>
                            <Col md="6">
                                <Label>Game Type</Label>  <span className="text-danger">*</span>
                                <select className="form-select" value={form1.gameType} name="gameType" onChange={(e) => { handleChange1(e) }} required>
                                    <option value="">Select</option>
                                    <option value="Cricket">Cricket</option>
                                    <option value="Baseball">Baseball</option>
                                </select>
                                {/* <Input value={form1.lastName} name="lastName" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Last Name" /> */}
                            </Col>
                            <Col md="6">
                                <Label>Level</Label>  <span className="text-danger">*</span>
                                <select className="form-select" value={form1.level} name="level" onChange={(e) => { handleChange1(e) }} required>
                                    <option value="">Select</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                                {/* <Input value={form1.lastName} name="lastName" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Last Name" /> */}
                            </Col>
                            <Col md="6">
                                <Label>Days</Label> <span className="text-danger">*</span>
                                <Input value={form1.days} name="days" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Days" />
                            </Col>
                            <Col md="6">
                                <Label>Instructor Name</Label> <span className="text-danger">*</span>
                                <Input value={form1.instructorName} name="instructorName" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Instructor Name" />
                            </Col>
                            <Col md="6">
                                <Label>Experience</Label> <span className="text-danger">*</span>
                                <Input value={form1.experience} name="experience" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Experience" />
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

                            <Col md="12">
                                <Label>Description</Label> <span className="text-danger">*</span>
                                <textarea className="form-control" value={form1.description} name="description" onChange={(e) => { handleChange1(e) }} required type="text" placeholder="Enter Description" />
                            </Col>





                        </Row>
                        <div className="text-end mt-4">
                            <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={() => { setshow1(!show1) }} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </Form>

                </ModalBody>

            </Modal>
        </React.Fragment>
    );
};

export default Batch;
