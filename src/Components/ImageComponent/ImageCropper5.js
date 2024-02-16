import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  Cropper,
  Coordinates,
  CropperRef,
  ImageRestriction,
  FixedCropper,
  CropperPreviewRef,
  CropperPreview,
} from "react-advanced-cropper";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";

import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/corners.css";
import "./styles.css";
import rotateL from "./circular-arrowL.svg";
import rotateR from "./circular-arrowR.svg";
import addImg from "./addImg.png";
import google from "../LogIn/google.png";

const ImageCropper5 = ({
  projectID,
  dimID,
  setDatabaseFiltered,
  databaseFiltered,
}) => {
  const inputRef = useRef(null);
  const cropperRef = useRef(null);
  const previewRef = useRef(null);

  const [coordinates, setCoordinates] = useState(null);
  const [image] = useState(require("./photo.jpg"));
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState(require("./photo1.jpg"));
  const { addImage } = useDatabaseProjects();
  const [croppedImageDataUrl, setCroppedImageDataUrl] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [viewCropper, setViewCropper] = useState(false);

  const [src, setSrc] = useState(
    "https://storage.googleapis.com/supertolbucket/img1_1_1"
  );

  const onCrop = () => {
    const cropper = cropperRef.current;
    console.log("cropperRef type", cropperRef.current.getImage().arrayBuffer);
    const arr1 = new Uint8Array(cropperRef.current.getImage().arrayBuffer);
    console.log("onCrop arr1", arr1);

    if (cropper) {
      const canvas = cropper.getCanvas({
        fillColor: "rgb(25,0,0)", // color
      });
      console.log("canvas url from onCrop", canvas.toDataURL());
      setCroppedImageDataUrl(canvas.toDataURL());
      setCroppedImage(arr1);
      const newTab = window.open();
      if (newTab && canvas) {
        newTab.document.body.innerHTML = `<img src="${canvas.toDataURL()}"></img>`;
      }
    }
  };

  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onLoadImage = (event) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setImage3(URL.createObjectURL(file));
    }
    event.target.value = "";
  };

  useEffect(() => {
    // Revoke the object URL, to allow the garbage collector to destroy the uploaded before file
    return () => {
      if (image3) {
        URL.revokeObjectURL(image3);
      }
    };
  }, [image3]);

  const zoom = () => {
    if (cropperRef.current) {
      cropperRef.current.zoomImage(2); // zoom-in 2x
    }
  };

  const zoomOut = () => {
    if (cropperRef.current) {
      cropperRef.current.zoomImage(1 / 2);
    }
  };

  const move = () => {
    if (cropperRef.current) {
      cropperRef.current.moveImage(50, 100); // move x = 50, y = 100
    }
  };

  const rotateLeft = () => {
    if (cropperRef.current) {
      cropperRef.current.rotateImage(-20);
    }
  };

  const rotateRight = () => {
    if (cropperRef.current) {
      cropperRef.current.rotateImage(20);
    }
  };

  const uploadToGCS = () => {
    const croppedImageBlob = new Blob([croppedImage], {
      type: "image/jpeg",
    });
    console.log("Cropped image MIME type:", croppedImageBlob.type);

    const lastID = Math.max(
      ...databaseFiltered[0].DatabaseDim[dimID - 1].Image.map((o) => o.ID)
    );
    let newID = 0;
    if (lastID === -Infinity) {
      newID = 1;
    } else {
      newID = lastID + 1;
    }

    console.log("newID", newID);

    addImage(projectID, dimID, croppedImageBlob);

    databaseFiltered[0].DatabaseDim[dimID - 1].Image.push({
      ID: newID,
      Link: croppedImageDataUrl,
    });
    setDatabaseFiltered([...databaseFiltered]);
    // setViewResult(false);
  };
  const onUpdate = () => {
    previewRef.current?.refresh();
  };

  return (
    <>
      <button
        className="button"
        onClick={() => setViewCropper(!viewCropper)} // Use fileInputRef to trigger click
      >
        <img src={addImg} width="25" height="20"></img>
        {/* <Figure style={{ width: 60, height: 30 }}>
            <Figure.Image
              width={60}
              height={30}
              alt="Database"
              src={addImg}
              className="rounded"
            />
          </Figure> */}
      </button>
      {viewCropper && (
        <div className="main-con-wrapper">
          <div
            className="button-wrapper"
            onClick={() => setViewCropper(false)}
            style={{
              position: "absolute",
              top: "-10px",
              right: "-0px",
              zIndex: "999",
            }}
          >
            X
          </div>
          {/* <div className="example__cropper-wrapper">
        <FixedCropper
          ref={cropperRef}
          className="example__cropper"
          backgroundClassName="example__cropper-background"
          src={image}
          stencilProps={{
            handlers: false,
            lines: false,
            movable: false,
            resizable: false,
          }}
          stencilSize={{
            width: 300,
            height: 300,
          }}
          imageRestriction={ImageRestriction.stencil}
        />
      </div> */}
          <div className="cropper-wrapper">
            <Cropper ref={cropperRef} src={image3} onUpdate={onUpdate} />
          </div>
          {/* <div className="example__buttons-wrapper">
        {image && (
          <button className="example__button" onClick={onCrop}>
            Download result
          </button>
        )}
      </div> */}
          <div className="cropper-preview">
            <CropperPreview
              ref={previewRef}
              cropper={cropperRef}
              className="preview"
            />
          </div>
          <div className="buttons-wrapper">
            <button className="button-wrapper" onClick={onUpload}>
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={onLoadImage}
              />
              Upload image
            </button>
            {image && (
              <>
                <div className="action-group-wrapper">
                  <button className="button-wrapper" onClick={uploadToGCS}>
                    <div
                      className="googleLogo"
                      style={{ backgroundImage: `url(${google})` }}
                    ></div>
                    Upload to GCS
                  </button>
                  <button className="button-wrapper" onClick={zoom}>
                    +
                  </button>
                  <button className="button-wrapper" onClick={zoomOut}>
                    -
                  </button>
                  <div className="button-wrapper" onClick={rotateLeft}>
                    <img src={rotateL} alt={"RoateL"}></img>
                  </div>
                  <div className="button-wrapper" onClick={rotateRight}>
                    <img src={rotateR} alt={"RotateR"}></img>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCropper5;
