// Child.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import axios from 'axios';
import ChildEditForm from './ChildEditForm';
import DocumentUploadForm from './DocumentUploadForm';
import toast from 'react-hot-toast';
import { ConfirmationModal } from './ConfirmationModal';
import LoadingAnimation from './LoadingAnimation';
import AvatarPlaceHolder from '../assets/images/avatar_placeholder.jpg'
import { PDFView } from './PDFView';

const Child = () => {

  const getAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (age > 0 && (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))) {
      return age - 1;
    }
    return age;
  }

  const getDob = (dob) => {
    const date = new Date(dob);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const getBasicInfo = (child) => {
    return {
      'Full Name': child.name,
      'Date of Birth': getDob(child.date_of_birth),
      'Age as of today': getAge(child.date_of_birth),
      'Gender': child.gender,
      'Nationality': child.nationality,
      'Religion': child.religion,
      'Medical Details': child.medicaldetails,
      'Educational Details': child.educationaldetails,
    }
  }

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate()
  const [child, setChild] = useState({})
  const [editFormVisibility, setEditVisibility] = useState(false);
  const [uploadFormVisibility, setUploadVisibility] = useState(false);
  const { childid } = useParams('')
  const [imageURL, setImageURL] = useState('')
  const [basicInfo, setBasicInfo] = useState(getBasicInfo(child))
  const [confirmModalVisibility, setConfirmModalVisibility] = useState(false)
  const [medicalDocuments, setMedicalDocuments] = useState([])
  const [legalDocuments, setLegalDocuments] = useState([])
  const [educationalDocuments, setEducationalDocuments] = useState([])

  //for document upload
  const [category, setCategory] = useState()
  const [type, setType] = useState()
  const [document, setDocument] = useState()
  const [loading, setLoading] = useState(false);

  const [viewDocument, setViewDocument] = useState('')
  const [docVisibility, setDocVisibility] = useState(false)

  const getChild = async () => {
    try {
      const response = await axiosPrivate.get(`/child/${childid}`);
      setChild(response.data.child)
    } catch (error) {
      console.error("Failed to fetch child:", error);
    }
  }

  const deleteChild = async () => {
    try {
      await axiosPrivate.post('/request/deleteChild', child)

      toast.success('Delete request logged successfully')
    } catch (error) {
      toast.error(error.response.data)
    } finally {
      setConfirmModalVisibility(false)
    }
  }

  const getDocument = async () => {
    try {
      const response = await axiosPrivate.get(`/document/child/${childid}`);
      if (!response.data.success) { throw new Error(response.data.message) }

      setMedicalDocuments(response.data.documents.filter(doc => doc.document_type === 'medical' && doc.status !== 'rejected'))
      setLegalDocuments(response.data.documents.filter(doc => doc.document_type === 'legal' && doc.status !== 'rejected'))
      setEducationalDocuments(response.data.documents.filter(doc => doc.document_type === 'educational' && doc.status !== 'rejected'))

    } catch (error) {
      toast.error(error.message)
    }
  }

  const getDocumentLink = async (documentId) => {
    try {
      const response = await axiosPrivate.get(`/file/childDocumentDownload/${documentId}`);
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      setViewDocument(response.data.URL)
    } catch (error) {
      console.error('Failed to fetch document:', error.message)
      toast.error('Failed to fetch document:', error.message)
    }
  }

  //upload flow
  const uploadDocument = async (setConfirmVisibility) => {
    try {

      if (document.size > 1024 * 1024 * 10) {
        throw new Error('File size should not exceed 10MB')
      }
      //log the request
      setLoading(true)
      const request = await axiosPrivate.post('/request/childDocument', {
        childid: childid,
        document_type: category,
        document_name: type,
        document: document
      })

      if (!request.data.success) {
        throw new Error(request.data.message)
      }

      const documentId = request.data.data.documentid

      // get the signed url
      const urlRequest = await axiosPrivate.get(`/file/childDocumentUpload/${documentId}.${document.type.split('/')[1]}`)

      if (!urlRequest.data.success) {
        throw new Error(urlRequest.data.message)
      }

      //upload the file
      await axios.put(urlRequest.data.URL, document)
      //update the state
      const newDoc = request.data.data
      switch (category) {
        case 'medical':
          setMedicalDocuments([...medicalDocuments, newDoc])
          break;
        case 'legal':
          setLegalDocuments([...legalDocuments, newDoc])
          break;
        case 'educational':
          setEducationalDocuments([...educationalDocuments, newDoc])
          break;
        default:
          break;
      }

      setLoading(false)
      setConfirmVisibility(false)
      setUploadVisibility(false)
      toast.success('File uploaded successfully');

    } catch (error) {
      setLoading(false)
      setConfirmVisibility(false)
      toast.error(error.message)
    }
  }

  const getPhoto = async () => {
    try {
      const response = await axiosPrivate.get(`/file/childPhotoDownload/${childid}`);
      if (!response.data.success) {
        throw new Error(response.data.message)
      }
      setImageURL(response.data.URL)
    } catch (error) {
      console.error('Failed to fetch photo:', error)
    }
  }

  useEffect(() => {
    console.log('setBasic')
    setBasicInfo(getBasicInfo(child))
  }, [child]);

  useEffect(() => {
    const gc = async () => {
      await getChild()
      getDocument()
      getPhoto()
    }
    gc()

  }, []);



  return (
    <div className='mx-auto my-5 w-2/3'>

      <div className="mx-auto  flex flex-col lg:flex-row mt-2 text-gray-700 bg-orange-100 shadow-md bg-clip-border rounded-xl">
        <button onClick={() => navigate(-1)} className="m-3 relative justify-start h-fit w-fit bg-transparent hover:bg-orange-600 text-orange-600 font-normal hover:text-white py-2 px-4 border border-orange-600 hover:border-transparent rounded">
          Back
        </button>
        <div className='lg:w-1/3 flex justify-center'>
          <img className="w-64 h-64 my-auto p-10 rounded-full md:rounded-full" src={imageURL ? imageURL : AvatarPlaceHolder} alt="ERROR" />
        </div>
        <div className="p-6 my-auto text-center lg:text-left lg:w-2/3">
          <h5 className="block mb-2 font-sans text-4xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {child.name}
          </h5>
          <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-white bg-orange-600 uppercase mb-2">
            Some Orphanage
          </span>
          <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
            {child.gender} &#183; {getAge(child.date_of_birth)} years old
          </p>
          <div>
            <button onClick={() => setEditVisibility(true)} className="m-3 mt-4 ml-0 items-end bg-transparent hover:bg-orange-600 text-orange-600 font-normal hover:text-white py-2 px-4 border border-orange-600 hover:border-transparent rounded">
              Edit Profile
            </button>
            <button onClick={() => setConfirmModalVisibility(true)} className="m-3 mt-4 ml-0 items-end bg-transparent hover:bg-orange-600 text-orange-600 font-normal hover:text-white py-2 px-4 border border-orange-600 hover:border-transparent rounded">
              Delete Profile
            </button>
            <button onClick={() => setUploadVisibility(true)} className="my-3 items-end bg-transparent hover:bg-orange-600 text-orange-600 font-normal hover:text-white py-2 px-4 border border-orange-600 hover:border-transparent rounded">
              Upload Documents
            </button>
          </div>
        </div>
      </div>


      <div className="mx-auto relative mt-6 text-black shadow-md bg-clip-border rounded-xl divide-y">

        <div className="p-6 m-auto text-left ">
          <h5 className="block mb-4 font-sans text-4xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Basic Information
          </h5>

          <div className='block font-sans text-m md:text-2xl antialiased font-light leading-relaxed text-inherit ml-5'>
            <table >
              <thead>

              </thead>
              <tbody className='divide-y-0'>
                {Object.entries(basicInfo).map(([key, value]) => (
                  <tr key={key} className="bg-white">
                    <th scope="row" className="font-light">
                      {key}
                    </th>
                    <td className='pl-5 flex'>
                      : <p className='ml-5'> {value}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        <div>
          <div className="p-6 m-auto text-left ">
            <h5 className="block mb-4 font-sans text-4xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 disabled:text-black">
              Documents
            </h5>
            <div className='block font-sans text-m md:text-2xl antialiased font-light leading-relaxed text-inherit ml-5'>

              <p className='my-5'>Legal Documents</p>
              <table className="min-w-full font-light text-surface text-center">
                <tbody >
                  {legalDocuments.map(doc => (
                    <tr key={doc.documentid} className=" border-neutral-200 border-b">
                      <td className="whitespace-nowrap px-6 py-2 w-9/12 text-left"><Link >
                        <span
                          onClick={() => {
                            if (doc.status === 'approved') {
                              setDocVisibility(true)
                              getDocumentLink(doc.documentid)
                            }
                          }}
                          className={`text-blue-400 hover:text-blue-600 ${doc.status !== 'approved' ? "text-slate-400 hover:text-slate-400" : ""}`}>{doc.document_name}</span></Link></td>
                      <td className="whitespace-nowrap px-6 py-2 w-1/12 ">
                        {doc.status === 'approved' ?
                          <span className='rounded bg-green-400 py-1 px-3 font-bold text-green-800 text-xs'>{doc.status}</span>
                          : <span className='rounded bg-blue-400 py-1 px-3 font-bold text-blue-800 text-xs'>{doc.status}</span>}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2 w-1/12 ">
                        <button
                          disabled={!(doc.status === 'approved')}
                          className="hover:bg-red-600 rounded bg-red-400 py-1 px-3 font-bold text-red-900 text-xs disabled:bg-slate-400 disabled:text-black">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className='my-5'>Medical Documents</p>
              <table className="min-w-full font-light text-surface text-center">
                <tbody >
                  {medicalDocuments.map(doc => (
                    <tr key={doc.documentid} className=" border-neutral-200 border-b">
                      <td className="whitespace-nowrap px-6 py-2 w-9/12 text-left"><Link >
                        <span
                          onClick={() => {
                            if (doc.status === 'approved') {
                              setDocVisibility(true)
                              getDocumentLink(doc.documentid)
                            }
                          }}
                          className={`text-blue-400 hover:text-blue-600 ${doc.status !== 'approved' ? "text-slate-400 hover:text-slate-400" : ""}`}>{doc.document_name}</span></Link></td>
                      <td className="whitespace-nowrap px-6 py-2 w-1/12 ">
                        {doc.status === 'approved' ?
                          <span className='rounded bg-green-400 py-1 px-3 font-bold text-green-800 text-xs'>{doc.status}</span>
                          : <span className='rounded bg-blue-400 py-1 px-3 font-bold text-blue-800 text-xs'>{doc.status}</span>}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2 w-1/12 ">
                        <button
                          disabled={!(doc.status === 'approved')}
                          className="hover:bg-red-600 rounded bg-red-400 py-1 px-3 font-bold text-red-900 text-xs disabled:bg-slate-400  disabled:text-black">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <p className='my-5'>Educational Documents</p>
              <table className="min-w-full font-light text-surface text-center">
                <tbody >
                  {educationalDocuments.map(doc => (
                    <tr key={doc.documentid} className=" border-neutral-200 border-b">
                      <td className="whitespace-nowrap px-6 py-2 w-9/12 text-left"><Link >
                        <span
                          onClick={() => {
                            if (doc.status === 'approved') {
                              setDocVisibility(true)
                              getDocumentLink(doc.documentid)
                            }
                          }}
                          className={`text-blue-400 hover:text-blue-600 ${doc.status !== 'approved' ? "text-slate-400 hover:text-slate-400" : ""}`}>{doc.document_name}</span></Link></td>
                      <td className="whitespace-nowrap px-6 py-2 w-1/12 ">
                        {doc.status === 'approved' ?
                          <span className='rounded bg-green-400 py-1 px-3 font-bold text-green-800 text-xs'>{doc.status}</span>
                          : <span className='rounded bg-blue-400 py-1 px-3 font-bold text-blue-800 text-xs'>{doc.status}</span>}
                      </td>
                      <td className="whitespace-nowrap px-6 py-2 w-1/12 ">
                        <button
                          disabled={!(doc.status === 'approved')}
                          className="hover:bg-red-600 rounded bg-red-400 py-1 px-3 font-bold text-red-900 text-xs disabled:bg-slate-400 disabled:text-black">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>


            </div>
          </div>
        </div>
      </div>
      {loading && <LoadingAnimation />}
      {uploadFormVisibility ? <DocumentUploadForm setUploadVisibility={setUploadVisibility} category={category} setCategory={setCategory} type={type} setType={setType} document={document} setDocument={setDocument} uploadDocument={uploadDocument} /> : null}
      {editFormVisibility ? <ChildEditForm setEditVisibility={setEditVisibility} child={child} setChild={setChild} imageURL={imageURL} setImageURL={setImageURL} avatarPlaceHolder={AvatarPlaceHolder} /> : null}
      {confirmModalVisibility ? <ConfirmationModal head='Delete Child' body='Are you sure you want to create a delete child request?' handleConfirmation={deleteChild} setVisibility={setConfirmModalVisibility} /> : null}
      {docVisibility &&
        <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50 overflow-auto px-10 z-10">
          <section className="px-8 py-4 mx-auto bg-white rounded-md shadow-md my-5 w-[80vw]">
            <div className="flex justify-between items-center mb-3">
              <h1 className="text-lg font-bold text-gray-700 capitalize flex"> Document </h1>
              <button className="px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => setDocVisibility(false)}>Close</button>
            </div>
            <PDFView documentUrl={viewDocument} />
          </section>
        </div>
      }
    </div>


  );
};

export default Child;
