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
  Card,
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
import { PiMedal } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";
import { TbBolt } from "react-icons/tb";
import { LiaBrainSolid } from "react-icons/lia";
import swal from "sweetalert";
import { FullPage, Slide } from "react-full-page";
import logo from "../../assets/images/ftr-logo.png";
import RoseSVG from "../../components/rose";

import top1 from "../../assets/images/top1.png";
import top2 from "../../assets/images/top2.png";
import top3 from "../../assets/images/top3.png";
import top4 from "../../assets/images/top4.png";
import top5 from "../../assets/images/top5.png";
import banr from "../../assets/images/banr-txt.png";
// import vdo1 from "../../assets/images/blast-vid-full.mp4";
import vdo1 from "../../assets/images/vdo2.mp4";

// import router from "next/router";

function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Search } = Input;
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = React.useState(false);

  const onFinish = (values) => {
    console.log("Success:", values);
    setLoading(true);

    let data = {
      email: values.email,
      password: values.password,
      devideId: "123456789",
    };
    Post(AUTH.signin, data)
      .then((response) => {
        setLoading(false);
        if (response?.data) {
          console.log("response", response.data.token);
          console.log("response", response.data.user);
          dispatch(
            addUser({ user: response.data.user, token: response.data.token })
          );
          navigate("/", { replace: true });
        } else {
          swal("Oops!", response.response.data.message, "error");
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
    <FullPage controls={false} duration={100} style={{}}>
      <Slide className="vertical-scrolling wrapper1" style={{ height: "100vh" }}>
        <div class="">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-12">
                <div class="img-box">
                  <img src={top1} alt="" class="img-fluid pic1" />
                  <img src={top2} alt="" class="img-fluid pic2" />
                  <img src={top3} alt="" class="img-fluid pic3" />
                  <img src={top4} alt="" class="img-fluid pic4" />
                  <img src={top5} alt="" class="img-fluid pic5" />
                  <img src={banr} alt="" class="img-fluid banr-txt" />
                </div>
                <div class="for-downarrwo">
                  <div
                    class="scroll-prompt"
                    scroll-prompt=""
                    ng-show="showPrompt"
                    style={{ opacity: 1 }}
                  >
                    <a
                      href="#secondSection"
                      class="scroll-prompt-arrow-container"
                    >
                      <div class="scroll-prompt-arrow">
                        <div></div>
                      </div>
                      <div class="scroll-prompt-arrow">
                        <div></div>
                      </div>
                    </a>
                  </div>
                </div>
                <p style={{position:'absolute', fontSize:"22px",bottom:230,right:'25%', color:'white', maxWidth:'50%', textAlign:'center'}}>Escape, and go where you can relax and unwind, where your care dissapers, view passionate, elluring photos and express your creative side. Adorn and personalize beautiful photos. Feel yourself become aroused. Feel your heart race, your temprature rise, Ignite the fire! Enhance the passion in your love life</p>
              </div>
            </div>
          </div>
        </div>
      </Slide>
      <Slide class="vertical-scrolling wrapper7">
 
        <video id="myVideo" autoPlay  muted loop >
             <source src={vdo1} type="video/mp4"/>
          
         </video>
   
        </Slide>
      {/* <Slide class="vertical-scrolling wrapper5">
        <div class="">
          <div class="container-fluid" style={{ position: "relative" }}>
            <div class="row justify-content-between">
              <div class="col-lg-5">
                <div class="img-box">
                
                </div>
              </div>
              <div class="col-lg-5">
                <div class="img-box">
                
                </div>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)", // Centering trick
                textAlign: "center",
              }}
            >
              <RoseSVG />
            </div>
          </div>
        </div>
        <div class="for-downarrwo">
          <div
            class="scroll-prompt"
            scroll-prompt=""
            ng-show="showPrompt"
            style={{ opacity: 1 }}
          >
            <a href="#sixSection" class="scroll-prompt-arrow-container">
              <div class="scroll-prompt-arrow">
                <div></div>
              </div>
              <div class="scroll-prompt-arrow">
                <div></div>
              </div>
            </a>
          </div>
        </div>
      </Slide> */}
      <Slide class="vertical-scrolling wrapper">
        <div class="">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-12">
                <div class="img-box">
                  <img src={top1} alt="" class="img-fluid pic1" />
                  <img src={top2} alt="" class="img-fluid pic2" />
                  <img src={top3} alt="" class="img-fluid pic3" />
                  <img src={top4} alt="" class="img-fluid pic4" />
                  <img src={top5} alt="" class="img-fluid pic5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="for-downarrwo">
          <div
            class="scroll-prompt"
            scroll-prompt=""
            ng-show="showPrompt"
            style={{ opacity: 1 }}
          >
            <a href="#fifthSection" class="scroll-prompt-arrow-container">
              <div class="scroll-prompt-arrow">
                <div></div>
              </div>
              <div class="scroll-prompt-arrow">
                <div></div>
              </div>
            </a>
          </div>
        </div>
      </Slide>

      <Slide class="vertical-scrolling wrapper3">
        <div class="">
          <div class="container-fluid" style={{ position: "relative" }}>
            <div class="row justify-content-between">
              <div class="col-lg-5">
                <div class="img-box">
                  <img src={top1} alt="" class="img-fluid pic1" />
                  <img src={top2} alt="" class="img-fluid pic2" />
                  <img src={top3} alt="" class="img-fluid pic3" />
                  <img src={top4} alt="" class="img-fluid pic4" />
                  <img src={top5} alt="" class="img-fluid pic5" />
                </div>
              </div>
              <div class="col-lg-5">
                <div class="img-box">
                  <img src={top1} alt="" class="img-fluid pic1" />
                  <img src={top2} alt="" class="img-fluid pic2" />
                  <img src={top3} alt="" class="img-fluid pic3" />
                  <img src={top4} alt="" class="img-fluid pic4" />
                  <img src={top5} alt="" class="img-fluid pic5" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="for-downarrwo">
          <div
            class="scroll-prompt"
            scroll-prompt=""
            ng-show="showPrompt"
            style={{ opacity: 1 }}
          >
            <a href="#sixSection" class="scroll-prompt-arrow-container">
              <div class="scroll-prompt-arrow">
                <div></div>
              </div>
              <div class="scroll-prompt-arrow">
                <div></div>
              </div>
            </a>
          </div>
        </div>
      </Slide>
      <Slide className="footer">
        <div class="container">
          <div class="row justify-content-center text-center">
            <div class="col-lg-8">
              <img src={logo} alt="" class="img-fluid footer-logo" />
              <p class="fotr-p">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              <img
                src="../assets/images/news.png"
                alt=""
                class="img-fluid news"
              />
              <p class="fotr-p">
                By subscribing to our mailing list you will always be <br />
                update with the latest news from us.
              </p>

              <div class="fotr-input">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Recipient's username"
                  aria-describedby=""
                />
                <button type=" submit">Send Message</button>
              </div>

              <p class="fotr-p" style={{cursor:'pointer'}} onClick={() => navigate("/community-rules")}>
               Community Rules
              </p>

            </div>
          </div>
        </div>
      </Slide>
    </FullPage>
    //  <Layout  style={{ minHeight: "100vh" }}>

    //   {/* <div id="fullpage">
    //     <section class="vertical-scrolling wrapper1">
    //         <div class="">
    //             <div class="container">
    //                 <div class="row justify-content-center">
    //                     <div class="col-lg-12">
    //                         <div class="img-box">
    //                             <img src={top1} alt="" class="img-fluid pic1"/>
    //                             <img src={top2} alt="" class="img-fluid pic2"/>
    //                             <img src={top3} alt="" class="img-fluid pic3"/>
    //                             <img src={top4} alt="" class="img-fluid pic4"/>
    //                             <img src={top5} alt="" class="img-fluid pic5"/>
    //                             <img src={banr} alt="" class="img-fluid banr-txt"/>
    //                         </div>
    //                         <div class="for-downarrwo">
    //                             <div class="scroll-prompt" scroll-prompt="" ng-show="showPrompt" style={{opacity: 1}}>
    //                                 <a href="#secondSection" class="scroll-prompt-arrow-container">
    //                                     <div class="scroll-prompt-arrow">
    //                                         <div></div>
    //                                     </div>
    //                                     <div class="scroll-prompt-arrow">
    //                                         <div></div>
    //                                     </div>
    //                                 </a>
    //                             </div>
    //                         </div>

    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </section>
    //     <section class="vertical-scrolling">
    //         <video id="myVideo" autoPlay  muted loop>
    //             <source src={vdo1} type="video/mp4"/>

    //         </video>
    //         <div class="for-downarrwo">
    //             <div class="scroll-prompt" scroll-prompt="" ng-show="showPrompt" style={{opacity: 1}}>
    //                 <a href="#thirdSection" class="scroll-prompt-arrow-container">
    //                     <div class="scroll-prompt-arrow">
    //                         <div></div>
    //                     </div>
    //                     <div class="scroll-prompt-arrow">
    //                         <div></div>
    //                     </div>
    //                 </a>
    //             </div>
    //         </div>
    //     </section>

    //     <section class="vertical-scrolling wrapper">
    //         <div class="">
    //             <div class="container">
    //                 <div class="row justify-content-center">
    //                     <div class="col-lg-12">
    //                         <div class="img-box">
    //                             <img src={top1} alt="" class="img-fluid pic1"/>
    //                             <img src={top2} alt="" class="img-fluid pic2"/>
    //                             <img src={top3} alt="" class="img-fluid pic3"/>
    //                             <img src={top4} alt="" class="img-fluid pic4"/>
    //                             <img src={top5} alt="" class="img-fluid pic5"/>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="for-downarrwo">
    //             <div class="scroll-prompt" scroll-prompt="" ng-show="showPrompt" style={{opacity: 1}}>
    //                 <a href="#fifthSection" class="scroll-prompt-arrow-container">
    //                     <div class="scroll-prompt-arrow">
    //                         <div></div>
    //                     </div>
    //                     <div class="scroll-prompt-arrow">
    //                         <div></div>
    //                     </div>
    //                 </a>
    //             </div>
    //         </div>

    //     </section>
    //     <section class="vertical-scrolling wrapper3">
    //         <div class="">
    //             <div class="container-fluid">
    //                 <div class="row justify-content-between">
    //                     <div class="col-lg-5">
    //                         <div class="img-box">
    //                             <img src={top1} alt="" class="img-fluid pic1"/>
    //                             <img src={top2} alt="" class="img-fluid pic2"/>
    //                             <img src={top3} alt="" class="img-fluid pic3"/>
    //                             <img src={top4} alt="" class="img-fluid pic4"/>
    //                             <img src={top5} alt="" class="img-fluid pic5"/>
    //                         </div>
    //                     </div>
    //                     <div class="col-lg-5">
    //                         <div class="img-box">
    //                             <img src={top1} alt="" class="img-fluid pic1"/>
    //                             <img src={top2} alt="" class="img-fluid pic2"/>
    //                             <img src={top3} alt="" class="img-fluid pic3"/>
    //                             <img src={top4} alt="" class="img-fluid pic4"/>
    //                             <img src={top5} alt="" class="img-fluid pic5"/>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //         <div class="for-downarrwo">
    //             <div class="scroll-prompt" scroll-prompt="" ng-show="showPrompt" style={{opacity: 1}}>
    //                 <a href="#sixSection" class="scroll-prompt-arrow-container">
    //                     <div class="scroll-prompt-arrow">
    //                         <div></div>
    //                     </div>
    //                     <div class="scroll-prompt-arrow">
    //                         <div></div>
    //                     </div>
    //                 </a>
    //             </div>
    //         </div>

    //     </section>

    // </div> */}
    //     </Layout>
  );
}

export default Homepage;
