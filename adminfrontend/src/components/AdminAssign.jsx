import React, { useEffect, useState } from 'react';
import { AssignModal } from './AssignModal'
import toast from 'react-hot-toast'
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export const AdminAssign = ({ orphanageList }) => {

    const axiosPrivate = useAxiosPrivate()
    const [showModal, setShowModal] = useState(false)
    const [selectedAssign, setSelectedAssign] = useState("")


    const handleAssign = async (data) => {
        try {
            let response;
            if (selectedAssign === 'socialworker') {
                response = await axiosPrivate.post('/socialworker', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            } else if (selectedAssign === 'staff') {
                response = await axiosPrivate.post('/staff', data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
            }

            toast.success('Assigned successfully');
            console.log('assigned successfully');

        } catch (error) {
            toast.error('Failed to assign');
            console.log(error);
        }
    }
    return (
        <div className='flex m-5'>

            <div class="m-20 max-w-sm rounded overflow-hidden shadow-lg">
                <img src="https://www.africacalling.org/wp-content/uploads/ghana-orphanage-volunteer-sarah-vigs-ghana-africa-sarah-from-uk.jpg" alt="Sunset in the mountains" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Assign Social Worker</div>
                    <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <button className='mx-20 my-3 py-3 text-white bg-primary px-2'
                        onClick={() => {
                            setShowModal(true)
                            setSelectedAssign('socialworker')
                        }}>
                        Assign social worker
                    </button>
                </div>
            </div>

            <div class="m-20 max-w-sm rounded overflow-hidden shadow-lg">
                <img src="https://www.africacalling.org/wp-content/uploads/ghana-orphanage-volunteer-sarah-vigs-ghana-africa-sarah-from-uk.jpg" alt="Sunset in the mountains" />
                <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">Assign Staff Member</div>
                    <p class="text-gray-700 text-base">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                    </p>
                    <button className='mx-20 my-3 py-3 text-white bg-primary px-2' onClick={() => {
                        setShowModal(true)
                        setSelectedAssign('staff')
                    }}>
                        Assign staff Member
                    </button>
                </div>
            </div>
            <AssignModal
                showModal={showModal}
                type={selectedAssign}
                closeModal={() => {
                    setSelectedAssign('')
                    setShowModal(false)
                }}
                orphanageList={orphanageList}
                onSubmit={handleAssign} />
        </div>
    )
}
