import React, { useState } from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import { orphanageList } from '../constants'
// import { Link } from 'react-scroll'
import Carousel from "./Carousel";
import { slideImages } from "../constants";
import { RiInboxArchiveFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";
import UserFostering from './UserFostering';

const LandingPage = () => {

    const [visibility, setVisibility] = useState(0);

    return (
        <div>
            {/*nav bar*/}
            <nav className='fixed z-40 w-full border-b-2 bg-white border-black-500 h-16'>
                <div className='flex items-center justify-between rounded h-full'>
                    <div className='flex items-center ml-6'>
                        <a href="./admin">
                            <img src="https://i.imgur.com/VXw99Rp.jpg" alt="logo" className='w-28' />
                        </a>
                    </div>
                    <div className='flex flex-row'>
                        <p className={`ml-1 hover:text-orange-600 hover:text-xl ${visibility == 0 && 'text-xl text-orange-600'}`} onClick={() => setVisibility(0)} > Home</p>
                        <p className='ml-1' > | </p>
                        <p className={`ml-1 hover:text-orange-600 hover:text-xl ${visibility == 1 && 'text-xl text-orange-600'}`} onClick={() => setVisibility(1)} > Fostering</p>
                    </div>
                    <div className='p-4'>
                        <ul className='flex space-x-6'>
                            <li>
                                <Link to={"/login"}>
                                    <button
                                        onClick={() => { }}
                                        className='flex items-center px-6 py-2 min-w-[120px] text-center text-orange-600 border border-orange-600 rounded hover:bg-orange-600 hover:text-white  focus:outline-none focus:ring'>
                                        <FaSignOutAlt />
                                        <p className='ml-1'> Login</p>
                                    </button>
                                </Link>
                            </li>

                        </ul>
                    </div>
                </div>
            </nav >

            {visibility == 0 &&
                <>
                    <div className="flex flex-col justify-center items-center w-full h-screen relative">
                        <img src="https://images.unsplash.com/photo-1617878227827-8360231f7f03?q=80&w=1912&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Background Image" className="absolute inset-0 object-cover w-full h-full opacity-70" />
                        <div className="relative z-10 text-8xl text-white font-extrabold text-center drop-shadow-lg">
                            LET’S <p className='text-orange-600'>BRIGHTEN </p>THEIR LIVES
                            <div className="mb-6 text-lg text-black drop-shadow shadow-white font-bold">
                                They will make the world in a different way
                            </div>
                            <div className="flex justify-center">
                                <Link to="/login" > <button className=" m-5 drop-shadow-xl text-4xl border-orange-600 bg-transparent hover:text-orange-600 text-white font-extrabold hover:bg-white py-2 px-4 border hover:border-transparent rounded">
                                    Adopt Now
                                </button></Link>
                                <Link to="/donate" > <button className="m-5 drop-shadow-xl text-4xl border-orange-600 bg-transparent hover:text-orange-600 text-white font-extrabold hover:bg-white py-2 px-4 border hover:border-transparent rounded">
                                    Donate
                                </button></Link>
                            </div>

                        </div>
                    </div>


                    <div className='w-full'>

                        <div className='carousel'>
                            <Carousel images={slideImages} />
                        </div>
                    </div>
                    <div>
                    </div>

                    <div class="flex items-center justify-center">
                        <card class="relative h-full w-screen ">
                            <img src="https://images.unsplash.com/photo-1577896852618-01da1dd79f7e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D.jpg" class="object-cover w-full h-full rounded-lg" />
                            <div class="absolute w-full h-full bottom-0 bg-gradient-to-r from-fuchsia-700/30 to-orange-700 rounded-lg flex flex-col items-center justify-center text-center">
                                <div className='relative z-20 text-white font-poppins text-9xl text-left p-6 mb-20'>
                                    <span className='border-white border'>Our Vision</span>
                                </div>

                                <p class="text-2xl px-14 text-gray-300 mt-10">
                                    Create awareness of the right of a child to be protected from abuse and the methods of
                                    preventing child abuse. Consult the relevant ministries, Provincial Councils, local authorities,
                                    District and Divisional Secretaries, public and private sector organizations, and recommend all
                                    necessary measures for preventing child abuse and for protecting and safeguarding the interests of
                                    the victims of such abuse.
                                </p>
                                <p class="text-base font-bold px-14 text-gray-300 mt-3">
                                    Child Protection authority
                                </p>
                            </div>
                        </card>
                    </div>
                </>
            }{visibility == 1 && <UserFostering />}



            <div className='relative w-full h-72'>
                <div className="absolute inset-x-0 bottom-0 w-full h-2/5 bg-[#ff8a65] flex items-center justify-between px-4">
                    <div className='flex'>
                        <div className='flex flex-col items-start pl-6'>
                            <div className='pt-2 mt-10'>
                                Sri Lanka Child Protection Authority
                            </div>
                            <a href="./">
                                <img src="https://i.imgur.com/VXw99Rp.jpg" alt="logo" className='object-contain mt-6 w-96 h-36' />
                            </a>
                            <div className='mb-10'>
                                Copyright © 2024 SLCPA. All rights reserved.
                            </div>
                        </div>
                        <div className='pl-6 mt-2 pr-80'>
                            <div className='mt-10'>
                                The Sri Lanka Child Protection Authority (SLCPA) is dedicated  lo
                            </div>
                        </div>
                    </div>

                    <div className='pr-6 mb-6'>
                        <div className='mb-4' >
                            <strong>Contact Information:</strong>
                        </div>
                        <div>Email: info@slcpa.lk</div>
                        <div>Address: 123 Main St, Colombo, Sri Lanka</div>
                    </div>
                </div>
            </div>
        </div >


    )
}

export default LandingPage