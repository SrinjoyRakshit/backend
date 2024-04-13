import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadAtCloudinary = async (localfilePath) => {
    try {
        if (!localfilePath) 
            return null
            const response = await cloudinary.uploader.upload(localfilePath, {
                resource_type: "auto"
            })
            console.log("Files are uploaded at cloudinary");
            return response
    } catch (error) {
        fs.unlinkSync(localfilePath)
        return null
    }
}

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {console.log(result); });