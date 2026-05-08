import { v2 as cloudinary } from "cloudinary";

const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

if (!apiKey || !apiSecret || !cloudName) {
  throw new Error("Thiếu các biến môi trường Cloudinary bắt buộc");
}

cloudinary.config({
  api_key: apiKey,
  api_secret: apiSecret,
  cloud_name: cloudName,
});

export default cloudinary;
