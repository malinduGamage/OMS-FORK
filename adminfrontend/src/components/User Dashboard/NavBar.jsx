import React from 'react';
import { LuMail } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import useLogout from '../../hooks/useLogout';
import { RiWechatChannelsLine } from "react-icons/ri";

const UserNavBar = () => {
    const logout = useLogout();
    const signout = async () => {
        await logout();
    };

    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-10 shadow-md">
            <div className="flex-1">
                <a className="btn btn-ghost w-fit px-1" href="/user/dashboard">
                    <img src="https://i.imgur.com/VXw99Rp.jpg" alt="logo" className="w-36" />
                </a>
            </div>
            <div className="flex-none">

                <Link to='/user/inbox'>
                    <button className="btn btn-ghost btn-circle">

                        <div className="indicator">
                            <LuMail className="h-5 w-5" />
                            <span className="badge badge-xs badge-error indicator-item"></span>
                        </div>
                    </button></Link>
                <button className="btn btn-ghost btn-circle mx-2">
                    <div className="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span className="badge badge-xs badge-error indicator-item"></span>
                    </div>
                </button>
                <Link to={"/login"}>
                    <button onClick={signout} className="btn btn-ghost btn-circle">

                        <div className="indicator">
                            <FaSignOutAlt className="h-5 w-5" />
                        </div>
                    </button></Link>
            </div>
        </div>
    );
};

export default UserNavBar;
