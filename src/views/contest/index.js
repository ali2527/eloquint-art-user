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
  Button,
  Checkbox,
  Rate,
  Select,
} from "antd";
import { useNavigate } from "react-router";
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
  CONTEST,
} from "../../config/constants/api";
import { SUBJECTS } from "../../config/constants";
//icons
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useEffect } from "react";

function Contest() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [contests, setContests] = useState([]);
  const [range, setRange] = useState([10, 200]);
  const [availability, setAvailability] = useState(0, 1, 2, 3, 4, 5, 6);
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



  useEffect(() => {

    getAllContest();
  }, []);

  const getAllContest = async (pageNumber, keyword, max, min, sbj, days) => {
    setLoading(true);
    try {
      const response = await Get(CONTEST.getAllContests,null, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: "9",
        keyword: keyword ? keyword : "",
        maxHourlyRate: max ? max.toString() : null,
        minHourlyRate: min ? min.toString() : null,
        subjects: sbj ? sbj : null,
        daysToFilter: days ? days : null,
      });
      setLoading(false);
      console.log("response", response);
      if (response?.status) {
        setContests(response?.data?.docs);
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
      setLoading(false);
    }
  };


  const handlePageChange = (e) => {
    setPaginationConfig({
      ...paginationConfig,
      pageNumber: Number(e.selected) + 1,
    });

    getAllContest(Number(e.selected) + 1);
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

<h2 class="page-heading">Contest</h2>
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
                              No Contest Found
                              </Typography.Title>
                              </div>}



              {contests.length > 0 &&
                contests.map((item, index) => {
                  console.log("item", item);
                  return (
                    <Col xs={24} sm={12} lg={8}>
                      <Card
                        className="tutorCard" onClick={()=> {token ? navigate("/contest-details/" + item._id) : navigate("/signin")}}>
                          <Row>

                          <div class="bestSellerRgt2">{item?.status}</div>
                          </Row>
                        <Row
                          style={{
                            justifyContent: "space-between",
                           
                          }}
                          gutter={30}
                        >
                              <Col xs={24} md={12}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              
                            }}
                          >
                            <Typography.Title
                                className="fontFamily1"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  color: "black",
                                  textAlign: "left",
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                              >
                                Contest Name :
                              </Typography.Title>
                              <Typography.Text
                                className="fontFamily1"
                                style={{
                                  fontSize: "14px",
                                  color: "grey",
                                  textAlign: "left",
                                  marginTop: 0,
                                }}
                              >
                                {item?.title}
                              </Typography.Text>
                          </Col>
                          <Col xs={24} md={12}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              
                            }}
                          >
                            <Typography.Title
                                className="fontFamily1"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  color: "black",
                                  textAlign: "left",
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                              >
                                Contest Fees : 
                              </Typography.Title>
                              <Typography.Text
                                className="fontFamily1"
                                style={{
                                  fontSize: "14px",
                                  color: "grey",
                                  textAlign: "left",
                                  marginTop: 0,
                                }}
                              >
                               $ {item?.fee}
                              </Typography.Text>
                          </Col>

                         
                        </Row>
                        <br/>
                        <Row
                          style={{
                            justifyContent: "space-between",
                           
                          }}
                          gutter={30}
                        >
                              <Col xs={24} md={12}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              
                            }}
                          >
                            <Typography.Title
                                className="fontFamily1"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  color: "black",
                                  textAlign: "left",
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                              >
                                Expiry Date :
                              </Typography.Title>
                              <Typography.Text
                                className="fontFamily1"
                                style={{
                                  fontSize: "14px",
                                  color: "grey",
                                  textAlign: "left",
                                  marginTop: 0,
                                }}
                              >

                                {dayjs(item.endDate).format(
                                            "MM/DD/YYYY"
                                          )}
                              </Typography.Text>
                          </Col>
                          <Col xs={24} md={12}
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              
                            }}
                          >
                            <Typography.Title
                                className="fontFamily1"
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  color: "black",
                                  textAlign: "left",
                                  marginTop: 0,
                                  marginBottom: 0,
                                }}
                              >
                               Prize Amount :
                              </Typography.Title>
                              <Typography.Text
                                className="fontFamily1"
                                style={{
                                  fontSize: "14px",
                                  color: "grey",
                                  textAlign: "left",
                                  marginTop: 0,
                                }}
                              >
                                ${item.prize}
                              </Typography.Text>
                          </Col>

                         
                        </Row>
                      </Card>
                    </Col>
                  );
                })}
            </Row>
            <br />

          {contests.length > 0 &&   <ReactPaginate
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
        </Col>
      </Row>
    </Layout>
  );
}

export default Contest;
