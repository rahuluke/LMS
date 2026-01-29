import express from "express";
import { singleUpload } from "../middelware/multer.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/Cloudinary.js";

const router = express.Router();

router.route("/upload-video").post(singleUpload, async (req, res) => {
  try {
    const file = req.file;
    const fileUri = getDataUri(file);

    const result = await cloudinary.uploader.upload(fileUri, {
      resource_type: "auto",
    });
    res.status(200).json({
      success: true,
      message: "File uploaded Successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error uplaoding file",
    });
  }
});

export default router;
