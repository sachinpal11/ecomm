const ImageKit = require("@imagekit/nodejs");

const client = new ImageKit({
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const ImageStorage = async (images) => {
  try {
    const uploadPromise = images.map(async (file) => {

      const base64File = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      const result = await client.files.upload({
        file: base64File,
        fileName: `file-${Date.now()}-${file.originalname}`,
        folder: "/products"
      });

      return result;
    });

    const uploadImages = await Promise.all(uploadPromise);

    return uploadImages.map(img => ({
      url: img.url,
      thumbnail: img.thumbnailUrl
    }));

  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};

module.exports = ImageStorage;