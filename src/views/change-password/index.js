import React from "react";
import { Post } from "../../config/api/post";
import { useSelector, useDispatch } from "react-redux";
import { USER } from "../../config/constants/api";
import { useNavigate,useLocation } from "react-router";
import { Col, Row,Image, Typography, Layout, Card,Form,  Input,
  Button } from "antd";
import { FiMail, FiLock } from "react-icons/fi";
import swal from "sweetalert";
import iconImage from "../../assets/images/change-ps.png"



function ChangePassword() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const user = useSelector((state) => state.user?.userData);
  const token = useSelector((state) => state.user?.userToken);
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    Post(USER.changePassword, values,token)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success", response?.data?.message, "success");
          form.resetFields();
        } else {
          swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
        }
      })
      .catch((e) => {
        swal("Oops!","internal server error", "error");
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <Layout style={{ minHeight: "" }}>
      <Row
        className="AuthBackground"
        style={{ justifyContent: "center" }}
      >
        <Col xs={24} md={16}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",

              padding: "50px 20px",
            }}
          >
            <Card
              className="infoBox"
              bordered={false}
              style={{
                width: "100%",
                padding: "30px",
                background:"#d0b8e9"
              }}
            >
              <Row>
                <Col xs={24} md={12}>
                <Form
                  layout="vertical"
                  name="basic"
                  form={form}
                  className="contactForm"
                  labelCol={{
                    span: 0,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                >
                   <Form.Item
                    label="Old Password*"
                    name="old_password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your current password!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                     
                      placeholder="Enter Current Password"
                      className="signupFormInput"
                    />
                  </Form.Item>

                  <Form.Item
                    label="New Password*"
                    name="new_password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your new password!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                     
                      placeholder="Enter New Password"
                      className="signupFormInput"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password*"
                    name="confirmPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                     
                      placeholder="Confirm New Password"
                      className="signupFormInput"
                    />
                  </Form.Item>
                  <br />

                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="loginButton"
                    >
                      {loading ? "Loading..." : "Update Password"}
                    </Button>
                  </Form.Item>
                </Form>
                </Col>
                <Col xs={0} md={12} className="flex">
                <Image
                      src={iconImage}
                      style={{height:"400px"}}
                      alt=""
                      preview={false}
                    />

                </Col>
              </Row>
              

              <br/>
              <br/>

           
        
            </Card>
            <br/><br/>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default ChangePassword;
