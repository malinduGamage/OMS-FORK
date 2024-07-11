import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import toast from 'react-hot-toast';
import { ConfirmationModal } from './ConfirmationModal';

const NAME_REGEX = /^[a-zA-Z. ]{0,99}[a-zA-Z]$/;
const GENDER_REGEX = /^(Male|Female)$/;
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const COMMON_REGEX = /^[a-zA-Z0-9 ]{2,10}$/;

const ChildForm = ({ setFormVisibility }) => {
    const { id } = useParams();
    const axiosPrivate = useAxiosPrivate()

    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [nationality, setNationality] = useState('');
    const [religion, setReligion] = useState('');
    const [medicalDetails, setMedicalDetails] = useState('');
    const [educationalDetails, setEducationalDetails] = useState('');

    const [validName, setValidName] = useState(false);
    const [validDateOfBirth, setValidDateOfBirth] = useState(false);
    const [validGender, setValidGender] = useState(false);
    const [validNationality, setValidNationality] = useState(false);
    const [validReligion, setValidReligion] = useState(false);

    const [confirmModalVisibility, setConfirmModalVisibility] = useState(false);

    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        setValidName(NAME_REGEX.test(name));
    }, [name]);

    useEffect(() => {
        setValidDateOfBirth(DATE_REGEX.test(dateOfBirth));
    }, [dateOfBirth]);

    useEffect(() => {
        setValidGender(GENDER_REGEX.test(gender));
    }, [gender]);

    useEffect(() => {
        setValidNationality(COMMON_REGEX.test(nationality));
    }, [nationality]);

    useEffect(() => {
        setValidReligion(COMMON_REGEX.test(religion));
    }, [religion]);

    const clearForm = () => {
        setName('');
        setDateOfBirth('');
        setGender('Select');
        setNationality('');
        setReligion('');
        setMedicalDetails('');
        setEducationalDetails('');
    }

    const addChild = async () => {
        const data = {
            orphanageid: id,
            name,
            date_of_birth: dateOfBirth,
            gender,
            religion,
            nationality,
            medicaldetails: medicalDetails,
            educationaldetails: educationalDetails
        }

        try {
            const response = await axiosPrivate.post('/request/addChild', data)
            toast.success(response.data.message)
        } catch (error) {
            toast.error(error.response.data)
        }
    }

    const handleConfirmation = async () => {
        await addChild();
        clearForm();
        setConfirmModalVisibility(false);
        setFormVisibility(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setConfirmModalVisibility(true);
    }

    return (
        <div className="fixed inset-0 flex  justify-center bg-black bg-opacity-50 overflow-auto px-10 z-10">
            <section className=" px-8 py-4 mx-auto bg-white rounded-md shadow-md my-5">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-lg font-bold text-gray-700 capitalize">Add Child Request</h1>
                    <button className="px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => setFormVisibility(false)}>Close</button>
                </div>
                <div className="overflow-y-auto max-h-[80vh]">
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                                <label className="text-gray-700" htmlFor="name">Name of the child {!validName && <span className='text-red-500 text-xs'> *required</span>}</label>
                                <input value={name} onChange={(e) => { setName(e.target.value) }} id="name" type="text" className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none" />
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                                <label className="text-gray-700" htmlFor="date_of_birth">Date of Birth {!validDateOfBirth && <span className='text-red-500 text-xs'> *required</span>}</label>
                                <input value={dateOfBirth} onChange={(e) => { setDateOfBirth(e.target.value) }} id="date_of_birth" type="date" max={today} className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none" />
                            </div>
                            <div className="col-span-1">
                                <label className="text-gray-700" htmlFor="gender">Gender {!validGender && <span className='text-red-500 text-xs'> *required</span>}</label>
                                <select value={gender} onChange={(e) => { setGender(e.target.value) }} id="gender" className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none">
                                    <option>Select</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                </select>
                            </div>
                            <div className="col-span-1">
                                <label className="text-gray-700" htmlFor="nationality">Nationality {!validNationality && <span className='text-red-500 text-xs'> *required</span>}</label>
                                <input value={nationality} onChange={(e) => { setNationality(e.target.value) }} id="nationality" type="text" className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none" />
                            </div>
                            <div className="col-span-1 sm:col-span-2 ">
                                <label className="text-gray-700" htmlFor="religion">Religion {!validReligion && <span className='text-red-500 text-xs'> *required</span>}</label>
                                <input value={religion} onChange={(e) => { setReligion(e.target.value) }} id="religion" type="text" className="block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none" />
                            </div>
                            <div className="col-span-1 sm:col-span-2 ">
                                <label className="text-gray-700" htmlFor="medicaldetails">Medical Details</label>
                                <textarea value={medicalDetails} onChange={(e) => { setMedicalDetails(e.target.value) }} id="medicaldetails" className="resize-none block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none"></textarea>
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
                                <label className="text-gray-700" htmlFor="educationaldetails">Educational Details</label>
                                <textarea value={educationalDetails} onChange={(e) => { setEducationalDetails(e.target.value) }} id="educationaldetails" className="resize-none block w-full px-3 py-1 mt-1 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-orange-500 focus:outline-none"></textarea>
                            </div>
                            <div className="col-span-1 sm:col-span-2 lg:col-span-4">
                                <label className="block text-sm font-medium text-gray-700">Image **********not implemented*************</label>
                                <div className="mt-1 flex justify-center px-4 pt-4 pb-4 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-10 w-10 text-gray-700" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-gray-700 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span className="">Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1 text-gray-700">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-700">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
                            <button
                                disabled={!(validName && validDateOfBirth && validGender && validNationality && validReligion)}
                                className="items-end bg-transparent hover:bg-orange-500 text-orange-500 font-semibold hover:text-white py-2 px-4 border border-orange-500 hover:border-transparent rounded disabled:bg-gray-300 disabled:text-gray-500 disabled:border-gray-300 disabled:cursor-not-allowed">Submit Request</button>
                        </div>
                    </form>
                </div>
            </section>

            {confirmModalVisibility && <ConfirmationModal head="Add Child Request" body="Are you sure you want to create add child request?" handleConfirmation={handleConfirmation} setVisibility={setConfirmModalVisibility} />}
        </div >
    )
}

export default ChildForm