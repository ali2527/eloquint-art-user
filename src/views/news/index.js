import React, { useState, useEffect } from "react";
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
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import "react-big-calendar/lib/css/react-big-calendar.css";
import uPic from "../../assets/images/u-pic.png";
import pic from "../../assets/images/pic.png";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { useSelector, useDispatch } from "react-redux";
import { BsPostcardHeart, BsCheck } from "react-icons/bs";
import {
  AiOutlineLike,
  AiOutlineHeart,
  AiOutlineCamera,
  AiOutlineVideoCamera,
} from "react-icons/ai";
import VideoPlayer from "../../components/VideoPlayer";
import { NEWS, UPLOADS_URL, UPLOADS_URL2 } from "../../config/constants/api";
import { LiaTelegramPlane } from "react-icons/lia";
import { CONTENT_TYPE } from "../../config/constants/index";
import { ImAttachment } from "react-icons/im";
function NewsFeed() {
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.userToken);
  const [loading, setLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [postTitle, setPostTitle] = useState("");

  const [postText, setPostText] = useState("");
  const [selectedIndex, setSelectedIndex] = useState();
  const [news, setNews] = useState([]);
  const [file, setFile] = useState();
  const [postImages, setPostImages] = useState([]);
  const [postVideos, setPostVideos] = useState([]);
  const [page,setPage] = useState(1)
  const [hasMore,setHasMore] = useState(true)


  useEffect(() => {
    getNewsFeed();
  }, []); 

  const getNewsFeed = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await Get(NEWS.getNewsFeed, token, {
        page: pageNumber ? pageNumber.toString() :  "1",
        limit: "2",
      });
      setLoading(false);
      console.log("response", response);
      if (response?.status) {

        if(response?.data?.posts.length == 0) {
          setHasMore(false);
          return;
        }
        if(pageNumber && pageNumber > 1){
          setNews([...news,...response?.data?.posts]);
        }else{
          setNews(response?.data?.posts);
        }
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const likePost = async (index) => {
    let _news = [...news];
    let postId = _news[index]._id;

    try {
      const response = await Get(NEWS.likePost + "/" + postId, token, {});
      setLoading(false);
      console.log("response11", response);
      if (response?.status) {
        if (_news[index].likes.includes(user._id.toString())) {
          _news[index].likes.splice(index, 1);
        } else {
          _news[index].likes.push(user._id.toString());
        }

        setNews(_news);
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const lovePost = async (index) => {
    let _news = [...news];
    let postId = _news[index]._id;

    try {
      const response = await Get(NEWS.lovePost + "/" + postId, token, {});
      setLoading(false);
      console.log("response11", response);
      if (response?.status) {
        if (_news[index].loves.includes(user._id.toString())) {
          _news[index].loves.splice(index, 1);
        } else {
          _news[index].loves.push(user._id.toString());
        }

        setNews(_news);
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  const commentPost = async (index) => {
    let _news = [...news];
    let postId = _news[index]._id;
    let formData = new FormData();
    if (comment == "") {
      return;
    }

    formData.append("text", comment);

    if (file) {
      formData.append("image", file);
    }

    try {
      const response = await Post(
        NEWS.commentPost + postId,
        formData,
        token,
        {},
        CONTENT_TYPE.FORM_DATA
      );
      console.log("response12", response);
      if (response?.data?.status) {
        let newComment = {
          image: response.data?.data?.newComment?.image || null,
          text: response?.data?.data?.newComment.text || "",
          author: user,
        };

        console.log("LLLLL", newComment);

        _news[index].comments.push(newComment);
        setNews(_news);
        setComment("");
        setSelectedIndex();
        setFile();
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  const handlePost = async (index) => {
    let formData = new FormData();
    if (postText == "" || postTitle == "") {
      return;
    }

    formData.append("content", postText);

    formData.append("title", postTitle);

    if (postImages.length > 0) {
      for (const image of postImages) {
        formData.append("image", image);
      }
    }
    if (postVideos.length > 0) {
      formData.append("video", postVideos);
    }

    try {
      const response = await Post(
        NEWS.addPost,
        formData,
        token,
        {},
        CONTENT_TYPE.FORM_DATA
      );
      console.log("response13", response);
      if (response?.data?.status) {
        
        setPostImages([]);
        setPostVideos([]);
        setPostText("");
        setPostTitle("");
        getNewsFeed();
      } else {
        console.log("error====>", response);
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };


  const handleAttachmentUpload = (e, index) => {
    const files = e.target.files[0];
    if (files) {
      console.log("Attachment file:", files);
      setFile(files);
    }
  };

  const handlePostImages = (event) => {
    const files = event.target.files;
    const selected = [...postImages,...files];

    if(selected.length + postVideos.length >= 4){
      alert("maximum 4 files allowed");
      return;
    }

    setPostImages(selected);
  };


  const removeImage = (index) => {
    let _postImages = [...postImages]

    _postImages.splice(index,1)

    setPostImages(_postImages)

  }

  const removeVideo= (index) => {
    let _postVideo = [...postVideos]

    _postVideo.splice(index,1)

    setPostVideos(_postVideo)

  }

  const handlePostVideos = (event) => {
    const files = event.target.files;
    const selected = [...postVideos,...files];

    if(selected.length + postImages.length >= 4){
      alert("maximum 4 files allowed");
      return;
    }

    setPostVideos(selected);
  };


  const handleScroll = (event) => {
    const target = event.target;
    const isScrolledToBottom = target.scrollHeight - target.scrollTop === target.clientHeight;

    if (isScrolledToBottom) {
      if(hasMore){
        getNewsFeed(page+1);
        setPage(page+1);
      }
    }
  };

  const localizer = dayjsLocalizer(dayjs);

  console.log("postImages", postImages);
  return (
    <Layout style={{ minHeight: "80vh" }}>
      <section class="inner-web-bg">
        <div class="container">
          <div class="row mb-3">
            <div class="col-lg-12">
              <h2 class="page-heading">Newfeed</h2>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-12">
              <div
                class="news-box-bg scrollNew"
                onScroll={(e)=>handleScroll(e)}
                style={{ maxHeight: "100vh", overflowY: "auto" }}
              >
                {token && (
                  <div>
                    <div class="d-flex">
                      <div class="flex-shrink-0">
                        <img
                          src={user?.image ? UPLOADS_URL + user?.image : uPic}
                          alt="..."
                          class="img-fluid"
                          style={{
                            width: "40px",
                            height: "40px",
                            objectFit: "cover",
                            borderRadius: "50px",
                          }}
                        />
                      </div>{" "}
                      &emsp;
                      <div
                        className="postContainer "
                        style={{ width: "100%",  }}
                      >
                        <div
                          class="input-group mb-3 send-input2"
                        >
                          <input
                                      type="text"
                                      class="form-control"
                                      placeholder={`Post Title `}
                                      value={postTitle}
                            onChange={(e) =>
                              setPostTitle(e.target.value)
                            }
                                    />
                          <textarea
                            name="Text1"
                            className="scrollNew"
                            rows="5"
                            placeholder={`Post Content`}
                            value={postText}
                            onChange={(e) =>
                              setPostText(e.target.value)
                            }
                          />
                        
                        
                        </div>
                        <div className="row px-5" >
                            {postImages.length > 0 && (
                              <>
                                {postImages.map((imag, indx) => {
                                  return (
                                    <div className="col-xs-6 col-md-2" style={{position:'relative'}}>
                                      <button onClick={()=> removeImage(indx)} className="btn" style={{position:"absolute", right:0, background:'red',height:"25px",width:"25px",display:'flex',justifyContent:'center',alignItems:'center',color:'white', borderRadius:"20px"}}>
                                        x
                                      </button>
                                      <img
                                        key={indx}
                                        src={URL.createObjectURL(imag)}
                                        alt={`Post Image ${indx}`}
                                        style={{
                                          width: "100%",
                                   
                                          objectFit: "contain",
                                        }}
                                      />
                                    </div>
                                  );
                                })}
                              </>
                            )}
                            {postVideos.length > 0 && (
                              <>
                                {postVideos.map((vdo,indx) => {
                                  return (
                                    <div className="col-xs-6 col-md-2" style={{position:'relative'}}>
                                      <button onClick={()=> removeVideo(indx)} className="btn" style={{position:"absolute", right:0, background:'red',height:"25px",width:"25px",display:'flex',justifyContent:'center',alignItems:'center',color:'white', borderRadius:"20px"}}>
                                        x
                                      </button>
                                      <VideoPlayer
                                        vdo={URL.createObjectURL(vdo)}
                                      />{" "}
                                    </div>
                                  );
                                })}
                              </>
                            )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "flex-end",
                            }}
                          >
                            <label className="btn plain-btn2">
                              <AiOutlineCamera  style={{fontSize:"20px"}}/>
                              <input
                                type="file"
                                multiple
                                accept="image/*"
                                style={{ display: "none" }}
                                onChange={(e) => handlePostImages(e)}
                              />
                            </label>

                            <label className="btn plain-btn2">
                              <AiOutlineVideoCamera style={{fontSize:"20px"}} />
                              <input
                                type="file"
                                multiple
                                accept="video/*"
                                style={{ display: "none" }}
                                onChange={(e) => handlePostVideos(e)}
                              />
                            </label>

                            <button class="btn" type="button" onClick={(e) => handlePost()}>
                              <LiaTelegramPlane style={{fontSize:"20px"}}/>
                            </button>
                          </div>
                      </div>
                    </div>
                  </div>
                )}
                <br/>
                <hr/>
                <br/>

                {news.length == 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "60vh",
                    }}
                  >
                    <BsPostcardHeart
                      style={{ color: "white", fontSize: "50px" }}
                    />
                    <h5 className="page-heading" style={{ fontSize: "40px" }}>
                     {!token ? "Login To View Posts" : "No Posts Found" }
                    </h5>
                  </div>
                )}

                {news.length > 0 && (
                  <>
                    {news.map((item, index) => {
                      console.log("item", item);
                      return (
                        <div class="row">
                          <div class="user-comments-etc">
                            <div class="row">
                              <div class="col-md-6 order-lg-1 order-md-1 order-2">
                                <div class="d-flex align-items-center">
                                  <div class="flex-shrink-0">
                                    <img
                                      src={
                                        item?.author?.image
                                          ? UPLOADS_URL +
                                            "/" +
                                            item?.author?.image
                                          : pic
                                      }
                                      alt="..."
                                      class="img-fluid"
                                      style={{
                                        width: "40px",
                                        height: "40px",
                                        objectFit: "cover",
                                      }}
                                    />
                                  </div>
                                  <div class="flex-grow-1 ms-3">
                                    <h5>{item?.author?.fullName}</h5>
                                    <small>
                                      <i class="fas fa-edit"></i> Posted on{" "}
                                      {dayjs(item?.createdAt).format(
                                        "MM/DD/YYYY h:m A "
                                      )}{" "}
                                    </small>
                                  </div>
                                </div>
                              </div>

                              <div class="col-md-6 text-end order-lg-2 order-md-2 order-1">
                                <div class="btn-group custom-dropdown ml-2 mb-1">
                                  <button
                                    type="button"
                                    class="btn btn-drop-table btn-sm"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                  >
                                    {" "}
                                    <i class="fa fa-ellipsis-h text-white"></i>
                                  </button>
                                  <div class="dropdown-menu custom-dropdown">
                                    <a
                                      href="edit-post.php"
                                      class="dropdown-item"
                                    >
                                      <i class="fas fa-clipboard-list"></i>
                                      Edit
                                    </a>
                                    <a href="#_" class="dropdown-item">
                                      <i class="fas fa-trash"></i>
                                      Delete
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <br />
                            <br />

                            {item?.content && <p>{item?.content}</p>}
                            <br />
                            <div className="row">
                              {item?.images.length > 0 && (
                                <>
                                  {item.images.map((imag) => {
                                    return (
                                      <div className="col-xs-6 col-md-3">
                                        <img
                                          style={{
                                            width: "100%",
                                            height: "300px",
                                            objectFit: "cover",
                                          }}
                                          src={UPLOADS_URL2 + "/" + imag}
                                          alt="..."
                                          class="img-fluid"
                                        />
                                      </div>
                                    );
                                  })}
                                </>
                              )}
                              {item?.videos && item?.videos?.length > 0 && (
                                <>
                                  {item?.videos.map((vdo) => {
                                    return (
                                      <div className="col-xs-6 col-md-3">
                                        {" "}
                                        <VideoPlayer
                                          vdo={UPLOADS_URL2 + "/" + vdo}
                                        />{" "}
                                      </div>
                                    );
                                  })}
                                </>
                              )}
                            </div>
                            <br />
                            <div class="like-heart-box">
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontSize: "16px",
                                }}
                              >
                                <AiOutlineLike
                                  style={{
                                    color: item?.likes.includes(
                                      user._id.toString()
                                    )
                                      ? "blue"
                                      : "white",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => likePost(index)}
                                />{" "}
                                &nbsp;
                                <span style={{ color: "white" }}>
                                  {item?.likes?.length}
                                </span>
                                &emsp;{" "}
                                <AiOutlineHeart
                                  style={{
                                    color: item?.loves.includes(
                                      user._id.toString()
                                    )
                                      ? "red"
                                      : "white",
                                  }}
                                  onClick={() => lovePost(index)}
                                />{" "}
                                &nbsp;
                                <span style={{ color: "white" }}>
                                  {item?.loves?.length}
                                </span>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  fontSize: "16px",
                                }}
                              >
                                {" "}
                                <span>{item?.comments?.length} Comments </span>
                              </div>
                            </div>
                          </div>
                          <br />
                          <div
                            class="row m-auto scrollNew"
                            style={{
                              padding: "20px",
                              margin: "100px",
                              maxHeight: "300px",
                              overflowY: "auto",
                            }}
                          >
                            {item?.comments &&
                              item?.comments.length > 0 &&
                              item?.comments.map((cmnt) => {
                                return (
                                  <>
                                    <div class="view-img-comm-box mw-100 drk-bg">
                                      <div class="d-flex">
                                        <div class="flex-shrink-0">
                                          <img
                                            src={
                                              cmnt?.author?.image
                                                ? UPLOADS_URL +
                                                  "/" +
                                                  cmnt?.author?.image
                                                : pic
                                            }
                                            alt="..."
                                            class="img-fluid"
                                            style={{
                                              width: "40px",
                                              height: "40px",
                                              objectFit: "cover",
                                              borderRadius: "50px",
                                            }}
                                          />
                                        </div>

                                        <div
                                          class="flex-grow-1 ms-3"
                                          style={{
                                            color: "white",
                                            display: "flex",
                                            justifyContent: "space-between",
                                          }}
                                        >
                                          <h5>{cmnt?.author?.fullName}</h5>
                                          <small>
                                            <i class="fas fa-edit"></i>{" "}
                                            {dayjs(item?.createdAt).format(
                                              "MM/DD/YYYY h:m A "
                                            )}{" "}
                                          </small>
                                        </div>
                                      </div>
                                      <br />
                                      <p style={{ fontSize: "14px" }}>
                                        {cmnt?.text}
                                      </p>
                                      <br />
                                      {cmnt?.image && (
                                        <img
                                          src={
                                            UPLOADS_URL2 +
                                            "/Uploads/" +
                                            cmnt?.image
                                          }
                                          alt="..."
                                          class="img-fluid"
                                          style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                          }}
                                        />
                                      )}
                                    </div>
                                  </>
                                );
                              })}
                          </div>
                          <br />
                          {token && (
                            <div>
                              <div class="d-flex">
                                <div class="flex-shrink-0">
                                  <img
                                    src={
                                      user?.image
                                        ? UPLOADS_URL + user?.image
                                        : uPic
                                    }
                                    alt="..."
                                    class="img-fluid"
                                    style={{
                                      width: "40px",
                                      height: "40px",
                                      objectFit: "cover",
                                      borderRadius: "50px",
                                    }}
                                  />
                                </div>
                                <div class="flex-grow-1 ms-3">
                                  <div class="input-group mb-3 send-input">
                                    <input
                                      type="text"
                                      class="form-control"
                                      placeholder={`Comment as ${user?.fullName}`}
                                      value={
                                        index == selectedIndex ? comment : ""
                                      }
                                      onChange={(e) =>
                                        setComment(e.target.value)
                                      }
                                      onClick={() => {
                                        setComment(
                                          selectedIndex !== index ? "" : comment
                                        );
                                        setFile(
                                          selectedIndex !== index ? "" : file
                                        );
                                        setSelectedIndex(index);
                                      }}
                                    />
                                    <button
                                      class="btn plain-btn"
                                      type="button"
                                      onClick={() => commentPost(index)}
                                    >
                                      <LiaTelegramPlane />
                                    </button>
                                    {index == selectedIndex && (
                                      <label className="btn plain-btn2">
                                        {!file ? (
                                          <ImAttachment />
                                        ) : (
                                          <BsCheck
                                            style={{
                                              color: "green",
                                              fontSize: 20,
                                            }}
                                          />
                                        )}
                                        <input
                                          type="file"
                                          style={{ display: "none" }}
                                          onChange={(e) =>
                                            handleAttachmentUpload(e, index)
                                          }
                                        />
                                      </label>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}

                          <hr />
                          <br />
                          <br />
                        </div>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default NewsFeed;
