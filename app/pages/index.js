"use client";  // Ensure this runs only on the client side

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    const response = await fetch("/api/image-processor", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (data.image) {
      setProcessedImage(data.image);
    }
  };

  return (
    <div className="container">
      <h1>Image Processor</h1>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload & Process</button>
      <div className="images">
        {image && <img src={URL.createObjectURL(image)} alt="Original" />}
        {processedImage && <img src={processedImage} alt="Processed" />}
      </div>
      <style jsx>{`
        .container {
          text-align: center;
          margin-top: 20px;
        }
        .images img {
          width: 300px;
          margin: 10px;
        }
      `}</style>
    </div>
  );
}
