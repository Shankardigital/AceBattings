// import React, { useState, useEffect } from "react";

// import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// // import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
// // import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
// import { Link } from "react-router-dom";
// //Import Breadcrumb
// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import img1 from "../../assets/images/letast/acelogo.png";
// import Invoice from "../../assets/images/letast/Invoice-0000004.pdf";
// import trash from "../../assets/images/letast/trash.gif";
// import { saveAs } from 'file-saver'
// import axios from "axios";
// import { URL } from "../../Apiurls";
// import { useHistory } from "react-router-dom";

// const ResponsiveTables = () => {

//     const [show, setshow] = useState(false)
//     const [show1, setshow1] = useState(false)
//     const toggle = () => setshow1(!show1);

//     const [subscribe, setsubscribe] = useState([])
//     const [form, setform] = useState([])
//     const [form1, setform1] = useState([])
//     console.log(form1)

//     const downloadImage = () => {
//         saveAs(Invoice) // Put your image url here.
//     }
    
//     var gets = localStorage.getItem("authUser");
//     var data = JSON.parse(gets);
//     var datas = data.token;
//     const permissioins = data.user.permissions[0]
//     const roles = data.user.role


//     const getSubscribe = () => {
//         var token = datas;
//         axios.post(URL.allSubscriptions, {}, {
//             headers: { Authorization: `Bearer ${token}` }
//         }).then((res) => {
//             console.log(res.data)
//             setsubscribe(res.data.SubscriptionResult)
//         },
//             (error) => {
//                 if (error.response && error.response.status === 400) {
//                     toast(error.response.data.message);
//                 } else if (error.response && error.response.status === 401) {
//                     history.push("/login");
//                 }
//             }

//         )
//     }

//     const handlechange = (e) => {
//         let myUser = { ...form };
//         myUser[e.target.name] = e.target.value;
//         setform(myUser);
//         console.log(myUser)
//         var token = datas;
//         axios
//             .post(
//                 `http://103.186.185.77:5027/acebatting/adminportal/subscriptions/searchsubscription?searchQuery=${e.target.value}`,
//                 {},

//                 {
//                     headers: { Authorization: `Bearer ${token}` },
//                 }
//             )
//             .then((res) => {
//                 setsubscribe(res.data.SubscriptionResult)
//             });
//     };
//     useEffect(()=>{
//         getSubscribe()
//     }, [])

//     const [listPerPage] = useState(10);
//     const [pageNumber, setPageNumber] = useState(0);

//     const pagesVisited = pageNumber * listPerPage;
//     const lists = subscribe.slice(pagesVisited, pagesVisited + listPerPage);
//     const pageCount = Math.ceil(subscribe.length / listPerPage);
//     const changePage = ({ selected }) => {
//         setPageNumber(selected);
//     };


//     // onClick={downloadImage}
//     //meta title
//     //   document.title = "Responsive Table | Ace Batting - React Admin & Dashboard Template";
//     return (
//         <React.Fragment>
//             <div className="page-content">
//                 <div className="container-fluid">
//                     <Breadcrumbs title="Ace Batting" breadcrumbItem="Subscribes" />
//                     {permissioins.subcribes === true || roles === "admin" ? (

//                     <Row>
//                         <Col>
//                             {/* {show == true ? (
//                                 <Card className="p-4">
//                                     <Form>
//                                         <h5>Add New Plan</h5>
//                                         <Row>
//                                             <Col md="3">
//                                                 <Label>First Name</Label>  <span className="text-danger">*</span>
//                                                 <Input required type="text" placeholder="Enter First Name" />
//                                             </Col>
//                                             <Col md="3">
//                                                 <Label>Last Name</Label>  <span className="text-danger">*</span>
//                                                 <Input required type="text" placeholder="Enter Last Name" />
//                                             </Col>
//                                             <Col md="3">
//                                                 <Label>Email Id</Label> <span className="text-danger">*</span>
//                                                 <Input required type="text" placeholder="Enter Email" />
//                                             </Col>
//                                             <Col md="3">
//                                                 <Label>Mobile No</Label> <span className="text-danger">*</span>
//                                                 <div className="input-group mb-3">
//                                                     <div className="input-group-prepend">
//                                                         <select required className="form-select">
//                                                             <option value="+1">+1 </option>
//                                                             <option value="+1">+91 </option>
//                                                             <option value="+1">+44 </option>
//                                                         </select>
//                                                     </div>
//                                                     <Input required type="text" className="form-control" placeholder="Enter Mobile No" aria-label="Username" aria-describedby="basic-addon1" />
//                                                 </div>
//                                             </Col>
//                                         </Row>
//                                         <div className="text-end">
//                                             <Button type="submit" color="success m-1" outline>Submit <i className="bx bx-check-circle"></i></Button>
//                                             <Button type="button" onClick={() => { setshow(!show) }} color="danger m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

