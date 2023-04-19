import React, { useState, useEffect } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { Link, useHistory } from "react-router-dom";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import img1 from "../../assets/images/letast/acelogo.png"
import trash from "../../assets/images/letast/trash.gif"
import { URL } from "../../Apiurls"
import axios from "axios"
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';


const ResponsiveTables = ({ message, duration }) => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);
    const [form, setform] = useState([])
    const [form1, setform1] = useState([])
    const [form2, setform2] = useState([])
    console.log(form2)
    const [plans, setplans] = useState([])
    const history = useHistory()
    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    const permissioins = data.user.permissions[0]
    const roles = data.user.role

    const getPlans = () => {
        var token = datas;
        axios.post(URL.allPlans, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setplans(res.data.planResult)
        })
    }

    const plansid = (data) => {
        console.log(data)
        sessionStorage.setItem("planid", data._id)
        history.push("/editplan")
    }

    const datapass = (data) => {
        setform2(data)
        setshow1(true)
    }

    const getPlandelete = () => {
        const params = form2._id
        var token = datas;
        axios.delete(URL.deleteplan + "/" + params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status === 200) {
                toast.success(res.data.message);
                console.log(res.data)
                getPlans()
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

    const planssearch = (e) => {
        const myUser = { ...form1 }
        myUser[e.target.name] = e.target.value
        setform1(myUser)

        const token = datas
        console.log(token)
        axios.post(URL.plansrearch + `${e.target.value}`, {},
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        ).then((res) => {
            if (res.status === 200) {
                // toast.success(res.data.message);
                // console.log(res.data)
                setplans(res.data.planResult)
            }
        },
            (error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                }
            }
        )

    }

    useEffect(() => {
        getPlans()
        if (message == "") {
            ""
        } else {
            { toast.success(message, { autoClose: duration }) }
        }

    }, [])

    const [listPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)

    const pagesVisited = pageNumber * listPerPage
    const lists = plans.slice(pagesVisited, pagesVisited + listPerPage)
    const pageCount = Math.ceil(plans.length / listPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    //meta title
    //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Plans & Packages" />
                    {permissioins.planeview === true || roles === "admin" ? (

                        <Row>
                            <Col>
                                {/* {show == true ? (
                                <Card className="p-4">
                                    <Form>
                                        <h5>Add New Plan</h5>
                                        <Row>
                                            <Col md="3">
                                                <Label>First Name</Label>  <span className="text-danger">*</span>
                                                <Input required type="text" placeholder="Enter First Name" />
                                            </Col>
                                            <Col md="3">
                                                <Label>Last Name</Label>  <span className="text-danger">*</span>
                                                <Input required type="text" placeholder="Enter Last Name" />
                                            </Col>
                                            <Col md="3">
                                                <Label>Email Id</Label> <span className="text-danger">*</span>
                                                <Input required type="text" placeholder="Enter Email" />
                                            </Col>
                                            <Col md="3">
                                                <Label>Mobile No</Label> <span className="text-danger">*</span>
                                                <div className="input-group mb-3">
                                                    <div className="input-group-prepend">
                                                        <select required className="form-select">
                                                            <option value="+1">+1 </option>
                                                            <option value="+1">+91 </option>
                                                            <option value="+1">+44 </option>
                                                        </select>
                                                    </div>
                                                    <Input required type="text" className="form-control" placeholder="Enter Mobile No" aria-label="Username" aria-describedby="basic-addon1" />
                                                </div>
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
                            )} */}
                                <Card>
                                    <CardBody>
                                        <Row>
                                            <Col>
                                                {permissioins.planadd === true || roles === "admin" ? (
                                                    <Link to="/newplans">
                                                        <Button color="primary" >New Plan <i className="bx bx-plus-circle"></i></Button>
                                                    </Link>
                                                ) : (
                                                    ""
                                                )}
                                            </Col>
                                            <Col>
                                                <div>


                                                    {/* {message == undefined ? (
                                                        ""
                                                    ) : (
                                                        <div>
                                                            {toast.success(message, { autoClose: duration })}
                                                        </div>
                                                    )} */}

                                                </div>
                                            </Col>
                                            <Col>
                                                <div style={{ float: "right" }}>
                                                    <Input
                                                        name="search"
                                                        value={form1.search}
                                                        onChange={planssearch}
                                                        type="search"
                                                        placeholder="Search..." />
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
                                                            Images
                                                        </th>
                                                        <th>
                                                            Name
                                                        </th>
                                                        <th>
                                                            Type
                                                        </th>
                                                        <th>
                                                            Game Type
                                                        </th>
                                                        <th>
                                                            Price
                                                        </th>
                                                        <th>
                                                            Ball
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
                                                                {data.image == "" || data.image == undefined ? (
                                                                    <img src={img1} style={{ width: "70px" }} />
                                                                ) : (
                                                                    <img src={`http://103.186.185.77:5027/${data.image}`} style={{ width: "70px" }} />
                                                                )}
                                                            </td>

                                                            <td>
                                                                {data.name}
                                                            </td>
                                                            <td>
                                                                {data.type}
                                                            </td>
                                                            <td>
                                                                {data.gameType == "undefined" ? (
                                                                    <span> -</span>
                                                                ) : (
                                                                    <div> {data.gameType == "circket" ?(
                                                                        "Cricket"
                                                                    ) :(
                                                                        <span>{data.gameType}</span>
                                                                    )}</div>
                                                                )}

                                                            </td>
                                                            <td>
                                                                $ {data.price}
                                                            </td>
                                                            <td>
                                                                {data.ballCredits}
                                                            </td>
                                                            <td>
                                                                {data.status}
                                                            </td>
                                                            <td>
                                                                {/* <Link to="/editplan"> */}
                                                                {permissioins.planedit === true || roles === "admin" ? (
                                                                    <Button onClick={() => { plansid(data) }} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>
                                                                ) : (
                                                                    ""
                                                                )}
                                                                {/* </Link> */}
                                                                {permissioins.plandelete === true || roles === "admin" ? (
                                                                    <Button onClick={() => { datapass(data) }} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button>
                                                                ) : (
                                                                    ""
                                                                )}
                                                            </td>
                                                        </tr>
                                                    ))}

                                                </tbody>
                                            </Table>
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
            <Modal size="sm" isOpen={show1} toggle={toggle}>
                {/* <ModalHeader toggle={toggle}></ModalHeader> */}
                <ModalBody>
                    <div>
                        <div className="text-center">
                            <img style={{ width: "280px" }} src={trash} />
                        </div>
                        <h5 className="text-center">Do you want delete</h5>
                        <div className="text-end mt-2">
                            <Button onClick={() => { getPlandelete() }} type="button" color="danger m-1" outline>Yes <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={toggle} color="secondary m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </div>

                </ModalBody>

            </Modal>

        </React.Fragment>
    );
};

export default ResponsiveTables;
