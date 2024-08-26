import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { orphanageList } from '../constants'

const UserFostering = () => {

    const buttonClasses = 'w-fit flex items-center px-6 py-2 min-w-[120px] hover:bg-white hover:text-orange-600 text-center text-2xl border border-orange-600 rounded bg-orange-600 text-white active:bg-white focus:outline-none focus:ring';
    const Orphanages = orphanageList.map(orphanage => orphanage.name + ' - ' + orphanage.district)


    return (
        <div className="">
            <div className='w-full '>
                <div className='text-[#ff5722] font-poppins text-3xl text-center pt-10'>
                    <span className='mt-20' >What is Foostering</span>
                    <div className='mt-6 text-2xl'>
                        Fostering is the temporary care of children by families who provide a nurturing environment until the children can be reunited with their birth families or adopted. Our mission is to reintegrate children into environments where they can grow up with the love and care of a family. We strongly advocate for fostering, particularly for babies and children with special needs, as a crucial part of this mission. Every child deserves a loving family, and through fostering, we can provide them with the better future they deserve.
                    </div>

                </div>
                <div className='justify-center text-[#ff5722] text-7xl '>
                    <div className="flex justify-center">
                        Orphanages
                    </div>
                    <div className="flex justify-center">
                        <select className="p-4 mt-8 text-2xl border-2 border-black rounded-lg focus:outline-none text-[#ff5722] mb-16">
                            <option value="Select Distric">Select Orphanage from Your Area ....</option>
                            {Orphanages.map((district, index) => (
                                <option key={index} value={district}>{district}</option>
                            ))}
                        </select>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default UserFostering