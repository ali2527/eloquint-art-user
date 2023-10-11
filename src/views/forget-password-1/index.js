import React from "react";
// import AuthLayout from "../../components/";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Layout,
  Input,
  Button,
  Checkbox,
  Tabs,
  Table,
  Image,
  Divider,
} from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants/api";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import { FiMail, FiLock } from "react-icons/fi";
import swal from "sweetalert";
import logo from "../../assets/images/logo-login.png"




function ForgetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);
// import router from "next/router";
const onFinish = (values) => {
  
  console.log("Success:", values);
  setLoading(true);
  

  Post(AUTH.emailCode, values)
    .then((response) => {
      setLoading(false);
      if (response?.data) {
        swal("Success", response?.data?.message, "success");
        navigate("/forgot-password-2", { replace: true,state:values });
      } else {
        swal("Oops!", response?.data?.message || response?.response?.data?.message, "error");
      }
    })
    .catch((e) => {
      console.log(e,"ww")
      swal("Oops!","internal server error", "error");
      setLoading(false);
    });
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};


  return (
     
   

<Layout className="AuthBackground" style={{ minHeight: "100vh" }}>
<Row justify={"center"}>
<Col xs={24} sm={22} md={16}>
<Row style={{height:"80vh"}}>
 <Col xs={0} sm={0} md={12} className="authImageBox">
 </Col>

 <Col xs={24} md={12}>
 <div className="authFormBox">
            <Row style={{ width: "100%", justifyContent: "center" }}>
              <Col xs={20} md={20} className="formWrap">
              <Row style={{ width: "100%", textAlign: "center",justifyContent:"center" }}>
                <Image
                      src={logo}

                      alt=""
                      preview={false}
                    />
                </Row>
                <br />
                <br />
                <h5 class="e-text-56" style={{textAlign:"center"}}>Forget Password</h5>
                <br />
                <p class="login-p">Enter your email address to receive a
                                        verification code</p>
                <br />
                <Form
                  layout="vertical"
                  name="basic"
                  className="loginForm"
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
                    label="Email Address*"
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Please input valid email!",
                        // warningOnly: true,
                      },
                      {
                        required: true,
                        message: "Please input your email!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Email Address"
                      className="AuthFormInput"
  
                    />
                  </Form.Item>

                  
                  
                  <Row justify={"center"}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="loginButton"
                      // onClick={() => navigate("/forgot-password-2")}
                    >
                      {loading ? "Loading..." : "Continue"}
                    </Button>
                  </Form.Item>
                  </Row>
                </Form>
                <Row justify={"center"}>
                   
                      <Button
                        type="link"
                        style={{
                    
                          color: "black",
                          fontWeight: "bold",
                          textDecoration: "underline",
                          fontSize: "14px",
                        }}
                        onClick={() => navigate("/signin")}
                      >
                        <p className="fontFamily1" style={{ margin: 0 }}>
                          Back to Login
                        </p>
                      </Button>
               
                  </Row>
              </Col>
            </Row>
          </div>
 </Col>
</Row>
</Col>
</Row>

</Layout>
  );
}

export default ForgetPassword;
