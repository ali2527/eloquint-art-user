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
  Button,
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
import visa from "../../assets/images/visa.png"
import {
  AUTH,
  RATES,
  REVIEWS,
  UPLOADS_URL,
  CONTEST,
} from "../../config/constants/api";
import { SUBJECTS } from "../../config/constants";
//icons
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useEffect } from "react";

function ContestDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const { Search } = Input;
  const {id} = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

  const [loading, setLoading] = useState(false);
  const [contest, setContest] = useState([]);
  const [entries, setEntries] = useState([]);
  const [selectedEntry, setSelectedEntry] = useState();
  const [range, setRange] = useState([10, 200]);
  const [availability, setAvailability] = useState(0, 1, 2, 3, 4, 5, 6);
  const [cardDetails,setCardDetaila] = useState({
    cardName:"",
    cardNumber:"",
    month:"",
    year:"",
    cvv:""
  })


  const [paginationConfig, setPaginationConfig] = useState({
    pageNumber: 1,
    limit: 10,
    totalDocs: 0,
    totalPages: 0,
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


    const handleCardDetailChange = (item, value) => {
      console.log(item,value)
      let _cardDetails = {...cardDetails}
      _cardDetails[item] = value;
      setCardDetaila(_cardDetails)
    }


  useEffect(() => {
    getContestDetails()
    getContestEntries();
  }, []);

  const getContestDetails = async (pageNumber, keyword, max, min, sbj, days) => {
   
    try {
      const response = await Get(CONTEST.getContestById + id,null);

      console.log("responsesss", response);
      if (response?.status) {
        setContest(response?.data);
      } else {
        message.error(response.message || "Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
  
    }
  };

  const getContestEntries = async (pageNumber) => {

    try {
      const response = await Get(CONTEST.getAllContestEntries+id,token, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: "10",
      });
   
      console.log("response", response);
      if (response?.status) {
        setEntries(response?.data?.docs);
        // setRatings(response.data.ratings)
        setPaginationConfig({
          pageNumber: response?.data?.page,
          limit: response?.data?.limit,
          totalDocs: response?.data?.totalReviews,
          totalPages: response?.data?.totalPages,
        });
      } else {
        message.error("Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const contestPayent = async (pageNumber) => {
    setLoading(true)

    console.log(cardDetails)

    let data = {
      contestId:id,
      cardNumber:cardDetails.cardNumber,
      month:cardDetails.month,
      year:cardDetails.year,
      cvv:cardDetails.cvv
    }
    try {
      const response = await Post(CONTEST.contestPayment,data,token);
   
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
        navigate("/contest-logs")
      } else {
        message.error(response?.response?.data?.message || response?.message || "Something went wrong!");
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  const handlePageChange = (e) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: Number(e.selected) + 1,
    });

    getContestEntries(Number(e.selected) + 1);
  };



  const showModal = (entryId) => {
    setSelectedEntry(entryId)
    setIsModalOpen(true);
  };

  const showModal2 = () => {
    setIsModalOpen2(true);
  };

  const handleOk =async () => {
    const index = entries.findIndex((cat) => cat._id == selectedEntry);

    console.log(index)
    const response = await Post(CONTEST.voteContest ,{entryId:selectedEntry}, token,{});
    const newEntry = [...entries];
    newEntry[index].voted = true;
    setEntries(newEntry)
    setSelectedEntry()
    setIsModalOpen(false);
    getContestEntries(1);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancel2 = () => {
    setIsModalOpen2(false);
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
              <Col>
             <h2 class="page-heading">Contest Details</h2>
{contest?.title && <h2 style={{textAlign:"center",fontSize:"35px", fontWeight:"bold",color:'white'}}>{contest?.title[0].toUpperCase() + contest?.title.slice(1)}</h2>}
</Col>
</Row>
<br/>

            <Row gutter={[30, 30]}>

            {entries.length == 0 && <div style={{width:"100%",minHeight:"400px",display:'flex',justifyContent:'center',alignItems:"center"}}>
              
            <Typography.Title
                                className="fontFamily1"
                                style={{
                                  fontSize: "25px",
                                  fontWeight: "bold",
                                  color: "white",
                                  textAlign: "left",
                                  marginTop: 0,
                                }}
                              >
                              No Entries Found
                              </Typography.Title>
                              </div>}



              {entries.length > 0 &&
                entries.map((item, index) => {
                  console.log("item", item);
                  return (
                    <Col xs={24} sm={12} lg={6}>
                      <Card
                        cover={
                          <img
                            alt="example"
                            src={UPLOADS_URL + item?.image}
                            style={{
                              width: "100%",
                              height: "250px",
                              objectFit: "cover",
                            }}
                          />
                        }
                        className="tutorCard2"
                      >
                        <Row
                          style={{
                            justifyContent: "space-between",
                          }}
                          gutter={30}
                        >
                          <Col
                            xs={24}
                            md={12}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent:'center'
                            }}
                          >
                            <Typography.Title
                              className="fontFamily1"
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: "black",
                                textAlign: "left",
                                marginTop: 10,
                                marginBottom: 0,
                              }}
                            >
                              {item.contestant.fullName}
                            </Typography.Title>
                          </Col>
                          <Col
                            xs={24}
                            md={12}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                                 <div class="bestSellerRgt3" style={{position:"absolute",right:"0px"}}>Votes: {item.votes.length}</div>
                          </Col>
                        </Row>
                        <br />
                        <br />
                        <Row
                          style={{
                            justifyContent: "space-between",
                          }}
                          gutter={30}
                        >
                          <Col
                            xs={24}
                            md={16}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                           {item.voted ?  <span
                              class="site-btn2"
                              style={{
                                padding: "7px 20px",
                                display: "flex",
                                justifyContent: "center",
                              }}
                          
                            >
                              Voted
                            </span>: <span
                              class="site-btn2"
                              style={{
                                padding: "7px 20px",
                                display: "flex",
                                justifyContent: "center",
                                backgroundColor:"#3d1c6f"
                              }}
                              onClick={() => showModal(item._id)}
                            >
                              Vote Image
                            </span>}
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
            <br />

          {entries.length > 0 &&   <ReactPaginate
              breakLabel="..."
              nextLabel={<FaArrowRight style={{ color: "grey" }} />}
              pageRangeDisplayed={window.innerWidth > 500 ? 4 : 1}
              marginPagesDisplayed={window.innerWidth > 500 ? 4 : 1} //handle Pa
              onPageChange={handlePageChange}
              pageCount={paginationConfig?.totalPages}
              forcePage={paginationConfig?.pageNumber - 1}
              previousLabel={<FaArrowLeft style={{ color: "grey" }} />}
              renderOnZeroPageCount={null}
              pageClassName="page-item" //m
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="paginationContainer"
              activeClassName="active"
            />}
          </div>


          {token && <div class="row text-center">
            <div class="col-lg-12">
              <span  class="site-btn2"  onClick={showModal2} >
                PARTICIPATE IN CONTEST
              </span>
            </div>
          </div>}
        </Col>

        <Modal
        
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
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
              border: "2px solid #3d1c6f",
              color: "#3d1c6f",
              height: "auto",
              padding: "6px 35px",
              borderRadius: "50px",
              fontSize: "16px",
              marginTop: "15px",
            },
          }}
          okButtonProps={{
            style: {
              backgroundColor: "#3d1c6f",
              color: "white",
              marginTop: "15px",
              height: "auto",
              padding: "5px 35px",
              borderRadius: "50px",
              fontSize: "16px",
              border: "2px solid #3d1c6f",
            },
          }}
        >
          
          <Typography.Title level={4} style={{ fontSize: "25px" }}>
            Vote Image
          </Typography.Title>
          <Typography.Text style={{ fontSize: 16 }}>
          Are You Sure You Want To  Vote this Entry
          </Typography.Text>
        </Modal>

        <Modal
        
        open={isModalOpen2}
        onCancel={handleCancel2}
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
                              <input value={cardDetails.cardName} onChange={(e)=> handleCardDetailChange("cardName",e.target.value)} type="email" class="site-input left-icon blur-bg"
                                  placeholder="Enter Cardholder Name" name="" id=""/>
                          </div>
                          <div class="form-field mb-3">
                              <label for="exampleInputEmail1" class="form-label site-label text-start">Credit/Debit
                                  Card No<span class="text-red">*</span></label>
                              <input value={cardDetails.cardNumber} maxlength = "16" onChange={(e)=> handleCardDetailChange("cardNumber",e.target.value)} type="text" class="site-input both-icon enter-input blur-bg"
                                  placeholder="Enter Cardholder Name" name="" id=""/>
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

export default ContestDetails;
