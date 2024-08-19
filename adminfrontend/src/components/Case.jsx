import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";

const ROLES = {
  User: 1010,
  Head: 1910,
  SocialWorker: 2525,
  Admin: 7788,
};

const Case = () => {
  const { id } = useParams();
  const {auth} = useAuth()
  const axiosPrivate = useAxiosPrivate();
  const [caseDetails, setCaseDetails] = useState(null);
  const [documentUrls, setDocumentUrls] = useState([]);
  const [files, setFiles] = useState({
    marriageCertificate: null,
    incomeCertificate: null,
    birthCertificate: null,
  });
  const [filePreviews, setFilePreviews] = useState({
    marriageCertificate: null,
    incomeCertificate: null,
    birthCertificate: null,
  });
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    const getCase = async () => {
      try {
        const response = await axiosPrivate.get(`/case/byId?caseid=${id}`);
        setCaseDetails(response.data);
      } catch (error) {
        console.error("Failed to fetch case:", error);
      }
    };

    const fetchDocumentUrls = async () => {
      try {
        const response = await axiosPrivate.get(`/file/caseDocuments?caseId=${id}`);
        setDocumentUrls(response.data.documents);
      } catch (error) {
        console.error("Failed to fetch document URLs:", error);
      }
    };

    getCase();
    fetchDocumentUrls();
  }, [id.axiosPrivate]);

  const handleFileChange = (event, docType) => {
    const file = event.target.files[0];
    setFiles((prev) => ({ ...prev, [docType]: file }));

    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreviews((prev) => ({ ...prev, [docType]: reader.result }));
        };
        reader.readAsDataURL(file);
      } else {
        setFilePreviews((prev) => ({ ...prev, [docType]: file.name }));
      }
    } else {
      setFilePreviews((prev) => ({ ...prev, [docType]: null }));
    }
  };

  const handleUpload = async () => {
    if (
      !files.marriageCertificate ||
      !files.incomeCertificate ||
      !files.birthCertificate
    ) {
      setUploadStatus("Please select all documents.");
      return;
    }

    const formData = new FormData();
    formData.append("caseId", id);
    formData.append("marriageCertificate", files.marriageCertificate);
    formData.append("incomeCertificate", files.incomeCertificate);
    formData.append("birthCertificate", files.birthCertificate);

    try {
      const response = await axiosPrivate.post("/file/caseDocuments", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.status);
      setUploadStatus("Files uploaded successfully!");
    } catch (error) {
      console.error("Failed to upload files:", error);
      setUploadStatus("Files upload failed. Please try again.");
    }
  };

  if (!caseDetails) return <div>Loading...</div>;

  return (




    <div>
      <div className="p-6 bg-gray-50 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          CaseID: <span className="text-primary">{caseDetails.caseid}</span>
        </h1>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold">Child's Name:</span>{" "}
          {caseDetails.child.name}
        </p>
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold">Parent's Name:</span>{" "}
          {caseDetails.parent.username}
        </p>
        <p className="text-lg text-gray-700">
          <span className="font-semibold">Assigned Social Worker:</span>{" "}
          {caseDetails.socialworker.username}
        </p>
      </div>

      {auth.roles == 1010 && 
       
       <div>


       {/* Document upload section */}
    <h1 className="text-2xl font-bold text-gray-800 mb-6">
      Phase 1: Upload Documents
    </h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Marriage Certificate */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <label className="block text-lg font-semibold mb-2">
          Marriage Certificate:
        </label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, "marriageCertificate")}
          className="block w-full text-sm text-gray-700 mb-4 border border-gray-300 rounded"
        />
        <div className="border border-gray-300 p-2 rounded-lg bg-gray-100">
          <p className="text-lg font-semibold mb-2">Preview:</p>
          {filePreviews.marriageCertificate ? (
            filePreviews.marriageCertificate.startsWith("data:image/") ? (
              <img
                src={filePreviews.marriageCertificate}
                alt="Marriage Certificate Preview"
                className="max-w-full max-h-48 rounded"
              />
            ) : (
              <p className="text-gray-700">
                {filePreviews.marriageCertificate}
              </p>
            )
          ) : (
            <p className="text-gray-700">No file selected</p>
          )}
        </div>
      </div>

      {/* Income Certificate */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <label className="block text-lg font-semibold mb-2">
          Income Certificate:
        </label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, "incomeCertificate")}
          className="block w-full text-sm text-gray-700 mb-4 border border-gray-300 rounded"
        />
        <div className="border border-gray-300 p-2 rounded-lg bg-gray-100">
          <p className="text-lg font-semibold mb-2">Preview:</p>
          {filePreviews.incomeCertificate ? (
            filePreviews.incomeCertificate.startsWith("data:image/") ? (
              <img
                src={filePreviews.incomeCertificate}
                alt="Income Certificate Preview"
                className="max-w-full max-h-48 rounded"
              />
            ) : (
              <p className="text-gray-700">
                {filePreviews.incomeCertificate}
              </p>
            )
          ) : (
            <p className="text-gray-700">No file selected</p>
          )}
        </div>
      </div>

      {/* Birth Certificate */}
      <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
        <label className="block text-lg font-semibold mb-2">
          Birth Certificate:
        </label>
        <input
          type="file"
          onChange={(e) => handleFileChange(e, "birthCertificate")}
          className="block w-full text-sm text-gray-700 mb-4 border border-gray-300 rounded"
        />
        <div className="border border-gray-300 p-2 rounded-lg bg-gray-100">
          <p className="text-lg font-semibold mb-2">Preview:</p>
          {filePreviews.birthCertificate ? (
            filePreviews.birthCertificate.startsWith("data:image/") ? (
              <img
                src={filePreviews.birthCertificate}
                alt="Birth Certificate Preview"
                className="max-w-full max-h-48 rounded"
              />
            ) : (
              <p className="text-gray-700">{filePreviews.birthCertificate}</p>
            )
          ) : (
            <p className="text-gray-700">No file selected</p>
          )}
        </div>
      </div>
    </div>

    <button
      onClick={handleUpload}
      className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark mt-6"
    >
      Upload Documents
    </button>
    {uploadStatus && (
      <p className="mt-4 text-sm text-red-600">{uploadStatus}</p>
    )}
    </div> }

     




     
    {(auth.roles.includes(ROLES.Head) || auth.roles.includes(ROLES.SocialWorker)) &&
        <div id="display documents" className="p-6">
        <h2 className="text-xl font-semibold mb-4">Download Documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {documentUrls.map((doc) => (
          <div key={doc.name} className="bg-white shadow-lg rounded-lg p-6 border border-gray-300">
            <p className="text-xl font-bold mb-4 capitalize">{doc.name.replace('Certificate', ' Certificate')}</p>
            <div className="mb-4">
              <img
                src={doc.url}
                alt={doc.name}
                className="w-full h-auto max-h-80 object-contain rounded-md shadow-md"
              />
            </div>
            <a
              href={doc.url}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-semibold underline"
            >
              Download {doc.name.replace('Certificate', ' Certificate')}
            </a>
          </div>
        ))}
      </div>
      
      </div>}

  






      </div>

     
    </div>
    
    
  );
};

export default Case;
