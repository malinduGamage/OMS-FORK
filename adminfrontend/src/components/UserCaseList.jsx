import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';


const UserCaseList = () => {

   
   
 const axiosprivate = useAxiosPrivate()

 const navigate = useNavigate();

    const [cases, setCases] = useState([]);

    useEffect(() => {
        const getUserCases = async () => {
            try {
                const response = await axiosprivate.get(`/case/byUser`);
                setCases(response.data.userCases);
            } catch (error) {
                console.error("Error fetching user cases:", error);
            }
        };

       
            getUserCases();
     
    }, []); 

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            {cases.length > 0 ? (
                <ul className="space-y-4">
                    {cases.map((userCase, index) => (
                        <li
                            key={index}
                            className="p-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-transform transform hover:scale-105"
                            onClick={() => navigate(`/case/${userCase.caseid}`, { replace: true })}
                        >
                            {userCase.caseid}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-600">No cases found.</p>
            )}
        </div>
    );
};

export default UserCaseList;
