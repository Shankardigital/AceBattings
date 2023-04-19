
// import React, { useState, useEffect } from "react";

// import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

// import Breadcrumbs from "../../components/Common/Breadcrumb";
// import { Link } from "react-router-dom"

// import axios from "axios"
// import { URL } from "Apiurls";
// import toast from 'react-hot-toast';


// const ResponsiveTables = () => {

//     const [show, setshow] = useState(false)
//     const [show1, setshow1] = useState(false)
//     const toggle = () => setshow1(!show1);
//     // const navigate = useNavigate();

//     const [lanes, setlanes] = useState([])
//     const [lanesData, setlanesData] = useState([])

//     const [form, setform] = useState(new Date().toISOString().substr(0, 10))
//     const [times, settimes] = useState([])
//     // const [data, setdata] = useState([])
//     console.log(data)

//     var gets = localStorage.getItem("authUser");
//     var data = JSON.parse(gets);
//     var datas = data.token;
//     console.log(datas)
//     const permissioins = data.user.permissions[0]
//     const roles = data.user.role


//     // const laneslist = () => {
//     //     axios.post(URL.getallactivelanes).then((res) => {
//     //         console.log(res.data)
//     //         setlanes(res.data.LaneResult)
//     //     })
//     // }

//     const handlechange = (event) => {
//         var token = datas;
//         setform(event.target.value);

//         const params = {
//             date: event.target.value
//         }
//         axios.post(URL.getbookedlanes, params, {
//             headers: { Authorization: `Bearer ${token}` }
//         }).then((res) => {
//             setlanes(res.data.data)
//         })

//     };

//     const handlechangetime = (e, id) => {

//         var dt = [];
//         const myForm = { ...times }
//         myForm[e.target.name] = e.target.value;
//         myForm["_id"] = id;

//         const newData = [...data]; // create a copy of the data array
//         const objIndex = newData.findIndex((obj) => obj.laneId === id);

//         if (objIndex !== -1) {
//             newData[objIndex].time.push(e.target.value);
//             newData[objIndex].time = [...new Set(newData[objIndex].time)];
//         } else {
//             newData.push({
//                 date: form,
//                 time: [e.target.value],
//                 laneId: id,
//             });
//         }

//         setdata(newData);
//         const lengthArray = [];
//         data.map((data) => {
//             const timeLength = data.time.length;
//             lengthArray.push(timeLength);
//         });
//         console.log(lengthArray);
//         const sum = lengthArray.reduce((accumulator, currentValue) => accumulator + currentValue);
//         // console.log(sum)
//         sessionStorage.setItem("timelength", sum)
//     }

//     const mylanes = () => {
//         var token = datas;
//         const params = {
//             date: form
//         }
//         axios.post(URL.getbookedlanes, params, {
//             headers: { Authorization: `Bearer ${token}` }
//         }).then((res) => {
//             if (res.status === 200) {
//                 console.log(res.data.data)
//                 setlanes(res.data.data)
//                 // setlanesData()

//             }
//             // setform("")
//             console.log(res.data.data.booking[0].time)
//         })

//     };


//     const booklane = () => {
//         const myObject = {
//             data: data
//         };
//         console.log(times);
//         if (Array.isArray(times)) {
//             // const myObject = {
//             //     data: []
//             // };
//             console.log(myObject.data);
//             console.log(times.length);
//             axios.post(URL.lanebooking, myObject, {
//                 headers: { Authorization: `Bearer ${accessToken}` }
//             }).then((res) => {
//                 console.log(res.data)
//                 if (res.status === 200) {
//                     toast.success(res.data.message)
//                     const jsonString = JSON.stringify(res.data.data);
//                     sessionStorage.setItem("bookingdata", jsonString)
//                     // navigate("/booking")
//                 }
//             },
//                 error => {
//                     if (error.response && error.response.status === 400) {
//                         toast.error(error.response.data.message)
//                     }
//                 });
//         } else {
//             console.error("times is not an array");
//         }
//     };

//     const formsubmit = (e) => {
//         if (accessToken == null) {
//             // navigate("/log_in")
//         } else {
//             e.preventDefault();
//             booklane()
//         }

//     }

