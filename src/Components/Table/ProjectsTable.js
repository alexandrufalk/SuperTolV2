import React, { useState } from "react";

const ProjectsTable = ({
  projectSelected,
  databaseSummryFiltered,
  SelectCase,
  RemoveCase,
}) => {
  const itemsPerPage = 1; // You can adjust the number of items per page

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = databaseSummryFiltered[0].DataCase.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
              <td key={n.ID + n.Date}> {n.Date}</td>
              <td key={n.ID + "Remove case summary"}>
                <button
                  type="button"
                  variant="outline-danger"
                  onClick={() => {
                    RemoveCase(n.ID);
                    // forceUpdate();
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
      </table>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({
          length: Math.ceil(databaseSummryFiltered.length / itemsPerPage),
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
