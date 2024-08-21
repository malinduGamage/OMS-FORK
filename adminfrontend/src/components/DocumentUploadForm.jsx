import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import toast from 'react-hot-toast';
import { ConfirmationModal } from './ConfirmationModal';

const DocumentUploadForm = ({ setUploadVisibility, category, setCategory, type, setType, document, setDocument, uploadDocument }) => {
    const axiosPrivate = useAxiosPrivate()
    const [confirmModelVisibility, setConfirmModelVisibility] = useState(false);

    const categories = ['medical', 'educational', 'legal']
    const medicalTypes = ['Immunization Record', 'Medical Record', 'Prescription Records']
    const educationalTypes = ['Report Card', 'Transcript', 'IEP']
    const legalTypes = ['Birth Certificate', 'Custody Report', 'Adoption Certificate']
    const [types, setTypes] = useState(medicalTypes)

    useEffect(() => {
        setCategory(categories[0])
    }, [])

    useEffect(() => {
        switch (category) {
            case 'medical':
                setTypes(medicalTypes)
                setType(medicalTypes[0])
                break;
            case 'educational':
                setTypes(educationalTypes)
                setType(educationalTypes[0])
                break;
            case 'legal':
                setTypes(legalTypes)
                setType(legalTypes[0])
                break;
            default:
                setTypes([])
                break;
        }
    }, [category])

    return (
        <div className="fixed inset-0 flex  justify-center bg-black bg-opacity-50 overflow-auto px-10 z-10">
            <section className=" px-8 py-4 mx-auto bg-white rounded-md shadow-md my-auto w-2/3 h-fit">

                <div className="flex justify-between items-center my-4">
                    <h1 className="text-lg font-bold text-gray-700 capitalize flex"> Upload Document </h1>
                    <button
                        className="px-2 py-1 bg-red-500 text-white rounded-md"
                        onClick={() => {
                            setDocument(null)
                            setUploadVisibility(false)
                        }}>
                        Close
                    </button>
                </div>
                <div className="overflow-y-auto max-h-[80vh]">
                    <form >
                        <div className="space-y-8 font-[sans-serif] mx-auto">
                            <input
                                onChange={(e) => setDocument(e.target.files[0])}
                                type="file"
                                accept=".pdf"
                                className="w-full text-gray-500 font-medium text-sm bg-gray-100 file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-orange-600 file:hover:bg-orange-500 file:text-white rounded " />
                        </div>
                        <div className="mt-4">
                            <label className="text-gray-700" htmlFor="name">Category</label>
                            <select value={category} onChange={(e) => { setCategory(e.target.value) }} className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none">
                                {categories.map((category, i) => (
                                    <option key={i}>{category}</option>
                                ))}
                            </select>
                        </div>
                        <div className="my-4">
                            <label className="text-gray-700" htmlFor="name">Type</label>
                            <select value={type} onChange={(e) => { setType(e.target.value) }} className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none">
                                {types.map((type, i) => (
                                    <option key={i}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex justify-end my-6">
                            <button
                                onClick={(e) => {
                                    e.preventDefault()
                                    setConfirmModelVisibility(true)
                                }}
                                disabled={!(document && category && type)}
                                className="px-4 py-2 leading-5 text-gray-700 transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-700 disabled:bg-orange-300">Submit</button>
                        </div>
                    </form>
                </div>
            </section>
            {confirmModelVisibility && <ConfirmationModal head={`${category} document upload`} body={`Please confirm that you want to upload ${document.name}. Ensure that the file is correct and relevant to the child's profile.`} handleConfirmation={() => uploadDocument(setConfirmModelVisibility)} setVisibility={setConfirmModelVisibility} />}
        </div >
    )
}

export default DocumentUploadForm