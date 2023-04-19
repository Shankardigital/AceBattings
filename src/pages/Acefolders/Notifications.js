import React, { useState, useEffect } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import img1 from "../../assets/images/letast/acelogo.png"
import { Link } from "react-router-dom"
import { URL } from "../../Apiurls"
import axios from "axios"
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';
import Select from 'react-select';



const Notifications = () => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const [show123, setshow123] = useState(false)
    const toggle = () => setshow1(!show1);
    const toggle123 = () => setshow123(!show123);

    const [form, setform] = useState([])
    const [form1, setform1] = useState([])
    console.log(form1)

    const [lane, setlane] = useState([])
    const [lanetype, setlanetype] = useState([])

    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    const permissioins = data.user.permissions[0]
    const roles = data.user.role


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

    const getNotifications = () => {
        var token = datas;
        axios.post(URL.showallnotification, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setlane(res.data.notifyResult)
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

    const getactivecustomers = () => {
        var token = datas;
        // const params = {
        //     type: "RentalLine"
        // }
        axios.post(URL.getallactivecustomer, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setlanetype(res.data.CustomerResult)
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


    useEffect(() => {
        getNotifications()
        getactivecustomers()
    }, [])

    const [selectedMulti, setselectedMulti] = useState([])
    console.log(selectedMulti.value)

    function handleMulti(data) {
        setselectedMulti(data)
    }

    const [selectedMulti1, setselectedMulti1] = useState([])
    console.log(selectedMulti1)

    function handleMulti1(data) {
        setselectedMulti1(data)
    }

    const options = lanetype.map((data) => (
        { value: data._id, label: data.fullName }
    ))
    console.log(options)


    const addnotifi = () => {
        var token = datas;
        const params = {
            title: form.title,
            fcmDescription: form.fcmDescription,
            description: form.description,
            userList: selectedMulti,
        }
        axios.post(URL.addnotification, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    getNotifications();
                    setform("")
                    setFiles("")
                    setselectedMulti("")
                }
            },
            (error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else if (error.response && error.response.status === 401) {
                    history.push("/login");
                }

            }
        );
    }

    const editnotifi = () => {
        var token = datas;
        var formid = form1._id
        const params = {
            title: form1.title,
            fcmDescription: form1.fcmDescription,
            description: form1.description,
            userList: selectedMulti1,
        }
        axios.put(URL.editnotification + "/" + formid, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    toggle()
                    setshow1(false)
                    getNotifications();
                }
            },
            (error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else if (error.response && error.response.status === 401) {
                    history.push("/login");
                }
            }
        );
    }

    const deletenoti = (data) => {
        var token = datas;
        var remid = data._id
        axios.delete(URL.deletenotification + "/" + remid, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    getNotifications();

                }
            },
            (error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                } else if (error.response && error.response.status === 401) {
                    history.push("/login");
                }
            }
        );
    }

    const manageDelete = (data) => {
        const confirmBox = window.confirm("Do you really want to Delete?");
        if (confirmBox === true) {
            deletenoti(data);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedMulti.length === 0) {
            toast.error('Please select at least one Customer');
        } else {
            addnotifi();
            clearForm()
            setselectedMulti("")
        }

    };
    const handleSubmit1 = (e) => {
        e.preventDefault();
        if (selectedMulti.length === 0) {
            toast.error('Please select at least one Customer');
        } else {
            editnotifi();
            clearForm()
            setselectedMulti1("")
        }

    };

    const clearForm = () => {
        setform({
            title: "",
            fcmDescription: "",
            description: "",
        });
    };
    const getpopup = (data) => {
        setform1(data);
        setselectedMulti1(data.user_ids)
        setshow1(true)
    };

    const [forms, setforms] = useState([]);
    console.log(forms)

    const handlechange = (e) => {
        let myUser = { ...forms };
        myUser[e.target.name] = e.target.value;
        setforms(myUser);
        console.log(myUser)
        var token = datas;
        axios
            .post(
                `http://103.186.185.77:5027/acebatting/adminportal/notification/showallnotification?searchQueryParams=${e.target.value}`,
                {},

                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setlane(res.data.notifyResult)
            });
    };

    const [listPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);

    const pagesVisited = pageNumber * listPerPage;
    const lists = lane.slice(pagesVisited, pagesVisited + listPerPage);
    const pageCount = Math.ceil(lane.length / listPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };


    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Notifications" />
                    {permissioins.notview === true || roles === "admin" ? (

                        <Row>
                            <Col md={4}>
                                <Card className="p-4">
                                    <h5>Add Notification</h5>
                                    {permissioins.notadd === true || roles === "admin" ? (
                                        <Form onSubmit={(e) => { handleSubmit(e) }}>
                                            <div>

                                                <div className="mt-3">
                                                    <Label>Title</Label>  <span className="text-danger">*</span>
                                                    <Input value={form.title} onChange={(e) => { handleChange(e) }} name="title" required type="text" placeholder="Enter Title" />
                                                </div>
                                                <div className="mt-3">
                                                    <Label>Customers</Label>  <span className="text-danger">*</span>
                                                    <Select
                                                        name="userList"
                                                        value={selectedMulti}
                                                        onChange={handleMulti}
                                                        options={options}
                                                        required
                                                        isMulti
                                                    />
                                                </div>
                                                <div className="mt-3">
                                                    <Label>Fcm Description</Label>  <span className="text-danger">*</span>
                                                    <textarea className="form-control" value={form.fcmDescription} onChange={(e) => { handleChange(e) }} name="fcmDescription" required type="text" placeholder="Fcm Description" />
                                                </div>

                                                <div className="mt-3">
                                                    <Label>Description</Label>  <span className="text-danger">*</span>
                                                    <textarea className="form-control" value={form.description} onChange={(e) => { handleChange(e) }} name="description" required type="text" placeholder="Description" />
                                                </div>


                                            </div>
                                            <div className="text-end mt-3">
                                                <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                                                {/* <Button type="button" color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button> */}

                                            </div>
                                        </Form>
                                    ) : (
                                        "You don't have permission to access"
                                    )}
                                </Card>
                            </Col>
                            <Col md={8}>

                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                {/* <Button onClick={() => { setshow(!show) }} color="primary" >New User <i className="bx bx-user-plus"></i></Button> */}
                                            </Col>
                                            <Col>
                                                <div style={{ float: "right" }}>
                                                    <Input
                                                        name="search"
                                                        value={forms.search}
                                                        onChange={handlechange}
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
                                                            Title
                                                        </th>
                                                        <th>
                                                           Customers
                                                        </th>
                                                        <th>
                                                            Description
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
                                                                {(pageNumber - 1) * 5 + key + 6}
                                                            </th>
                                                            <td>
                                                                {data.title}
                                                            </td>
                                                            <td>
                                                                {data.user_ids.map((data, key) =>(
                                                                    <span key={key}>{data.label}, </span>
                                                                ))}
                                                            </td>

                                                            <td> {data.description} </td>
                                                         
                                                            <td>
                                                                {/* {permissioins.editlane === true || roles === "admin" ? (
                                                                    <Button onClick={() => {
                                                                        getpopup(data);
                                                                    }} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>

                                                                ) : (
                                                                    ""
                                                                )} */}
                                                                {/* {permissioins.editlane === true || roles === "admin" ? (
                                                                    <Button onClick={() => {
                                                                        getpopup123(data);
                                                                    }} size="sm" className="m-1" outline color="warning"><i style={{ fontSize: "14px" }} className="fa fa-bars" aria-hidden="true"></i></Button>

                                                                ) : (
                                                                    ""
                                                                )} */}
                                                                {permissioins.notdel === true || roles === "admin" ? (

                                                                    <Button
                                                                        onClick={() => {
                                                                            manageDelete(data);
                                                                        }}
                                                                        size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {/* <Link to="/lane_booking">
                                                                <Button size="sm" className="m-1" outline color="warning"><i style={{ fontSize: " 14px" }} className="fa fa-eye" aria-hidden="true"></i></Button>
                                                            </Link> */}
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </Table>
                                            <div className="mt-3" style={{ float: "right" }}>
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
            <Modal size="sm" isOpen={show1} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Notification</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => { handleSubmit1(e) }}>
                        <div>
                            <div>
                                <div className="">
                                    <Label>Title</Label>  <span className="text-danger">*</span>
                                    <Input value={form1.title} onChange={(e) => { handleChange1(e) }} name="title" required type="text" placeholder="Enter Title" />
                                </div>
                                <div className="mt-3">
                                    <Label>Customers</Label>  <span className="text-danger">*</span>
                                    <Select
                                        name="userList"
                                        value={selectedMulti1}
                                        onChange={handleMulti1}
                                        options={options}
                                        required
                                        isMulti
                                    />
                                </div>
                                <div className="mt-3">
                                    <Label>Fcm Description</Label>  <span className="text-danger">*</span>
                                    <textarea className="form-control" value={form1.fcmDescription} onChange={(e) => { handleChange1(e) }} name="fcmDescription" required type="text" placeholder="Fcm Description" />
                                </div>

                                <div className="mt-3">
                                    <Label>Description</Label>  <span className="text-danger">*</span>
                                    <textarea className="form-control" value={form1.description} onChange={(e) => { handleChange1(e) }} name="description" required type="text" placeholder="Description" />
                                </div>

                                <div className="mt-3">
                                    <Label>Status</Label>  <span className="text-danger">*</span>
                                    <select className="form-select" value={form1.status} onChange={(e) => { handleChange1(e) }} name="status">
                                        <option value="active">Active</option>
                                        <option value="inactive">In Active</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="text-end mt-3">
                            <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={toggle} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </Form>
                </ModalBody>

            </Modal>

            <Modal size="sm" isOpen={show123} toggle={toggle123}>
                <ModalHeader toggle={toggle123}>Repaire Lanes</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => { handleSubmit1(e) }}>
                        <div>
                            <div>
                                <div className="mt-3">
                                    <Label>Date</Label>
                                    <Input type="date" placeholder="Enter date" />
                                </div>

                                <div className="mt-3">
                                    <Label>Time</Label>  <span className="text-danger">*</span>
                                    <select value={form1.type} onChange={(e) => { handleChange1(e) }} name="type" required className="form-select">
                                        <option value="">Select</option>
                                        <option value="08:00-09:00">08:00-09:00</option>
                                        <option value="09:00-10:00">09:00-10:00</option>
                                        <option value="10:00-11:00">10:00-11:00</option>
                                        <option value="11:00-12:00">11:00-12:00</option>
                                        <option value="12:00-13:00">12:00-13:00</option>
                                        <option value="13:00-14:00">13:00-14:00</option>
                                        <option value="14:00-15:00">14:00-15:00</option>
                                        <option value="15:00-16:00">15:00-16:00</option>
                                        <option value="16:00-17:00">16:00-17:00</option>
                                        <option value="17:00-18:00">17:00-18:00</option>
                                        <option value="18:00-19:00">18:00-19:00</option>
                                        <option value="19:00-20:00">19:00-20:00</option>
                                        <option value="20:00-21:00">20:00-21:00</option>
                                        <option value="21:00-22:00">21:00-22:00</option>
                                    </select>
                                </div>


                                <div className="mt-3">
                                    <Label> Status</Label>  <span className="text-danger">*</span>
                                    <select className="form-select" value={form1.status} onChange={(e) => { handleChange1(e) }} name="status">
                                        <option value="">Select</option>
                                        <option value="Manual">Repaire</option>
                                        <option value="Unrepaire">Unrepaire</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="text-end mt-3">
                            <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={toggle123} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </Form>
                </ModalBody>

            </Modal>

        </React.Fragment>
    );
};

export default Notifications;
