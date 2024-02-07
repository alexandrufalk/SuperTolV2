import React, { useState, useRef, useEffect } from "react";
import Cropper from "react-easy-crop";
import getCroppedImg from "./cropImage";
// import Button from "react-bootstrap/esm/Button";
// import Figure from "react-bootstrap/Figure";
import "./imbCropper.css";
import useDatabaseProjects from "../../Hooks/useDatabaseProject";
import addImg from "./addImg.png";
// import { AiOutlinePlus } from "react-icons/ai";

const ImageCropper2 = ({
  projectID,
  dimID,
  setDatabaseFiltered,
  databaseFiltered,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showZoomHint, setShowZoomHint] = useState(false);
  const [showMultiTouchHint, setShowMultiTouchHint] = useState(false);
  const [removeTouchAction, setRemoveTouchAction] = useState(false);
  const zoomTimeoutRef = useRef();
  const touchTimeoutRef = useRef();
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [viewResult, setViewResult] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Store the selected image
  const fileInputRef = useRef(null); // Create a ref for the file input
  const { addImage } = useDatabaseProjects();
  const [croppedImageDataUrl, setCroppedImageDataUrl] = useState(null);
  const [viewCropper, setViewCropper] = useState(false);

  useEffect(() => {
    clearTimeout(zoomTimeoutRef.current);
    clearTimeout(touchTimeoutRef.current);
  }, []);

  // const img = "https://storage.googleapis.com/supertolbucket/img1_1_3";

  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    console.log(croppedArea, croppedAreaPixels);
    setCroppedAreaPixels(croppedAreaPixels);
    // window.localStorage.setItem("croppedArea", JSON.stringify(croppedArea));
  };

  const onWheelRequest = (e) => {
    // require the CTRL/⌘ key to be able to zoom with wheel
    if (e.ctrlKey || e.metaKey) {
      setShowZoomHint(false);
      return true;
    }
    setShowZoomHint(true);
    clearTimeout(zoomTimeoutRef.current);
    zoomTimeoutRef.current = setTimeout(() => setShowZoomHint(false), 2000);
    return false;
  };
  const onTouchRequest = (e) => {
    // require 2 fingers to be able to interact with the image
    if (e.touches.length > 1) {
      setShowMultiTouchHint(false);
      setRemoveTouchAction(true);
      return true;
    }
    setShowMultiTouchHint(true);
    setRemoveTouchAction(false);
    clearTimeout(touchTimeoutRef.current);
    touchTimeoutRef.current = setTimeout(
      () => setShowMultiTouchHint(false),
      2000
    );
    return false;
  };

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });

      setCroppedImage(croppedImage);

      // Create a new constant to store the data URL
      const croppedImageDataUrl = `data:image/jpeg;base64,${btoa(
        String.fromCharCode.apply(null, croppedImage)
      )}`;
      setCroppedImageDataUrl(croppedImageDataUrl);
      setViewResult(true);
      setViewCropper(false);
    } catch (e) {
      console.error(e);
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
    setViewResult(false);
  };

  const onFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
      setViewCropper(true);
    }
  };

  // const openFileInput = () => {
  //   // Trigger the file input click event
  //   fileInputRef.current.click();
  // };

  console.log("croppedImage", croppedImage);

  return (
    <div>
      <div>
        {/* <p>Dim ID {dimID}</p> */}
        <input
          type="file"
          accept="image/*"
          onChange={onFileInputChange}
          style={{ display: "none" }}
          ref={fileInputRef} // Assign the ref here
        />
        <button
          className="button"
          onClick={() => fileInputRef.current.click()} // Use fileInputRef to trigger click
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
      </div>
      {viewCropper && (
        <div className="cropper-container">
          <div className="crop-container">
            <Cropper
              image={selectedImage}
              crop={crop}
              zoom={zoom}
              rotation={rotation} // Pass the rotation angle
              aspect={4 / 3}
              onCropChange={setCrop}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
              onWheelRequest={onWheelRequest}
              onTouchRequest={onTouchRequest}
              classes={
                removeTouchAction && { containerClassName: "removeTouchAction" }
              }
            />
            {showZoomHint && (
              <div className="zoom-hint">
                <p>Use ⌘ + scroll (or ctrl + scroll) to zoom the image</p>
              </div>
            )}
            {showMultiTouchHint && (
              <div className="touch-hint">
                <p>Use 2 fingers to interact with the image</p>
              </div>
            )}
          </div>
          <div className="controls">
            <button className="rounded" onClick={() => setZoom(zoom - 0.5)}>
              -
            </button>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setZoom(e.target.value);
              }}
              className="zoom-range"
            />
            <button className="rounded" onClick={() => setZoom(zoom + 0.5)}>
              +
            </button>
          </div>
          <div className="controls">
            <button
              className="rounded"
              onClick={() => setRotation(rotation + 45)}
            >
              ↻
            </button>
            <input
              type="range"
              value={rotation}
              min={0}
              max={360}
              step={10}
              aria-labelledby="Zoom"
              onChange={(e) => {
                setRotation(e.target.value);
              }}
              className="zoom-range"
            />
            <button
              className="rounded"
              onClick={() => setRotation(rotation - 45)}
            >
              ↺
            </button>
          </div>
          <span
            onClick={() => setViewCropper(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              cursor: "pointer",
              color: "blue",
            }}
          >
            Close
          </span>
          <div className=" text-center">
            <button
              onClick={showCroppedImage}
              variant="secondary"
              color="primary"
              // classes={{ root: classes.cropButton }}
            >
              Show Result
            </button>
          </div>
        </div>
      )}

      {viewResult && (
        <div className="result-container">
          <img
            src={croppedImageDataUrl}
            alt="Cropped Image" // You can set an alt attribute
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <button
            onClick={() => {
              setViewResult(false);
              setViewCropper(true);
            }}
          >
            Close
          </button>
          <div className="text-center">
            <button
              onClick={uploadToGCS}
              variant="secondary"
              color="primary"
              // classes={{ root: classes.cropButton }}
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCropper2;
