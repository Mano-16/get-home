import React, { useState, useEffect } from "react";
import HomeCard from "./HomeCard";
import Home1 from "../../assets/Home.jpg";
import { getHomeData } from "../../lib/api";
import { useSelector } from "react-redux";
import "./DataHomeCard.css";
import Pagination from "./Pagination";
import LoaderSpinner from "../ReuseComponents/Loader";

const HomeCardData = (props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postPerPage = 6;
  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex - postPerPage;
  const FilterHomeDetails = useSelector((state) => state.homeMain.filterHomeRedux);
  const FilterSubHomeDetails = useSelector((state) => state.homeMain.subFilterHomeRedux);
  const isFiltered = useSelector((state) => state.homeMain.isFiltered);
  const HomeDetails = useSelector((state) => state.homeMain.homeMainRedux);
  // const CardDetails = isFiltered ? FilterHomeDetails : HomeDetails;
  

  const CardDetails =  isFiltered===2 ? FilterSubHomeDetails: (isFiltered==1 ? FilterHomeDetails: HomeDetails);
  const pageCardDetails = CardDetails && CardDetails.slice(firstPostIndex, lastPostIndex);
  console.log(pageCardDetails)
  return (
    <div className="TotalCardContainer">
      {FilterHomeDetails.length === 0 && isFiltered===1 && (
        <div className="noHome">No home available with your filter😕</div>
      )}
      {FilterSubHomeDetails.length === 0 && isFiltered===2 && (
        <div className="noHome">No home available with your filter😕</div>
      )}
      <div className="TotalCards">
        {pageCardDetails.length > 0
          ? pageCardDetails.map((HomeData) => (
              <HomeCard
                key={HomeData.key}
                HomeDetails={HomeData}
                onShow={props.onShow}
              />
            ))
          : ""}
      </div>

      {pageCardDetails.length !== 0 && (
        <Pagination
          firstPostIndex={firstPostIndex}
          lastPostIndex={lastPostIndex}
          postPerPage={postPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalLength={CardDetails.length}
        />
      )}
    </div>
  );
};

export default HomeCardData;
