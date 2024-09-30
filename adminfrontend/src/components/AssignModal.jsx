import React, { useState } from 'react'

export const AssignModal = ({ showModal, closeModal, orphanageList, onSubmit, type }) => {

    const [email, setEmail] = useState('')
    const [selectedOrphanageId, setSelectedOrphanageId] = useState('')

    const handleSubmit = () => {
        onSubmit({ email, orphanageId: selectedOrphanageId })
        setSelectedOrphanageId('')
        setEmail('')
        closeModal();
    }

    const handleOrphanageChange = (e) => {
        setSelectedOrphanageId(e.target.value)
    }

    if (!showModal) return null

    return (
        <div className='fixed inset-0 flex items-center justify-center backdrop-blur-md'>
            <div className='w-1/3 p-5 bg-white rounded shadow-lg'>
                <h2 className='mb-4 text-xl font-bold'>Assign {type}</h2>
                <label className='block mb-2'>{type} Email:</label>
                <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-2 mb-4 border rounded'
                />
                <label className='block mb-2'>Select Orphanage:</label>
                <select
                    value={selectedOrphanageId}
                    onChange={handleOrphanageChange}
                    className='w-full p-2 mb-4 border rounded'
                >
                    <option value=''>Select Orphanage</option>
                    {orphanageList.map((orphanage, index) => (
                        <option key={index} value={orphanage.orphanageid}>
                            {orphanage.orphanagename}
                        </option>
                    ))}
                </select>
                <div className='flex justify-end'>
                    <button
                        onClick={closeModal}
                        className='px-4 py-2 mr-4 bg-gray-300 rounded'
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='px-4 py-2 text-white rounded bg-primary'
                    >
                        Assign
                    </button>
                </div>
            </div>
        </div>
    )
}
