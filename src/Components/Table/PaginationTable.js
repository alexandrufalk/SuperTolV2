import React, { useState } from "react";

const itemsPerPage = 1; // You can adjust the number of items per page

const PaginationTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Case Name</th>
            <th>Case Description</th>
            <th>Author</th>
            <th>Date</th>
            <th>Action</th>
            {/* Add more table headers based on your data */}
          </tr>
        </thead>
        <tbody>
          {currentItems[0].DataCase.map((n) => (
            <tr key={n.ID + "Summary table"}>
              <td key={n.ID + "Summary table td"}> {n.ID}</td>
              <td
                key={n.ID + "CaseName"}
                // onClick={() => {
                //   SelectCase(n.ID);
                // }}
              >
                {n.CaseName}
              </td>
              <td key={n.ID + "nDescription"}> {n.Description}</td>
              <td key={n.ID + n.Author}> {n.Author}</td>
              <td key={n.ID + n.Date}> {n.Date}</td>
              <td key={n.ID + "Remove case summary"}>
                <button
                  type="button"
                  variant="outline-danger"
                  // onClick={() => {
                  //   RemoveCase(n.ID);

                  // }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div>
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
          (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default PaginationTable;
