import React, { useState } from "react";
import {
  message,
  Slider,
  Input,
  Image,
  Row,
  Typography,
  Layout,
  Card,
  Button,
  Modal,
  Upload ,
  Select,
} from "antd";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { InboxOutlined } from '@ant-design/icons';
import { Post } from "../../config/api/post";
import {
  AiOutlineLike,
  AiOutlineHeart,
  AiOutlineCamera,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import { addUser, removeUser } from "../../redux/slice/authSlice";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import { Get } from "../../config/api/get";
import { LiaTelegramPlane } from "react-icons/lia";

import {
  USERS,
  AUTH,
  RATES,
  REVIEWS,
  UPLOADS_URL,
} from "../../config/constants/api";
import { GALLERY } from "../../config/constants/api";

//icons
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { useEffect } from "react";
import g1 from "../../assets/images/g1.png"
import g2 from "../../assets/images/g2.png"
import g3 from "../../assets/images/g3.png"
import g4 from "../../assets/images/g4.png"
import g5 from "../../assets/images/g5.png"
import g6 from "../../assets/images/g6.png"
import g7 from "../../assets/images/g7.png"
import g8 from "../../assets/images/g8.png"
import g9 from "../../assets/images/g9.png"
import g10 from "../../assets/images/g10.png"
import g11 from "../../assets/images/g11.png"
import g12 from "../../assets/images/g12.png"
import { CONTENT_TYPE } from "../../config/constants";

const { Dragger } = Upload;

function Gallery() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { Search } = Input;
  const [loading, setLoading] = useState(false);
  const [coaches, setCoaches] = useState([]);
  const [range, setRange] = useState([10, 200]);
  const [comment, setComment] = useState("");
  const [newImage,setNewImage] = useState()
  const [gallery,setGallery]= useState([])
  const [selectedIndex,setSelectedIndex]= useState()
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

    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        const formObject = new FormData();

        if(!newImage){
            swal("Error", "Image is Required",'error');
            return;
        }

        formObject.append("image",newImage);

        Post(GALLERY.addGallery,formObject,token,null,CONTENT_TYPE.FORM_DATA)
        .then((response) => {
          setLoading(false);
          if (response?.data?.status) { 
            swal("Success!", "Image Added Successfully", "success");
            getMyGallery();
            setLoading(false);
            setNewImage()
          } else {
            swal("Oops!", response.data.message, "error");
          }
        })
        .catch((e) => {
  
          setLoading(false);
        });


        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setNewImage()
        setIsModalOpen(false);
      };


      const commentImage = async (index) => {
        let _gallery = [...gallery];
        let imageId = _gallery[index]._id;

        try {
          const response = await Post(
            GALLERY.commentGallery + imageId,
            {text:comment},
            token,
            {},
          );
          console.log("response12", response);
          if (response?.data?.status) {
            let newComment = {
              image: response.data?.data?.newComment?.image || null,
              text: response?.data?.data?.newComment.text || "",
              author: user,
            };
    
            console.log("LLLLL", newComment);
    
            _gallery[index].comments.push(newComment);
            setGallery(_gallery);
            setComment("");
            // setSelectedIndex();

          } else {
            console.log("error====>", response);
          }
        } catch (error) {
          console.log(error.message);
          setLoading(false);
        }
      };


      const likeImage = async (index) => {
        let _gallery = [...gallery];
        let galleryId = _gallery[index]._id;
    
        try {
          const response = await Get(GALLERY.likeGallery + "/" + galleryId, token, {});
          setLoading(false);
          console.log("response11", response);
          if (response?.status) {
            if (_gallery[index].likes.includes(user._id.toString())) {
              _gallery[index].likes.splice(index, 1);
            } else {
              _gallery[index].likes.push(user._id.toString());
            }
    
            setGallery(_gallery);
          } else {
            console.log("error====>", response);
          }
        } catch (error) {
          console.log(error.message);
          setLoading(false);
        }
      };

      

  useEffect(() => {
    if(token){
        getMyGallery();
    }else{
        getAllGalleries()
    }
  }, []);

  const getMyGallery = async (pageNumber, keyword, max, min, sbj, days) => {
    setLoading(true);
    try {
      const response = await Get(GALLERY.getMyGallery + user._id,token);
      setLoading(false);
      console.log("response", response);
      if (response?.status) {
        setGallery(response?.data?.gallery);
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

    getAllGalleries(Number(e.selected) + 1);
  };


  const getAllGalleries = async (pageNumber, keyword, max, min, sbj, days) => {
    setLoading(true);
    try {
      const response = await Get(GALLERY.getAllGallery ,null, {
        page: pageNumber
          ? pageNumber.toString()
          : paginationConfig.pageNumber.toString(),
        limit: "10",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.status) {
        setGallery(response?.data?.docs);
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




  return (
    <Layout style={{ minHeight: "10vh" }}>
      <section class="inner-web-bg">
        <div class="container">
          <div class="row mb-3">
            <div class="col-lg-12">
              <h2 class="page-heading">Gallery</h2>
              <div class="row mb-3" style={{justifyContent:'center',width:'100%'}}>
            <div class="col-lg-8">
              <p style={{color:'white' ,lineHeight:1.5, fontSize:"18px", textAlign:"center", margin:"18px 4px"}}> Always Looking for a new and custom content for eloquint art, Any member who contributes 5 approved photos to eloquint art photo gallery within 30 days will recieve free diamond membership </p>
            </div>
          </div>
          </div>
          </div>
          <div class="row">
          {gallery.length == 0 && <div style={{width:"100%",minHeight:"400px",display:'flex',justifyContent:'center',alignItems:"center"}}>
              
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
                                No Gallery Found
                                </Typography.Title>
                                </div>}

            {gallery.length > 0 && gallery.map((item,index) => {
                return(<div class="col-lg-3">
                <div class="contest-gallery">
                 
                    <Image src={UPLOADS_URL + "/" +item.image} alt="" class="img-fluid w-100" style={{width:"100%",height:"300px",objectFit:"cover"}} />
                 
                 {token && <div class="vote-box">
                    <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between',width:"100%"}}>
                      <div>
                      <AiOutlineLike
                                  style={{
                                    color: item?.likes.includes(
                                      user._id.toString()
                                    )
                                      ? "blue"
                                      : "black",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => likeImage(index)}
                                />{" "}
                        
                                <span style={{ color: "black" }}>
                                  {item?.likes?.length}
                                </span>
                      </div>

                      <div>
                      <div class="bestSellerRgt">
                      <a href="#_" class="fas fa-comment-dots" onClick={() => setSelectedIndex(selectedIndex == index ? null : index)}>
                        {" "}
                        Comment
                      </a>
                    </div>
                      </div>

                      </div>
                      

                      
                
                   
                  </div>}
             {selectedIndex == index  &&  <div class="comment-box">
                    <h5 style={{fontWeight:"bold"}}>Comments</h5> 
                    <br/>
      
                    <div className="scrollNew" style={{width:"100%", display:"flex",flexDirection:"column", justifyContent:"center",padding:"10px",maxHeight:"100px",overflow:'auto'}}> 
                    
                    {item.comments.length == 0 &&<p>No Comments</p> } 
                                    

                    {item.comments.length > 0 && 
                    <><br/> <br/> <br/> <br/>{
                      item.comments.map((com,comIndex) => {
                        return( <div className="view-img-comm-box mw-100 drk-bg mx-0 my-1" style={{width:"100%", background:"#dadada",padding:"10px"}}><p>{com.text}</p></div>);
                      })
                    }</>
                    
                   } 
                   </div>
    <br/>  
<div class="input-group mb-3 send-input3">
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder={`Comment as ${user?.fullName}`}
                                      value={comment}
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                    />
                                    <button
                                      class="btn plain-btn"
                                      type="button"
                                      onClick={() => commentImage(index)}
                                    >
                                      <LiaTelegramPlane />
                                    </button>
                                   
                                  </div>
                      
                
                   
                  </div>}
                 
                </div>
                
              </div>);
            })}
            


       
          </div>
        {token && <div class="row text-center">
            <div class="col-lg-12">
              <a class="site-btn2" onClick={showModal}>
                Add Image
              </a>
            </div>
          </div>}

          {!token && gallery.length > 0 &&   <ReactPaginate
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



        <Modal
          title="Add Gallery Image"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Dragger
          showUploadList={false}
            beforeUpload={(file) => {
              setNewImage(file);
              return false;
            }}
          >
            {!newImage ? <>
                <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
            </> : <Image src={URL.createObjectURL(newImage)} preview={false} style={{width:"400px",height:"400px",objectFit:"cover"}} />}
          
          </Dragger>
        </Modal>
      </section>
    </Layout>
  );
}

export default Gallery;
