import React, { useEffect, useState } from 'react'
import useAxiosPrivate from '../hooks/useAxiosPrivate'

export const UserApplicationModal = ({ application, closeModal }) => {
    const axiosPrivate = useAxiosPrivate()
    const [children, setChildren] = useState([])
    const [selectedChild, setSelectedChild] = useState(null)

    useEffect(() => {
        const fetchChildren = async () => {
            try {
                const response = await axiosPrivate.post('/application/getchildren', {
                    agerange: application.agerange,
                    gender: application.genderofchild
                })
                setChildren(response.data.children)
            } catch (error) {
                console.error('Failed to fetch children:', error)
            }
        }
        fetchChildren()
    }, [axiosPrivate, application.agerange, application.genderofchild])

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            closeModal()
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    const handleSelectChild = (child) => {
        setSelectedChild(child)
    }

    const handleProceedWithAdoption = () => {
        if (selectedChild) {
            // Implement the logic to proceed with the adoption
            console.log('Proceeding with adoption for child:', selectedChild)
            closeModal()
        }
    }

    return (
        <div className='fixed inset-0 backdrop-blur-sm flex justify-center items-center'>
            <div id='scrollview' className='bg-white rounded shadow-lg w-[95%] h-[95vh]'>
                <div className='w-full bg-red-200 h-[80vh] overflow-y-auto'>
                    <h2 className='text-xl font-bold mb-4'>Age range: {application.agerange.join(' - ')}</h2>
                    <h2 className='text-xl font-bold mb-4'>Gender: {application.genderofchild}</h2>
                    <div>
                        <h3 className='text-lg font-semibold'>Matching Children:</h3>
                        {children.length > 0 ? (
                            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                                {children.map((child) => (
                                    <div
                                        key={child.childid}
                                        className={`p-4 border rounded cursor-pointer ${selectedChild && selectedChild.childid === child.childid ? 'border-blue-500' : 'border-gray-300'}`}
                                        onClick={() => handleSelectChild(child)}
                                    >
                                        <img
                                            src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
                                            alt='Child'
                                            className='w-full h-48 object-cover rounded mb-2'
                                        />
                                        <h4 className='text-lg font-medium'>{child.name}</h4>
                                        <p>Orphanage: {child.orphanage.orphanagename}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No children found matching the criteria.</p>
                        )}
                    </div>
                </div>
                <div className='flex justify-between p-4 mb-4'>
                    <button onClick={closeModal} className='bg-gray-200 p-2 rounded'>Close</button>
                    <button
                        onClick={handleProceedWithAdoption}
                        className={`p-2 rounded ${selectedChild ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        disabled={!selectedChild}
                    >
                        Proceed with Adoption
                    </button>
                </div>
            </div>
        </div>
    )
}
