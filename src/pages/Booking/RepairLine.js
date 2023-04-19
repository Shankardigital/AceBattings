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

    const [show1, setshow1] = useState(false)
    const [show123, setshow123] = useState(false)
    const toggle = () => setshow1(!show1);
    const toggle123 = () => setshow123(!show123);

    const [lane, setlane] = useState([])
    const [alllanes, setalllanes] = useState([])
    const [lanetype, setlanetype] = useState([])

    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    const permissioins = data.user.permissions[0]
    const roles = data.user.role

    const getAllLane = () => {
        var token = datas;
        axios.post(URL.getrepairlane, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setlane(res.data.repairLane)
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
        // getallactivelanes()
    }, [])

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
                `http://103.186.185.77:5027/acebatting/adminportal/lanes/getrepairlane?searchQuery=${e.target.value}`,
                {},

                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setlane(res.data.repairLane)
            });
    };

    //Lanes Repair

    const [selectedMulti, setselectedMulti] = useState([])
    console.log(selectedMulti)
    const [lanedate, setlanedate] = useState([])
    console.log(lanedate)

    // function handleMulti(data) {
    //     setselectedMulti(data)
    //     console.log(data)
    // }

    const handleMulti = (selectedOptions) => {
        const selectedValues = selectedOptions.map((option) => option.value);
        setselectedMulti(selectedValues);
    }

    const datehandlechange1 = (e) => {
        const myDate = { ...lanedate };
        myDate[e.target.name] = e.target.value;
        setlanedate(myDate)
        var token = datas;
        const params = {
            planId :e.target.value
        }
        axios.post(URL.getlanenumbyplanid, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setalllanes(res.data.LaneResult)
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
    const datehandlechange = (e) => {
        const myDate = { ...lanedate };
        myDate[e.target.name] = e.target.value;
        setlanedate(myDate)
    }

    const LaneRepair = () => {
        var token = datas;
        const params = {
            laneId: lanedate.laneId,
            planId: lanedate.planId,
            date: lanedate.date,
            time: selectedMulti,
        }
        axios.post(URL.addlanerepairstatus, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    setselectedMulti([])
                    clearForm()
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

    const clearForm = () => {
        setlanedate({
            laneId: "",
            planId: "",
            date: "",
        });
    };

    const handleSubmit12 = (e) => {
        e.preventDefault();
        LaneRepair();
        setselectedMulti([])
        // clearForm()
    };

    const deleteLanes = (data) => {
        var token = datas;
        const params = {
            id: data._id,
            laneId: data.laneId,
            planId: data.planId,
            date: data.date,
            time: data.time,
        }
        axios.post(URL.deleterepairedlanes, params, {
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
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Repair Lanes" />
                    {permissioins.viewlane === true || roles === "admin" ? (

                        <Row>
                            <Col md={4}>
                                <Card className="p-4">
                                    <h5>Add Repair Lane</h5>
                                    {permissioins.addlane === true || roles === "admin" ? (
                                        <Form onSubmit={(e) => { handleSubmit12(e) }}>
                                            <div>
                                                <div>
                                                    <div className="">
                                                        <Label>Date</Label> <span className="text-danger">*</span>
                                                        <Input required value={lanedate.date} onChange={(e) => { datehandlechange(e) }} name="date" type="date" placeholder="Enter date" />
                                                    </div>

                                                    <div className="mt-3">
                                                        <Label>Plan Name</Label>  <span className="text-danger">*</span>
                                                        <select value={lanedate.planId} onChange={(e) => { datehandlechange1(e) }} name="planId" required className="form-select">
                                                            <option value="">Select</option>
                                                            {lanetype.map((data, key) => (
                                                                <option key={key} value={data._id}>{data.name}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="mt-3">
                                                        <Label>Lane Number</Label>  <span className="text-danger">*</span>
                                                        <select value={lanedate.laneId} onChange={(e) => { datehandlechange(e) }} name="laneId" required className="form-select">
                                                            <option value="">Select</option>
                                                            {alllanes.map((data, key) => (
                                                                <option key={key} value={data._id}>{data.laneNumber}</option>
                                                            ))}
                                                        </select>
                                                    </div>

                                                    <div className="mt-3">
                                                        <Label>Time</Label>  <span className="text-danger">*</span>
                                                        <Select
                                                            value={options.filter((option) => selectedMulti.includes(option.value))}
                                                            onChange={handleMulti}
                                                            required
                                                            name="time"
                                                            isMulti
                                                            options={options}
                                                        />

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-end mt-3">
                                                <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                                                {/* <Button type="button" onClick={toggle123} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button> */}

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
                                                            Date
                                                        </th>
                                                        <th>
                                                            Slots
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

                                                            <td> {data.date} </td>
                                                            <td> {data.time}  </td>
                                                            <td> {data.status} </td>
                                                            <td>
                                                                {/* {permissioins.editlane === true || roles === "admin" ? (
                                                                    <Button onClick={() => {
                                                                        getpopup(data);
                                                                    }} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>

                                                                ) : (
                                                                    ""
                                                                )}
                                                                {permissioins.editlane === true || roles === "admin" ? (
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
           



        </React.Fragment>
    );
};

export default ResponsiveTables;