//     useEffect(() => {
//         // laneslist()
//         mylanes()
//     }, [])

//     return (
//         <React.Fragment>
//             <div className="page-content">
//                 <div className="container-fluid">
//                 <Breadcrumbs title="Ace Batting" breadcrumbItem="Booking Lanes View" />
//                     {/* <Header /> */}
//                     <Row >
//                         <form onSubmit={(e) => { formsubmit(e) }}>
//                             <Col md={12}>
//                                 <Row className="">
//                                     {/* <Col md="1"></Col> */}
//                                     <Col md={3}>
//                                         <Label >Date</Label>
//                                         <Input value={form} name="date" onChange={(e) => { handlechange(e) }} type="date" required />
//                                     </Col>
//                                     <Col md={6}>
//                                         <div className="d-flex justify-content-center">
//                                             <div className="row m-4 pt-1">
//                                                 <div>
//                                                     <div className="form-check form-check-inline">
//                                                         <input className="form-check-input checklane bg-white" type="checkbox" id="inlineCheckbox1" defaultValue="option1" />
//                                                         <label className="form-check-label text-dark" htmlFor="inlineCheckbox1">Avilable</label>
//                                                     </div>
//                                                     <div className="form-check form-check-inline">
//                                                         <input  className="form-check-input checklane bg-primary" type="checkbox" id="inlineCheckbox2" defaultValue="option2" />
//                                                         <label className="form-check-label text-dark " htmlFor="inlineCheckbox2">Booked</label>
//                                                     </div>
//                                                     <div className="form-check form-check-inline">
//                                                         <input style={{ background: "#c9c9c9" }} className="form-check-input checklane" type="checkbox" id="inlineCheckbox3" defaultValue="option3" disabled />
//                                                         <label className="form-check-label text-dark" htmlFor="inlineCheckbox3">Lane Issue</label>
//                                                     </div>
//                                                     {/* <div className="form-check form-check-inline">
//                                                         <input className="form-check-input checklane bg-primary" type="checkbox" id="inlineCheckbox3" defaultValue="option3" />
//                                                         <label className="form-check-label text-dark" htmlFor="inlineCheckbox3">Selected</label>
//                                                     </div> */}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Col>
//                                     <Col md={2}>
//                                         <div className="text-end mt-3 pt-2">
//                                             {/* <Link to="/booking"> */}
//                                             {/* <Button type="submit" style={{ float: "right" }} className="m-1" color="dark"><i className="fa fa-hand-o-right"></i>  Procced to Pay </Button> */}
//                                             {/* </Link> */}
//                                         </div>
//                                     </Col>
//                                     {/* <Col md="1"></Col> */}
//                                 </Row>
//                                 <Row >

