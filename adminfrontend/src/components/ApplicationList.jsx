import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import ApplicationModal from './ApplicationModal'

const ApplicationList = () => {
    const { id } = useParams()
    const axiosPrivate = useAxiosPrivate()
    const [applicationList, setApplicationList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedApplication, setSelectedApplication] = useState(null)

    useEffect(() => {
        const getAllApplications = async () => {
            try {
                const response = await axiosPrivate.get(`/application?orphanageid=${id}`)
                setApplicationList(response.data.applicationList)
            } catch (error) {
                console.error('Failed to fetch applications:', error)
            }
        }

        getAllApplications()
    }, [axiosPrivate, id])

    const handleOpenModal = (application) => {
        setSelectedApplication(application)
        setShowModal(true)
    }

    return (
        <div>
            {applicationList.map((application) => (
                <div key={application.id} onClick={() => handleOpenModal(application)}>
                    {application.childname}
                </div>
            ))}

            {showModal && selectedApplication && (
                <ApplicationModal
                    application={selectedApplication}
                    closeModal={() => setShowModal(false)}
                />
            )}
        </div>
    )
}

export default ApplicationList
