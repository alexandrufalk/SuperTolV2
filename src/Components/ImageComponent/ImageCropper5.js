import React, { useState, useRef } from "react";
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

const ImageCropper5 = () => {
  const cropperRef = useRef(null);
  const [coordinates, setCoordinates] = useState(null);
  const [image] = useState(require("./photo.jpg"));
  const [image2, setImage2] = useState();

  const [src, setSrc] = useState(
    "https://images.unsplash.com/photo-1599140849279-1014532882fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80"
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

  const onCrop2 = () => {
    if (cropperRef.current) {
      setCoordinates(cropperRef.current.getCoordinates());
      // You are able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result
      setImage2(cropperRef.current.getCanvas()?.toDataURL());
    }
  };

  return (
    <div className="example">
      <div className="example__cropper-wrapper">
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
      </div>
      <div className="example__cropper-wrapper">
        <Cropper ref={cropperRef} src={src} />;
      </div>
      <div className="example__buttons-wrapper">
        {image && (
          <button className="example__button" onClick={onCrop}>
            Download result
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageCropper5;
