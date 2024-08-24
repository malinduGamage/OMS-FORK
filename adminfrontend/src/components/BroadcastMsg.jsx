import React from 'react'
import { useState } from 'react'

export default function BroadcastMsg({ rolesList,closeModal,onSubmit}) {
    const [massage, setMassage] = useState('');
    const [selectedGroup, setSelectedGroup] = useState('');

    const handleGroupChange = (e) => {
        setSelectedGroup(e.target.value)
    }

    const handleSubmit = () => {
        onSubmit({ massage, selectedGroup });
        console.log(massage, selectedGroup);
        closeModal();
    }

    return (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75'>
            <div className='w-1/3 p-5 bg-white rounded shadow-lg'>
                <h2 className='mb-4 text-xl font-bold'>Broadcast Message</h2>
    
                <label className='block mb-2'>Type Your Message:</label>
                <textarea
                    value={massage}
                    onChange={(e) => setMassage(e.target.value)}
                    className='w-full h-32 p-2 mb-4 border border-gray-300 rounded'
                    placeholder='Type your message here...'
                />
    
                <label className='block mb-2'>Select the Role:</label>
                <select
                    value={selectedGroup}
                    onChange={handleGroupChange}
                    className='w-full p-2 mb-4 border border-gray-300 rounded'
                >
                    <option value=''>Select Group</option>
                    {rolesList.map((role, index) => (
                        <option key={index} value={role.rolename}>
                            {role.rolename}
                        </option>
                    ))}
                </select>
    
                <div className='flex justify-end'>
                
                    <button
                        onClick={handleSubmit}
                        className='px-4 py-2 mr-5 text-white rounded bg-primary'
                    >
                        Send Message
                    </button>

                    <button
                        onClick={closeModal}
                        className='px-4 py-2 text-white rounded bg-primary'
                >
                    Cancel
                </button>
                </div>
            </div>
        </div>
    );
    
}
