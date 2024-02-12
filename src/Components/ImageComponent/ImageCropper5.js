import React, { useState, useRef, useEffect, ChangeEvent } from "react";
import {
  Cropper,
  Coordinates,
  CropperRef,
  ImageRestriction,
  FixedCropper,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import "react-advanced-cropper/dist/themes/corners.css";
import "./styles.css";
import rotateL from "./circular-arrowL.svg";
import rotateR from "./circular-arrowR.svg";

const ImageCropper5 = () => {
  const inputRef = useRef(null);
  const cropperRef = useRef(null);

  const [coordinates, setCoordinates] = useState(null);
  const [image] = useState(require("./photo.jpg"));
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState(require("./photo1.jpg"));

  const [src, setSrc] = useState(
    "https://storage.googleapis.com/supertolbucket/img1_1_1"
  );

  const onCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas({
        fillColor: "rgb(25,0,0)", // color
      });
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

  return (
    <div className="example">
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
      <div className="example__cropper-wrapper">
        <Cropper ref={cropperRef} src={image3} />;
      </div>
      <div className="example__buttons-wrapper">
        {image && (
          <button className="example__button" onClick={onCrop}>
            Download result
          </button>
        )}
      </div>
      <div className="example__buttons-wrapper">
        <button className="example__button" onClick={onUpload}>
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
            <button className="example__button" onClick={onCrop}>
              Download result
            </button>
            <button className="example__button" onClick={zoom}>
              +
            </button>
            <button className="example__button" onClick={zoomOut}>
              -
            </button>
            <div className="example__button" onClick={rotateLeft}>
              <image src={rotateL} alt={"RoateL"}></image>
            </div>
            <div className="example__button" onClick={rotateRight}>
              <image src={rotateR} alt={"RotateR"}></image>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ImageCropper5;
