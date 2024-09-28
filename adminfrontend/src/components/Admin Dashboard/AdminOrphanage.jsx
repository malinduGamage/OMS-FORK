import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import Search from '../Search';
import Dropdown from '../Dropdown';
import { districts } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import PrimaryButton from '../elements/PrimaryButton';
import OrphanageForm from './OrphanageForm';
import UpdateOrphanage from './UpdateOrphanage';

export const AdminOrphanage = ({ orphanageList, setOrphanageList }) => {

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

    const [orphanageForm, setOrphanageForm] = useState(false)
    const [updateForm, setUpdateForm] = useState(false)
    const [orphanageId, setOrphanageId] = useState(null)

    const filteredOrphanageList = orphanageList.filter((orphanage) => {
        const matchesSearch = orphanage.orphanagename.toLowerCase().startsWith(searchTerm.toLowerCase());
        const matchesDistrict = selectedDistrict ? orphanage.district === selectedDistrict : true;
        return matchesSearch && matchesDistrict;
    });

    const sortedOrphanageList = [...filteredOrphanageList].sort((a, b) =>
        a.orphanagename.localeCompare(b.orphanagename)
    );

    const fetchMoreData = () => {
        console.log('Fetching more data...');
    };

    const handleClickOrphanage = (orphanageId) => {
        const path = `/orphanage/${orphanageId}`;
        navigate(path);
    };

    const handleDeleteOrphanage = async (orphanageId) => {
        try {
            console.log('Inside the handle Delete orphanage...');
            const children = await axiosPrivate.get(`/child/orphanage/${orphanageId}`, {
                headers: {
                    orphanageId: orphanageId
                }
            });
            console.log(orphanageId)
            console.log(children.data)
            if (children.data.childrenList.length === 0) {
                console.log("inside the tables delete");

                try {
                    // Deleting social workers related to orphanage
                    const deletedSocialWorkers = await axiosPrivate.delete(`/socialworker/${orphanageId}`);
                    console.log("frontend social workers", deletedSocialWorkers.data.deletedCount);  // Proper logging for status

                    // Deleting staff related to orphanage
                    const deletedStaff = await axiosPrivate.delete(`/staff/${orphanageId}`);
                    console.log("frontend staffs", deletedStaff.data.deletedCount);   // Optional logging

                    // Deleting orphanage itself
                    const deletedOrphanage = await axiosPrivate.delete(`/orphanage/${orphanageId}`);
                    console.log(deletedOrphanage.status);  // Optional logging

                    // Update orphanage list state
                    setOrphanageList(orphanageList.filter((orphanage) => orphanage.orphanageid !== orphanageId));
                    console.log('Deleted orphanage');

                } catch (error) {
                    console.error('Error during delete operations:', error);
                }
            }
            else {
                console.log(children.data.childrenList.length)
            }

        } catch (error) {
            console.error('Failed to delete orphanage:', error);
            setOrphanageList(orphanageList);
        }
    };

    const handleUpdateOrphanage = (id) => {
        const path = `/orphanage/${id}/edit`;
        navigate(path);
        console.log('Navigating to Updating orphanage...');
    }



    return (
        <div >
            <h1 className='text-4xl font-bold text-center text-gray-800 mb-5'>Registered Orphanages</h1>
            <div className='flex flex-col sm:flex-row justify-start'>
                <PrimaryButton onClick={() => setOrphanageForm(true)} text={'Add Orphanage'} className={' my-auto ml-2 '} />

                <div className='m-2'>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className='my-auto ml-2' >
                    <Dropdown
                        valueList={districts}
                        onSelect={(district) => setSelectedDistrict(district)}
                        className={'w-full m-0 p-0'}
                    />
                </div>
            </div>

            <style jsx>
                {`
        .infinite-scroll-container {
          height: 300px;
          overflow: auto;
        }
        .infinite-scroll-container::-webkit-scrollbar {
          width: 10px;
        }
        .infinite-scroll-container::-webkit-scrollbar-track {
          background: white;
        }
        .infinite-scroll-container::-webkit-scrollbar-thumb {
          background-color: #ff5722;
          border-radius: 10px;
          border: 3px solid #f1f1f1;
        }
        .infinite-scroll-container::-webkit-scrollbar-thumb:hover {
          background: #db4b1f;
        }
      `}</style>

            <InfiniteScroll

                className='mx-2 infinite-scroll-container mb-5'
                dataLength={sortedOrphanageList.length}
                next={fetchMoreData}
                hasMore={true}
            >
                {sortedOrphanageList.map((item, index) => (
                    <div className='flex items-center justify-between py-2 '
                        key={index}>
                        <div className="card bg-transparent border border-orange-900 rounded-md text-black w-full">
                            <div className="card-body">
                                <h2 className="card-title">{item.orphanagename}</h2>
                                <p>Reg. No : {item.orphanageid}<br />{item.head_email}</p>
                                <div className="card-actions justify-end">
                                    <PrimaryButton
                                        text='view'
                                        color='black'
                                        onClick={() => handleClickOrphanage(item.orphanageid)} />
                                    <PrimaryButton
                                        color="blue"
                                        text='Update'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setOrphanageId(item.orphanageid)
                                            setUpdateForm(true)
                                        }}
                                    />
                                    <PrimaryButton
                                        color='red'
                                        text='Delete'
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteOrphanage(item.orphanageid);
                                        }} />
                                </div>
                            </div>
                        </div>

                    </div>

                ))}
            </InfiniteScroll>
            {orphanageForm && <OrphanageForm setOrphanageForm={setOrphanageForm} />}
            {updateForm && <UpdateOrphanage id={orphanageId} setUpdateForm={setUpdateForm} />}
        </div>
    )
}
