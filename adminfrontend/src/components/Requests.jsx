import { useState, useEffect } from "react"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { RequestTable } from "./RequestTable"
import useAuth from "../hooks/useAuth"
import { ChildRequest } from "./ChildRequest"
import toast from "react-hot-toast"
import { DocumentRequest } from "./DocumentRequest"
import { ChildPreview } from "./ChildPreview"

export const Requests = ({ type }) => {
    const axiosPrivate = useAxiosPrivate()
    const [requests, setRequests] = useState([])
    // const { auth } = useAuth();
    // const [role, setRole] = useState(auth?.role)
    const [childId, setChildId] = useState(null)
    const [childVisibility, setChildVisibility] = useState(false)
    const [fileVisibility, setFileVisibility] = useState(false)
    const [previewVisibility, setPreviewVisibility] = useState(false)
    const [selectedRequest, setSelectedRequest] = useState(null)


    useEffect(() => {
        const fetchSentRequests = async () => {
            try {
                const response = await axiosPrivate.get('/request/sent')
                setRequests(response.data.requests)
            } catch (error) {
                toast.error('Failed to fetch requests')
            }
        }

        const fetchReceivedRequests = async () => {
            try {
                const response = await axiosPrivate.get('/request/received')
                setRequests(response.data.requests)
            } catch (error) {
                console.error('Failed to fetch requests')
            }
        }
        if (type === 'sent') fetchSentRequests()
        else if (type === 'received') fetchReceivedRequests()

    }, [type])

    return (
        <div>
            <div className="mx-10">
                <RequestTable
                    requests={requests}
                    setChildVisibility={setChildVisibility}
                    setSelectedRequest={setSelectedRequest}
                    selectedRequest={selectedRequest}
                    setFileVisibility={setFileVisibility} />
            </div>
            {childVisibility ?
                <ChildRequest
                    requests={requests}
                    setRequests={setRequests}
                    setChildVisibility={setChildVisibility}
                    requestId={selectedRequest.requestid} />
                : null}
            {fileVisibility ?
                <DocumentRequest
                    requests={requests}
                    setRequests={setRequests}
                    setFileVisibility={setFileVisibility}
                    requestId={selectedRequest.requestid}
                    setChildId={setChildId}
                    childId={childId}
                    setPreviewVisibility={setPreviewVisibility} />
                : null}
            {previewVisibility ?
                <ChildPreview
                    childId={childId}
                    setPreviewVisibility={setPreviewVisibility}
                    setFileVisibility={setFileVisibility} />
                : null}
        </div>
    )
}
