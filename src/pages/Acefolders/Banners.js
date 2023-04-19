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

const Banner = () => {

    //meta title
    // document.title = "Stater Page | Skote - React Admin & Dashboard Template";

    const [modal_small, setmodal_small] = useState(false);
    const [banner, setbanner] = useState([])
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
        let myUser = { ...form1 };
        myUser[e.target.name] = e.target.value;
        setform1(myUser);
    };

    const [items, setItems] = useState([]);
    const [userinfo, setuserinfo] = useState([]);
    console.log(items.token)
    console.log(userinfo)

    useEffect(() => {
        getAllbenners();
        // const items1 = JSON.parse(localStorage.getItem('authUser'));
        // setItems(items1);
        // setuserinfo(items1.user);
    }, []);

    var gets = localStorage.getItem("authUser");
    var data = JSON.parse(gets);
    var datas = data.token;
    const permissioins = data.user.permissions[0]
    const roles = data.user.role

    const [listPerPage] = useState(5);
    const [pageNumber, setPageNumber] = useState(0);

    const pagesVisited = pageNumber * listPerPage;
    const lists = banner.slice(pagesVisited, pagesVisited + listPerPage);
    const pageCount = Math.ceil(banner.length / listPerPage);
    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };



    const addbenners = () => {
        var token = datas;
        const dataArray = new FormData();
        dataArray.append("name", form.name);
        for (let i = 0; i < Files.length; i++) {
            dataArray.append("bannerImage", Files[i]);
        }
        axios.post(URL.addBanners, dataArray, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast(res.data.message);
                    getAllbenners();
                    setform("")
                    setFiles("")


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

    const editbenners = () => {
        var token = datas;
        var formid = form1._id
        const dataArray = new FormData();
        dataArray.append("name", form1.name);
        dataArray.append("status", form1.status);
        for (let i = 0; i < Files1.length; i++) {
            dataArray.append("bannerImage", Files1[i]);
        }
        axios.put(URL.editBanners + "/" + formid, dataArray, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast(res.data.message);
                    getAllbenners();
                    setmodal_small(false)
                    setFiles1("")
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

    const deletebenners = (data) => {
        var token = datas;
        var remid = data._id
        axios.delete(URL.deleteBanners + "/" + remid, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(
            (res) => {
                if (res.status === 200) {
                    toast(res.data.message);
                    getAllbenners();

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
            deletebenners(data);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addbenners();
        clearForm()
    };
    const handleSubmit1 = (e) => {
        e.preventDefault();
        editbenners();
        clearForm()
    };

    const getAllbenners = () => {
        var token = datas;
        axios.post(URL.allBanners, {}, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            console.log(res.data)
            setbanner(res.data.bannerResult)
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

    const clearForm = () => {
        setform({
            name: "",
            bannerImage: "",
        });
    };
    const getpopup = (data) => {
        setform1(data);
        tog_small()
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
                `http://103.186.185.77:5027/acebatting/adminportal/banners/searchbanner?searchQuery=${e.target.value}`,
                {},

                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            )
            .then((res) => {
                setbanner(res.data.bannerResult)
            });
    };



    return (
        <React.Fragment>
            <div className="page-content">
                <Container fluid>
                    {/* Render Breadcrumbs */}
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Banners" />
                    {permissioins.banner === true || roles === "admin" ? (

                        <Row>
                            {/* <Col md={4}>
                                <Card>
                                    <CardHeader className="bg-white">
                                        <CardTitle>Add Banner</CardTitle>
                                    </CardHeader>
                                    <CardBody >
                                        {permissioins.addbanner === true || roles === "admin" ? (
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
                                                        placeholder="Enter Bannner Name"
                                                        required
                                                        name="name"
                                                        value={form.name}
                                                        onChange={(e) => {
                                                            handleChange(e);
                                                        }}
                                                    />
                                                </div>
                                                <div className="mb-3">
                                                    <Label for="basicpill-firstname-input1">
                                                        Banner Image <span className="text-danger">*</span>
                                                    </Label>
                                                    <Input
                                                        type="file"
                                                        className="form-control"
                                                        id="basicpill-firstname-input1"
                                                        placeholder="Enter image"
                                                        required
                                                        name="bannerImage"
                                                        value={form.bannerImage}
                                                        onChange={changeHandler}
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
                            </Col> */}
                            <Col md={12}>
                                <Card>
                                    <CardHeader className="bg-white">
                                        <CardTitle>Banners List</CardTitle>
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
                                                            <th>Banner Name</th>
                                                            <th>Banner Image</th>
                                                            <th>Status</th>
                                                            <th style={{ width: "100px" }}>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {lists.map((data, key) => (
                                                            <tr key={key}>
                                                                <td>{(pageNumber - 1) * 5 + key + 6}</td>
                                                                <td>{data.name}</td>
                                                                <td><img style={{ width: "100px" }} src={"http://103.186.185.77:5027/" + data.bannerImage} /></td>
                                                                <td>{data.status}
                                                                </td>
                                                                <td>
                                                                    {permissioins.editbanner === true || roles === "admin" ? (
                                                                        <Button onClick={() => {
                                                                            getpopup(data);
                                                                        }}
                                                                            className="mr-2" style={{ padding: "6px", margin: "3px" }} color="success" outline>
                                                                            <i className="bx bx-edit "></i>
                                                                        </Button>

                                                                    ) : (
                                                                        ""
                                                                    )}
                                                                    {/* {permissioins.delbanner === true || roles === "admin" ? (
                                                                        <Button
                                                                            onClick={() => {
                                                                                manageDelete(data);
                                                                            }}
                                                                            style={{ padding: "6px", margin: "3px" }} color="danger" outline>
                                                                            <i className="bx bx-trash"></i>
                                                                        </Button>
                                                                    ) : (
                                                                        ""
                                                                    )} */}
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
                            Edit Banners
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
                                    Banner Name <span className="text-danger">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    placeholder="Enter Banner Name"
                                    required
                                    name="name"
                                    value={form1.name}
                                    onChange={(e) => {
                                        handleChange1(e);
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <Label for="basicpill-firstname-input1">
                                    Banner Image
                                </Label>
                                <Input
                                    type="file"
                                    className="form-control"
                                    id="basicpill-firstname-input1"
                                    placeholder="Enter image"
                                    name="bannerImage"
                                    // value={form1.bannerImage}
                                    onChange={changeHandler1}
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

export default Banner
