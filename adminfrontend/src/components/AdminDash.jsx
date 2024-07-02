import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { districts } from '../constants'; 
import Search from './Search';
import Dropdown from './Dropdown';
import { Link, useNavigate } from 'react-router-dom';
import { AssignSocialWorkerModal } from './AssignSocialWorkerModal';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import useLogout from '../hooks/useLogout';

const AdminDash = () => {

  const axiosPrivate = useAxiosPrivate()

  const navigate =useNavigate()
  const logout = useLogout()

  const [orphanageList, setOrphanageList] = useState([])
  const [searchTerm, setSearchTerm] = useState(""); 
  const [selectedDistrict, setSelectedDistrict] = useState(""); 

  const [showModal, setShowModal] = useState(false)

  useEffect(()=>{
    const getAllOrphanages = async()=>{

      try {

        const response = await axiosPrivate.get('/orphanage')
        setOrphanageList(response.data.orphanageList)
        
      } catch (error) {

        console.error('Failed to fetch orphanages:', error);
        
      }



    }

    getAllOrphanages()
  },[])

  const filteredOrphanageList = orphanageList.filter((orphanage) => {
    const matchesSearch = orphanage.orphanagename.toLowerCase().startsWith(searchTerm.toLowerCase());
    const matchesDistrict = selectedDistrict ? orphanage.district === selectedDistrict : true;
    return matchesSearch && matchesDistrict;
  });

  const fetchMoreData = () => {
    console.log('Fetching more data...');
  };

  const sortedOrphanageList = [...filteredOrphanageList].sort((a, b) => 
    a.orphanagename.localeCompare(b.orphanagename)
  );

  const handleAssign =async (data)=>{
   try {

    const response = await axiosPrivate.post('/socialworker',data,{
      headers:{
        'Content-Type':'application/json'
      }
    })

    if (response.data.success){
      console.log('orphanage added successfully');
    }
    
   } catch (error) {

    console.log(error);
    
   }
  }

  const signout = async ()=>{
    await logout();
    navigate('/')
  }



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


      <button onClick={signout}>Sign Out</button>


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
            {item.orphanagename}
          </div>
        ))}
      </InfiniteScroll>

      <div >
      <button className='mx-20 my-3 py-3 text-white bg-primary px-2' onClick={()=>setShowModal(true)}>
       Assign social worker
      </button>

      <AssignSocialWorkerModal
      showModal={showModal}
      closeModal={()=>setShowModal(false)}
      orphanageList ={orphanageList}
      onSubmit={handleAssign}/>

      </div>


     
    </div>
  );
};

export default AdminDash;
