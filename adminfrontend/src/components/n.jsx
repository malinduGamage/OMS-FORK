import React from 'react'

export const n = () => {
    return (
        <div>
            <nav className='flex items-center justify-between h-20 overflow-hidden bg-transparent shadow-lg rounded'>
                <div className='p-4'>
                    <a href="./admin">
                        <img src="https://i.imgur.com/VXw99Rp.jpg" alt="logo" className='w-36' />
                    </a>
                </div>
                <div className='p-4'>
                    <ul className='flex space-x-6'>
                        <li>
                            <Link to={'/admin'}>
                                <button className='p-3 text-white rounded-xl bg-primary focus:outline-none hover:bg-orange-700'>
                                    Home
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/inbox'}>
                                <button className='p-3 mx-5 text-white rounded-xl bg-primary focus:outline-none hover:bg-orange-700'>
                                    Inbox
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to={'/test'}>
                                <button className='p-3 mx-5 text-white rounded-xl bg-primary focus:outline-none hover:bg-orange-700'>
                                    Dash
                                </button>
                            </Link>
                        </li>
                        <li>
                            <button className='p-3 text-white rounded-xl bg-primary focus:outline-none hover:bg-orange-700' onClick={signout}>
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="flex flex-col min-h-screen antialiased bg-gray-50 text-gray-800">
                <div className="flex flex-col w-64 bg-white border-r min-h-full">
                    <div className="overflow-y-auto overflow-x-hidden flex-grow">
                        <ul className="flex flex-col py-4 space-y-1">
                            <li className="px-5">
                                <div className="flex flex-row items-center h-8">
                                    <div className="text-sm font-light tracking-wide text-gray-500">Menu</div>
                                </div>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">Dashboard</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">Inbox</span>
                                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-indigo-500 bg-indigo-50 rounded-full">
                                        New
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">Messages</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
                                >
                                    <span className="inline-flex justify-center items-center ml-4">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                            ></path>
                                        </svg>
                                    </span>
                                    <span className="ml-2 text-sm tracking-wide truncate">Notifications</span>
                                    <span className="px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-red-500 bg-red-50 rounded-full">
                                        1.2k
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex-grow p-4 ml-64 mt-14 mb-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"></div>
                </div>
            </div>
        </div>
    )
}
