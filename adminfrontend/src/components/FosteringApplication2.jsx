import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'

export default function FosteringApplication2
() {

    const [fosteringDetails2, setFosteringDetails2] = useState({});
    const navigate =useNavigate()

    const handleChange = (e) => {
      setFosteringDetails2({
        ...fosteringDetails2,
        [e.target.name]: e.target.value,
      }); 
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(fosteringDetails2);
      const path = `/fostering3`;
      navigate(path);
    }
    
  return (
    <div className="mx-10">
      <h1 className="relative my-10 text-2xl font-bold text-center">
        Contact Information
        <span className="block w-[100px] h-1 bg-primary mx-auto mt-3"></span> 
      </h1>
      <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className='flex flex-row gap-8'>
          <div className="flex flex-col w-1/2">
            <label className="mb-3 font-semibold text-md" htmlFor="firstname">
              Home Address:
            </label>
            <input
              className="w-full bg-gray-100 h-[40px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
              onChange={handleChange}
              type="text"
              id="firstname"
              name="firstname"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-3 font-semibold text-md" htmlFor="lastname">
              City:
            </label>
            <input
              className="w-full bg-gray-100 h-[40px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
              onChange={handleChange}
              type="text"
              id="lastname"
              name="lastname"
              required
            />
          </div>
        </div>

        <div className='flex flex-row gap-8'>
          <div className="flex flex-col w-1/2">
            <label className="mb-3 font-semibold text-md" htmlFor="gender">
              Province:
            </label>
            <input
              className="w-full bg-gray-100 h-[40px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
              onChange={handleChange}
              type="text"
              id="gender"
              name="gender"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-3 font-semibold text-md" htmlFor="dob">
              Postal Code:
            </label>
            <input
              className="w-full bg-gray-100 h-[40px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
              onChange={handleChange}
              type="text"
              id="dob"
              name="dob"
              required
            />
          </div>
        </div>

        <div className='flex flex-row gap-8'>
          <div className="flex flex-col w-1/2">
            <label className="mb-3 font-semibold text-md" htmlFor="race">
              Home Phone Number:
            </label>
            <input
              className="w-full bg-gray-100 h-[40px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
              onChange={handleChange}
              type="text"
              id="race"
              name="race"
              required
            />
          </div>
          <div className="flex flex-col w-1/2">
            <label className="mb-3 font-semibold text-md" htmlFor="religion">
              Cell Phone Number:
            </label>
            <input
              className="w-full bg-gray-100 h-[40px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
              onChange={handleChange}
              type="text"
              id="religion"
              name="religion"
              required
            />
          </div>
        </div>

        <div className='flex flex-row gap-8'>
          <div className="flex flex-col w-1/2">
            <label className="mb-3 font-semibold text-md" htmlFor="culturalbackground">
              Email Address:
            </label>
            <input
              className="w-full bg-gray-100 h-[40px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
              onChange={handleChange}
              type="text"
              id="culturalbackground"
              name="culturalbackground"
              required/>
          </div> 
        </div>
      <div className='flex flex-row gap-8'>
        
      <button 
        type='submit'
        className="w-[200px] h-[40px] bg-primary text-white rounded-md mt-5 mx-auto"
        >
        Next Page
        </button>
        <button 
            className="w-[200px] h-[40px] bg-primary text-white rounded-md mt-5 mx-auto 0" onClick={() => window.history.back()}
            >
            Back
            </button>
      </div>
      </form>
    </div>
  )
}
