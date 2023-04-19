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
import Select from 'react-select'


const ResponsiveTables = () => {

    const options = [
        { value: '08:00-09:00', label: '08:00-09:00' },
        { value: '09:00-10:00', label: '09:00-10:00' },
        { value: '10:00-11:00', label: '10:00-11:00' },
        { value: '11:00-12:00', label: '11:00-12:00' },
        { value: '12:00-13:00', label: '12:00-13:00' },
        { value: '13:00-14:00', label: '13:00-14:00' },
        { value: '14:00-15:00', label: '14:00-15:00' },
        { value: '15:00-16:00', label: '15:00-16:00' },
        { value: '16:00-17:00', label: '16:00-17:00' },
        { value: '17:00-18:00', label: '17:00-18:00' },
        { value: '18:00-19:00', label: '18:00-19:00' },
        { value: '19:00-20:00', label: '19:00-20:00' },
        { value: '20:00-21:00', label: '20:00-21:00' },
        { value: '21:00-22:00', label: '21:00-22:00' }
    ]

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
    console.log(permissioins)
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

    const getAllLane = () => {
        var token = datas;
        axios.post(URL.allLanes, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setlane(res.data.LaneResult)
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

    const getLanetype = () => {
        var token = datas;
        // const params = {
        //     type: "RentalLine"
        // }
        axios.post(URL.plansrentalequipmentslanes, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setlanetype(res.data.planResult)
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
        getAllLane()
        getLanetype()
    }, [])


    const addLanes = () => {
        var token = datas;
        const params = {
            laneNumber: form.laneNumber,
            type: form.type,
            planId: form.planId,
        }
        axios.post(URL.addLanes, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    getAllLane();
                    setform("")
                    setFiles("")
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

    const editLaneslist = () => {
        var token = datas;
        var formid = form1._id
        const params = {
            laneNumber: form1.laneNumber,
            type: form1.type,
            planId: form1.planId,
            status: form1.status
        }
        axios.post(URL.editLanes + "/" + formid, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    toggle()
                    setshow1(false)
                    getAllLane();
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

    const deleteLanes = (data) => {
        var token = datas;
        var remid = data._id
        axios.delete(URL.deleteLanes + "/" + remid, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    getAllLane();

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
            deleteLanes(data);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addLanes();
        clearForm()
    };
    const handleSubmit1 = (e) => {
        e.preventDefault();
        editLaneslist();
        clearForm()
    };

    const clearForm = () => {
        setform({
            laneNumber: "",
            type: "",
            planId: "",
        });
    };
    const getpopup = (data) => {
        setform1(data);
        setshow1(true)
    };

    // const getpopup123 = (data) => {
    //     setform1(data);
    //     setshow123(true)
    // };

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
                `http://103.186.185.77:5027/acebatting/adminportal/lanes/searchlane?searchQuery=${e.target.value}`,
                {},

                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setlane(res.data.LaneResult)
            });
    };

//Lanes Repair

    const [selectedMulti, setselectedMulti] = useState()
    console.log(selectedMulti)
    const [lanedate, setlanedate] = useState()

    // function handleMulti(data) {
    //     setselectedMulti(data)
    //     console.log(data)
    // }

    const handleMulti = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setselectedMulti(selectedValues);
      }

    const datehandlechange = (e) =>{
        const myDate = {...lanedate};
        myDate[e.target.name] = e.target.value;
        setlanedate(myDate)
    }

    const LaneRepair = () => {
        var token = datas;
        const params = {
            laneId: form1._id,
            planId: form1.planId,
            date: lanedate.date,
            time: selectedMulti,
        }
        axios.post(URL.addlanerepairstatus, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    getAllLane();
                    setform("")
                    setshow123(false)
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

    const handleSubmit12 = (e) => {
        e.preventDefault();
        LaneRepair();
        // clearForm()
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
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Lanes" />
                    {permissioins.viewlane === true || roles === "admin" ? (

                        <Row>
                            <Col md={4}>
                                <Card className="p-4">
                                    <h5>Add New</h5>
                                    {permissioins.addlane === true || roles === "admin" ? (
                                        <Form onSubmit={(e) => { handleSubmit(e) }}>
                                            <div>

                                                <div className="mt-3">
                                                    <Label>Lane Number</Label>  <span className="text-danger">*</span>
                                                    <Input value={form.laneNumber} onChange={(e) => { handleChange(e) }} name="laneNumber" required type="number" placeholder="Enter Number" />
                                                </div>
                                                <div className="mt-3">
                                                    <Label>Type</Label>  <span className="text-danger">*</span>
                                                    <select value={form.type} onChange={(e) => { handleChange(e) }} name="type" required className="form-select">
                                                        <option value="">Select</option>
                                                        <option value="Manual">Manual</option>
                                                        <option value="machine">Machine</option>
                                                    </select>
                                                </div>
                                                <div className="mt-3">
                                                    <Label>Plan Name</Label>  <span className="text-danger">*</span>
                                                    <select value={form.planId} onChange={(e) => { handleChange(e) }} name="planId" required className="form-select">
                                                        <option value="">Select</option>
                                                        {lanetype.map((data, key) => (
                                                            <option key={key} value={data._id}>{data.name}</option>
                                                        ))}
                                                    </select>
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
                                                            Plan Name
                                                        </th>
                                                        <th>
                                                            Lane Number
                                                        </th>
                                                        <th>
                                                            Type
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
                                                                {(pageNumber - 1) * 5 + key + 6}
                                                            </th>
                                                            <td>
                                                                {data.planName}
                                                            </td>
                                                            <td>
                                                                {data.laneNumber}
                                                                {/* <img src={img1} style={{ width: "80px" }} /> */}
                                                            </td>

                                                            <td> {data.type} </td>
                                                            <td> {data.status} </td>
                                                            <td>
                                                                {permissioins.editlane === true || roles === "admin" ? (
                                                                    <Button onClick={() => {
                                                                        getpopup(data);
                                                                    }} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>

                                                                ) : (
                                                                    ""
                                                                )}
                                                                {/* {permissioins.editlane === true || roles === "admin" ? (
                                                                    <Button onClick={() => {
                                                                        getpopup123(data);
                                                                    }} size="sm" className="m-1" outline color="warning"><i style={{ fontSize: "14px" }} className="fa fa-bars" aria-hidden="true"></i></Button>

                                                                ) : (
                                                                    ""
                                                                )} */}
                                                                {permissioins.dellane === true || roles === "admin" ? (

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
                <ModalHeader toggle={toggle}>Edit Lanes</ModalHeader>
                <ModalBody>
                    <Form onSubmit={(e) => { handleSubmit1(e) }}>
                        <div>
                            <div>

                                <div className="">
                                    <Label>Lane Number</Label>  <span className="text-danger">*</span>
                                    <Input value={form1.laneNumber} onChange={(e) => { handleChange1(e) }} name="laneNumber" required type="number" placeholder="Enter Number" />
                                </div>
                                <div className="mt-3">
                                    <Label>Type</Label>  <span className="text-danger">*</span>
                                    <select value={form1.type} onChange={(e) => { handleChange1(e) }} name="type" required className="form-select">
                                        <option value="">Select</option>
                                        <option value="Manual">Manual</option>
                                        <option value="machine">Machine</option>
                                    </select>
                                </div>
                                <div className="mt-3">
                                    <Label>Plan Name</Label>  <span className="text-danger">*</span>
                                    <select value={form1.planId} onChange={(e) => { handleChange1(e) }} name="planId" required className="form-select">
                                        <option value="">Select</option>
                                        {lanetype.map((data, key) => (
                                            <option key={key} value={data._id}>{data.name}</option>
                                        ))}
                                    </select>
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
                    <Form onSubmit={(e) => { handleSubmit12(e) }}>
                        <div>
                            <div>
                                <div className="">
                                    <Label>Date</Label>
                                    <Input onChange={(e) =>{datehandlechange(e)}} name="date" type="date" placeholder="Enter date" />
                                </div>

                                <div className="mt-3">
                                    <Label>Time</Label>  <span className="text-danger">*</span>
                                    <Select
                                        // value={selectedMulti}
                                        onChange={handleMulti}
                                        required
                                        name="time"
                                        isMulti 
                                        options={options} 
                                        />
                                    {/* <select value={form1.type} onChange={(e) => { handleChange1(e) }} name="type" required className="form-select">
                                        <option value="">Select</option>

                                       
                                    </select> */}
                                </div>


                                {/* <div className="mt-3">
                                    <Label> Status</Label>  <span className="text-danger">*</span>
                                    <select className="form-select" value={form1.status} onChange={(e) => { handleChange1(e) }} name="status">
                                    <option value="">Select</option>
                                    <option value="Manual">Repaire</option>
                                        <option value="Unrepaire">Unrepaire</option>
                                    </select>
                                </div> */}
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

export default ResponsiveTables;
