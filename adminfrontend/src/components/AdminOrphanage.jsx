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
            setOrphanageList(orphanageList.filter((orphanage) => orphanage.orphanageid !== orphanageId));
            console.log('filtere orphanage list...')
            await axiosPrivate.delete(`/orphanage/${orphanageId}`);
            console.log('Deleted orphanage');

        } catch (error) {
            console.error('Failed to delete orphanage:', error);
            setOrphanageList(orphanageList);
        }
    };

    const handleUpdateOrphanage = (orphanageId) => {
        const path = `/orphanage/${orphanageId}/edit`;
        navigate(path);
        console.log('Updating orphanage...');
    }



    return (
        <div className='mt-10' >

            <div className='grid mb-3 md:grid-cols-2'>
                <div className='w-full '>
                    <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                </div>
                <div className='w-full '>
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
