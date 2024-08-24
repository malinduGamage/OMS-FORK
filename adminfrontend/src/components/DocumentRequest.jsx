import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { PDFView } from './PDFView';
import { ConfirmationModal } from './ConfirmationModal';
import { ChildPreview } from './ChildPreview';

export const DocumentRequest = ({ requests, setRequests, setFileVisibility, requestId, setChild, child, setPreviewVisibility }) => {
    const axiosPrivate = useAxiosPrivate();
    const [documentUrl, setDocumentUrl] = useState(null);
    const [res, setRes] = useState('');
    const [confirmModalVisibility, setConfirmModalVisibility] = useState(false)
    const [documentData, setDocumentData] = useState(null); // add to UI
    const [req, setReq] = useState(null);

    const getDocument = async (documentId) => {
        try {
            let response
            console.log(req.type)
            response = await axiosPrivate.get(`/file/tempDocument/${documentId}`);
            if (response) {
                setDocumentUrl(response.data.URL);
                setChild(response.data.child);
                setDocumentData(response.data.document);
            }
            else throw new Error('Failed to fetch document');

        } catch (error) {
            toast.error('Failed to fetch document:', error.message);
        }
    };

    const handleResponse = async (response) => {
        try {
            let data;
            switch (req.type) {
                case 'create':
                    data = await axiosPrivate.put('/request/childDocument/', {
                        requestid: requestId,
                        response: response
                    })
                    break;
                case 'delete':
                    data = await axiosPrivate.put('/request/deleteChildDocument/', {
                        requestid: requestId,
                        response: response
                    })
                    break;
                default:
                    break;
            }
            console.log(data.data)
            const updatedRequest = data.data.data

            setRequests(requests.filter(request => request.requestid !== requestId).concat(updatedRequest))
            toast.success('Request handled successfully');
        } catch (error) {
            console.log(error)
            toast.error('Failed to handle request:', error.message);
        }
    }

    useEffect(() => {
        const getRequestData = async () => {
            try {
                const response = await axiosPrivate.get(`/request/get/${requestId}`);
                setReq(response.data.request);
            } catch (error) {
                console.error('Failed to fetch child:', error);
            }
        };
        getRequestData();
    }, [requestId, axiosPrivate]);

    useEffect(() => {
        if (req) {
            console.log(req)
            getDocument(req.entity_key);
        }
    }, [req])

    return (
        <div className="fixed inset-0 flex justify-center bg-black bg-opacity-50 overflow-auto px-10 z-10">
            <section className="px-8 py-4 mx-auto bg-white rounded-md shadow-md my-5 w-[80vw]">
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-lg font-bold text-gray-700 capitalize flex"> Document Request </h1>
                    <button className="px-2 py-1 bg-red-500 text-white rounded-md" onClick={() => setFileVisibility(false)}>Close</button>
                </div>
                <PDFView documentUrl={documentUrl} />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={() => {
                            setRes('approved')
                            setConfirmModalVisibility(true)
                        }}
                        className="mx-4 px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-700 disabled:bg-orange-300">
                        Approve
                    </button>
                    <button
                        onClick={() => {
                            setRes('rejected')
                            setConfirmModalVisibility(true)
                        }}
                        className="mx-4 px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-700 disabled:bg-orange-300">
                        Reject
                    </button>
                    <button
                        disabled={!child}
                        onClick={() => {
                            setPreviewVisibility(true)
                            setFileVisibility(false)
                        }}
                        className="mx-4 px-4 py-2 leading-5 text-white transition-colors duration-200 transform bg-orange-500 rounded-md hover:bg-orange-700 disabled:bg-orange-300">
                        View Child
                    </button>
                </div>
            </section>
            {confirmModalVisibility &&
                <ConfirmationModal
                    head="Are you sure?"
                    body={`Are you sure you want to ${res === 'approved' ? 'approve' : 'reject'} this request?`}
                    setVisibility={setConfirmModalVisibility}
                    handleConfirmation={() => {
                        handleResponse(res)
                        setConfirmModalVisibility(false)
                    }}
                />}
        </div>
    );
};
