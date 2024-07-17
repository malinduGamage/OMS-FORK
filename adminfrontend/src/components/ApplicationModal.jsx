import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const ApplicationModal = ({ application, closeModal }) => {
   
    const axiosPrivate = useAxiosPrivate();

    const handleAccept = async() => {
        // Show the social worker assignment div instead of closing the modal

        try {

            const response = await axiosPrivate.put(`/application?applicationid=${application.applicationid}`)

            
            
        } catch (error) {
            
        }

        closeModal()
    };

    const handleReject = () => {
        // Logic to reject the application
        closeModal();
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

  

    return (
        <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
            <div id='scrollview' className='bg-white rounded  shadow-lg w-[95%] h-[95vh]  '>
                
                <div className='w-full bg-red-200 h-[80vh]'>
                <h2 className='text-xl font-bold mb-4'>Age range :{application.agerange}</h2>
                <h2 className='text-xl font-bold mb-4'>Age range :{application.genderofchild}</h2>
              
                </div>
                <div className='flex justify-start p-4 mb-4'>
                    <button
                        onClick={handleAccept}
                        className='mr-2 px-4 py-2 bg-primary text-white rounded'
                    >
                        Accept
                    </button>
                    <button
                        onClick={handleReject}
                        className='mr-2 px-4 py-2 bg-gray-300 text-white rounded'
                    >
                        Reject
                    </button>
                </div>


            </div>
        </div>
    );
};

export default ApplicationModal;