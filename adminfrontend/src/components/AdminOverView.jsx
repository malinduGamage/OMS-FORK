import React from 'react'

export const AdminOverView = ({ overview }) => {
    return (
        <div>
            <h1 className='text-4xl font-bold text-center text-gray-800'>Not Implemented</h1>
            <div className='flex items-center justify-center mt-10'>

                <div class="grid grid-cols-4 gap-4">
                    {overview.map((item, index) => {
                        return (
                            <div className='w-64 h-64 border-orange-500 border-2 rounded-lg flex items-center justify-center p-4 bg-orange-50'>
                                <div className='text-center'>
                                    <p className='font-bold text-3xl text-gray-600'>{item.parameter}</p>
                                    <p className='text-2xl font-semibold text-gray-800'>{item.value}</p>
                                </div>
                            </div>

                        )
                    })}
                </div>
            </div>
        </div>
    )
}
