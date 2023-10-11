import { useState } from "react";
import { Image } from "antd";
import {IoIosChatbubbles} from "react-icons/io";
import { CaretDownOutlined } from "@ant-design/icons";
import { MdMenu } from "react-icons/md";
import { Layout, Row, Col, Menu, Button,Badge,Modal, Drawer,Popover,Dropdown, Avatar,Typography, Input,Alert,message } from "antd";
import { useNavigate } from "react-router";
import { FaBars, FaEllipsisV, FaUser, FaSignOutAlt } from "react-icons/fa";
import { FiBell } from "react-icons/fi";
import {GoBellFill} from "react-icons/go"
import { UPLOADS_URL,AUTH } from "../../config/constants/api";
import {Get} from "../../config/api/get"
import { useSelector, useDispatch } from "react-redux";
import MainButton from "../MainButton";
import { AiFillCaretDown, AiFillApple } from "react-icons/ai"
import { removeUser } from "../../redux/slice/authSlice";
import logo from "../../assets/images/logo.png"
import contact from "../../assets/images/contact.png"
// import Link from 'next/link'
import avatar from "../../assets/images/avatar.png"
import swal from "sweetalert"

const { Header } = Layout;

const ClientHeader = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [logoutModal, setLogoutModal] = useState(false);
  const [contactModal, setContactModal] = useState(false);
  
  const [visible, setVisible] = useState(false);

  const items = [
    {
      key: "1",
      label: (
        <div
          className="headerDropdown"
          style={{
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            padding: "5px",
          }}
          onClick={() => navigate("/profile")}
        >
           My Profile
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div
          className="headerDropdown"
          style={{
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            padding: "5px",
          }}
          onClick={() => navigate("/contest-logs")}
        >
         Contest Logs
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div
          className="headerDropdown"
          style={{
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            padding: "5px",
          }}
          onClick={() => navigate("/subscription-logs")}
        >
         Subscription Logs
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div
          style={{
            fontSize: "16px",
            display: "flex",
            alignItems: "center",
            padding: "5px",
          }}
          onClick={() => setLogoutModal(true)}
        >
          <FaSignOutAlt style={{ fontSize: "16px" }} />
          &nbsp; Logout
        </div>
      ),
    },
  ];


  const content = (
    <div style={{ width: "350px" }}>
      <div
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Notifications</h3>
        <Alert
          message="5 New"
          type="success"
          style={{ fontSize: "12px", padding: "2px 10px", color: "green" }}
        />
      </div>
      <hr
        style={{
          borderLeft: "none",
          borderBottom: "none",
          borderRight: "none",
          borderTop: "1px solid rgb(0 0 0 / 15%)",
        }}
      />
      <div style={{ height: "250px", overflow: "auto" }}>
        <div style={{ padding: 10 }}>
          <Row
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Col xs={2}>
              <div
                style={{
                  padding: "10px 10px 10px 10px",
                  width: "16px",
                  display: "flex",
                  backgroundColor: "#385790",
                  borderRadius: "5px",
                }}
              >
                <FiBell
                  style={{ fontSize: "16px", margin: 0, color: "white" }}
                />
              </div>
            </Col>
            <Col xs={20}>
            <Typography.Title
                  className="fontFamily1"
                  style={{ fontSize: "14px", color: "black",margin:0 }}
                >
                  New Notification
                </Typography.Title>

                <Typography.Text
                  className="fontFamily1"
                  style={{ fontSize: "12px", color: "black",margin:0 }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
                veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
                illo delectus.
                </Typography.Text>
             
            </Col>
          </Row>
        </div>

        <div style={{ padding: 10 }}>
          <Row
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Col xs={2}>
              <div
                style={{
                  padding: "10px 10px 10px 10px",
                  width: "16px",
                  display: "flex",
                  backgroundColor: "#385790",
                  borderRadius: "5px",
                }}
              >
                <FiBell
                  style={{ fontSize: "16px", margin: 0, color: "white" }}
                />
              </div>
            </Col>
            <Col xs={20}>
            <Typography.Title
                  className="fontFamily1"
                  style={{ fontSize: "14px", color: "black",margin:0 }}
                >
                  New Notification
                </Typography.Title>

                <Typography.Text
                  className="fontFamily1"
                  style={{ fontSize: "12px", color: "black",margin:0 }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
                veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
                illo delectus.
                </Typography.Text>
             
            </Col>
          </Row>
        </div>

        <div style={{ padding: 10 }}>
          <Row
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Col xs={2}>
              <div
                style={{
                  padding: "10px 10px 10px 10px",
                  width: "16px",
                  display: "flex",
                  backgroundColor: "#385790",
                  borderRadius: "5px",
                }}
              >
                <FiBell
                  style={{ fontSize: "16px", margin: 0, color: "white" }}
                />
              </div>
            </Col>
            <Col xs={20}>
            <Typography.Title
                  className="fontFamily1"
                  style={{ fontSize: "14px", color: "black",margin:0 }}
                >
                  New Notification
                </Typography.Title>

                <Typography.Text
                  className="fontFamily1"
                  style={{ fontSize: "12px", color: "black",margin:0 }}
                >
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id nam
                veniam aperiam eveniet mollitia quos nemo! Officiis voluptates
                illo delectus.
                </Typography.Text>
             
            </Col>
          </Row>
        </div>

      </div>

      <hr
        style={{
          borderLeft: "none",
          borderBottom: "none",
          borderRight: "none",
          borderTop: "1px solid rgb(0 0 0 / 15%)",
        }}
      />

      <div
        style={{
          padding: "10px 20px",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Button type="link">View All</Button>
      </div>
    </div>
  );

  const logout = () => {
    setLogoutModal(false);

    dispatch(removeUser());
    navigate("/signin");
  };

  const sendMesssage = () =>{
    swal("Success","message sent successfully","success");
    setContactModal(false)
  }


  return (
    <Header
      style={{
        height: "auto",
        width: "100%",
        zIndex:20,
        padding: "20px",
        background: "transparent",
        scrollBehavior: "smooth",
      }}
      className="header1"
    >
      <Row
        style={{
          padding: "5px 0",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Col xs={24} md={22}>
          <Row
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Col
              xs={18}
              md={3}
              style={{ textAlign: "left" }}
              className="site-header-logo"
            >
              {/* <Link href={"/"}> */}
              <Image
                preview={false}
                alt={"Failed to load image"}
  
                height={80}
                src={logo}
                style={{ maxWidth: 230 }}
                onClick={()=> navigate("/")}
              />
              {/* </Link> */}
            </Col>
            <Col
              xs={0}
              md={15}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
        
              }}
              className="hide-on-phone"
            >
              <Menu
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: "transparent",
              
                }}
                mode="horizontal"
                className="header-menu"
              >
                 <Menu.Item key="home" className="hover"   onClick={()=> navigate("/")}>
                  Home
                </Menu.Item>
                <Menu.Item key="about" className="hover"   onClick={()=> navigate("/about-us")}>
                  About us
                </Menu.Item>
                <Menu.Item key="gallery" className="hover"   onClick={()=> navigate("/gallery")}>
                  Gallery
                </Menu.Item>
                <Menu.Item key="contest" className="hover"   onClick={()=> navigate("/contest")}>
                  Contest 
                </Menu.Item>
                <Menu.Item key="news" className="hover"   onClick={()=> navigate("/news")}>
                  News 
                </Menu.Item>
                <Menu.Item key="contact_us" className="hover"  onClick={()=> setContactModal(true)}  >
                  Contact
                </Menu.Item>
                <Menu.Item key="contact_us" className="hover"  onClick={()=> navigate("/editor")}  >
                  Create Designs
                </Menu.Item>
              </Menu>
            
            </Col>

            <Col
              xs={0}
              md={6}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
        
              }}
              className="hide-on-phone"
            >
           
              &emsp; &emsp;
             {!token ? <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
                className="header-btn-container"
              >
                <Button
                  style={{
                    padding: "0px 30px",
                    cursor: "pointer",
                    borderRadius:"50px",
                    background:"#9b76d2",
                    color:'white',
                    border:'none'
                  }}
                  onClick={()=> navigate("/signin")}
                  
              
                  
                  size="large"
                >
                  Login
                </Button>
                &emsp; &emsp;
                <Button
                  style={{
                    padding: "0px 30px",
                    cursor: "pointer",
                    borderRadius:"50px",
                    background:"#9b76d2",
                    color:'white',
                    border:'none'
                  }}
                  onClick={()=> navigate("/signup")}
                  
                  
                  size="large"
                >
                  Signup  
                </Button>
              </div> : <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
                className="header-btn-container"
              >
                {/* <IoIosChatbubbles style={{color:"white",fontSize:"30px"}} onClick={()=> navigate("/chat")}/> */}
                &emsp; &emsp;
                {/* <Popover
                content={content}
                placement="bottomRight"
                arrow={false}
                className="headerPopover"
              >
                <Badge count={0} style={{ backgroundColor: "#385790" }}>
                  <GoBellFill style={{ fontSize: "25px",color:"white", }} />
                </Badge>
              </Popover> */}
              &emsp; &emsp;
              <Avatar
                size={40}
                src={
                  !user.image ? avatar : UPLOADS_URL + "/" + user.image
                }
              />
               <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="bottomRight"
              >
                <p
                  style={{
                    marginLeft: 10,
                    fontSize: "16px",
                    textTransform: "capitalize",
                    color:"white",
                  }}
                >
                  {user?.fullName} <AiFillCaretDown fontSize={12} />{" "}
                </p>
              </Dropdown>

              </div>}
            </Col>

            <Col
              xs={4}
              md={0}
              style={{ textAlignLast: "right", justifyContent: "right" }}
              className="display-on-phone"
            >
           
                
              <MdMenu
                style={{ fontSize: 26, color: "white" }}
                onClick={()=> setVisible(true)}
                />
         
            </Col>
          </Row>
        </Col>
      </Row>

      <Drawer
        className="drawer header1"
        placement={"left"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        style={{backgroundColor:"#264067"}}
        key={"drawer"}
      >
       <Image
                preview={false}
                alt={"Failed to load image"}
  
                height={80}
                src={logo}
                style={{ maxWidth: 200 }}
                onClick={()=> navigate("/")}
              />
              <br/><br/><br/>
        <Menu
          style={{
            fontSize: 18,
            fontWeight: 500,
            backgroundColor: "transparent",
            color:"white"
          }}
          mode="inline"
          className="header-menu-mobile "
        >
     <Menu.Item key="home" className="hover"   onClick={()=> navigate("/")}>
                  Home
                </Menu.Item>
                <Menu.Item key="about" className="hover"   onClick={()=> navigate("/about-us")}>
                  About us
                </Menu.Item>
                <Menu.Item key="gallery" className="hover"   onClick={()=> navigate("/gallery")}>
                  Gallery
                </Menu.Item>
                <Menu.Item key="contest" className="hover"   onClick={()=> navigate("/contest")}>
                  Contest 
                </Menu.Item>
                <Menu.Item key="news" className="hover"   onClick={()=> navigate("/news")}>
                  News 
                </Menu.Item>
                <Menu.Item key="contact_us" className="hover" onClick={()=> setContactModal(true)}  >
                  Contact
                </Menu.Item>
        </Menu>
        <br/><br/>
        <Row gutter={20}>
          
          {!token && <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "right",
                }}
                className="header-btn-container"
              >
                <Button
                  style={{
                    padding: "0px 30px",
                    cursor: "pointer",
                    borderRadius:"50px",
                    background:"#9b76d2",
                    color:'white',
                    border:'none'
                  }}
                  onClick={()=> navigate("/signin")}
                  
              
                  
                  size="large"
                >
                  Login
                </Button>
                &emsp; &emsp;
                <Button
                  style={{
                    padding: "0px 30px",
                    cursor: "pointer",
                    borderRadius:"50px",
                    background:"#9b76d2",
                    color:'white',
                    border:'none'
                  }}
                  onClick={()=> navigate("/signup")}
                  
                  
                  size="large"
                >
                  Signup  
                </Button>
              </div>}
        </Row>
      </Drawer>

      <Modal
        visible={logoutModal}
        onOk={() => logout()}
        onCancel={() => setLogoutModal(false)}
        okText="Yes"
        className="StyledModal"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "center",
        }}
        cancelText="No"
        cancelButtonProps={{
          style: {
            border: "2px solid #385790",
            color: "#385790",
            height: "auto",
            padding: "6px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            marginTop: "15px",
          },
        }}
        okButtonProps={{
          style: {
            backgroundColor: "#385790",
            color: "white",
            marginTop: "15px",
            height: "auto",
            padding: "5px 35px",
            borderRadius: "50px",
            fontSize: "16px",
            border: "2px solid #385790",
          },
        }}
      >
        <Typography.Title level={4} style={{ fontSize: "25px" }}>
          Logout
        </Typography.Title>
        <Typography.Text style={{ fontSize: 16 }}>
          Are You Sure You Want To Logout ?
        </Typography.Text>
      </Modal>

      <Modal
        visible={contactModal}
        onOk={() => sendMesssage()}
        onCancel={() => setContactModal(false)}
        okText="Yes"
        className="StyledModal2"
        style={{
          left: 0,
          right: 0,
          marginLeft: "auto",
          marginRight: "auto",
          textAlign: "left",
    
        }}
        cancelText="No"
       footer={false}
      >
        <div >
                        <div class="row">
                            <div class="col-12 text-center">
                                <img src={contact} alt="" class="img-fluid"/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 text-center">
                                <h4 class="pop-heading">Contact Us</h4>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <form action="">
                                    <div class="form-field">
                                        <label for="exampleInputEmail1" class="form-label site-label">Name<span
                                                class="text-red">*</span></label>
                                        <input type="email" class="site-input left-icon blur-bg"
                                            placeholder="Enter Your Name" name="" id=""/>
                                    </div>
                                    <div class="form-field">
                                        <label for="exampleInputEmail1" class="form-label site-label">E-mail
                                            Address<span class="text-red">*</span></label>
                                        <input type="email" class="site-input left-icon blur-bg"
                                            placeholder="Enter Subject" name="" id=""/>
                                    </div>
                                    <div class="form-field">
                                        <label for="exampleInputEmail1" class="form-label site-label">Subject<span
                                                class="text-red">*</span></label>
                                        <input type="email" class="site-input left-icon blur-bg"
                                            placeholder="Enter Verification Code" name="" id=""/>
                                    </div>
                                    <div class="form-field">
                                        <label for="exampleInputEmail1" class="form-label site-label">Message<span
                                                class="text-red">*</span></label>
                                        <textarea class="form-control blur-bg" id="exampleFormControlTextarea1"
                                            rows="4"></textarea>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 d-flex justify-content-center align-items-center">
                                            <button type="button" class="site-btn" onClick={()=>sendMesssage()}>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
      </Modal>


    </Header>

    
  );
};

export default ClientHeader;
