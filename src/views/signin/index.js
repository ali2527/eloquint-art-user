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

// import router from "next/router";

function Signin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);

  // useEffect if user is already logged in
  // React.useEffect(() => {
  //   if (user && token) {
  //     navigate("/", { replace: true });
  //   }
  // }, [user, token]);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      email: values.email,
      password: values.password,
    };
    Post(AUTH.signin, data)
      .then((response) => {

        console.log(response,"#####")
        setLoading(false);
        if (response?.data?.status) {
          navigate("/", { replace: true });

          dispatch(
            addUser({ user: response.data.data.user, token: response.data.data.token })
          );
          swal("Success", response.data.message, "success");
         
        } else {
          if(response.data.message == "Users Subscription not Found"){
            navigate("/plans/" +response?.data?.data?.user._id)
          }
          
          console.log("response", response);
          swal("Oops!", response.data.message, "error");
        }
      })
      .catch((e) => {
        console.log(":::;", e);
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
                <h5 class="e-text-56" style={{textAlign:"center"}}>Login</h5>
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
                  <Row>
                    <Col xs={24} md={12}>
                      <Form.Item
                        name="remember"
                        valuePropName="checked"
                        style={{ marginBottom: 0, color: "white" }}
                      >
                        <Checkbox style={{ marginBottom: 0, color: "black" }}>
                          {" "}
                          <p className="fontFamily1" style={{ margin: 0 }}>
                            Remember Me
                          </p>
                        </Checkbox>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Button
                        type="link"
                        style={{
                          float: "right",
                          color: "black",
                          fontWeight: "bold",
                          textDecoration: "underline",
                          fontSize: "14px",
                        }}
                        onClick={() => navigate("/forgot-password")}
                      >
                        <p className="fontFamily1" style={{ margin: 0 }}>
                          Forgot Password?
                        </p>
                      </Button>
                    </Col>
                  </Row>
                  <br />

                  <Row justify={"center"}>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="loginButton"
                    >
                      {loading ? "Loading..." : "Login"}
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
                  <><span onClick={()=> navigate("/")} style={{cursor:'pointer',fontWeight:'bold',textDecoration:"underline"}}>Back to Website</span></>
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

export default Signin;
