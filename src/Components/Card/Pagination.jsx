import React from "react";

const Pagination = ({ totalLength, postPerPage, setCurrentPage, currentPage }) => {
  const pageCount = Math.ceil(totalLength / postPerPage);
  const pages = [];
  for (let i = 1; i <= pageCount; i++) pages.push(i);
  return (
    <div className="pagination">
        <button disabled={currentPage===1} style={{cursor:currentPage===1?"not-allowed":"pointer"}}  onClick={()=>setCurrentPage((Cpage)=>Cpage-1)}>Prev</button>
      {pages.map((page, i) => (
        <button key={i} className={currentPage===page? "active":""} onClick={()=> setCurrentPage(page) }>{page}</button>
      ))}
      <button disabled={currentPage===(pages[pages.length-1])} style={{cursor:currentPage===(pages[pages.length-1])?"not-allowed":"pointer"}} onClick={()=>setCurrentPage((Cpage)=>Cpage+1)}>Next</button>
    </div>
  );
};

export default Pagination;
