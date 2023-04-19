import React, { useEffect, useState } from "react"
import {
  CardBody,
  CardHeader,
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from "reactstrap"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import axios from "axios"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import ClassicEditor from "@ckeditor/ckeditor5-build-classic"
import { URL } from "Apiurls"
import toast, { Toaster } from 'react-hot-toast';
// import { ToastContainer, toast } from "react-toastify"

function Termsandconditions() {
  const [form, setform] = useState([])

  console.log(form)

  useEffect(() => {
    getAbout()
  }, [])

  var gets = localStorage.getItem("authUser")
  var data = JSON.parse(gets)
  var datas = data.token;
  const permissioins = data.user.permissions[0]
  const roles = data.user.role

  const getAbout = () => {
    var token = datas
    axios
      .post(URL.gettermscondition , {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(res => {
        setform(res.data.termsCondition.termsCondition)
      })
  }
  const [modal_small, setmodal_small] = useState(false)
  function tog_small() {
    setmodal_small(!modal_small)
    removeBodyCss()
  }

  const [text1, setText1] = useState([])

  const getpopup1 = forms => {
    setText1(forms)
    tog_small()
  }

  const submibooking = e => {
    e.preventDefault()
    changstatus()
  }

  const changstatus = () => {
    var token = datas
    const params = {
        termsCondition:text1
    }
    axios
      .put(URL.updatetermscondition,
        params,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then(
        res => {
          if (res.status === 200) {
            toast.success(res.data.message)
            setmodal_small(false)
            getAbout()
          }
        },
        error => {
          if (error.response && error.response.status === 400) {
            toast.error(error.response.data.message)
          }
        }
      )
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Ace Batting" breadcrumbItem="Terms & Condition" />
          {permissioins.otherview === true || roles === "admin" ? (
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader className="bg-white"></CardHeader>

                <CardBody>
                  <div style={{ float: "right" }}>
                  {permissioins.otheredit === true || roles === "admin" ? (
                    <Button
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Edit Booking"
                      onClick={() => {
                        getpopup1(form)
                      }}
                      className="mr-5"
                      color="primary"
                      outline
                    >
                      <span>Edit</span>
                    </Button>
                  ): ""}

                  </div>
                  <div>
                    <div>
                      <h5>Terms & Condition</h5>
                      {/* <p>{form}</p> */}
                      <div
                      className="mt-5"
                      dangerouslySetInnerHTML={{
                        __html: form,
                      }}
                    ></div>
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

          <Modal
            size="lg"
            isOpen={modal_small}
            toggle={() => {
              tog_small()
            }}
            centered
          >
            <div className="modal-header">
              <h5 className="modal-title mt-0" id="mySmallModalLabel">
              Edit Terms & Condition
              </h5><button
                onClick={() => {
                  setmodal_small(false)
                }}
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <Form
              onSubmit={e => {
                submibooking(e)
              }}
            >
              <div className="modal-body">
                <CKEditor
                  editor={ClassicEditor}
                  id="header"
                  data={text1}
                  onReady={editor => {
                    console.log("Editor is ready to use!", editor)
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData()
                    setText1(data)
                  }}
                />
              </div>

              <hr></hr>
              <div style={{ float: "right" }} className="m-2">
                <Button className="m-1" color="primary" type="submit">
                  Submit <i className="fas fa-check-circle"></i>
                </Button>
                <Button
                  onClick={() => {
                    setmodal_small(false)
                  }}
                  color="danger"
                  type="button"
                >
                  Cancel <i className="fas fa-times-circle"></i>
                </Button>
              </div>
            </Form>
          </Modal>
        </Container>
        <Toaster />
      </div>
    </React.Fragment>
  )
}

export default Termsandconditions