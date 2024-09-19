import React, { useEffect, useState } from 'react';
import { LuMail } from "react-icons/lu";
import { Link } from 'react-router-dom';
import { FaSignOutAlt } from "react-icons/fa";
import useLogout from '../hooks/useLogout';
import useAuth from "../hooks/useAuth";

const ROLES = {
    User: 1010,
    Head: 1910,
    Staff: 5528,
    SocialWorker: 2525,
    Admin: 7788,
};

const NavBar = () => {

    const { auth } = useAuth();
    const logout = useLogout();

    //routes for specific roles
    const routes = {
        admin: {
            home: '/admin',
            inbox: '/admin/inbox'
        },
        head: {
            home: `/orphanage/${auth.orphanageId}`
        },
        staff: {
            home: `/orphanage/${auth.orphanageId}`
        },
        socialWorker: {
            home: `/orphanage/${auth.orphanageId}`
        },
        user: {
            home: '/user/dashboard',
            inbox: '/user/inbox',
            notification: '/user/notification'
        }
    }

    const [homeRoute, setHomeRoute] = useState('/')
    const [notificationRoute, setNotificationRoute] = useState('/')
    const [inboxRoute, setInboxRoute] = useState('/')

    //visibility of the button in the navbar
    const [notification, setNotification] = useState(false)
    const [inbox, setInbox] = useState(false)

    const signOut = async () => {
        await logout();
    };

    useEffect(() => {
        //initiating buttons & routes for roles
        if (auth.roles.includes(ROLES.Admin)) {

            setHomeRoute(routes.admin.home)
            setInboxRoute(routes.admin.inbox)

            setInbox(true)
        }
        else if (auth.roles.includes(ROLES.Head)) {
            setHomeRoute(routes.head.home)
        }
        else if (auth.roles.includes(ROLES.Staff)) {
            setHomeRoute(routes.staff.home)
        }
        else if (auth.roles.includes(ROLES.SocialWorker)) {
            setHomeRoute(routes.socialWorker.home)
        }
        else if (auth.roles.includes(ROLES.User)) {

            setHomeRoute(routes.user.home)
            setInboxRoute(routes.user.inbox)
            setNotificationRoute(routes.user.notification)

            setNotification(true)
            setInbox(true)
        }
    }, [])

    return (
        <div className="navbar bg-base-100 fixed top-0 left-0 w-full z-10 shadow-md">
            <div className="flex-1">
                <a className="btn btn-ghost w-fit px-1" href={homeRoute}>
                    <img src="https://i.imgur.com/VXw99Rp.jpg" alt="logo" className="w-36" />
                </a>
            </div>
            <div className="flex-none">

                {inbox && <Link to={inboxRoute}>
                    <button className="btn btn-ghost btn-circle">

                        <div className="indicator">
                            <LuMail className="h-5 w-5" />
                            {/* indicator icon */}
                            <span className="badge badge-xs badge-error indicator-item"></span>
                        </div>
                    </button>
                </Link>}

                {notification && <Link to={notificationRoute}>
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
                            {/* indicator icon */}
                            <span className="badge badge-xs badge-error indicator-item"></span>
                        </div>
                    </button>
                </Link>}
                <Link to={"/login"}>
                    <button onClick={signOut} className="btn btn-ghost btn-circle">

                        <div className="indicator">
                            <FaSignOutAlt className="h-5 w-5" />
                        </div>
                    </button></Link>
            </div>
        </div>
    );
};

export default NavBar;
