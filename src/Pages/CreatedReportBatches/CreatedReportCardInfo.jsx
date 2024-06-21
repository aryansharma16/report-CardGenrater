import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../Components/Button/Button";
import "./AllBatches.css";
import "../AllReportCards/TableStyle.css";
import CustomDropdown from "../../Components/CustomDropdown/CustomDropdown.jsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BlogFilterSlider from "../../Components/FilterSlider/BlogsFilter/BlogsFilter.js";

import DropActions from "../../Components/DropActions/DropActions.jsx";
import Cookies from "js-cookie";
import LogoutPopup from "../../Components/Popups/LogoutPopup/LogoutPopup.jsx";
import CreateReportPopup from "../../Components/Popups/CreateReportFormPopup/CreateReportFormPopup.jsx";
import BlogDashboardMenu from "../../Layouts/Menu/BlogDashboardManagement/BlogDashboardMenu.js";
import {
  deleteReportBatch,
  deleteReportCardTemplate,
  getAllCards,
  getAllReportBatch,
  getAllReportCardWithBatchId,
  getCardById,
} from "../../redux/reportCard/reportCardSlice.js";
import ConfigureAndSendEmail from "../../Components/SendEmail/ConfigureAndSendEmail.jsx";

const CreatedReportCardInfo = () => {
  const roles = Cookies.get("roles");
  const {
    isgetAllReportCardFetching,
    isgetAllCardsSliceSuccess,
    isreportCardSliceError,
    reportCardSliceSuccessMessage,
    isDeleteReportCardFetching,
    allReportCardsData,
    allReportbatchesData,
    singleReportCardsData,
    reportCardInfoData,
    isgetSingleCardsSliceSuccess,
  } = useSelector((state) => state.reportCards);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (roles) {
      let tempRole = JSON.parse(roles);
      setIsAdmin(tempRole?.includes("admin"));
    }
  }, [roles]);
  const templateID = reportCardInfoData[0]?.template_id;
  useEffect(() => {
    if (templateID) {
      dispatch(getCardById(templateID)); // Pass the extracted id
    }
  }, [templateID]);

  console.log(
    reportCardInfoData[0]?.template_id,
    "dtat batchess template_id and its DAta",
    singleReportCardsData
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedBlogId, setSelectedBlogId] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [isDropAction, setIsDropAction] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [statusPopup, setStatusPopup] = useState(false);
  const [createReportCardPopup, setCreateReportCardPopup] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSlider, setIsFilterSlider] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [fetchReportCardsAgain, setFetchReportCardsAgain] = useState(false);
  const handleCopy = (text, index) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      },
      () => {
        setCopiedIndex(null);
      }
    );
  };
  const intialFilter = {
    statusType: "all",
    fromDate: moment("2019-01-01").format("YYYY-MM-DD"),
    toDate: moment().format("YYYY-MM-DD"),

    blogType: "",
  };
  const [filters, setFilters] = useState(intialFilter);
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allReportsLoadAgain, setAllReportsLoadAgain] = useState(false);
  const [isPerPageDrop, setIsPerPageDrop] = useState(false);
  const [perPageDropName, setPerPageDropName] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const queryParams = new URLSearchParams(window.location.search);
  const [selectedStudentsForEmail, setSelectedStudentsForEmail] = useState([]);

  const id = queryParams.get("id");

  const toggleActionDropdown = (rowId, blog) => {
    setIsDropAction(isDropAction === rowId ? false : rowId);
    setSelectedBlogId(rowId);
    setSelectedBlog(blog);
  };

  const onChangePerPage = (obj) => {
    setPerPageDropName(obj.id);
    // setIsAllChecked(false);
    // setSelectedApplicants([]);
  };
  const dropActionOptions = [
    { label: "Delete Batch", onClick: () => setDeletePopup(true) },
    //  {
    //    label: "Edit Report",
    //    onClick: () => {
    //      setEditBlogPopup(true);
    //    },
    //  },
    //  {
    //    label: "Preview Report",
    //    onClick: () => {
    //      setPreviewPopup(true);
    //    },
    //  },
    //  {
    //    label: "Change Status",
    //    onClick: () => setStatusPopup(true),
    //  },
    //  {
    //    label: "Duplicate Report", // New option for duplicating a blog
    //    onClick: () => {
    //      handleDuplicate(selectedBlogId);
    //    },
    //  },
  ];
  const BlogsRightMenuoption = [
    () => (
      <CustomDropdown
        className={"current"}
        dropName={perPageDropName}
        options={[
          { name: "10", id: 10 },
          { name: "20", id: 20 },
          { name: "30", id: 30 },
          { name: "40", id: 40 },
          { name: "50", id: 50 },
          { name: "Max", id: 100 },
        ]}
        isActive={isPerPageDrop}
        setIsActive={setIsPerPageDrop}
        onSelect={onChangePerPage}
      />
    ),
    () => (
      <Button
        className={"iconButton BlueFillButton button"}
        src={"https://cdn.mastersunion.org/assets/dinero/filter.svg"}
        name={"Send Emails"}
        onClick={() => {
          setIsFilterSlider(!isFilterSlider);
        }}
      />
    ),
  ];
  const BlogSearchHandler = (searchValue) => {
    const keywords = searchValue.split(",").map((keyword) => keyword.trim());
    setCurrentPage(1);
    setSearchQuery(keywords);
  };
  const loadMore = () => {
    console.log("loadmorwe");
  };

  const clearSearch = () => {};

  const handleDelete = () => {
    console.log("i am here to dlete == ", selectedBlogId);
    dispatch(deleteReportBatch(selectedBlogId));
    setAllReportsLoadAgain(!allReportsLoadAgain);
  };
  const handleCreatePopup = () => {
    setCreateReportCardPopup(true);
  };

  const handleStatus = () => {};
  const handleEditPopup = (obj) => {};
  const handleDuplicate = (blogId) => {};
  const readMore = (id) => {};

  useEffect(() => {
    console.log(createReportCardPopup);
  }, [createReportCardPopup]);

  useEffect(() => {
    if (id) {
      dispatch(getAllReportCardWithBatchId(id));
    }
  }, [allReportsLoadAgain, fetchReportCardsAgain]);

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedStudentsForEmail(
        reportCardInfoData.map((batch) => ({
          id: batch.id,
          email: batch.student_email,
          name: batch.student_name,
          cdnLink: batch.report_cdn_link,
        }))
      );
    } else {
      setSelectedStudentsForEmail([]);
    }
  };

  const handleSelectSingle = (id, email, name, cdnLink) => {
    setSelectedStudentsForEmail((prevSelectedItems) => {
      const index = prevSelectedItems.findIndex((item) => item.id === id);
      if (index !== -1) {
        return prevSelectedItems.filter((item) => item.id !== id);
      } else {
        return [...prevSelectedItems, { id, email, name, cdnLink }];
      }
    });
  };

  const isSelected = (id) =>
    selectedStudentsForEmail.some((item) => item.id === id);
  console.log("emails And CDn links", selectedStudentsForEmail);
  return (
    <>
      {isFilterSlider && (
        <ConfigureAndSendEmail
          isActive={isFilterSlider}
          setIsActive={setIsFilterSlider}
          setFilters={setFilters}
          templateData={singleReportCardsData}
          selectedStudentsForEmail={selectedStudentsForEmail}
          fetchReportCardsAgain={fetchReportCardsAgain}
          setFetchReportCardsAgain={setFetchReportCardsAgain}
          setSelectedStudentsForEmail={setSelectedStudentsForEmail}
        />
      )}

      {deletePopup && (
        <LogoutPopup
          showActive={deletePopup}
          userId={selectedBlogId}
          message={"Are you sure you want to delete this Batch?"}
          onCancel={() => setDeletePopup(false)}
          onAllow={handleDelete}
          isPopupFetching={isDeleteReportCardFetching}
        />
      )}
      {createReportCardPopup && (
        <CreateReportPopup
          isActive={createReportCardPopup}
          userId={selectedBlogId}
          message={"Create the Report card"}
          onCancel={setCreateReportCardPopup}
          onAllow={handleDelete}
        />
      )}

      {statusPopup && (
        <LogoutPopup
          showActive={statusPopup}
          userId={selectedBlogId}
          message={"Are you sure  change status of Blog?"}
          onCancel={() => setStatusPopup(false)}
          onAllow={handleStatus}
          // isPopupFetching={isBlogSliceFetchingSmall}
        />
      )}

      <BlogDashboardMenu
        searchFunction={BlogSearchHandler}
        clearSearch={clearSearch}
        currentCount={reportCardInfoData?.length}
        //totalCount={reportCardInfoData.length}
        totalCount={reportCardInfoData?.length}
        BlogsRightMenuoption={BlogsRightMenuoption}
        onClickCreateBlog={handleCreatePopup}
        className={"dontShow"}
      />
      <div className="wrapperBox doubleMenu">
        <div className="tableWrapper wrapWithButton checkboxTable noIconTable actionFix">
          <table className="darkHeaderTable">
            <thead>
              <tr>
                <th>
                  <div className="tableHeading">
                    <img src="/assets/svg/user.svg" alt="" />
                    S.No
                  </div>
                </th>
                <th>
                  <div className="tableHeading">
                    <img src="/assets/svg/user.svg" alt="" />
                    Student Name
                  </div>
                </th>
                <th>
                  <div className="tableHeading">
                    <img src="/assets/svg/user.svg" alt="" />
                    Student Email
                  </div>
                </th>
                <th>
                  <div className="tableHeading">
                    <img src="/assets/svg/user.svg" alt="" />
                    Report Card Link
                  </div>
                </th>
                <th>
                  <div className="tableHeading">
                    <img src="/assets/svg/user.svg" alt="" />
                    Sent Status
                  </div>
                </th>
                <th>
                  <div className="tableHeading">
                    <img src="/assets/svg/user.svg" alt="" />
                    Template Name
                  </div>
                </th>
                <th>
                  <div className="tableHeading">
                    <img src="/assets/svg/user.svg" alt="" />
                    Created On
                  </div>
                </th>
                <th>
                  <div className="tableHeading">
                    <label
                      htmlFor="selectAllEmails"
                      style={{ cursor: "pointer" }}
                    >
                      Select All
                    </label>
                    <input
                      id="selectAllEmails"
                      type="checkbox"
                      className="selectUserForEmail"
                      checked={
                        selectedStudentsForEmail?.length ===
                        reportCardInfoData?.length
                      }
                      onChange={handleSelectAll}
                    />
                  </div>
                </th>
                {/* <th>
                  <div className="tableHeading">
                    <img src="/assets/svg/user.svg" alt="" />
                    Action
                  </div>
                </th> */}
              </tr>
            </thead>
            <tbody>
              {reportCardInfoData?.map((batch, index) => (
                <tr key={batch?._id}>
                  <td>
                    <div
                      className="tableData pointer"
                      onClick={() => {
                        navigate(`/batch-data?id=${batch?.id}`);
                      }}
                    >
                      {index + 1}
                    </div>
                  </td>
                  <td>
                    <div className="tableData">{batch?.student_name}</div>
                  </td>
                  <td>
                    <div className="tableData">{batch?.student_email}</div>
                  </td>

                  <td>
                    <div className="tableData">
                      {batch?.report_cdn_link?.length > 16 ? (
                        <span>
                          {batch?.report_cdn_link.substring(0, 16)}...
                          <button
                            className="copyCdnLink"
                            onClick={() =>
                              handleCopy(batch?.report_cdn_link, index)
                            }
                          >
                            {copiedIndex === index ? "Copied!" : "Copy Link"}
                          </button>
                        </span>
                      ) : (
                        <span>
                          {batch?.report_cdn_link}
                          <button
                            className="copyCdnLink"
                            onClick={() =>
                              handleCopy(batch?.report_cdn_link, index)
                            }
                          >
                            {copiedIndex === index ? "Copied!" : "Copy Link"}
                          </button>
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="tableData">
                      {batch?.status ? (
                        <div className="yesStatus">Yes</div>
                      ) : (
                        <div className="noStatus">No</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="tableData">
                      {singleReportCardsData.cardName}
                    </div>
                  </td>
                  <td>
                    <div className="tableData">
                      {moment(batch?.createdAt).format(
                        "MMM DD YYYY, h:mm:ss A"
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="tableData">
                      <input
                        type="checkbox"
                        className="selectUserForEmail"
                        checked={isSelected(batch?.id)}
                        onChange={() =>
                          handleSelectSingle(
                            batch?.id,
                            batch?.student_email,
                            batch?.student_name,
                            batch?.report_cdn_link
                          )
                        }
                      />
                    </div>
                  </td>
                  {/* {!isAdmin && (
                    <td>
                      <div
                        className="tableData"
                        onClick={() => toggleActionDropdown(batch?.id, batch)}
                      >
                        <img
                          className="settingIcon"
                          src="https://cdn.mastersunion.org/assets/dinero/setting.svg"
                        />
                        <DropActions
                          isActive={isDropAction === batch?.id}
                          dropActionOptions={dropActionOptions}
                          batchId={batch?.id}
                        />
                      </div>
                    </td>
                  )} */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CreatedReportCardInfo;
