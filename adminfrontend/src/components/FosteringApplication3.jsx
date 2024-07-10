import React from 'react'
import AgeSlider from './AgeSlider'
import { useState } from 'react'

export default function FosteringApplication2
() {
    
    const [ageRange, setAgeRange] = useState([3, 18]); 
    const [fosteringDetails3, setFosteringDetails3] = useState({});
    
    const handleChange = (e) =>{
        setFosteringDetails3({
            ...fosteringDetails3,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(fosteringDetails3);
    }
    
    const updateAgeRange = (value) => {
        setFosteringDetails3({
            ...fosteringDetails3,
            ageRange: value,
        })
        setAgeRange(value);
    }
    
    
    return (
        <div className="mx-10">
        <h1 className="relative my-10 text-2xl font-bold text-center">
            About the Kids
            <span className="block w-[100px] h-1 bg-primary mx-auto mt-3"></span> 
        </h1>
        <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
            <div className='flex flex-row gap-8'>
            <div className="flex flex-col w-1/2">
                <label className="mb-3 font-semibold text-md" htmlFor="firstname">
                Gender of Child you prefer:
                </label>
                <select
                className="w-full bg-gray-100 h-[50px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
                onChange={handleChange}
                id = "gender"
                name="gender"
                required
                >
                    <option value="" disabled selected>Select gender</option>
                    <option value ="male">Male</option>
                    <option value ="female">Female</option>
                    <option value ="any">Any</option>
                </select>
            </div>
            <div className="flex flex-col w-1/2"
                name = 'ageRange'>
                <AgeSlider ageRange={ageRange} setAgeRange={updateAgeRange} />
            </div>
            </div>

            <div className='flex flex-row gap-8'>
            <div className="flex flex-col w-full">
                <label className="mb-3 font-semibold text-md" htmlFor="gender">
                    Reason for fostering:
                </label>
                <textarea
                className="w-full bg-gray-100 h-[100px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
                onChange={handleChange}
                type="text"
                id="reasonforfostering"
                name="reasonforfostering"
                required
                />
            </div>
            </div>
            <div className='flex flex-row gap-8'>
            <div className="flex flex-col w-full">
                <label className="mb-3 font-semibold text-md" htmlFor="race">
                Any specific needs or disabilities you are willing to consider:
                </label>
                <textarea
                className="w-full bg-gray-100 h-[100px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
                onChange={handleChange}
                type="text"
                id="specificneeds"
                name="specificneeds"
                required
                />
            </div>
            </div>

            <div className='flex flex-row gap-8'>
            <div className="flex flex-col w-full">
                <label className="mb-3 font-semibold text-md" htmlFor="race">
                    Additional Comments we aware of:
                </label>
                <textarea
                className="w-full bg-gray-100 h-[100px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
                onChange={handleChange}
                type="text"
                id="additionalcomments"
                name="additionalcomments"
                required
                />
            </div>
            </div>
        <div className='flex flex-row gap-8'>
        <button 
            className="w-[200px] h-[40px] bg-primary text-white rounded-md mt-5 mx-auto"
            >
            Submit
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
