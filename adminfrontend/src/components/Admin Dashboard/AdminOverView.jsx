import React, { useEffect } from 'react'

export const AdminOverView = ({ overview }) => {

    return (
        <div className='items-center justify-center'>
            <h1 className='text-4xl font-bold text-center text-gray-800'>Overview</h1>
            <div className='flex items-center justify-center mt-10'>

                <div class="grid grid-cols-3 gap-4">
                    {overview.map((item, index) => {
                        return (
                            <div class="max-w-sm rounded overflow-hidden shadow-lg">
                                <div class="px-6 py-4">
                                    <div class="font-bold text-xl mb-2">{item.parameter}</div>
                                    <p class="text-gray-700 text-5xl ">
                                        {item.value}
                                    </p>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}
