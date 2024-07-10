import React, { useEffect } from 'react'

const ApplicationModal = ({ application, closeModal }) => {
    const handleAccept = () => {
        // Logic to accept the application
        closeModal()
    }

    const handleReject = () => {
        // Logic to reject the application
        closeModal()
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []); 

    return (
        <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
            <div className='bg-white rounded p-5 shadow-lg w-1/3'>
                <h2 className='text-xl font-bold mb-4'>{application.childname}</h2>
                <div className='flex justify-end mb-4'>
                    <button
                        onClick={handleAccept}
                        className='mr-2 px-4 py-2 bg-primary text-white rounded '
                    >
                        Accept
                    </button>
                    <button
                        onClick={handleReject}
                        className='mr-2 px-4 py-2 bg-gray-300 text-white rounded '
                    >
                        Reject
                    </button>
                    
                </div>
            </div>
        </div>
    )
}

export default ApplicationModal