//                                         </div>
//                                     </Form>
//                                 </Card>
//                             ) : (
//                                 ""
//                             )} */}
//                             <Card>
//                                 <CardBody>
//                                     <Row>
//                                         <Col>
//                                             {/* <Link to="/sellaplan">
//                                                 <Button color="primary" >Sell a Pricing Plan <i className="bx bx-plus-circle"></i></Button>
//                                             </Link> */}
//                                         </Col>
//                                         <Col>
//                                             <div style={{ float: "right" }}>
//                                                 <Input
//                                                  name="search"
//                                                  value={form.search}
//                                                  onChange={handlechange}
//                                                 type="search" placeholder="Search..." />
//                                             </div>
//                                         </Col>
//                                     </Row>
//                                     <div className="table-rep-plugin mt-4">
//                                         <Table hover responsive>
//                                             <thead>
//                                                 <tr>
//                                                     <th>
//                                                         Sl No
//                                                     </th>
//                                                     <th>
//                                                         Customer Names
//                                                     </th>
//                                                     <th>
//                                                     Subscription details
//                                                     </th>
//                                                     <th>
//                                                     Subscription start date
//                                                     </th>
//                                                     <th>
//                                                     Subscription end date
//                                                     </th>
//                                                     <th>
//                                                     Last payment status
//                                                     </th>
//                                                     <th>
//                                                     Subscription status
//                                                     </th>
//                                                     <th>
//                                                         Invoice
//                                                     </th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {lists.map((data, key)=>(
//                                                     <tr key={key}>
//                                                     <th scope="row">
//                                                     {(pageNumber - 1) * 10 + key + 11}
//                                                     </th>
//                                                     <td>
//                                                    { data.customer}
//                                                     </td>
//                                                     <td>
//                                                     { data.plan}
//                                                     </td>
//                                                     <td>
//                                                     { data.date[0]}
//                                                     </td>
//                                                     <td>
//                                                     { data.date[1]}
//                                                     </td>
//                                                     <td>
//                                                         <Button size="sm" outline color="success">Paid</Button>
//                                                     </td>
//                                                     <td>
//                                                         <span  className="">  { data.status}</span>
//                                                     </td>
//                                                     <td>
//                                                         {/* <Link to="/editplan"> <Button size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button></Link> */}
//                                                        {/* <a href={Invoice}> */}
//                                                        <Button  onClick={downloadImage} size="sm" className="m-1" outline color="primary"><i style={{ fontSize: " 14px" }} className="bx bx-cloud-download"></i></Button>
//                                                         {/* </a>  */}
//                                                     </td>
//                                                 </tr>
//                                                 ))}
                                                
                                             
                                               
//                                             </tbody>
//                                         </Table>
//                                     </div>
//                                 </CardBody>
//                             </Card>
//                         </Col>
//                     </Row>
//                      ):(
//                         <Card>
//                         <h5 className="text-center p-1">You don't have permission to access</h5>
//                     </Card>
//                     )}
//                 </div>
//             </div>
//             <Modal isOpen={show1} toggle={toggle}>
//                 <ModalHeader toggle={toggle}></ModalHeader>
//                 <ModalBody>
//                 <div>
//                         <div className="text-center">
//                         <img style={{width:"350px"}} src={trash}/>
//                         </div>
//                         <h5 className="text-center">Do you want delete</h5>
//                         <div className="text-end mt-2">
//                             <Button type="submit" color="danger m-1" outline>Yes <i className="bx bx-check-circle"></i></Button>
//                             <Button type="button" onClick={toggle} color="secondary m-1" outline>Cancel <i className="bx bx-x-circle"></i></Button>

//                         </div>
//                     </div>
                 
//                 </ModalBody>

//             </Modal>
//         </React.Fragment>
//     );
// };

// export default ResponsiveTables;


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

    const hiddenIds = ["RentalEquipment", "RentalLine"];
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
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Subscribes list" />

                    {permissioins.subcribes === true || roles === "admin" ? (

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


                                                                {/* <Button onClick={toggle} size="sm" className="m-1" outline color="success"><i style={{ fontSize: " 14px" }} className="bx bx-edit"></i></Button> */}
                                                            <td>
                                                            {permissioins.subcribescan === true || roles === "admin" ? (
                                                                <>
                                                                  {data.status == "canceled" ?(
                                                                    <Button disabled onClick={() => { formdata(data) }} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="fa fa-times-circle"></i></Button>
                                                                ) : (
                                                                    <Button onClick={() => { formdata(data) }} size="sm" className="m-1" outline color="danger"><i style={{ fontSize: " 14px" }} className="fa fa-times-circle"></i></Button>
                                                                )}
                                                                </>): "-"}
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

