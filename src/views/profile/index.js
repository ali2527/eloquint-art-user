import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col,Image, Button,InputNumber, Row, Avatar,DatePicker, Typography, Layout, Card,Form,Input,Radio,Upload } from "antd";
import { useNavigate } from "react-router";
import { UPLOADS_URL } from "../../config/constants/api";
import { Post } from "../../config/api/post";
import { AUTH, USER } from "../../config/constants/api";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import {CONTENT_TYPE} from "../../config/constants/index"
import swal from "sweetalert";
import dayjs from "dayjs"
import iconImage from "../../assets/images/profiel-loti.png"
import avatar from "../../assets/images/avatar.png"
//icons
import {
  FaArrowRight,
  FaArrowLeft,
  FaUserAlt,
  FaBox,
  FaUsers,
} from "react-icons/fa";
import {TbCameraPlus} from "react-icons/tb"

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user?.userData);
  const token = useSelector((state) => state.user?.userToken);
  const [loading, setLoading] = useState(false);
  const [editMode,setEditMode] = useState(false);
  const [imageNew,setImageNew] = useState()

  React.useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  console.log("imageNew",imageNew)

  const onFinish = (values) => {
    setLoading(true);
    const formObject = new FormData();

    if(imageNew){
      formObject.append("image",values.image.fileList[0].originFileObj);
    }

    formObject.append("intrests",values.intrests.split(",").map((value) => value.trim()));



    for (const key in values) {
      if (key !== "image" && key !== "intrests") {
        const item = values[key];
        formObject.append(key, item);
      }
    }
   
    Post(USER.updateProfile,formObject,token,null,CONTENT_TYPE.FORM_DATA)
      .then((response) => {
        setLoading(false);
        if (response?.data?.status) {
          console.log(response?.data)
          dispatch(
            addUser({ user: response.data.data, token: token })
          );

          swal("Success!", "Profile Updated Successfully", "success");
          setLoading(false);
          setEditMode(false);
          setImageNew()
        } else {
          swal("Oops!", response.data.message, "error");
        }
      })
      .catch((e) => {

        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <Layout style={{ minHeight: "" }}>
  

      {/* section 2 */}
      <Row
        className="AuthBackground"
        style={{  justifyContent: "center" }}
      >
      
        <Col xs={24} md={18}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",

              padding: "50px 20px",
            }}
          >
            <h2 class="page-heading">My Profile</h2>
            <br/>
            <Card
              className="infoBox"
              bordered={false}
              style={{
                width: "100%",
                padding: "30px",
                background:"#d0b8e9"
              }}
            >
              <Form
                layout="vertical"
                name="basic"
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

             
              <Row>
                <Col xs={24} md={12}>
                  <Row>
                  {editMode ? 
                  
                  
                  <Form.Item
                    
                      name="image"
                     
                    >
                      <Upload
                        name="image"
                        showUploadList={false}
                        style={{position:"relative"}}

                        beforeUpload={(file) => {     
                          setImageNew( URL.createObjectURL(file))                    
                          return false;
                      }}
                      > <div style={{padding:"8px",position:"absolute",right:-10,zIndex:2, bottom:40,backgroundColor:"#9b76d2",display:'flex',maxWidth:"fit-content",color:'white',borderRadius:"20px"}}><TbCameraPlus/></div> <Avatar
                      size={150}
                      src={
                        imageNew ? imageNew  :
                        !user?.image
                          ? avatar
                          : UPLOADS_URL + "/" + user?.image
                      }
                    /></Upload>
                    </Form.Item> : <Avatar
                    size={150}
                    src={
                      !user?.image
                        ? avatar
                        : UPLOADS_URL + "/" + user?.image
                    }
                  />}
                  </Row>

                  <br />
                  <br />

                  {editMode ? <>
                    <Row gutter={20}>
                  <Col xs={24} md={4} style={{display:'flex',alignItems:"center"}}>
                  <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginBottom: 20,
                        }}
                      >
                       Name : 
                      </Typography.Title>
                  </Col>
                  <Col xs={24} md={16}>
                    <Form.Item
                      name="fullName"
                      initialValue={user?.fullName}
                      rules={[
                        {
                          required: true,
                          message: "Please input your full name",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Enter FullName"
                        className="signupFormInput"
                      />
                    </Form.Item>
                  </Col>
            
                </Row>


                <Row gutter={20}>
                  <Col xs={24} md={4} style={{display:'flex',alignItems:"center"}}>
                  <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginBottom: 20,
                        }}
                      >
                       Age : 
                      </Typography.Title>
                  </Col>
                  <Col xs={24} md={16}>
                    <Form.Item
                      name="age"
                      initialValue={user?.age}
                      rules={[
                        {
                          required: true,
                          message: "Please input your age",
                        },
                      ]}
                    >
                      <InputNumber
                      style={{width:"100%", paddingTop:5}}
                        size="large"
                        placeholder="Enter Age"
                        className="signupFormInput"
                      />
                    </Form.Item>
                  </Col>
            
                </Row>

                <Row gutter={20}>
                  <Col xs={24} md={4} style={{display:'flex',alignItems:"center"}}>
                  <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginBottom: 20,
                        }}
                      >
                       Sex : 
                      </Typography.Title>
                  </Col>
                  <Col xs={24} md={16}>
                    <Form.Item
                      name="gender"
                      initialValue={user?.gender}
                      rules={[
                        {
                          required: true,
                          message: "Please select your gender",
                        },
                      ]}
                    >
                      <Input
                      style={{width:"100%"}}
                        size="large"
                        placeholder="Select Gender"
                        className="signupFormInput"
                      />
                    </Form.Item>
                  </Col>
            
                </Row>

                <Row gutter={20}>
                  <Col xs={24} md={4} style={{display:'flex',alignItems:"center"}}>
                  <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginBottom: 20,
                        }}
                      >
                       Email : 
                      </Typography.Title>
                  </Col>
                  <Col xs={24} md={16}>
                    <Form.Item
                      name="email"
                      initialValue={user?.email}
                      rules={[
                        {
                          type: "email",
                          message: "Please input a valid Email",
                        },
                        {
                          required: true,
                          message: "Please input your Email",
                        },
                      ]}
                    >
                      <InputNumber
                      style={{width:"100%", paddingTop:5}}
                        size="large"
                        placeholder="Enter Your Email"
                        className="signupFormInput"
                      />
                    </Form.Item>
                  </Col>
            
                </Row>


                <Row gutter={20}>
                  <Col xs={24} md={4} style={{display:'flex',alignItems:"center"}}>
                  <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginBottom: 20,
                        }}
                      >
                       Intrests : 
                      </Typography.Title>
                  </Col>
                  <Col xs={24} md={16}>
                    <Form.Item
                      name="intrests"
                      initialValue={user?.intrests}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your intrests",
                        },
                      ]}
                    >
                      <Input
                     
                        size="large"
                        placeholder="Add Your Intrests (comma seperated)"
                        className="signupFormInput"
                      />
                    </Form.Item>
                  </Col>
            
                </Row>

          
    
                </> :<>
                <Row>
                     <Col xs={12} sm={12}>
                       <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                       Name : 
                      </Typography.Title>
                    </Col>

                    <Col xs={12} sm={12}>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {user?.fullName}
                      </Typography.Text>
                    </Col>
                  </Row>
                  <br/>
                  
                  <Row>
                     <Col xs={12} sm={12}>
                       <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                       Age : 
                      </Typography.Title>
                    </Col>

                    <Col xs={12} sm={12}>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {user?.age}
                      </Typography.Text>
                    </Col>
                  </Row>

                  <br/>
                  
                  <Row>
                     <Col xs={12} sm={12}>
                       <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                       Sex : 
                      </Typography.Title>
                    </Col>

                    <Col xs={12} sm={12}>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {user?.gender}
                      </Typography.Text>
                    </Col>
                  </Row>

                  <br/>
                  
                  <Row>
                     <Col xs={12} sm={12}>
                       <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                       Email Address : 
                      </Typography.Title>
                    </Col>

                    <Col xs={12} sm={12}>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {user?.email}
                      </Typography.Text>
                    </Col>
                  </Row>

                  <br/>
                  
                  <Row>
                     <Col xs={12} sm={12}>
                       <Typography.Title
                        className="fontFamily1"
                        style={{
                          fontSize: "16px",
                          fontWeight: 600,
                          color: "black",
                          textAlign: "left",
                          marginTop: 0,
                        }}
                      >
                       Intrests : 
                      </Typography.Title>
                    </Col>

                    <Col xs={12} sm={12}>
                      <Typography.Text
                        className="fontFamily1"
                        style={{
                          fontSize: "14px",
                          color: "grey",
                          textAlign: "left",
                        }}
                      >
                        {user?.intrests}
                      </Typography.Text>
                    </Col>
                  </Row>

                  </>}
                 

                  <Row style={{ marginTop: 30 }}>
                   {editMode && <> <Button
                      type="primary"
                      htmlType="submit"
                      className="loginButton"
                     
                    >
                    Save Changes
                    </Button>&emsp;&emsp;
                    <Button
                      className="fontFamily1"
                      style={{
                        marginTop: "0px",
                        padding: "10px 30px",
                        cursor: "pointer",
                        color: "black",
                        borderRadius:"50px",
                        height: "auto",
                        border: "1px solid #203657",
                        fontWeight: "bold",
                      }}
                      ghost
                      size="large"
                      onClick={(e) => {e.preventDefault(); setEditMode(false)}}
                    >
                     Cancel
                    </Button></> }
                 
                  </Row>

                  <Row style={{ marginTop: 30 }}>
                    &emsp;
                    {/* <Button
                      className="fontFamily1"
                      style={{
                        marginTop: "0px",
                        padding: "10px 40px",
                        cursor: "pointer",
                        color: "black",
                        height: "auto",
                        border: "1px solid #203657",
                        fontWeight: "bold",
                      }}
                      ghost
                      size="large"
                    >
                      Join Lesson
                    </Button> */}
                  </Row>
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
              </Form>

              <Row>
                <Col xs={24} md={8}>
                {!editMode && <Row justify={"center"}><Col style={{textAlign:"center"}}><Button
                      type="primary"
                      htmlType="button"
                      className="loginButton"
                      onClick={() => setEditMode(true)}
                    >
                      Edit Profile Information
                    </Button> 
                    <br/>
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
                  <><span onClick={()=> navigate("/change-password")} style={{cursor:'pointer',fontWeight:'bold',textDecoration:"underline"}}>Change Password</span></>
                </Typography.Text>
                    </Col></Row>}
                </Col>
              </Row>

              
            </Card>
            <br/>
            <br/>  <br/>  <br/>
          </div>
        </Col>
      </Row>
    </Layout>
  );
}

export default Profile;

