import { useScript } from "../../hooks/useScript";

function Cloud(props) {

   const openWidget = () => {
      !!window.cloudinary && window.cloudinary.createUploadWidget(
         {
            sources: ['local', 'url', 'camera'],
            cloudName: process.env.REACT_APP_CLOUDINARY_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET
         },
         (error, result) => {
            if (!error && result && result.event === "success") {
               // When an upload is successful, save the uploaded URL to local state!
               props.setImage();
            }
         },
      ).open();
   }

   
   return (
      <>
            <h4>Upload New File</h4>
            { /* This just sets up the window.cloudinary widget */ }
            {useScript('https://widget.cloudinary.com/v2.0/global/all.js')}

            File to upload: <button type="button" onClick={openWidget}>Pick File</button>
        
      </>
   )
}

export default Cloud;

