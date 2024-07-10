import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import Papa from 'papaparse';
import { storage, db } from './Firebase'; // Adjust the path as needed

export const FileUploadButton = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ textAlign: 'center', padding: '30px 100px', border: '1px solid #ccc', transform: 'scale(1.0)', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'white' }}>
        <div>
          <label htmlFor="file-upload" style={{ marginRight: '10px' }}>Select file</label>
          <input
            type="file"
            id="file-upload"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <button
            type="button"
            onClick={() => document.getElementById('file-upload').click()}
            style={{ display: 'inline-block', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            BROWSE
          </button>
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '5px 10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>UPLOAD</button>
      </form>
    </div>
  );
};

export default FileUploadButton;
