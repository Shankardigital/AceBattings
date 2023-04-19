import React, { useState, useEffect } from "react";
import {
    CardBody, CardHeader, Container,
    Row, Col, Card, CardText, CardTitle,
    Form, Label, Input, Button, Table,
    Pagination,
    PaginationItem,
    PaginationLink, Modal,
} from "reactstrap"
// import img1 from "../assets/images/latest/car1.jpg"

//Import Breadcrumb
// import Breadcrumbs from "../components/Common/Breadcrumb"
import Breadcrumbs from "../../components/Common/Breadcrumb";
import toast, { Toaster } from 'react-hot-toast';
import ReactPaginate from "react-paginate";
import { URL } from "../../Apiurls";
import axios from "axios";
import { useHistory } from 'react-router-dom';

const Coupons = () => {

    const [modal_small, setmodal_small] = useState(false);
    const [coupon, setcoupon] = useState([])
    const [form, setform] = useState([])
    const [form1, setform1] = useState([])
    console.log(form1)
    const [form2, setform2] = useState([])
    const [Files, setFiles] = useState("");
    const [Files1, setFiles1] = useState("");

    const history = useHistory();

    const changeHandler = (e) => {
        setFiles(e.target.files);
    };
    const changeHandler1 = (e) => {
        setFiles1(e.target.files);
    };

    function tog_small() {
        setmodal_small(!modal_small);
        removeBodyCss();
    }

    const handleChange = (e) => {
        let myUser = { ...form };
        myUser[e.target.name] = e.target.value;
        setform(myUser);
    };

    const handleChange1 = (e) => {
        const { name, value } = e.target;
        setform1((prev) => {
          const updatedForm = { ...prev, [name]: value };
          if (name === "type") {
            if (prev.type && value !== prev.type) {
              updatedForm.value = "0";
            } else if (prev.type && value === prev.type) {
              updatedForm.value = prev.value;
            }
          }
          return updatedForm;
        });
      };

    const [items, setItems] = useState([]);
    const [userinfo, setuserinfo] = useState([]);
    console.log(items.token)
    console.log(userinfo)

    useEffect(() => {
        getAllCoupons();
        // const items1 = JSON.parse(localStorage.getItem('authUser'));
        // setItems(items1);
        // setuserinfo(items1.user);
    }, []);

    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    console.log(datas)
    const permissioins = data.user.permissions[0]
    const roles = data.user.role



    const [listPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);

    const pagesVisited = pageNumber * listPerPage;
    const lists = coupon.slice(pagesVisited, pagesVisited + listPerPage);
    const pageCount = Math.ceil(coupon.length / listPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };



    const addcoupon = () => {
        var token = datas;
        const params = {
            couponName: form.couponName,
            type: form.type,
            value: form.value,
        }
        axios.post(URL.addcoupon, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    getAllCoupons();
                    setform("")
                    clearform()


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

    const editcoupon = () => {
        var token = datas;
        var formid = form1._id
        const params = {
            couponName: form1.couponName,
            type: form1.type,
            value: form1.value,
            status: form1.status,
        }
        axios.post(URL.editcouponbyid + "/" + formid, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast.success(res.data.message);
                    getAllCoupons()
                    setmodal_small(false)
                    setFiles1("")
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

    const deletecoupon = (data) => {
        var token = datas;
        var remid = data._id
        axios.delete(URL.deletecouponbyid + "/" + remid, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast(res.data.message);
                    getAllCoupons()

                }
            },
            (error) => {
                if (error.response && error.response.status === 400) {
                    toast(error.response.data.message);
                } else if (error.response && error.response.status === 401) {
                    history.push("/login");
                }
            }
        );
    }

    const manageDelete = (data) => {
        const confirmBox = window.confirm("Do you really want to Delete?");
        if (confirmBox === true) {
            deletecoupon(data);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addcoupon();
    };
    const handleSubmit1 = (e) => {
        e.preventDefault();
        editcoupon();
    };

    const getAllCoupons = () => {
        var token = datas;
        axios.post(URL.getallcoupons, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setcoupon(res.data.couponResult)
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

    const getpopup = (data) => {
        setform1(data);
        tog_small()
    };

    const clearform = () => {
        setform({
            couponName: "",
            type: "",
            value: "",
        })
    }

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
                `http://103.186.185.77:5027/acebatting/adminportal/coupons/searchcoupon?searchQuery=${e.target.value}`,
                {},

                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setcoupon(res.data.couponResult)
            });
    };



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Coupons" />
                    {permissioins.coupon === true || roles === "admin" ? (
                        <Row>
                            <Col md={4}>
                                <Card>
                                    <CardHeader className="bg-white">
                                        <CardTitle>Add Coupon</CardTitle>
                                    </CardHeader>
                                    <CardBody >
                                        {permissioins.addcoupon === true || roles === "admin" ? (
                                            <Form onSubmit={(e) => {
                                                handleSubmit(e);
                                            }}>
                                                <div className="mb-3">
                                                    <Label for="basicpill-firstname-input1">
                                                        Name <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="basicpill-firstname-input1"
                                                        placeholder="Enter Name"
                                                        required
                                                        name="couponName"
                                                        value={form.couponName}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <Label for="basicpill-firstname-input1">
                                                        Type <span className="text-danger">*</span>
                                                    </Label>
                                                    <select
                                                        name="type"
                                                        className="form-select"
                                                        required
                                                        value={form.type}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                        }}
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="percent">Percentage</option>
                                                        <option value="money">Money</option>
                                                    </select>
                                                </div>
                                                <div className="mb-3">
                                                    <Label for="basicpill-firstname-input1">
                                                        Value <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="text"
                                                        className="form-control"
                                                        id="basicpill-firstname-input1"
                                                        placeholder="Enter Value"
                                                        required
                                                        name="value"
                                                        value={form.value}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>

                                                <div style={{ float: "right" }}>
                                                    <Button color="primary" type="submit">
                                                        Submit <i className="fas fa-check-circle"></i>
                                                    </Button>

                                                </div>
                                            </Form>
                                        ) : (
                                            "You don't have permission to access"
                                        )}
                                    </CardBody>
                                </Card>
                            </Col>
                            <Col md={8}>
                                <Card>
                                    <CardHeader className="bg-white">
                                        <CardTitle>Coupons List</CardTitle>
                                    </CardHeader>

                                    <CardBody >

                                        <div>
                                            <div className="table-responsive">
                                                <div style={{ float: "right" }}>
                                                    <Input
                                                        type="text"
                                                        name="search"
                                                        value={forms.search}
                                                        onChange={handlechange}
                                                        className="form-control" placeholder="Search.." />
                                                </div>
                                                <Table className="table table-bordered mb-4 mt-5">
                                                    <thead>
                                                        <tr>
                                                            <th>S No</th>
                                                            <th>Name</th>
                                                            <th>Type</th>
                                                            <th>Value</th>
                                                            <th>Status</th>
                                                            <th style={{ width: "100px" }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {lists.map((data, key) => (
                                                            <tr key={key}>
                                                                <td>{(pageNumber - 1) * 5 + key + 6}</td>
                                                                <td>{data.couponName}</td>
                                                                <td>{data.type}</td>
                                                                <td>{data.value}</td>
                                                                <td>{data.status}</td>
                                                                <td>
                                                                    {permissioins.editcoupon === true || roles === "admin" ? (
                                                                        <Button onClick={() => {
                                                                            getpopup(data);
                                                                        }}
                                                                            className="mr-2" style={{ padding: "6px", margin: "3px" }} color="success" outline>
                                                                            <i className="bx bx-edit "></i>
                                                                        </Button>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                    {permissioins.delcoupon === true || roles === "admin" ? (

                                                                        <Button
                                                                            onClick={() => {
                                                                                manageDelete(data);
                                                                            }}
                                                                            style={{ padding: "6px", margin: "3px" }} color="danger" outline>
                                                                            <i className="bx bx-trash"></i>
                                                                        </Button>
                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                </td>
                                                            </tr>

                                                        ))}

                                                    </tbody>
                                                </Table>
                                                {/* <div style={{ float: "right" }}>
                                                <Pagination
                                                    size="sm"
                                                    aria-label="Page navigation example"
                                                >
                                                    <PaginationItem disabled>
                                                        <PaginationLink href="#" tabIndex="-1">
                                                            Previous
                                                        </PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink href="#">1</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink href="#">2</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink href="#">3</PaginationLink>
                                                    </PaginationItem>
                                                    <PaginationItem>
                                                        <PaginationLink href="#">Next</PaginationLink>
                                                    </PaginationItem>
                                                </Pagination>
                                            </div> */}
                                                <div className="mt-3" style={{ float: "right" }}>
                                                    {/* <Stack spacing={2}> */}
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
                                                    {/* </Stack> */}
                                                </div>
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
                </Container>


                <Modal
                    size="sm"
                    isOpen={modal_small}
                    toggle={() => {
                        tog_small();
                    }}
                >
                    <div className="modal-header">
                        <h5
                            className="modal-title mt-0"
                            id="mySmallModalLabel"
                        >
                            Edit Coupon
                        </h5>
                        <button
                            onClick={() => {
                                setmodal_small(false);
                            }}
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <Form onSubmit={(e) => { handleSubmit1(e) }}>
                            <div className="mb-3">
                                <Label for="basicpill-firstname-input1">
                                    Name <span className="text-danger">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    placeholder="Enter Name"
                                    required
                                    name="couponName"
                                    value={form1.couponName}
                                      onChange={handleChange1}
                                />
                            </div>
                            <div className="mb-3">
                                <Label for="basicpill-firstname-input1">
                                    Type <span className="text-danger">*</span>
                                </Label>
                                <select
                                    name="type"
                                    className="form-select"
                                    required
                                    value={form1.type}
                                    onChange={handleChange1}
                                >
                                    <option value="">Select</option>
                                    <option value="percent">Percentage</option>
                                    <option value="money">Money</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <Label for="basicpill-firstname-input1">
                                    Value <span className="text-danger">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    placeholder="Enter Value"
                                    required
                                    name="value"
                                    value={form1.value}
                                    onChange={(e) => {
                                        handleChange1(e);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <Label for="basicpill-firstname-input3">
                                    Status <span className="text-danger">*</span>
                                </Label>
                                <select
                                    name="status"
                                    value={form1.status}
                                    onChange={(e) => {
                                        handleChange1(e);
                                    }}
                                    className="form-select">


                                    <option value="active">Active</option>
                                    <option value="inactive">In Active</option>
                                </select>
                            </div>
                            {/* <div className="mb-3">
                                <Label for="basicpill-firstname-input2">
                                    Address <span className="text-danger">*</span>
                                </Label>
                                <textarea
                                    type="text"
                                    className="form-control"
                                    id="basicpill-firstname-input2"
                                    placeholder="Enter  Address"
                                    required
                                />
                            </div> */}
                            <div style={{ float: "right" }}>
                                <Button onClick={() => {
                                    setmodal_small(false);
                                }} color="danger" type="button">
                                    Cancel <i className="fas fa-times-circle"></i>
                                </Button>
                                <Button className="m-1" color="primary" type="submit">
                                    Submit <i className="fas fa-check-circle"></i>
                                </Button>

                            </div>
                        </Form>
                    </div>
                </Modal>

                <Toaster />
            </div>
        </React.Fragment >
    )
}

export default Coupons
