import React, { useState } from "react";
import del from "../DropDown/Delete.png";
import CustomPagination from "./CustomPagination";
import drop from "./chevron-left.png";

const ProjectsTable = ({
  projectSelected,
  databaseSummryFiltered,
  SelectCase,
  RemoveCase,
}) => {
  //   const itemsPerPage = 1; // You can adjust the number of items per page

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(3);
  const [isDropPag, setDropPag] = useState(false);

  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = databaseSummryFiltered[0].DataCase.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log(
    "Pagination items",
    indexOfFirstItem,
    indexOfLastItem,
    currentItems
  );
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    // Create a Date object from the original string
    const originalDate = new Date(dateString);

    // Extract day, month, and year components
    const day = originalDate.getUTCDate();
    const month = originalDate.getUTCMonth() + 1; // Months are zero-based
    const year = originalDate.getUTCFullYear();

    // Format the date as "DD-MM-YYYY"
    const formattedDate = `${day < 10 ? "0" : ""}${day}-${
      month < 10 ? "0" : ""
    }${month}-${year}`;
    return formattedDate;
  };

  const handlePaginationNr = () => {
    setDropPag(!isDropPag);
  };

  return (
    <>
      <table id="Projects">
        <tr>
          <th>ID</th>
          <th>Case Name</th>
          <th>Case Description</th>
          <th>Author</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
        {projectSelected &&
          currentItems.map((n) => (
            <tr key={n.ID + "Summary table"}>
              <td key={n.ID + "Summary table td"}> {n.ID}</td>
              <td
                key={n.ID + "CaseName"}
                onClick={() => {
                  SelectCase(n.ID);
                }}
              >
                {n.CaseName}
              </td>
              <td key={n.ID + "nDescription"}> {n.Description}</td>
              <td key={n.ID + n.Author}> {n.Author}</td>
              <td key={n.ID + n.Date}> {formatDate(n.Date)}</td>
              <td key={n.ID + "Remove case summary"}>
                <img
                  src={del}
                  onClick={() => {
                    const confirmRemove = window.confirm(
                      "Do you want to remove this case?"
                    );
                    if (confirmRemove) {
                      RemoveCase(n.ID);
                    }

                    // forceUpdate();
                  }}
                ></img>
              </td>
            </tr>
          ))}
      </table>

      {/* Pagination */}
      {/* <div className="pagination">
        {Array.from({
          length: Math.ceil(
            databaseSummryFiltered[0].DataCase.length / itemsPerPage
          ),
        }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div> */}
      <div className="pagination-container">
        <CustomPagination
          data={databaseSummryFiltered[0].DataCase}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          paginate={paginate}
        />
        <div className="pagination-show">
          <p>Show</p>
          <div className="pagination-drop">
            {itemsPerPage} rows
            <div>
              <div className="dropbtn" onClick={handlePaginationNr}>
                <img src={drop}></img>
              </div>
            </div>
            {isDropPag && (
              <div className="dropdown-content-pagination">
                <div
                  className="con-m"
                  onClick={() => {
                    setItemsPerPage(1);
                    setDropPag(!isDropPag);
                    setCurrentPage(1);
                  }}
                >
                  1
                </div>
                <div
                  className="con-m"
                  onClick={() => {
                    setItemsPerPage(3);
                    setDropPag(!isDropPag);
                    setCurrentPage(1);
                  }}
                >
                  3
                </div>
                <div
                  className="con-m"
                  onClick={() => {
                    setItemsPerPage(5);
                    setDropPag(!isDropPag);
                    setCurrentPage(1);
                  }}
                >
                  5
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectsTable;
