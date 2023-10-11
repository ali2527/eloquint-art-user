import React,{useRef} from "react";
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
  InputNumber,
  Checkbox,
  Tabs,
  Table,
  Image,
  Divider,
} from "antd";
import { useNavigate,useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { AUTH } from "../../config/constants/api";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import { FiMail, FiLock } from "react-icons/fi";
import swal from "sweetalert";
import logo from "../../assets/images/logo-login.png"




function ForgetPassword2() {
  const {state} = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);
   

  console.log("state",state)
  // import router from "next/router";
  const onFinish = (values) => { 
    Post(AUTH.verifyCode, {code:values.code,email:state.email})
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          swal("Success", response?.data?.message, "success");
          navigate("/forgot-password-3", { replace: true,state:{code:values.code,email:state.email} });
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
                    <p class="login-p">An email has been sent to you with a verification code. Please enter it here.</p>
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
                        label="Verification Code*"
                        name="code"
                        rules={[
                          {
                            required: true,
                            message: "Please input your code!",
                          },
                        ]}
                      >
                        <Input
                          size="large"
                          placeholder="Enter Verification Code"
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

export default ForgetPassword2;
