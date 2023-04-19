import React, { useEffect, useState } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
// import img1 from "../../assets/images/letast/acelogo.png"
import trash from "../../assets/images/letast/trash.gif"
import { useHistory } from "react-router-dom";
import { URL } from "../../Apiurls";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import toast, { Toaster } from 'react-hot-toast';


const ResponsiveTables = ({ message, duration }) => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);
    const [roles, setroles] = useState([])
    const [form, setform] = useState([])

    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    const permissioins = data.user.permissions[0]
    const roless = data.user.role

    const history = useHistory()
    const getAllRoles = () => {
        var token = datas;
        axios.post(URL.allRoles, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setroles(res.data.roleResult)
        })
    }

    const Rolessearch = (e) => {
        const myUser = { ...form }
        myUser[e.target.name] = e.target.value
        setform(myUser)

        const token = datas
        console.log(token)
        axios.post(`http://103.186.185.77:5027/acebatting/adminportal/roles/searchrole?searchQuery=${e.target.value}`, {},
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        ).then((res) => {
            if (res.status === 200) {
                // toast.success(res.data.message);
                console.log(res.data)
                setroles(res.data.roleResult)
            }
        },
            (error) => {
                if (error.response && error.response.status === 400) {
                    toast.error(error.response.data.message);
                }
            }
        )

    }

    const redirct =(data)=>{
        sessionStorage.setItem("roleid", data._id)
        history.push("/editrole")
    }

    const [listPerPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)

    const pagesVisited = pageNumber * listPerPage
    const lists = roles.slice(pagesVisited, pagesVisited + listPerPage)
    const pageCount = Math.ceil(roles.length / listPerPage)
    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    useEffect(() => {
        if (message !== "") {
          toast.success(message, { autoClose: duration });
        }
        getAllRoles();
      }, [message, duration]);

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container-fluid">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Roles list" />
                    {permissioins.roleView === true || roless === "admin" ? (
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
                                                <Input type="search"
                                                    name="search"
                                                    value={form.search}
                                                    onChange={Rolessearch}
                                                    placeholder="Search..." />
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
                                                        Role Name
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
                                                            {data.role}
                                                        </td>
                                                        <td>
                                                            {data.status}
                                                        </td>
                                                        <td>
                                                            {/* <Link to="/editrole" > */}
                                                                <Button onClick={()=>{redirct(data)}} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button>
                                                            {/* </Link> */}
                                                            {/* <Button onClick={toggle} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="bx bx-trash"></i></Button> */}
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
                     ):(
                        <Card>
                        <h5 className="text-center p-1">You don't have permission to access</h5>
                    </Card>
                    )}
                </div>
            </div>
            <Toaster/>
            <Modal size="sm" isOpen={show1} toggle={toggle}>
                {/* <ModalHeader toggle={toggle}></ModalHeader> */}
                <ModalBody>
                    <div>
                        <div className="text-center">
                            <img style={{ width: "280px" }} src={trash} />
                        </div>
                        <h5 className="text-center">Do you want delete</h5>
                        <div className="text-end mt-2">
                            <Button type="submit" color="danger m-1" outline>Yes <i className="bx bx-check-circle"></i></Button>
                            <Button type="button" onClick={toggle} color="secondary m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

                        </div>
                    </div>

                </ModalBody>

            </Modal>
        </React.Fragment>
    );
};

export default ResponsiveTables;
