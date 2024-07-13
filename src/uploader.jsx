import { Button } from "@material-tailwind/react"
import { useState } from "react";
import { useRef } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from "./Firebase";
import { Uploadimg,Uploadimg2 } from "./svgs";


export const Upload = ()=>{
    const [filename,setFilename] = useState('Empty');
    const [file,setFile] = useState(null);

    const handleUpload = async () => {
        if (file) {
          const storageRef = ref(storage, `${filename}`);
          await uploadBytes(storageRef, file);
          const url = await getDownloadURL(storageRef);
          console.log(url);
          setFile(null);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!file) return;

        try {
            // Upload file to Firebase Storage
            const storageRef = ref(storage, `files/${file.name}`);
            await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(storageRef);

            // Parse CSV file
            Papa.parse(file, {
                header: true,
                complete: async (results) => {
                    const data = results.data;
                    // Save parsed data to Firestore with a timestamp
                    await addDoc(collection(db, 'csvData'), { data, downloadURL, timestamp: serverTimestamp() });
                    console.log('File uploaded and data saved successfully');
                }
            });
        } catch (error) {
            console.error('Error uploading file and saving data:', error);
        }
    };

    return (
        <div className="flex min-h-full min-w-full justify-center items-center">
            <label htmlFor="filesinp" className="py-8 pb-4 border-2 bg-blue-gray-100 border-black rounded-3xl px-14">
                <div className="flex flex-col justify-center ">
                    <input type="file" id='filesinp' className="hidden" name="filesinp" onChange={(e)=>{setFilename(e.target.files[0].name);setFile(e.target.files[0])}}  />
                        <img src="/upload.png" style={{mixBlendMode:"color-burn"}} width={'100px'} alt="" />
                    <div id="filename" className="text-center py-2">{filename}</div>
                    <Button onClick={handleUpload}>Upload</Button>
                </div>
            </label>
        </div>
    )
}