import React from "react";

const CustomPagination = ({ data, itemsPerPage, currentPage, paginate }) => {
  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Function to generate an array of pages to display
  const generatePageNumbers = () => {
    const pageNumbers = [];

    // Display the first page
    pageNumbers.push(1);

    // Display ellipses if there are pages before the middle group
    if (currentPage > 3) {
      pageNumbers.push("...");
    }

    // Display the middle group of pages
    const middleGroupStart = Math.max(currentPage - 1, 2);
    const middleGroupEnd = Math.min(currentPage + 1, totalPages - 1);

    for (let i = middleGroupStart; i <= middleGroupEnd; i++) {
      pageNumbers.push(i);
    }

    // Display ellipses if there are pages after the middle group
    if (middleGroupEnd < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Display the last page
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="pagination">
      {/* Display first, ellipses, middle group, ellipses, and last pages */}
      {generatePageNumbers().map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => {
            // Only call paginate if the button represents a numeric page
            if (Number.isInteger(pageNumber)) {
              paginate(pageNumber);
            }
          }}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default CustomPagination;
