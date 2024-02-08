import React, { useState, useRef } from "react";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import { getCroppedImg, getRotatedImage } from "./cropImageUtils"; // You need to implement this utility function
import "react-easy-crop";

const ImageCropper4 = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const cropperRef = useRef(null);

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImageBlob = await getCroppedImg(
        selectedImage,
        croppedAreaPixels
      );
      setCroppedImage(URL.createObjectURL(croppedImageBlob));
    } catch (e) {
      console.error("Error cropping image:", e);
    }
  };

  const handleZoomChange = (_, zoomValue) => {
    setZoom(zoomValue);
  };

  const handleRotateLeft = () => {
    setRotation((rotation - 90) % 360);
  };

  const handleRotateRight = () => {
    setRotation((rotation + 90) % 360);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setCrop({ x: 0, y: 0 });
        setZoom(1);
        setRotation(0);
      };

      reader.readAsDataURL(file);
    }
  };

  const handleCropClick = async () => {
    const crop = cropperRef.current.getCrop();
    const imageWidth = cropperRef.current.image.naturalWidth;
    const imageHeight = cropperRef.current.image.naturalHeight;

    const croppedAreaPixels = {
      x: Math.round(crop.x * imageWidth),
      y: Math.round(crop.y * imageHeight),
      width: Math.round(crop.width * imageWidth),
      height: Math.round(crop.height * imageHeight),
    };

    // Now you can use crop and croppedAreaPixels as needed
    console.log("Crop:", crop);
    console.log("Cropped Area Pixels:", croppedAreaPixels);

    // You can also call onCropComplete with the obtained values
    onCropComplete(crop, croppedAreaPixels);
  };

  const uploadToGCS = () => {
    // Your existing uploadToGCS logic
    // ...

    console.log("Cropped image:", croppedImage);
    // Your remaining code for uploading to Google Bucket
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedImage && (
        <>
          <Cropper
            image={selectedImage}
            crop={crop}
            zoom={zoom}
            aspect={1 / 1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            rotation={rotation}
            onRotationChange={setRotation}
            cropShape="round"
            showGrid={false}
            ref={cropperRef}
          />
          <div>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              onChange={handleZoomChange}
            />
          </div>
          <div>
            <Button onClick={handleRotateLeft}>Rotate Left</Button>
            <Button onClick={handleRotateRight}>Rotate Right</Button>
          </div>
          <div>
            {/* Button to trigger crop */}
            <Button onClick={handleCropClick}>Crop</Button>
          </div>
          <button onClick={uploadToGCS}>Upload to GCS</button>
        </>
      )}
    </div>
  );
};

export default ImageCropper4;
