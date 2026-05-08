import cloudinary from "@/lib/cloudinary";

export const uploadToCloudinary = async (file: File) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise<{
    secure_url: string;
    public_id: string;
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "threads-clone",
      },
      (error, result) => {
        if (error || !result) {
          return reject(error);
        }

        resolve({
          public_id: result.public_id,
          secure_url: result.secure_url,
        });
      },
    );

    uploadStream.end(buffer);
  });
};

export const deleteFromCloudinary = async (publicId: string) => {
  return cloudinary.uploader.destroy(publicId);
};
