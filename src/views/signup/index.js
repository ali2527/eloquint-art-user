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
  InputNumber,
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

// import router from "next/router";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);

  // useEffect if user is already logged in
  React.useEffect(() => {
    if (user && token) {
      navigate("/", { replace: true });
    }
  }, [user, token]);

  const onFinish = (values) => {
         console.log("Success:", values);
         setLoading(true);

         if(values.age < 18){
          return swal("Error","Age Must be greater than 18","error")
         }
         
         let data = {
          fullName:values.fullName,
           email: values.email,
           password: values.password,
           age:values.age,
           phoneNumber:values.phoneNumber,
         };
         Post(AUTH.signup, data)
           .then((response) => {
             setLoading(false);
    
             console.log(response,"response;;;")
    
    
             if (response?.data?.status) {
               swal("Success", response?.data?.message, "success");
               navigate("/plans/"+response?.data?.data?.user._id, { replace: true });
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
                
                <br />
                <br />
                <h5 class="e-text-56" style={{textAlign:"center"}}>Create Account
</h5>
                <br />
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
                    label="Full Name*"
                    name="fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please input your full Name!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Full Name"
                      className="AuthFormInput"
                     
                    />
                  </Form.Item>
                  <Form.Item
                    label="Phone Number*"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: "Please input your phone Number!",
                      },
                    ]}
                  >
                    <Input
                      size="large"
                      placeholder="Enter Phone Number"
                      className="AuthFormInput"
                     
                    />
                  </Form.Item>

                  <Form.Item
                    label="Age*"
                    name="age"
                    rules={[
                      {
                        required: true,
                        message: "Please input your age!",
                      },
                    ]}
                  >
                    <InputNumber
                    style={{width:"100%" , paddingTop:5}}
                      size="large"
                      placeholder="Enter Age"
                      className="AuthFormInput"
                     
                    />
                  </Form.Item>


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

                  <Form.Item
                    label="Password*"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please input your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      size="large"
                    
                      placeholder="Enter Password"
                      className="AuthFormInput"
                    />
                  </Form.Item>
             
                  <br />

                  <Row justify={"center"}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="loginButton"
                    >
                      {loading ? "Loading..." : "REgister"}
                    </Button>
                  </Form.Item>
</Row>

                 
                </Form>

                <Row justify={"center"}>
                <Typography.Text
                  className="fontFamily1"
                  style={{
                    fontSize: "14px",
                    color: "black",
                    justifyContent:"center",
                    textAlign: "center",
                    marginTop: 0,
                    marginBottom: 30,
                  }}
                >
                  <><span onClick={()=> navigate("/signin")} style={{cursor:'pointer',fontWeight:'bold',textDecoration:"underline"}}>Already have an Account? Login</span></>
                </Typography.Text>
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

export default Signup;