//                                     <Col md="12" className="mt-4">
//                                         <table className="table table-bordered">
//                                             <thead>
//                                                 <tr className="text-center">
//                                                     <th style={{ width: "120px" }}>
//                                                         Lane
//                                                     </th>
//                                                     <th>
//                                                         08-09
//                                                     </th>
//                                                     <th>
//                                                         09-10
//                                                     </th>
//                                                     <th>
//                                                         10-11
//                                                     </th>
//                                                     <th>
//                                                         11-12
//                                                     </th>
//                                                     <th>
//                                                         12-13
//                                                     </th>
//                                                     <th>
//                                                         13-14
//                                                     </th>
//                                                     <th>
//                                                         14-15
//                                                     </th>
//                                                     <th>
//                                                         15-16
//                                                     </th>
//                                                     <th>
//                                                         16-17
//                                                     </th>
//                                                     <th>
//                                                         17-18
//                                                     </th>
//                                                     <th>
//                                                         18-19
//                                                     </th>
//                                                     <th>
//                                                         19-20
//                                                     </th>
//                                                     <th>
//                                                         20-21
//                                                     </th>
//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {lanes.map((data, key) => (
//                                                     <tr key={key} className="text-center">
//                                                         <>
//                                                             <td className="" >{data.laneNumber}</td>
//                                                             {lanesData.eightToninetime = data.booking.some((obj) => Object.values(obj).includes("08:00-09:00"))}
//                                                             {lanesData.eightToninestatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.eightToninestatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.nineTotentime = data.booking.some((obj) => Object.values(obj).includes("09:00-10:00"))}
//                                                             {lanesData.nineTotenstatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.nineTotenstatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.tenToeleventime = data.booking.some((obj) => Object.values(obj).includes("10:00-11:00"))}
//                                                             {lanesData.tenToelevenstatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.tenToelevenstatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.elevenTotwelevetime = data.booking.some((obj) => Object.values(obj).includes("11:00-12:00"))}
//                                                             {lanesData.elevenTotwelevestatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.elevenTotwelevestatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.tweleveTothirteentime = data.booking.some((obj) => Object.values(obj).includes("12:00-13:00"))}
//                                                             {lanesData.tweleveTothirteenstatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.tweleveTothirteenstatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.thirteenTofourteentime = data.booking.some((obj) => Object.values(obj).includes("13:00-14:00"))}
//                                                             {lanesData.thirteenTofourteenstatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.thirteenTofourteenstatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.fourteenTofifteentime = data.booking.some((obj) => Object.values(obj).includes("14:00-15:00"))}
//                                                             {lanesData.fourteenTofifteenstatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.fourteenTofifteenstatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.fifteenTosixteentime = data.booking.some((obj) => Object.values(obj).includes("15:00-16:00"))}
//                                                             {lanesData.fifteenTosixteenstatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.fifteenTosixteenstatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.sixteenTofsaventeentime = data.booking.some((obj) => Object.values(obj).includes("16:00-17:00"))}
//                                                             {lanesData.sixteenTofsaventeenstatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.sixteenTofsaventeenstatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.saventeenToeighteentime = data.booking.some((obj) => Object.values(obj).includes("17:00-18:00"))}
//                                                             {lanesData.saventeenToeighteenstatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.saventeenToeighteenstatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.eighteenToninteentime = data.booking.some((obj) => Object.values(obj).includes("18:00-19:00"))}
//                                                             {lanesData.eighteenToninteenstatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.eighteenToninteenstatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.ninteenTotwentytime = data.booking.some((obj) => Object.values(obj).includes("19:00-20:00"))}
//                                                             {lanesData.ninteenTotwentystatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.ninteenTotwentystatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.twentyTotwentyonetime = data.booking.some((obj) => Object.values(obj).includes("20:00-21:00"))}
//                                                             {lanesData.twentyTotwentyonestatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.twentyTotwentyonestatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}

//                                                             {lanesData.twentyoneTotwentytwotime = data.booking.some((obj) => Object.values(obj).includes("21:00-22:00"))}
//                                                             {lanesData.twentyoneTotwentytwostatus = data.booking.some((obj) => Object.values(obj).includes("completed"))}
//                                                             {lanesData.twentyoneTotwentytwostatus = data.booking.some((obj) => Object.values(obj).includes("pending"))}


//                                                             <>
//                                                                 {lanesData.eightToninetime === true && lanesData.eightToninestatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="08:00-09:00" className="tableinput form-check-input bg-primary" type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="08:00-09:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}

//                                                                 {lanesData.nineTotentime === true && lanesData.nineTotenstatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="09:00-10:00" className="tableinput form-check-input  bg-primary" type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="09:00-10:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}

//                                                                 {lanesData.tenToeleventime === true && lanesData.tenToelevenstatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="10:00-11:00" className="tableinput form-check-input bg-primary" type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="10:00-11:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}
//                                                                 {lanesData.elevenTotwelevetime === true && lanesData.elevenTotwelevestatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="11:00-12:00" className="tableinput form-check-input bg-primary" type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="11:00-12:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}

//                                                                 {lanesData.tweleveTothirteentime === true && lanesData.tweleveTothirteenstatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="12:00-13:00" className="tableinput form-check-input bg-primary" type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="12:00-13:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}

