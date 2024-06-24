import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../Components/Button/Button";
import "./AllCards.css";
import "./TableStyle.css";
import CustomDropdown from "../../Components/CustomDropdown/CustomDropdown.jsx";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import BlogFilterSlider from "../../Components/FilterSlider/BlogsFilter/BlogsFilter.js";

import DropActions from "../../Components/DropActions/DropActions.jsx";
import Cookies from "js-cookie";
import LogoutPopup from "../../Components/Popups/LogoutPopup/LogoutPopup.jsx";
import CreateReportPopup from "../../Components/Popups/CreateReportFormPopup/CreateReportFormPopup.jsx";
import BlogDashboardMenu from "../../Layouts/Menu/BlogDashboardManagement/BlogDashboardMenu.js";
import {
  deleteReportCardTemplate,
  getAllCards,
} from "../../redux/reportCard/reportCardSlice.js";
import ComponentLoader from "../../Components/loaders/ComponentLoader/ComponentLoader.jsx";
import PageLoader from "../../Components/loaders/PageLoader/PageLoader.js";

const AllBlogs = () => {
  const roles = Cookies.get("roles");
  const {
    isgetAllReportCardFetching,
    isgetAllCardsSliceSuccess,
    isreportCardSliceError,
    reportCardSliceSuccessMessage,
    isDeleteReportCardFetching,
    allReportCardsData,
  } = useSelector((state) => state.reportCards);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (roles) {
      let tempRole = JSON.parse(roles);
      setIsAdmin(tempRole?.includes("admin"));
    }
  }, [roles]);
  console.log(allReportCardsData, "dtat");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedBlogId, setSelectedBlogId] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState([]);
  const [isDropAction, setIsDropAction] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [statusPopup, setStatusPopup] = useState(false);
  const [createReportCardPopup, setCreateReportCardPopup] = useState(false);
  const [editBlogPopup, setEditBlogPopup] = useState(false);
  const [previewPopup, setPreviewPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterSlider, setIsFilterSlider] = useState(false);
  
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
    { label: "Delete Report", onClick: () => setDeletePopup(true) },
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
    () => (""
      // <CustomDropdown
      //   className={"current"}
      //   dropName={perPageDropName}
      //   options={[
      //     { name: "10", id: 10 },
      //     { name: "20", id: 20 },
      //     { name: "30", id: 30 },
      //     { name: "40", id: 40 },
      //     { name: "50", id: 50 },
      //     { name: "Max", id: 100 },
      //   ]}
      //   isActive={isPerPageDrop}
      //   setIsActive={setIsPerPageDrop}
      //   onSelect={onChangePerPage}
      // />
    ),
    () => (""
      // <Button
      //   className={"iconButton"}
      //   src={"https://cdn.mastersunion.org/assets/dinero/filter.svg"}
      //   name={"Filters"}
      //   onClick={() => {
      //     setIsFilterSlider(!isFilterSlider);
      //   }}
      // />
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
    dispatch(deleteReportCardTemplate(selectedBlogId));
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
    dispatch(getAllCards());
  }, [allReportsLoadAgain]);
  return (
    <>
      <BlogFilterSlider
        isActive={isFilterSlider}
        setIsActive={setIsFilterSlider}
        setFilters={setFilters}
      />

      {deletePopup && (
        <LogoutPopup
          showActive={deletePopup}
          userId={selectedBlogId}
          message={"Are you sure you want to delete this Blog?"}
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
        currentCount={allReportCardsData.length}
        // totalCount={allBlogs.length}
        totalCount={allReportCardsData.length}
        BlogsRightMenuoption={BlogsRightMenuoption}
        onClickCreateBlog={handleCreatePopup}
      />
      {!isgetAllReportCardFetching ? (
        <div className="wrapperBox doubleMenu">
          <div className="tableWrapper wrapWithButton checkboxTable noIconTable actionFix">
            <table className="darkHeaderTable">
              <thead>
                <tr>
                  <th>
                    <div className="tableHeading">
                      <img src="/assets/svg/user.svg" alt="" />
                      Report Title
                    </div>
                  </th>
                  <th>
                    <div className="tableHeading">
                      <img src="/assets/svg/user.svg" alt="" />
                      Report Description
                    </div>
                  </th>
                  <th>
                    <div className="tableHeading">
                      <img src="/assets/svg/user.svg" alt="" />
                      Program
                    </div>
                  </th>
                  <th>
                    <div className="tableHeading">
                      <img src="/assets/svg/user.svg" alt="" />
                      Cohort
                    </div>
                  </th>
                  <th>
                    <div className="tableHeading">
                      <img src="/assets/svg/user.svg" alt="" />
                      Report Type
                    </div>
                  </th>
                  {/* {isAdmin && (
              <th>
                <div className="tableHeading">
                  <img src="/assets/svg/user.svg" alt="" />
                  Status
                </div>
              </th>
            )} */}
                  <th>
                    <div className="tableHeading">
                      <img src="/assets/svg/user.svg" alt="" />
                      Created On
                    </div>
                  </th>
                  <th>
                    <div className="tableHeading">
                      <img src="/assets/svg/user.svg" alt="" />
                      Created By
                    </div>
                  </th>

                  <th>
                    <div className="tableHeading">
                      <img src="/assets/svg/user.svg" alt="" />
                      Action
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {allReportCardsData?.map((Card, index) => (
                  <tr key={Card?._id}>
                    <td>
                      <div
                        className="tableData pointer"
                        onClick={() => {
                          navigate(`/create-report-cards?id=${Card?.id}`);
                        }}
                      >
                        {Card?.cardName}
                      </div>
                    </td>
                    <td>
                      {/* <div className="tableData">{Card.Card_description}</div> */}
                      {Card?.description?.split(" ")?.slice(0, 6)?.join(" ")}
                      {Card?.description?.split(" ")?.length > 6 ? "..." : ""}
                    </td>
                    <td>
                      <div className="tableData">{Card?.program}</div>
                    </td>
                    <td>
                      <div className="tableData">{Card?.cohort}</div>
                    </td>
                    <td>
                      <div className="tableData">{Card?.type}</div>
                    </td>

                    <td>
                      <div className="tableData">
                        {moment(Card?.createdAt).format("MMM DD YYYY")}
                      </div>
                    </td>

                    <td>
                      <div className="tableData">
                        {/* {Card?.user[0]?.firstName }{" "}{Card?.user[0]?.lastName} */}
                        <div className="tableData">
                          {Card?.creator?.firstName} {Card?.creator?.lastName}
                        </div>
                      </div>
                    </td>

                    {!isAdmin && (
                      <td>
                        <div
                          className="tableData"
                          onClick={() => toggleActionDropdown(Card?.id, Card)}
                        >
                          <img
                            className="settingIcon"
                            src="https://cdn.mastersunion.org/assets/dinero/setting.svg"
                          />
                          <DropActions
                            isActive={isDropAction === Card?.id}
                            dropActionOptions={dropActionOptions}
                            CardId={Card?.id}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}

                {/* <div className="loadMoreWrapper">
            <Button
              // isWaiting={allBlogs?.length > 0 && isBlogSliceFetching}
              onClick={loadMore}
              className={"BlueFillButton"}
              name={"Load More"}
            />
          </div> */}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        // <ComponentLoader />
        // <div>Loading the Report Cards</div>
        <PageLoader/>
        
      )}
    </>
  );
};

export default AllBlogs;
