import React, { Component } from 'react'; 

import { NavLink } from 'react-router-dom';

// Utility classes for button styles
const buttonClasses = "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-4 focus:ring-gray-100  ";
const buttonClassesgeneral = "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-orange-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ";

export class Navbar extends Component {
    render() {
        return (
            <nav className='fixed z-40 w-full border-b-2 bg-slate-200 border-black-500'>
                <div className="flex items-center justify-between p-4 text-2xl text-black">
                    <a href="./userdash">
                        <img src="https://i.imgur.com/VXw99Rp.jpg" alt="logo" className='w-36' />
                    </a>
                    <div className='space-x-4'>
                    <NavLink to="/fosteringmain" className={`p-2 ${buttonClassesgeneral}`}>Fostering</NavLink>
                        <NavLink to="/inbox" className={`p-2 ${buttonClassesgeneral}`}>Inquiries</NavLink>
                        <NavLink to="/notification" className={`p-2 ${buttonClassesgeneral}`}>Notification</NavLink>
                        <NavLink to="/" className={`p-2 ${buttonClasses}`}>LogOut</NavLink>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;
