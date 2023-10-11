import React, { useState } from "react";
import {
  message,
  Slider,
  Input,
  Col,
  Row,
  Typography,
  Layout,
  Card,
  Modal,
  Checkbox,
  Rate,
  Select,
} from "antd";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Post } from "../../config/api/post";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import { Get } from "../../config/api/get";
import dayjs from "dayjs";
import {
  AUTH,
  RATES,
  REVIEWS,
  UPLOADS_URL,
  SUBSCRIPTION,
} from "../../config/constants/api";
import {
    CONTEST,
  } from "../../config/constants/api";
//icons
import visa from "../../assets/images/visa.png"

import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useEffect } from "react";

function Plans() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const { Search } = Input;
  const {id} = useParams()
  const [loading, setLoading] = useState(false);
  const [contests, setContests] = useState([]);
  const [range, setRange] = useState([10, 200]);
  const [selectedEntry, setSelectedEntry] = useState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cardDetails,setCardDetaila] = useState({
    cardName:"",
    cardNumber:"",
    month:"",
    year:"",
    cvv:""
  })

  const [availability, setAvailability] = useState(0, 1, 2, 3, 4, 5, 6);
  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
  });


  const showModal = (entryId) => {
    setSelectedEntry(entryId)
    setIsModalOpen(true);
  };



  const handleCancel = () => {
    setIsModalOpen(false);
  };


  
  const handleCardDetailChange = (item, value) => {
    console.log(item,value)
    let _cardDetails = {...cardDetails}
    _cardDetails[item] = value;
    setCardDetaila(_cardDetails)
  }


  const contestPayent = async (pageNumber) => {
    setLoading(true)

    console.log(cardDetails)

    let data = {
        userId:id,
        planId:selectedEntry,
      cardNumber:cardDetails.cardNumber,
      month:cardDetails.month,
      year:cardDetails.year,
      cvv:cardDetails.cvv
    }
    try {
      const response = await Post(CONTEST.subscriptionPayment,data,null);
   
      console.log("response", response);
      if (response?.data?.status) {
        message.success(response?.data?.message)
        setIsModalOpen(false);
        setCardDetaila({
          cardName:"",
          cardNumber:"",
          month:"",
          year:"",
          cvv:""
        })
        navigate("/signin")
      } else {
        message.error(response?.response?.data?.message || response?.message || "Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };



  const [filter, setFilter] = useState({
    status: null,
    keyword: "",
    from: null,
    to: null,
  });

  const [searchFilter,setSearchFilter]=useState({
    keyword:"",
    subjects:null,
    days: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    })



  useEffect(() => {

    getSubscriptions();
  }, []);

//   const getSubscriptions = async (pageNumber, keyword, max, min, sbj, days) => {
//     setLoading(true);
//     try {
//       const response = await Get(CONTEST.getSubscriptionss,null, {
//         page: pageNumber
//           ? pageNumber.toString()
//           : paginationConfig.pageNumber.toString(),
//         limit: "9",
//         keyword: keyword ? keyword : "",
//         maxHourlyRate: max ? max.toString() : null,
//         minHourlyRate: min ? min.toString() : null,
//         subjects: sbj ? sbj : null,
//         daysToFilter: days ? days : null,
//       });
//       setLoading(false);
//       console.log("response", response);
//       if (response?.status) {
//         setContests(response?.data?.docs);
//         // setRatings(response.data.ratings)
//         setPaginationConfig({
//           pageNumber: response?.data?.page,
//           limit: response?.data?.limit,
//           totalDocs: response?.data?.totalReviews,
//           totalPages: response?.data?.totalPages,
//         });
//       } else {
//         message.error("Something went wrong!");
//         console.log("error====>", response);
//       }
//     } catch (error) {
//       console.log(error.message);
//       setLoading(false);
//     }
//   };

  const getSubscriptions = async (pageNumber, pageSize, search, reset = false) => {
    setLoading(true);
    try {
      const response = await Get(SUBSCRIPTION.get, token, {
        page: "1",
        limit: 100,
      });
      setLoading(false);
      console.log("response", response);
      if (response?.docs) {
        setContests(response?.docs);
        setPaginationConfig({
          pageNumber: response?.page,
          limit: response?.limit,
          totalDocs: response?.totalDocs,
          totalPages: response?.totalPages,
        });
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  const handlePageChange = (e) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: Number(e.selected) + 1,
    });

    getSubscriptions(Number(e.selected) + 1);
  };



  return (
    <Layout style={{ minHeight: "" }}>
      {/* section 2 */}
      
      <Row
        className="AuthBackground"
        style={{
          backgroundColor: "white",
          justifyContent: "center",
          padding: "50px",
        }}
        gutter={20}
      >
       
    
        
      
        <Col xs={24} md={19}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              padding: "10px",
            }}
          >
             <Row justify={"center"}>

<h2 class="page-heading">Subscription Plans</h2>
</Row>
<br/>

            <Row gutter={[30, 30]}>

            {contests.length == 0 && <div style={{width:"100%",minHeight:"400px",display:'flex',justifyContent:'center',alignItems:"center"}}>
              
            <Typography.Title
                                className="fontFamily1"
                                style={{
                                  fontSize: "25px",
                                  fontWeight: "bold",
                                  color: "black",
                                  textAlign: "left",
                                  marginTop: 0,
                                }}
                              >
                              No Plans Found
                              </Typography.Title>
                              </div>}








              {contests.length > 0 &&
                contests.map((item, index) => {
                  console.log("item", item);
                  return (
                    <Col xs={24} sm={12} lg={12}>
                      <div class="for-sub-card-grp">
                    <div class="months-box" style={{display:'flex'}}>
                        <h5 style={{marginLeft:"-60%"}}>{item.title}</h5>
                    </div>
                    <div class="subc-card">
                        <h5>{item.durationInDays} Days Expiry</h5>
                        <h3>$ {item.price}</h3>
                        <br/>
                        <ul>
                            {item?.features.toString().split(",").map((subItem,subIndex) => {
                                return( <li>
                                    <p>{subItem}</p>
                                </li>)
                            })}
                           
                        </ul>
                        <div class="sub-card-btn">
                            <a class="site-btn"  onClick={() => showModal(item._id)}>Select Plan</a>
                        </div>
                    </div>
                </div>
                    </Col>
                  );
                })}
            </Row>
            <br />

         
          </div>
        </Col>

        <Modal
        
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
      >
      <div class="row">
                  <div class="col-12 text-center">
                      <img src={visa} alt=""/>
                  </div>
              </div>
              <div class="row">
                  <div class="col-12 text-center">
                      <h4 class="pop-heading">Payment Detail</h4>
                  </div>
              </div>
              <div class="row py-4">
                  <div class="col-12 text-center">
                      <form action="">
                          <div class="form-field mb-3">
                              <label for="exampleInputEmail1" class="form-label site-label text-start">Cardholder
                                  Name<span class="text-red">*</span></label>
                              <input value={cardDetails.cardName} onChange={(e)=> handleCardDetailChange("cardName",e.target.value)} class="site-input left-icon blur-bg"
                                  placeholder="Enter Cardholder Name" name="" id=""/>
                          </div>
                          <div class="form-field mb-3">
                              <label for="exampleInputEmail1" class="form-label site-label text-start">Credit/Debit
                                  Card No<span class="text-red">*</span></label>
                              <input value={cardDetails.cardNumber} maxlength = "16" onChange={(e)=> handleCardDetailChange("cardNumber",e.target.value)} type="text" class="site-input both-icon enter-input blur-bg"
                                  placeholder="Enter Credit /Debit Card Number" name="" id=""/>
                              <i class="fas fa-calendar-alt right-icon" aria-hidden="true"></i>
                          </div>
                          <div class="row">
                              <div class="col-lg-6">
                                  <div class="form-field mb-3">
                                      <label for="exampleInputEmail1" class="form-label site-label text-start">Expiry
                                          Date<span class="text-red">*</span></label>
                                      <select  defaultValue={cardDetails.month} onChange={(e)=> handleCardDetailChange("month",e.target.value)} class="form-select site-input blur-bg"
                                          aria-label="Default select example">
                                          <option value="" disabled>Month</option>
                                          <option value={1}>01</option>
                                          <option value={2}>02</option>
                                          <option value={3}>03</option>
                                          <option value={4}>04</option>
                                          <option value={5}>05</option>
                                          <option value={6}>06</option>
                                          <option value={7}>07</option>
                                          <option value={8}>08</option>
                                          <option value={9}>09</option>
                                          <option value={10}>10</option>
                                          <option value={11}>11</option>
                                          <option value={12}>12</option>
                                      </select>
                                  </div>
                              </div>
                              <div class="col-lg-6">
                                  <div class="form-field mb-3">
                                      <label for="exampleInputEmail1"
                                          class="form-label site-label text-start">Year<span
                                              class="text-red">*</span></label>
                                      <select  defaultValue={cardDetails.year} onChange={(e)=> handleCardDetailChange("year",e.target.value)} class="form-select site-input blur-bg"
                                          aria-label="Default select example">
                                          <option value="" disabled>Year</option>
                                          <option value={23}>2023</option>
                                          <option value={24}>2024</option>
                                          <option value={25}>2025</option>
                                          <option value={26}>2026</option>
                                          <option value={27}>2027</option>
                                          <option value={28}>2028</option>
                                          <option value={29}>2029</option>
                                          <option value={30}>2030</option>
                                          <option value={31}>2031</option>
                                          <option value={32}>2032</option>
                                          <option value={33}>2033</option>
                                          <option value={34}>2034</option>
                                          <option value={35}>2035</option>
                                          <option value={36}>2036</option>
                                          <option value={37}>2037</option>
                                          <option value={38}>2038</option>
                                          <option value={39}>2039</option>
                                          <option value={40}>2040</option>
                                          <option value={41}>2041</option>
                                          <option value={42}>2042</option>
                                          <option value={43}>2043</option>
                                          <option value={44}>2044</option>
                                      </select>
                                  </div>
                              </div>
                          </div>
                          <div class="form-field mb-3">
                              <label for="exampleInputEmail1" class="form-label site-label text-start">CVV<span
                                      class="text-red">*</span></label>
                              <input value={cardDetails.cvv} onChange={(e)=> handleCardDetailChange("cvv",e.target.value)} maxlength = "3"class="site-input left-icon blur-bg" placeholder="Enter CVV Number"
                                  name="cvv" id=""/>
                          </div>
                      </form>
                  </div>
              </div>
              <div class="row">
                  <div class="col-12 d-flex justify-content-center align-items-center">
                      <span class="site-btn" onClick={() => contestPayent()}>Proceed</span>
                  </div>
              </div>
      </Modal>


      </Row>
    </Layout>
  );
}

export default Plans;
