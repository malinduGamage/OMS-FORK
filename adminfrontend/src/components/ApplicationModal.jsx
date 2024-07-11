import React, { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const ApplicationModal = ({ application, closeModal, socialWorkerList = [] }) => {
    const [showSocialWorkerAssign, setShowSocialWorkerAssign] = useState(false);
    const axiosPrivate = useAxiosPrivate();

    const handleAccept = () => {
        // Show the social worker assignment div instead of closing the modal
        setShowSocialWorkerAssign(true);
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

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const assignToCase = async (socialworkerid) => {
        try {
            const response = await axiosPrivate.post('/case', {
                childid: application.childid,
                parentid: application.userid,
                socialworkerid: socialworkerid,
                applicationid:application.applicationid
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data.status) {
                console.log("Case created successfully");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
            <div id='scrollview' className='bg-white rounded  shadow-lg w-[95%] h-[95vh] overflow-y-auto '>
                
                <div className='w-full bg-red-200 h-[80vh]'>
                <h2 className='text-xl font-bold mb-4'>{application.childname}</h2>
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

                {showSocialWorkerAssign && (
  <div className='px-10' id='swtocase'>
    <h1 className='text-2xl text-primary text-center font-bold mb-4'>Assign Social Worker</h1>
    {socialWorkerList && socialWorkerList.length > 0 ? (
      <table className='min-w-full  border-collapse block md:table'>
       
        <tbody className='block md:table-row-group'>
          {socialWorkerList.map((sw) => (
            <tr key={sw.socialworkerid} className=' block md:table-row'>
              <td className='p-3 pl-20 md:border-b md:border-gray-300 text-left block md:table-cell'>{sw.username}</td>
              <td className='p-3 md:border-b text-end pr-20 md:border-gray-300  block md:table-cell'>
                <button className='bg-primary text-white px-4 py-2 rounded' onClick={() => assignToCase(sw.socialworkerid)}>Assign</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className='text-red-500'>No social workers available</p>
    )}
  </div>
)}

            </div>
        </div>
    );
};

export default ApplicationModal;
