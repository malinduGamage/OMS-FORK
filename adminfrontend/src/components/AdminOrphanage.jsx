import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import toast from 'react-hot-toast';
import InfiniteScroll from 'react-infinite-scroll-component';
import Search from './Search';
import Dropdown from './Dropdown';
import { districts } from '../constants';
import { Link, useNavigate } from 'react-router-dom';

export const AdminOrphanage = ({ orphanageList, setOrphanageList }) => {

    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");

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
        <div className='mt-10' >

            <div className='grid mb-3 md:grid-cols-3 mx-20 '>
                <Link to={'/admin/addOrphanage'}>
                    <button className='m-2 flex items-center px-6 py-2 min-w-[120px] text-center text-orange-600 border border-orange-600 rounded hover:bg-orange-600 hover:text-white active:bg-orange-500 focus:outline-none focus:ring'>
                        <p className='ml-1'> Add Orphanage</p>
                    </button>
                </Link>
                <div className='m-2'>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className='m-2'>
                    <Dropdown
                        valueList={districts}
                        onSelect={(district) => setSelectedDistrict(district)}
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

                className='mx-20 infinite-scroll-container'
                dataLength={sortedOrphanageList.length}
                next={fetchMoreData}
                hasMore={true}
                height={300}
            >
                {sortedOrphanageList.map((item, index) => (
                    <div
                        className='flex items-center justify-between px-10 py-2 border-gray-100 border-y-2 hover:bg-gray-100'
                        key={index}
                        onClick={() => handleClickOrphanage(item.orphanageid)}
                    >
                        {item.orphanagename}
                        <div className='flex space-x-2'>
                            <button
                                className='px-3 py-1 text-xs text-white bg-blue-500 rounded hover:bg-blue-600'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleUpdateOrphanage(item.orphanageid);
                                }}
                            >
                                Update
                            </button>
                            <button
                                className='px-3 py-1 text-xs text-white bg-red-500 rounded hover:bg-red-600'
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteOrphanage(item.orphanageid);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                ))}
            </InfiniteScroll>
        </div>
    )
}
