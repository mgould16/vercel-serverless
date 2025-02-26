import sharp from "sharp";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Convert file to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Process the image (convert to grayscale)
    const processedBuffer = await sharp(buffer).grayscale().toBuffer();

    // Convert processed image to base64
    const base64Image = processedBuffer.toString("base64");

    return NextResponse.json({ image: `data:image/png;base64,${base64Image}` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
