export const uploadToCloudnary =async (pics) => {
  
    if(pics){
        
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset","twitter");
        data.append("cloud_name","ddtms3bp4");
        const res = await fetch("https://api.cloudinary.com/v1_1/ddtms3bp4/image/upload",{
            method: "post",
            body: data
        });
        const fileData =await res.json();
        return fileData.url.toString();
    }else{
        console.log("error from upload function");
    }
}