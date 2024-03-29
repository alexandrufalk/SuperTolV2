import React, { useState } from "react";

function ImageComponent({ i, handleClick }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlePreviewClick = () => {
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };
  console.log("ImageComponent link", i.Link);

  return (
    <div className="image-con">
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: "relative" }}
      >
        <img
          src={i.Link}
          alt={`Image for ${i.ID}`}
          style={{ width: "120px", height: "80px", borderRadius: "5px" }}
        />
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              background: "#D5DBE5",
              color: "#3734A3",
              padding: "8px",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            <span
              className="text-danger"
              onClick={() => {
                const confirmdelete = window.confirm(
                  "Do you want to delete this component?"
                );
                if (confirmdelete) {
                  handleClick(i.ID);
                }
              }}
            >
              Delete
            </span>
            <span
              onClick={handlePreviewClick}
              style={{
                marginLeft: "10px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Preview
            </span>
          </div>
        )}
      </div>

      {isPreviewOpen && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "white",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            width: "300px",
            height: "300px",
            zIndex: 9999,
          }}
        >
          <img
            src={i.Link}
            alt={`Image for ${i.ID}`}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <span
            onClick={handleClosePreview}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              background: "#D5DBE5",
              color: "#3734A3",
              borderRadius: "6px",
              padding: "4px",
            }}
          >
            Close
          </span>
        </div>
      )}
    </div>
  );
}

export default ImageComponent;
