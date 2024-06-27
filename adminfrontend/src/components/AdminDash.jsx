import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { districts, orphanageList } from '../constants'; // Adjusted import
import Search from './Search';
import Dropdown from './Dropdown';
import { Link } from 'react-router-dom';

const AdminDash = () => {
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedDistrict, setSelectedDistrict] = useState(""); 

  const filteredOrphanageList = orphanageList.filter((orphanage) => {
    const matchesSearch = orphanage.name.toLowerCase().startsWith(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict ? orphanage.district === selectedDistrict : true;
    return matchesSearch && matchesDistrict;
  });

  const fetchMoreData = () => {
    console.log('Fetching more data...');
  };

  const sortedOrphanageList = [...filteredOrphanageList].sort((a, b) => 
    a.name.localeCompare(b.name)
  );

  return (
    <div className='mx-10'>
      <h1 className="text-2xl font-bold text-center my-10 relative">
        Admin Dashboard
        <span className="block w-[100px] h-1 bg-primary mx-auto mt-3"></span>
      </h1>

      <style jsx>{`
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


      <button className='mx-20 my-3 py-3 text-white bg-primary px-2'>
        <Link to={'/addOrphanage'}>Add an orphanage</Link>
      </button>

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

      

      
      <InfiniteScroll
        className='infinite-scroll-container mx-20' 
        dataLength={sortedOrphanageList.length}
        next={fetchMoreData}  
        hasMore={true}        
        height={300}
      >
        {sortedOrphanageList.map((item, index) => (
          <div className='px-10 py-2 text-sm border-y-2 border-gray-100 hover:bg-gray-100' key={index}>
            {item.name}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default AdminDash;
