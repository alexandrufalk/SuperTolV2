import React, { useState } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const ImageCropper3 = () => {
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const [croppedImage, setCroppedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const onCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const onImageLoaded = (image) => {
    // You can perform additional tasks when the image is loaded (optional)
  };

  const onCropComplete = (cropResult) => {
    if (cropResult.width && cropResult.height) {
      // Create a canvas and draw the cropped image
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = cropResult.width;
      canvas.height = cropResult.height;
      ctx.drawImage(
        selectedImage,
        cropResult.x,
        cropResult.y,
        cropResult.width,
        cropResult.height,
        0,
        0,
        cropResult.width,
        cropResult.height
      );

      // Convert the canvas content to a data URL
      const croppedImageDataUrl = canvas.toDataURL("image/jpeg");

      // Set the cropped image data URL
      setCroppedImage(croppedImageDataUrl);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const image = new Image();
        image.src = e.target.result;

        setSelectedImage(image);
        setCrop({ aspect: 1 / 1 });
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadToGCS = () => {
    if (!croppedImage) {
      // Handle error if the image is not cropped
      return;
    }

    // Your existing uploadToGCS logic
    const croppedImageBlob = new Blob([croppedImage], {
      type: "image/jpeg",
    });

    // Continue with the rest of your logic
    // ...

    console.log("Cropped image MIME type:", croppedImageBlob.type);
    // Your remaining code for uploading to Google Bucket
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {selectedImage && (
        <>
          <ReactCrop
            src={selectedImage.src}
            crop={crop}
            onChange={onCropChange}
            onImageLoaded={onImageLoaded}
            onComplete={onCropComplete}
          />
          <button onClick={uploadToGCS}>Upload to GCS</button>
        </>
      )}
    </div>
  );
};

export default ImageCropper3;
