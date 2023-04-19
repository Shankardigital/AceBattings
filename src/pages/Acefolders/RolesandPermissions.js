import React, { useState, useEffect } from "react"
import {
    CardBody,
    CardHeader,
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    Form,
    Label,
    Input
} from "reactstrap"
import axios from "axios"
import Select from "react-select"
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { URL } from "../../Apiurls"
import { useHistory } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import Rolelist from '../Acefolders/Rolelist'

const Roles = () => {
    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    console.log(datas)
    const permissioins = data.user.permissions[0]
    const roless = data.user.role

    const check = {
        dashview: false,
        customerView: false,
        customerAdd: false,
        customerEdit: false,
        roleView: false,
        roleAdd: false,
        roleEdit: false,
        roleDelete: false,
        empView: false,
        empAdd: false,
        empEdit: false,
        planeview: false,
        planadd: false,
        planedit: false,
        plandelete: false,
        viewlane: false,
        addlane: false,
        editlane: false,
        dellane: false,
        banner: false,
        addbanner: false,
        editbanner: false,
        delbanner: false,
        subcribes: false,
        bookinglist: false,
        laneview: false,
        coupon: false,
        addcoupon: false,
        editcoupon: false,
        delcoupon: false,
        bookingcan: false,
        subcribescan: false,
        batchview: false,
        batchedit: false,
        otherview: false,
        otheredit: false,
        notview: false,
        notadd: false,
        notdel: false
    }

    const [roles, setroles] = useState([check])
    console.log(roles)
    const [form, setform] = useState([])
    let history = useHistory();

    const handleChange1 = e => {
        const myUser = { ...roles }
        myUser[e.target.name] = (e.target.checked)
        setroles(myUser)
        console.log(myUser)
    }
    const handleChange = e => {
        const myUser = { ...form }
        myUser[e.target.name] = (e.target.value)
        setform(myUser)
    }

    const Addrole = () => {
        const token = datas
        const params = {
            role: form.role,
            permissions: [roles]
        }
        axios.post(URL.addRole, params,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then(
                res => {
                    if (res.status === 200) {
                        toast.success(res.data.message)
                        history.push("/rolelist")
                        return <Rolelist message={res.data.message} duration={5000} />

                    }
                },
                error => {
                    if (error.response && error.response.status === 400) {
                        toast(error.response.data.message)
                    }
                }
            )
    }

    const handleSubmit = e => {
        e.preventDefault()
        Addrole()
    }


    return (
        <React.Fragment>
            <div className="page-content">
                <Container>
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Add Roles" />
                    {permissioins.roleAdd === true || roless === "admin" ? (
                        <Row>
                            <Col md={12}>
                                <Card>
                                    <CardHeader className="bg-white mt-2" >
                                        <CardTitle>Role & Permissions</CardTitle>
                                    </CardHeader>

                                    <CardBody >
                                        <Form
                                            onSubmit={e => {
                                                handleSubmit(e)
                                            }}
                                        >
                                            <Row>
                                                <Col md={4}>
                                                    <Label>Role</Label>
                                                    <Input onChange={(e) => { handleChange(e) }} name="role" type="text" placeholder="Enter Role Name" />
                                                    {/* <Select
                                                    name="employeeId"
                                                    value={selectedMulti1}
                                                    onChange={handleMulti}
                                                    options={empid}
                                                    required
                                                /> */}
                                                </Col>
                                            </Row>
                                            <Row className=" mt-3">
                                                {/* <h5 className="  ">Role Permissions</h5> */}
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Dashboard: </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                {/* <Col md={2}>
                                               < div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.allordersview}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.allordersview}
                                                            name="allordersview"
                                                            type='checkbox' id="read" />
                                                        <Label className='form-check-label' for="read">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col> */}
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.dashview}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.dashview}
                                                            name="dashview"
                                                            type='checkbox' id="read2" />
                                                        <Label className='form-check-label' for="read2">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                {/* <Col md={2}>
                                                <div className='form-check me-3 me-lg-5'>
                                                    <Input defaultChecked={roles.orderAdd}
                                                        onClick={e => {
                                                            handleChange1(e)
                                                        }}
                                                        value={roles.orderAdd}
                                                        name="orderAdd"
                                                        type='checkbox' id="read" />
                                                    <Label className='form-check-label' for="read">
                                                        Add
                                                    </Label>
                                                </div>
                                            </Col>
                                            <Col md={2}>
                                                <div className='form-check me-3 me-lg-5'>
                                                    <Input defaultChecked={roles.orderEdit}
                                                        onClick={e => {
                                                            handleChange1(e)
                                                        }}
                                                        value={roles.orderEdit}
                                                        name="orderEdit"
                                                        type='checkbox' id="read1" />
                                                    <Label className='form-check-label' for="read1">
                                                        Edit
                                                    </Label>
                                                </div>
                                            </Col>

                                            <Col md={2}>
                                                <div className='form-check me-3 me-lg-5'>
                                                    <Input
                                                        defaultChecked={roles.orderDelete}
                                                        onClick={e => {
                                                            handleChange1(e)
                                                        }}
                                                        value={roles.orderDelete}
                                                        name="orderDelete"
                                                        type='checkbox' id="read3" />
                                                    <Label
                                                        className='form-check-label' for="read3">
                                                        Delete
                                                    </Label>
                                                </div>
                                            </Col>{" "} */}
                                                <Col md={1}></Col>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Customer : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.customerView}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.customerView}
                                                            name="customerView"
                                                            type='checkbox' id="customerView" />
                                                        <Label className='form-check-label' for="customerView">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.customerAdd}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.customerAdd}
                                                            name="customerAdd"
                                                            type='checkbox' id="customerAdd" />
                                                        <Label className='form-check-label' for="customerAdd">
                                                            Add
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.customerEdit}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.customerEdit}
                                                            name="customerEdit"
                                                            type='checkbox' id="customerEdit" />
                                                        <Label className='form-check-label' for="customerEdit">
                                                            Edit
                                                        </Label>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input disabled type='checkbox' id="custread32" />
                                                        <Label className='form-check-label' for="custread32">
                                                            Delete
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Roles & Permissions : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.roleView}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.roleView}
                                                            name="roleView"
                                                            type='checkbox' id="roleView" />
                                                        <Label className='form-check-label' for="roleView">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.roleAdd}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.roleAdd}
                                                            name="roleAdd"
                                                            type='checkbox' id="roleAdd" />
                                                        <Label className='form-check-label' for="roleAdd">
                                                            Add
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.roleEdit}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.roleEdit}
                                                            name="roleEdit"
                                                            type='checkbox' id="roleEdit" />
                                                        <Label className='form-check-label' for="roleEdit">
                                                            Edit
                                                        </Label>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.roleDelete}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            disabled
                                                            value={roles.roleDelete}
                                                            name="roleDelete"
                                                            type='checkbox' id="roleDelete" />
                                                        <Label className='form-check-label' for="roleDelete">
                                                            Delete
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Employees : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.empView}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.empView}
                                                            name="empView"

                                                            type='checkbox' id="empView" />
                                                        <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="empView">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.empAdd}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.empAdd}
                                                            name="empAdd"
                                                            type='checkbox' id="empAdd" />
                                                        <Label className='form-check-label' for="empAdd">
                                                            Add
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.empEdit}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.empEdit}
                                                            name="empEdit"
                                                            type='checkbox' id="empEdit" />
                                                        <Label className='form-check-label' for="empEdit">
                                                            Edit
                                                        </Label>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input disabled type='checkbox' id="empl3" />
                                                        <Label className='form-check-label' for="empl3">
                                                            Delete
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Plans & Packages : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.planeview}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.planeview}
                                                            name="planeview"

                                                            type='checkbox' id="planeview" />
                                                        <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="planeview">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.planadd}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.planadd}
                                                            name="planadd"
                                                            type='checkbox' id="planadd" />
                                                        <Label className='form-check-label' for="planadd">
                                                            Add
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.planedit}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.planedit}
                                                            name="planedit"
                                                            type='checkbox' id="planedit" />
                                                        <Label className='form-check-label' for="planedit">
                                                            Edit
                                                        </Label>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.plandelete}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.plandelete}
                                                            name="plandelete"
                                                            type='checkbox' id="plandelete" />
                                                        <Label className='form-check-label' for="plandelete">
                                                            Delete
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Lanes : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.viewlane}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.viewlane}
                                                            name="viewlane"

                                                            type='checkbox' id="viewlane" />
                                                        <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="viewlane">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.addlane}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.addlane}
                                                            name="addlane"
                                                            type='checkbox' id="addlane" />
                                                        <Label className='form-check-label' for="addlane">
                                                            Add
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.editlane}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.editlane}
                                                            name="editlane"
                                                            type='checkbox' id="editlane" />
                                                        <Label className='form-check-label' for="editlane">
                                                            Edit
                                                        </Label>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.dellane}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.dellane}
                                                            name="dellane"
                                                            type='checkbox' id="dellane" />
                                                        <Label className='form-check-label' for="dellane">
                                                            Delete
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Banners : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.banner}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.banner}
                                                            name="banner"

                                                            type='checkbox' id="banner" />
                                                        <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="banner">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.addbanner}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.addbanner}
                                                            name="addbanner"
                                                            type='checkbox' id="addbanner" />
                                                        <Label className='form-check-label' for="addbanner">
                                                            Add
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.editbanner}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.editbanner}
                                                            name="editbanner"
                                                            type='checkbox' id="editbanner" />
                                                        <Label className='form-check-label' for="editbanner">
                                                            Edit
                                                        </Label>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.delbanner}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.delbanner}
                                                            name="delbanner"
                                                            type='checkbox' id="delbanner" />
                                                        <Label className='form-check-label' for="delbanner">
                                                            Delete
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Coupon  : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.coupon}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.coupon}
                                                            name="coupon"

                                                            type='checkbox' id="coupon" />
                                                        <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="coupon">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.addcoupon}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.addcoupon}
                                                            name="addcoupon"
                                                            type='checkbox' id="addcoupon" />
                                                        <Label className='form-check-label' for="addcoupon">
                                                            Add
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.editcoupon}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.editcoupon}
                                                            name="editcoupon"
                                                            type='checkbox' id="editcoupon" />
                                                        <Label className='form-check-label' for="editcoupon">
                                                            Edit
                                                        </Label>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.delcoupon}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.delcoupon}
                                                            name="delcoupon"
                                                            type='checkbox' id="delcoupon" />
                                                        <Label className='form-check-label' for="delcoupon">
                                                            Delete
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Notifications  : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.notview}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.notview}
                                                            name="notview"

                                                            type='checkbox' id="notview" />
                                                        <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="notview">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.notadd}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.notadd}
                                                            name="notadd"
                                                            type='checkbox' id="notadd" />
                                                        <Label className='form-check-label' for="notadd">
                                                            Add
                                                        </Label>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.notdel}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.notdel}
                                                            name="notdel"
                                                            type='checkbox' id="notdel" />
                                                        <Label className='form-check-label' for="notdel">
                                                            Delete
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Batch : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.batchview}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.batchview}
                                                            name="batchview"

                                                            type='checkbox' id="batchview" />
                                                        <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="batchview">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.batchedit}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.batchedit}
                                                            name="batchedit"
                                                            type='checkbox' id="batchedit" />
                                                        <Label className='form-check-label' for="batchedit">
                                                            Edit
                                                        </Label>
                                                    </div>
                                                </Col>


                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Others : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.otherview}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.otherview}
                                                            name="otherview"

                                                            type='checkbox' id="otherview" />
                                                        <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="otherview">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>

                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.otheredit}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.otheredit}
                                                            name="otheredit"
                                                            type='checkbox' id="otheredit" />
                                                        <Label className='form-check-label' for="otheredit">
                                                            Edit
                                                        </Label>
                                                    </div>
                                                </Col>


                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Subscribes : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                {/* <Col md={2}>
                                                <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.ExpeView}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.ExpeView}
                                                            name="ExpeView"
                                                            type='checkbox' id="dept2" />
                                                        <Label className='form-check-label' for="dept2">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col> */}

                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.subcribes}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.subcribes}
                                                            name="subcribes"
                                                            type='checkbox' id="subcribes" />
                                                        <Label
                                                            // onClick={e => { handleChange1(e) }}

                                                            className='form-check-label' for="subcribes">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.subcribescan}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.subcribescan}
                                                            name="subcribescan"
                                                            type='checkbox' id="subcribescan" />
                                                        <Label className='form-check-label' for="subcribescan">
                                                            Cancel
                                                        </Label>
                                                    </div>
                                                </Col>
                                                {/* <Col md={3}>
                                                <div className='form-check me-3 me-lg-5'>
                                                    <Input defaultChecked={roles.subcategories}
                                                        onClick={e => {
                                                            handleChange1(e)
                                                        }}
                                                        value={roles.subcategories}
                                                        name="subcategories"
                                                        type='checkbox' id="Expen1" />
                                                    <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="Expen1">
                                                        Sub-Categories
                                                    </Label>
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <div className='form-check me-3 me-lg-5'>
                                                    <Input defaultChecked={roles.expence}
                                                        onClick={e => {
                                                            handleChange1(e)
                                                        }}
                                                        value={roles.expence}
                                                        name="expence"
                                                        type='checkbox' id="Expen2" />
                                                    <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="Expen2">
                                                        Expenses List
                                                    </Label>
                                                </div>
                                            </Col> */}

                                                <Col md={1}></Col>
                                            </Row>
                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Booking List : </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.bookinglist}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.bookinglist}
                                                            name="bookinglist"
                                                            type='checkbox' id="bookinglist" />
                                                        <Label
                                                            // onClick={e => { handleChange1(e) }}

                                                            className='form-check-label' for="bookinglist">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                <Col md={2}>
                                                    <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.bookingcan}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.bookingcan}
                                                            name="bookingcan"
                                                            type='checkbox' id="bookingcan" />
                                                        <Label className='form-check-label' for="bookingcan">
                                                            Cancel
                                                        </Label>
                                                    </div>
                                                </Col>
                                                {/* <Col md={3}>
                                                <div className='form-check me-3 me-lg-5'>
                                                    <Input defaultChecked={roles.subcategories}
                                                        onClick={e => {
                                                            handleChange1(e)
                                                        }}
                                                        value={roles.subcategories}
                                                        name="subcategories"
                                                        type='checkbox' id="Expen1" />
                                                    <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="Expen1">
                                                        Sub-Categories
                                                    </Label>
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <div className='form-check me-3 me-lg-5'>
                                                    <Input defaultChecked={roles.expence}
                                                        onClick={e => {
                                                            handleChange1(e)
                                                        }}
                                                        value={roles.expence}
                                                        name="expence"
                                                        type='checkbox' id="Expen2" />
                                                    <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="Expen2">
                                                        Expenses List
                                                    </Label>
                                                </div>
                                            </Col> */}

                                                <Col md={1}></Col>
                                            </Row>

                                            <Row className="mt-2">
                                                <Col md={2}>
                                                    {" "}
                                                    <p className="">Lanes View: </p>
                                                </Col>{" "}
                                                <Col md={1}></Col>
                                                {/* <Col md={2}>
                                                <div className='form-check me-3 me-lg-5'>
                                                        <Input defaultChecked={roles.ExpeView}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.ExpeView}
                                                            name="ExpeView"
                                                            type='checkbox' id="dept2" />
                                                        <Label className='form-check-label' for="dept2">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col> */}

                                                <Col md={2}>
                                                    <div className='form-check  me-lg-5'>
                                                        <Input defaultChecked={roles.laneview}
                                                            onClick={e => {
                                                                handleChange1(e)
                                                            }}
                                                            value={roles.laneview}
                                                            name="laneview"
                                                            type='checkbox' id="laneview" />
                                                        <Label
                                                            // onClick={e => { handleChange1(e) }}

                                                            className='form-check-label' for="laneview">
                                                            View
                                                        </Label>
                                                    </div>
                                                </Col>
                                                {/* <Col md={3}>
                                                <div className='form-check me-3 me-lg-5'>
                                                    <Input defaultChecked={roles.subcategories}
                                                        onClick={e => {
                                                            handleChange1(e)
                                                        }}
                                                        value={roles.subcategories}
                                                        name="subcategories"
                                                        type='checkbox' id="Expen1" />
                                                    <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="Expen1">
                                                        Sub-Categories
                                                    </Label>
                                                </div>
                                            </Col>
                                            <Col md={3}>
                                                <div className='form-check me-3 me-lg-5'>
                                                    <Input defaultChecked={roles.expence}
                                                        onClick={e => {
                                                            handleChange1(e)
                                                        }}
                                                        value={roles.expence}
                                                        name="expence"
                                                        type='checkbox' id="Expen2" />
                                                    <Label onClick={e => { handleChange1(e) }} className='form-check-label' for="Expen2">
                                                        Expenses List
                                                    </Label>
                                                </div>
                                            </Col> */}

                                                <Col md={1}></Col>
                                            </Row>
                                            <div className="mt-3" style={{ float: "right" }}>
                                                <button
                                                    type="submit"
                                                    style={{ width: "120px" }}
                                                    className="btn btn-success m-1"
                                                >
                                                    Submit <i className="fa fa-check-circle-o" aria-hidden="true"></i>
                                                </button>
                                            </div>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    ) : (
                        <Card>
                            <h5 className="text-center p-1">You don't have permission to access</h5>
                        </Card>
                    )}
                </Container>
            </div>
            <Toaster />
        </React.Fragment>
    )
}

export default Roles