//                                                                 {lanesData.thirteenTofourteentime === true && lanesData.thirteenTofourteenstatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="13:00-14:00" className="tableinput form-check-input bg-primary " type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="13:00-14:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}
//                                                                 {lanesData.fourteenTofifteentime === true && lanesData.fourteenTofifteenstatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="14:00-15:00" className="tableinput form-check-input bg-primary " type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="14:00-15:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}
//                                                                 {lanesData.fifteenTosixteentime === true && lanesData.fifteenTosixteenstatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="15:00-16:00" className="tableinput form-check-input bg-primary " type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="15:00-16:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}
//                                                                 {lanesData.sixteenTofsaventeentime === true && lanesData.sixteenTofsaventeenstatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="16:00-17:00" className="tableinput form-check-input bg-primary " type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="16:00-17:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}
//                                                                 {lanesData.saventeenToeighteentime === true && lanesData.saventeenToeighteenstatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="17:00-18:00" className="tableinput form-check-input bg-primary" type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="17:00-18:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}
//                                                                 {lanesData.eighteenToninteentime === true && lanesData.eighteenToninteenstatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="18:00-19:00" className="tableinput form-check-input bg-primary" type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="18:00-19:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}
//                                                                 {lanesData.ninteenTotwentytime === true && lanesData.ninteenTotwentystatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="19:00-20:00" className="tableinput form-check-input bg-primary" type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="19:00-20:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}
//                                                                 {lanesData.twentyTotwentyonetime === true && lanesData.twentyTotwentyonestatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="20:00-21:00" className="tableinput form-check-input bg-primary" type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="20:00-21:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}
//                                                                 {lanesData.twentyoneTotwentytwotime === true && lanesData.twentyoneTotwentytwostatus === true ? (
//                                                                     <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} checked={true}  name="time" value="21:00-22:00" className="tableinput form-check-input bg-primary" type="checkbox" /></td>
//                                                                 ) : (
//                                                                     <>
//                                                                         <td className="tabpad"><input onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="21:00-22:00" className="tableinput form-check-input bg-white" type="checkbox" /></td>
//                                                                     </>
//                                                                 )}

//                                                             </>
//                                                         </>
//                                                     </tr>
//                                                 ))}

//                                             </tbody>
//                                         </table>

//                                         {/* <div className="text-end mb-5 pb-5">
//                                             <Link to="/booking">
//                                                 <Button style={{ float: "right" }} className="m-1" color="dark"><i className="fa fa-hand-o-right"></i>  Procced to Pay </Button>
//                                             </Link>
//                                         </div> */}
//                                     </Col>
//                                 </Row>
//                             </Col>
//                         </form>
//                     </Row>
//                 </div >
//                 {/* <Toaster />
//                 <Footer /> */}
//             </div >

//         </React.Fragment >
//     );
// };

// export default ResponsiveTables;









import React, { useState, useEffect } from "react";

import { Row, Col, Card, CardBody, CardTitle, CardSubtitle, Input, Button, Table, Label, Form, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Link } from "react-router-dom"

import axios from "axios"
import { URL } from "Apiurls";
import toast from 'react-hot-toast';


