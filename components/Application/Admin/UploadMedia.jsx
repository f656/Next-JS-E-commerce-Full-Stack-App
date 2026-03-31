"use client";
import { Button } from "@/components/ui/button";
import { showToast } from "@/lib/showToast";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { FiPlus } from "react-icons/fi";

const UploadMedia = ({ isMultiple,queryClient }) => {
  const handleOnError = (error) => {
    showToast(error.statusText,'error');
  };
 // console.log("UPLOAD PRESET 👉", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
 
  
  const handleOnQueuesEnd = async (results) => {
    const files = results.info.files;
    const uploadedFiles = files.filter(file=> file.uploadInfo).map(file => ({
         asset_id:file.uploadInfo.asset_id,
         public_id:file.uploadInfo.public_id,
         secure_url:file.uploadInfo.secure_url,
         path:file.uploadInfo.path,
         thumbnail_url:file.uploadInfo.thumbnail_url,
    }))

    if(uploadedFiles.length > 0){
        try {
            const {data:mediaUploadResponse} = await axios.post('/api/media/create',uploadedFiles);
            if(!mediaUploadResponse.success){
                throw new Error(mediaUploadResponse.message);
            }
            queryClient.invalidateQueries(['media-data'])
            showToast(mediaUploadResponse.message,'success');
        } catch (error) {
            showToast(error.message,'error');
        }
    }
  };
  return (
    <CldUploadWidget
      signatureEndpoint="/api/cloudinary-signature"
      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
      onError={handleOnError}
      onQueuesEnd={handleOnQueuesEnd}
      config={{
        cloud: {
          cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
          apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
        },
      }}
      options={{
        sources: ["local", "url", "unsplash", "google_drive"],
        multiple: isMultiple,
        maxFileSize: 10 * 1024 * 1024, //10mb
      }}
    >
      {({ open }) => {
        return (
          <Button onClick={() => open()}>
            <FiPlus />
            Upload Media
          </Button>
        );
      }}
    </CldUploadWidget>
  );
};

export default UploadMedia;
