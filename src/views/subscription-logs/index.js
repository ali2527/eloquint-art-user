import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Typography,
  List,
  Form,
  Input,
  Modal,
  Button,
  Layout,
  Popover,
  Space,
  Dropdown,
  Skeleton,
  Table,
  Upload,
  Select,
  message,
  Image,
  Pagination,
  DatePicker,
  Menu,
} from "antd";
import dayjs from "dayjs";
import { UserOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { FaSearch,FaEdit,FaEye, FaFilter, FaCaretDown, FaTrash } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {DownOutlined, UpOutlined} from '@ant-design/icons';
import ClientLayout from "../../components/ClientLayout";
import { Get } from "../../config/api/get";
import { Post } from "../../config/api/post";
import { CONTEST,GALLERY } from "../../config/constants/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { InboxOutlined } from '@ant-design/icons';

import swal from "sweetalert";
import { CONTENT_TYPE } from "../../config/constants";

const items = [
 
  {
    key: 'submit',
    label: 'Submit Image',
    icon:<FaEdit/>
  },

 
]; 

const { Dragger } = Upload;




function SubscriptionLogs() {
    const token = useSelector((state) => state.user.userToken);
    const [open, setOpen] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalOpen2, setModalOpen2] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newImage,setNewImage] = useState()
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedContest, setSelectedContest] = useState(null);
    const [selectedStatus,setSelectedStatus] = useState()
    const [contests, setContests] = useState([]);
    const [paginationConfig, setPaginationConfig] = useState({
      pageNumber: 1,
      limit: 10,
      totalDocs: 0,
      totalPages: 0,
    });
    const navigate = useNavigate();
  
    const [filter, setFilter] = useState({
      status: null,
      keyword: "",
      from: null,
      to: null,
    });
  
    const handleOk = () => {
        const formObject = new FormData();

        if(!newImage){
            swal("Error", "Image is Required",'error');
            return;
        }

        formObject.append("image",newImage);
        formObject.append("contestId",selectedContest);

        Post(CONTEST.joinContest,formObject,token,null,CONTENT_TYPE.FORM_DATA)
        .then((response) => {
          setLoading(false);
          if (response?.data?.status) { 
            swal("Success!", "Submission Added Successfully", "success");
            // getMyGallery();
            getAllContest()
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


    const startIndex =
      (paginationConfig.pageNumber - 1) * paginationConfig.limit + 1;
    const endIndex = Math.min(
      startIndex + paginationConfig.limit - 1,
      paginationConfig.totalDocs
    );
    const messageRecord = `Showing records ${endIndex} of ${paginationConfig.totalDocs}`;
  
    useEffect(() => {
  
      getAllContest();
    }, []);
  
    const getAllContest = async (pageNumber, pageSize, search, reset = false) => {
      setLoading(true);
      try {
        const response = await Get(CONTEST.getMyPaymentLogs,token, {
          page: pageNumber
            ? pageNumber.toString()
            : paginationConfig.pageNumber.toString(),
          limit: pageSize
            ? pageSize.toString()
            : paginationConfig.limit.toString(),
          keyword: search ? search : null,
          from: reset ? "" : filter?.from ? filter?.from.toISOString() : "",
          to: reset ? "" : filter?.to ? filter?.to.toISOString() : "",
        });
        setLoading(false);
        console.log("response", response);
        if (response?.status) {
          setContests(response?.data?.docs);
          // setRatings(response.data.ratings)
          setPaginationConfig({
            pageNumber: response?.data?.page,
            limit: response?.data?.limit,
            totalDocs: response?.data?.totalDocs,
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
  
  
    const handlePageChange = (pageNumber) => {
      setPaginationConfig({
        ...paginationConfig,
        pageNumber: pageNumber,
      });
  
      getAllContest(pageNumber);
    };
  
  
    
  
    const handleRedirect = (key,value) => {
        setIsModalOpen(true)
    };
  

  
    const handleSearch = (value) => {
      setFilter({
        ...filter,
        keyword: value,
      });
    };
  
    const handleStatusChange = (value) => {
      setFilter({
        ...filter,
        status: value,
      });
    };
  
    const resetFilter = () => {
      setFilter({
        status: null,
        keyword: "",
        from: null,
        to: null,
      });
      getAllContest(paginationConfig.pageNumber, paginationConfig.limit, "", true);
    };
  
    const handleOpenChange = (newOpen) => {
      setOpen(newOpen);
    };
  
    const handleFrom = (date) => {
      setFilter({
        ...filter,
        from: date,
      });
    };
  
    const handleTo = (date) => {
      setFilter({
        ...filter,
        to: date,
      });
    };
  
    const handleLimitChange = (pageSize) => {
      setPaginationConfig({
        ...paginationConfig,
        limit: pageSize,
        current: 1,
      });
  
      getAllContest(1, pageSize);
    };
  

  
  
    const itemRender = (_, type, originalElement) => {
      if (type === "prev") {
        return <a>Previous</a>;
      }
      if (type === "next") {
        return <a>Next</a>;
      }
      return originalElement;
    };
  
    const columns = [
      {
        title: "S. No.	",
        dataIndex: "key",
        key: "key",
        width: 100,
        render: (value, item, index) => (index < 10 && "0") + (index + 1),
      },
      {
        title: "DURATION",
        dataIndex: "title",
        key: "title",
        render: (value, item, index) => <>{item?.subscription?.plan?.durationInDays}</>,
      },
      {
        title: "PURCHASE DATE",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (value, item, index)  => <span>{dayjs(item?.subscription?.purchaseDate).format("MM/DD/YYYY")}</span>,
      },
      {
        title: "EXPIRY DATE",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (value, item, index)  => <span>{dayjs(item?.subscription?.expiryDate).format("MM/DD/YYYY")}</span>,
      },
      {
        title: "TOTAL AMOUNT",
        dataIndex: "title",
        key: "title",
        render: (value, item, index) => <>${item?.subscription?.amount}</>,
      },
         {
        title: "STATUS",
        dataIndex: "endDate",
        key: "endDate",
        render: (value, item, index) => <>{item?.subscription?.status }</>,
      }   
    ];
  
    const filterContent = (
      <div className="filterDropdown">
        <div>
          <p className="mainLabel" style={{ padding: "10px" }}>
            Filter
          </p>
        </div>
        <hr style={{ margin: 0 }} />
  
        <div className="filterDropdownBody">
          <p className="mainLabel">Creation Date:</p>
          <DatePicker
            className="mainInput filterInput"
            value={filter.from}
            onChange={(e) => handleFrom(e)}
          />
          <DatePicker
            className="mainInput filterInput"
            value={filter.to}
            onChange={(e) => handleTo(e)}
          />
  
          <p className="mainLabel">Filter by Status:</p>
  
          <Select
            size={"large"}
            className="filterSelectBox"
            placeholder="Select Status"
            value={filter.status}
            onChange={(e) => handleStatusChange(e)}
            style={{
              width: "100%",
              marginBottom: "10px",
              textAlign: "left",
            }}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />
  
          <Button
            type="primary"
            shape="round"
            block
            size={"large"}
            style={{ marginBottom: "10px" }}
            className="mainButton primaryButton"
            onClick={() => getAllContest()}
          >
            Apply
          </Button>
          <Button
            type="primary"
            shape="round"
            block
            size={"large"}
            className="mainButton primaryButton2"
            onClick={() => resetFilter()}
          >
            Clear All
          </Button>
        </div>
      </div>
    );
  return (
    <section class="inner-web-bg table-page">
    <div class="container">
        <div class="row mb-4">
            <div class="col-lg-12">
                <h2 class="page-heading">My Subscription Logs</h2>
            </div>
        </div>



        <div class="tab-content" id="pills-tabContent">
            <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">

            <div class="row">
            <div class="col-lg-12">
                <div class="dataTables_wrapper">
                    {/* <div class="user-listing-top">
                        <div class="row align-items-end d-flex mb-4">
                            <div class="col-12 col-md-6 col-lg-6 col-xl-6 mt-2 mt-md-0 sort-datepicker">
                                <label class="d-block">Sort by:</label>
                                <div class="d-sm-flex d-block">
                                    <div class="input-wrap mr-0 mr-sm-2 mb-2 mb-sm-0">
                                        <input type="date" id="datepicker-2" placeholder="From" class="form-control" />
                                    </div>
                                    <div class="input-wrap">
                                        <input type="date" id="datepicker-2" placeholder="From" class="form-control" />
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-6 col-lg-6 col-xl-6 mt-2 mt-md-0 d-md-flex d-block justify-content-start justify-content-md-end align-items-center
">
                                <label for="" class="d-block">Select Duration</label>
                                <select name="" class="form-control" id="">
                                    <option value="">1 Month</option>
                                    <option value="">2 Month</option>
                                </select>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12 col-md-6 col-lg-6 col-xl-6 mt-2">
                                <div class="dataTables_length">
                                    <label class="d-inline-block">Show</label>
                                    <select class="form-control d-inline-block">
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div>
                            <div class="
              col-12 col-md-6 col-lg-6 col-xl-6
              mt-2 mt-md-0
              d-md-flex d-block
              justify-content-start justify-content-md-end
              align-items-center
            ">
                                <div class="dataTables_filter">
                                    <div class="search-wrap">
                                        <input type="search" class="form-control" placeholder="Search" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row-table">
                        <div class="main-tabble table-responsive">
                            <div class=" container-fluid table-resp">
                                <div class="row">
                                    <div class="col-12">
                                        <table class="table table-borderless dataTable">
                                            <thead>
                                                <tr>
                                                    <th class="sorting_asc">S. No.</th>
                                                    <th class="sorting">Contest Name</th>
                                                    <th class="sorting">Participating Date</th>
                                                    <th class="sorting">Start Date</th>
                                                    <th class="sorting">Expiry Date</th>
                                                    <th class="sorting">Prize Amount</th>
                                                    <th class="sorting">Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td class="">01</td>
                                                    <td>ABC</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>$ 150</td>
                                                    <td>Received</td>
                                                </tr>
                                                <tr>
                                                    <td class="">02</td>
                                                    <td>ABC</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>$ 150</td>
                                                    <td>Received</td>
                                                </tr>
                                                <tr>
                                                    <td class="">03</td>
                                                    <td>ABC</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>$ 150</td>
                                                    <td>Unreceived</td>
                                                </tr>
                                                <tr>
                                                    <td class="">04</td>
                                                    <td>ABC</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>mm/dd/yyyy</td>
                                                    <td>$ 150</td>
                                                    <td>Received</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12 col-md-5">
                                        <div class="dataTables_info" id="DataTables_Table_0_info" role="status"
                                            aria-live="polite">
                                            Showing 1 to 3 of 3 entries
                                        </div>
                                    </div>
                                    <div class="col-sm-12 col-md-7">
                                        <div class="dataTables_paginate paging_simple_numbers"
                                            id="DataTables_Table_0_paginate">
                                            <ul class="pagination site-pagin">
                                                <li class="paginate_button page-item previous disabled">
                                                    <a href="#" class="page-link">Previous</a>
                                                </li>
                                                <li class="paginate_button page-item active">
                                                    <a href="#" class="page-link">1</a>
                                                </li>
                                                <li class="paginate_button page-item">
                                                    <a href="#" class="page-link">2</a>
                                                </li>
                                                <li class="paginate_button page-item">
                                                    <a href="#" class="page-link">3</a>
                                                </li>
                                                <li class="paginate_button page-item next disabled" i="">
                                                    <a href="#" class="page-link">Next</a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    <Row style={{ padding: "10px 20px" }} >
          <Col xs={24} md={12}>
            <h5 style={{ display: "inline", fontSize: 16 }}>Show : </h5>
            <Select
              size={"large"}
              className="chartSelectBox"
              defaultValue={paginationConfig.limit}
              onChange={(e) => handleLimitChange(e)}
              style={{
                width: 70,
                textAlign: "left",
              }}
              options={[
                { value: 10, label: "10" },
                { value: 20, label: "20" },
                { value: 30, label: "30" },
                { value: 40, label: "40" },
                { value: 50, label: "50" },
              ]}
            />
            &emsp;
            <h5 style={{ display: "inline", fontSize: 16 }}>Entries</h5>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Input
              style={{ width: "250px",}}
              className="mainInput dashInput purpleInput"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
              suffix={
                <FaSearch
                  style={{
                    color: "#3d1c6f",
                    fontSize: 16,
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    getAllContest(1, paginationConfig.limit, filter.keyword)
                  }
                />
              }
              onPressEnter={(e) =>
                getAllContest(1, paginationConfig.limit, filter.keyword)
              }
            />
            &emsp;
            <Popover
              content={filterContent}
              trigger="click"
              open={open}
              onOpenChange={handleOpenChange}
              placement="bottomRight"
              arrow={false}
            >
              <Button
                style={{
                  padding: "10px 15px",
                  height: "auto",
                  backgroundColor: "#3d1c6f",
                  borderRadius: "50px"
                }}
              >
                <FaFilter style={{ fontSize: "16px", color: "white" }} />
              </Button>
            </Popover>
          </Col>
        </Row>

        <Row style={{ padding: 20, overflow: "auto" }}>
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Skeleton active />
              <br />
            </div>
          ) : (
            <Table
              className="styledTable"
              dataSource={contests}
              columns={columns}
              pagination={false}
            />
          )}
        </Row>
        <Row style={{ padding: "10px 20px" }}>
          <Col xs={24} md={12}>
            <p>{messageRecord}</p>
          </Col>
          <Col
            xs={24}
            md={12}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Pagination
              className="styledPagination"
              onChange={(e) => handlePageChange(e)}
              current={parseInt(paginationConfig.pageNumber)}
              pageSize={paginationConfig.limit}
              total={paginationConfig.totalDocs}
              itemRender={itemRender}
            />
          </Col>
        </Row>
                </div>
            </div>
        </div>
            
        
        </div>

        
        </div>        
    </div>
    <Modal
          title="Submit Image"
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
  )
}

export default SubscriptionLogs