const ResponsiveTables = () => {

    const [show, setshow] = useState(false)
    const [show1, setshow1] = useState(false)
    const toggle = () => setshow1(!show1);

    var gets = localStorage.getItem("authUser");
    var data1 = JSON.parse(gets);
    var datas = data1.token;
    const permissioins = data1.user.permissions[0]
    const roless = data1.user.role


    const [lanes, setlanes] = useState([])
    const sortedData = lanes.sort((a, b) => a.laneNumber - b.laneNumber)
    const [lanesData, setlanesData] = useState([])

    const [form, setform] = useState(new Date().toISOString().substr(0, 10))
    const [times, settimes] = useState([{
        date: "",
        time: "",
        laneId: "",
    }])
    console.log(times)
    const [data, setdata] = useState([])

    const accessToken = sessionStorage.getItem("accessToken")
    const planbyid = sessionStorage.getItem("planid")

    const laneslist = () => {
        axios.post(URL.getallactivelanes).then((res) => {
            console.log(res.data)
            setlanes(res.data.LaneResult)
        })
    }

    const handlechange = (event) => {
        setform(event.target.value);
        var token = datas;
        const params = {
            date: event.target.value,
            // planId: planbyid,
        }
        axios.post(URL.getbookedlanes, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            setlanes(res.data.data);
            setdata([]);
            settimes([{
                date: "",
                time: "",
                laneId: "",
            }])


            // resetData()
            // window.location.reload()
            console.log(res.data.data.booking[0].time)
        })

    };



    const handlechangetime = (e, id) => {

        console.log(e.target.checked);
        var dt = [];
        const myForm = { ...times }
        myForm[e.target.name] = e.target.value;
        myForm["_id"] = id;
        // settimes(myForm)
        const newData = [...data]; // create a copy of the data array
        const objIndex = newData.findIndex((obj) => obj.laneId === id);

        if (objIndex !== -1) {
            if (e.target.checked === true) {
                newData[objIndex].time.push(e.target.value);
                newData[objIndex].time = [...new Set(newData[objIndex].time)];
                setdata(newData);
            }
            else {
                const index = newData[objIndex].time.findIndex((obj) => obj === e.target.value);
                newData[objIndex].time.splice(index, 1);
            }
        } else {
            if (e.target.checked === true) {
                console.log("objIndex" + objIndex);
                newData.push({
                    date: form,
                    time: [e.target.value],
                    laneId: id,
                });
                setdata(newData);
                console.log(data);
            }
            else {
                console.log("objIndex" + objIndex);
                newData.splice(objIndex, 1);
                setdata(newData);
            }

        }


        // console.log(newData)

        //    console.log(data);
        //    console.log(data);
        //    data.map((data)=>{
        //     const timelegth = data.time.length
        //     // console.log(timelegth)
        //     const legtharray  = [timelegth]
        //     const sum = legtharray.reduce((accumulator, currentValue) => accumulator + currentValue);
        //     console.log(sum)
        //    })
        const lengthArray = [];
        data.map((data) => {
            const timeLength = data.time.length;
            lengthArray.push(timeLength);
        });
        console.log(lengthArray);
        const sum = lengthArray.reduce((accumulator, currentValue) => accumulator + currentValue);
        // console.log(sum)
        sessionStorage.setItem("timelength", sum)
    }


    const mylanes = () => {
        var token = datas;
        const params = {
            date: form,
            // planId: planbyid,
        }
        axios.post(URL.getbookedlanes, params, {
            headers: { Authorization: `Bearer ${token}` }
        }).then((res) => {
            if (res.status === 200) {
                console.log(res.data.data)
                setlanes(res.data.data)
                // setlanesData()

            }
            // setform("")
            console.log(res.data.data.booking[0].time)
        })

    };


    useEffect(() => {
        mylanes()
    }, [])

    return (
        <React.Fragment>
            <div className="page-content">
                <div className="container">
                    <Breadcrumbs title="Ace Batting" breadcrumbItem="Booking Lanes View" />
                    {/* <Header /> */}
                    {permissioins.bookinglist === true || roless === "admin" ? (
                        <Row >
                            <form >
                                <Col md={12}>

                                    <Row className="mt-4">
                                        {/* <Col md="1"></Col> */}
                                        <Col md={3}>
                                            <Label >Date</Label>
                                            <Input value={form} name="date" onChange={(e) => { handlechange(e) }} type="date" required />
                                        </Col>
                                        <Col md={6}>
                                            <div className="d-flex justify-content-center">
                                                <div className="row m-4 pt-1">
                                                    <div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input checklane bg-white" type="checkbox" id="inlineCheckbox1" defaultValue="option1" />
                                                            <label className="form-check-label text-dark" htmlFor="inlineCheckbox1">Avilable</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input className="form-check-input checklane  bg-primary" type="checkbox" id="inlineCheckbox2" defaultValue="option2" />
                                                            <label className="form-check-label text-dark " htmlFor="inlineCheckbox2">Booked</label>
                                                        </div>
                                                        <div className="form-check form-check-inline">
                                                            <input style={{ background: "#c9c9c9" }} className="form-check-input checklane" type="checkbox" id="inlineCheckbox3" defaultValue="option3" disabled />
                                                            <label className="form-check-label text-dark" htmlFor="inlineCheckbox3">Lane Issue</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col md="12" className="mt-4">
                                            <table className="table table-bordered mb-5">
                                                <thead>
                                                    <tr className="text-center">
                                                        <th style={{ width: "120px" }}>
                                                            Lane & Time
                                                        </th>
                                                        <th>
                                                            08-09
                                                        </th>
                                                        <th>
                                                            09-10
                                                        </th>
                                                        <th>
                                                            10-11
                                                        </th>
                                                        <th>
                                                            11-12
                                                        </th>
                                                        <th>
                                                            12-13
                                                        </th>
                                                        <th>
                                                            13-14
                                                        </th>
                                                        <th>
                                                            14-15
                                                        </th>
                                                        <th>
                                                            15-16
                                                        </th>
                                                        <th>
                                                            16-17
                                                        </th>
                                                        <th>
                                                            17-18
                                                        </th>
                                                        <th>
                                                            18-19
                                                        </th>
                                                        <th>
                                                            19-20
                                                        </th>
                                                        <th>
                                                            20-21
                                                        </th>
                                                        <th>
                                                            21-22
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {sortedData.map((data, key) => (
                                                        <tr key={key} className="text-center">
                                                            <>
                                                                <td className="" >{data.laneNumber}</td>
                                                                {/* <td className="" >{}</td> */}
                                                                {lanesData.eightToninetime = data.booking.some((obj) => Object.values(obj).includes("08:00-09:00"))}
                                                                {lanesData.eightToninestatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.eightToninestatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.nineTotentime = data.booking.some((obj) => Object.values(obj).includes("09:00-10:00"))}
                                                                {lanesData.nineTotenstatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.nineTotenstatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.tenToeleventime = data.booking.some((obj) => Object.values(obj).includes("10:00-11:00"))}
                                                                {lanesData.tenToelevenstatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.tenToelevenstatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.elevenTotwelevetime = data.booking.some((obj) => Object.values(obj).includes("11:00-12:00"))}
                                                                {lanesData.elevenTotwelevestatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.elevenTotwelevestatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.tweleveTothirteentime = data.booking.some((obj) => Object.values(obj).includes("12:00-13:00"))}
                                                                {lanesData.tweleveTothirteenstatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.tweleveTothirteenstatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.thirteenTofourteentime = data.booking.some((obj) => Object.values(obj).includes("13:00-14:00"))}
                                                                {lanesData.thirteenTofourteenstatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.thirteenTofourteenstatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.fourteenTofifteentime = data.booking.some((obj) => Object.values(obj).includes("14:00-15:00"))}
                                                                {lanesData.fourteenTofifteenstatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.fourteenTofifteenstatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.fifteenTosixteentime = data.booking.some((obj) => Object.values(obj).includes("15:00-16:00"))}
                                                                {lanesData.fifteenTosixteenstatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.fifteenTosixteenstatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.sixteenTofsaventeentime = data.booking.some((obj) => Object.values(obj).includes("16:00-17:00"))}
                                                                {lanesData.sixteenTofsaventeenstatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.sixteenTofsaventeenstatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.saventeenToeighteentime = data.booking.some((obj) => Object.values(obj).includes("17:00-18:00"))}
                                                                {lanesData.saventeenToeighteenstatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.saventeenToeighteenstatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.eighteenToninteentime = data.booking.some((obj) => Object.values(obj).includes("18:00-19:00"))}
                                                                {lanesData.eighteenToninteenstatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.eighteenToninteenstatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.ninteenTotwentytime = data.booking.some((obj) => Object.values(obj).includes("19:00-20:00"))}
                                                                {lanesData.ninteenTotwentystatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.ninteenTotwentystatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.twentyTotwentyonetime = data.booking.some((obj) => Object.values(obj).includes("20:00-21:00"))}
                                                                {lanesData.twentyTotwentyonestatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.twentyTotwentyonestatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}

                                                                {lanesData.twentyoneTotwentytwotime = data.booking.some((obj) => Object.values(obj).includes("21:00-22:00"))}
                                                                {lanesData.twentyoneTotwentytwostatus = data.booking.some((obj) => Object.values(obj).includes("progress"))}
                                                                {lanesData.twentyoneTotwentytwostatusrepair = data.booking.some((obj) => Object.values(obj).includes("repair"))}


                                                                <>
                                                                    {/* {data.status == "active" ? ( */}
                                                                    <>
                                                                        <td className="tabpad">
                                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "08:00-09:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                                <input disabled style={{ background: "#f3b74a" }} name="time" value="08:00-09:00" className="tableinput  form-check-input" type="checkbox" />
                                                                            ) : (<>
                                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "08:00-09:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="08:00-09:00" className="tableinput  form-check-input" type="checkbox" />)
                                                                                    : (
                                                                                        <input disabled onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="08:00-09:00" className="tableinput  form-check-input" type="checkbox" />
                                                                                    )}
                                                                            </>)}
                                                                        </td>

                                                                        <td className="tabpad">
                                                                            {data.booking.some(idata => (idata.laneId === data._id && idata.time === "09:00-10:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                                                <input disabled style={{ background: "#f3b74a" }} name="time" value="09:00-10:00" className="tableinput  form-check-input" type="checkbox" />
                                                                            ) : (<>
                                                                                {data.booking.some(idata => (idata.laneId === data._id && idata.time === "09:00-10:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="09:00-10:00" className="tableinput  form-check-input" type="checkbox" />)
                                                                                    : (
                                                                                        <input disabled   onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="09:00-10:00" className="tableinput  form-check-input" type="checkbox" />
                                                                                    )}
                                                                            </>)}
                                                                        </td>

                                                                        <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "10:00-11:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="10:00-11:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "10:00-11:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="10:00-11:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="10:00-11:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>

                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "11:00-12:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="11:00-12:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "11:00-12:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="11:00-12:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="11:00-12:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>

                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "12:00-13:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="12:00-13:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "12:00-13:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="12:00-13:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="12:00-13:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>

                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "13:00-14:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="13:00-14:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "13:00-14:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="13:00-14:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="13:00-14:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>

                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "14:00-15:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="14:00-15:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "14:00-15:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="14:00-15:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="14:00-15:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>

                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "15:00-16:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="15:00-16:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "15:00-16:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="15:00-16:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="15:00-16:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>

                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "16:00-17:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="16:00-17:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "16:00-17:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="16:00-17:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="16:00-17:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>

                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "17:00-18:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="17:00-18:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "17:00-18:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="17:00-18:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="17:00-18:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>
                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "18:00-19:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="18:00-19:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "18:00-19:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="18:00-19:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="18:00-19:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>

                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "19:00-20:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="19:00-20:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "19:00-20:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="19:00-20:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="19:00-20:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>

                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "20:00-21:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="20:00-21:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "20:00-21:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="20:00-21:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input  disabled onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="20:00-21:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>

                                                <td className="tabpad">
                                                    {data.booking.some(idata => (idata.laneId === data._id && idata.time === "21:00-22:00" && (idata.status == "progress" || idata.status == "pending"))) ? (
                                                        <input disabled style={{ background: "#f3b74a" }} name="time" value="21:00-22:00" className="tableinput  form-check-input" type="checkbox" />
                                                    ) : (<>
                                                        {data.booking.some(idata => (idata.laneId === data._id && idata.time === "21:00-22:00" && (idata.status == "repair"))) ? (<input disabled style={{ background: "#cccccc" }} name="time" value="21:00-22:00" className="tableinput  form-check-input" type="checkbox" />)
                                                            : (
                                                                <input disabled  onChange={(e) => { handlechangetime(e, data._id) }} name="time" value="21:00-22:00" className="tableinput  form-check-input" type="checkbox" />
                                                            )}
                                                    </>)}
                                                </td>
                                                                    </>
                                                                </>

                                                            </>

                                                        </tr>
                                                    ))}


                                                </tbody>
                                            </table>

                                            {/* <div className="text-end mb-5 pb-5">
                                            <Link to="/booking">
                                                <Button style={{ float: "right" }} className="m-1" color="dark"><i className="fa fa-hand-o-right"></i>  Procced to Pay </Button>
                                            </Link>
                                        </div> */}
                                        </Col>
                                    </Row>
                                </Col>
                                {/* <input style={{display:"none"}} type="reset" value="UNCHECK ALL" ref={buttonRef}/> */}
                            </form>
                        </Row>
                    ) : (
                        <Card>
                            <h5 className="text-center p-1">You don't have permission to access</h5>
                        </Card>
                    )}
                </div >
                {/* <Toaster />
                <Footer /> */}
            </div >

        </React.Fragment >
    );
};

export default ResponsiveTables;

