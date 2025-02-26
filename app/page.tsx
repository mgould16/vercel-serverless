"use client";  // Ensures this is a Client Component

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

const handleUpload = async () => {
  if (!image) return;

  const formData = new FormData();
  formData.append("image", image);

  try {
    const response = await fetch("/api/image-processor", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("API Response:", data);  // ✅ Log response in the console

    if (data.image) {
      setProcessedImage(data.image);  // ✅ Ensure the UI updates
    } else {
      console.error("No image returned from API");
    }
  } catch (error) {
    console.error("Error uploading image:", error);
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
