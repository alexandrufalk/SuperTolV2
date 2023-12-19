import React, { useState } from "react";
import del from "../DropDown/Delete.png";

const ProjectsTable = ({
  projectSelected,
  databaseSummryFiltered,
  SelectCase,
  RemoveCase,
}) => {
  const itemsPerPage = 3; // You can adjust the number of items per page

  const [currentPage, setCurrentPage] = useState(1);

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
                    RemoveCase(n.ID);
                    // forceUpdate();
                  }}
                ></img>
              </td>
            </tr>
          ))}
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({
          length: Math.ceil(
            databaseSummryFiltered[0].DataCase.length / itemsPerPage
          ),
        }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default ProjectsTable;
