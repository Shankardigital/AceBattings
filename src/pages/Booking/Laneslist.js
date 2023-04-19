import React, { useEffect, useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import img1 from "../../assets/images/letast/acelogo.png"
import trash from "../../assets/images/letast/trash.gif"
import { URL } from "Apiurls";
import axios from "axios";
import ReactPaginate from 'react-paginate';

const ResponsiveTables = () => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);
    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";

    const [booking, setbooking] = useState([])
    const [form, setform] = useState([])
    console.log(form)
    const [forms, setforms] = useState([]);

    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    const permissioins = data.user.permissions[0]
    const roles = data.user.role

    const hiddenIds = ["Classes", "Clinics", "Membership","PayasYouGo", "Team_subcription"];
    const filteredData = booking.filter((item) => !hiddenIds.includes(item.type));

    const handleChange = (e) => {
        const myform = { ...form }
        myform[e.target.name] = e.target.value;
        setform(myform)
    }

    const getbookinglist = () => {
        var token = datas;
        axios.post(URL.getallbooking, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setbooking(res.data.BookingResult)
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

    const cancelbooking = () => {
        var token = datas;
        const bojid = form._id
        const bodydata = {
            cancelReason: form.cancelReason,
            type: form.type
        }
        axios.post(URL.cancelbooking + "/" + bojid, bodydata, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            getbookinglist()
            setshow1(false)
            // setbooking(res.data.BookingResult)
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

    const formSubmit = (e) => {
        e.preventDefault();
        cancelbooking()
    }

    const formdata = (data) => {
        setform(data)
        setshow1(true)
    }

    const handlechange = (e) => {
        let myUser = { ...forms };
        myUser[e.target.name] = e.target.value;
        setforms(myUser);
        console.log(myUser)
        var token = datas;
        axios
            .post(
                `http://103.186.185.77:5027/acebatting/adminportal/booking/searchbooking?searchQuery=${e.target.value}`,
                {},

                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setbooking(res.data.bookingResult)
            });
    };

    useEffect(() => {
        getbookinglist()
    }, [])

    const [listPerPage] = useState(10);
    const [pageNumber, setPageNumber] = useState(0);

    const pagesVisited = pageNumber * listPerPage;
    const lists = filteredData.slice(pagesVisited, pagesVisited + listPerPage);
    const pageCount = Math.ceil(filteredData.length / listPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Booking list" />

                    {permissioins.bookinglist === true || roles === "admin" ? (

                        <Row>
                            <Col md={12}>
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
                                                    type="search" 
                                                    placeholder="Search..." />
                                                </div>
                                            </Col>
                                        </Row>
                                        {/* <CardTitle>Example </CardTitle>
                  <CardSubtitle className="mb-3">
                    This is an experimental awesome solution for responsive
                    tables with complex data.
                  </CardSubtitle> */}

                                        <div className="table-rep-plugin mt-4">
                                            <Table hover bordered responsive>
                                                <thead>
                                                    <tr>
                                                        <th>
                                                            Sl No
                                                        </th>
                                                        <th>
                                                            Date
                                                        </th>
                                                        <th>
                                                            Booking No
                                                        </th>
                                                        <th>
                                                            Plan Name
                                                        </th>
                                                        <th>
                                                            Customer
                                                        </th>
                                                        <th>
                                                            Amount
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
                                                                {(pageNumber - 1) * 10 + key + 11}
                                                            </th>
                                                            <td>
                                                                {data.date}
                                                            </td>
                                                            <td>
                                                                {data.bookingNo}
                                                            </td>
                                                            <td>
                                                                {data.planName}
                                                            </td>
                                                            <td>
                                                                {data.customerName}
                                                            </td>
                                                            <td>
                                                                $ {data.totalAmount}
                                                            </td>
                                                            <td>
                                                                {data.status}
                                                            </td>


                                                            <td>
                                                            {permissioins.bookingcan === true || roles === "admin" ? (
                                                                <>
                                                                  {data.status == "canceled" ?(
                                                                    <Button disabled onClick={() => { formdata(data) }} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="fa fa-times-circle"></i></Button>
                                                                ) : (
                                                                    <Button onClick={() => { formdata(data) }} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="fa fa-times-circle"></i></Button>
                                                                )}
                                                                </>):"-"}
                                                                {/* <Button onClick={toggle} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button> */}
                                                              
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
            </div>
            <Modal size="sm" isOpen={show1} toggle={toggle}>
                {/* <ModalHeader toggle={toggle}></ModalHeader> */}
                <ModalBody>
                    <div>
                        {/* <div className="text-center">
                            <img style={{ width: "280px" }} src={trash} />
                        </div> */}
                        <form onSubmit={(e) => { formSubmit(e) }}>
                            <div className="mt-2">
                                <label>Reason</label><span className="text-danger">*</span>
                                <textarea onChange={(e) => { handleChange(e) }} value={form.cancelReason} name="cancelReason" className="form-control" placeholder="Enter Reason" required />
                            </div>
                            <div className="text-end mt-2">
                                <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
                                <Button type="button" onClick={toggle} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                            </div>
                        </form>
                    </div>

                </ModalBody>

            </Modal>
        </React.Fragment>
    );
};

export default ResponsiveTables;
