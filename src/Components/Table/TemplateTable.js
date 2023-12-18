import { useState, useEffect } from "react";

const TemplateTable = ({ databaseTemplateFiltered, templateSelected }) => {
  const itemsPerPage = 3; // You can adjust the number of items per page

  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes of the items to be displayed on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = databaseTemplateFiltered[0].Data.slice(
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
  return (
    <>
      <table id="Projects">
        <tr>
          <th>Index</th>
          <th>Component name</th>
          <th>Color</th>
          <th>Delete</th>
        </tr>
        {templateSelected &&
          currentItems.map((n) => (
            <tr key={n.Index + "template table"}>
              <td key={n.Index + "template table td"}> {n.Index}</td>
              <td key={n.ComponentName + n.Index}>{n.ComponentName}</td>
              <td key={n.Color + n.Index}> {n.Color}</td>
              <td key={n.Index + "Remove template"}>
                <button
                  type="button"
                  variant="outline-danger"
                  //   onClick={() => {
                  //     const confirmRemove = window.confirm(
                  //       "Do you want to remove this component?"
                  //     );
                  //     if (confirmRemove) {
                  //       RemoveComponent(n.Index);

                  //     }
                  //   }}
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
          length: Math.ceil(
            databaseTemplateFiltered[0].Data.length / itemsPerPage
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

export default TemplateTable;
