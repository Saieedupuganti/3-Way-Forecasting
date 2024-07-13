import React, { useState } from 'react';
import './importandexport.css'; // Ensure this CSS file is created
import FileUploadButton from './importdata';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { storage } from './Firebase'; // Assuming you export 'storage' from your Firebase setup file

export const Importandexport = () => {
    const [showImportUpload, setShowImportUpload] = useState(false);
    const [exportData, setExportData] = useState(null); // State to hold exported data
    const [showMessage, setShowMessage] = useState(true); // State to manage message visibility

    const handleImport = () => {
        setShowImportUpload(true);
        setExportData(null); // Reset export data when switching to import
        setShowMessage(false); // Hide message container
    };

    const handleExport = () => {
        console.log("Export button clicked");
        const exportedData = "Sample export data"; // Replace with your export logic
        setExportData(exportedData); // Store exported data in state
        setShowImportUpload(false); // Hide import/upload section when exporting
        setShowMessage(false); // Hide message container
    };

    const handleDownload = async () => {
        try {
            const storageRef = ref(storage, '/Admin/chart_of_accounts.csv'); // Reference to your file in Firebase Storage
            const downloadURL = await getDownloadURL(storageRef);

            const a = document.createElement('a');
            a.href = downloadURL;
            a.download = 'demo1.csv'; // Specify the file name here
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading file:', error);
            // Handle error
        }
    };

    return (
        <div className="settings-container">
            <div className="button-container">
                <button className="button" onClick={handleImport}><b>Import</b></button>
                <button className="button" onClick={handleExport}><b>Export</b></button>
            </div>
            {showMessage && (
                <div className="message-container">
                    <p className="centered-message"><b>Please click on Import to add a file</b></p>
                    <p className="centered-message"><b>click on Export button to Download the sample file</b></p>
                </div>
            )}
            {showImportUpload ? (
                <div className="import-container">
                    <FileUploadButton />
                </div>
            ) : null}
            {exportData && !showImportUpload && (
                <div className="export-container">
                    <button className="download-button" onClick={handleDownload}>Download Exported Data</button>
                </div>
            )}
        </div>
    );
}

export default Importandexport;
