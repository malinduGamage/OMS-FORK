import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Phase1 from "./Phase1";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading";
import ProgressBar from "./ProgressBar";
import Phase2 from "./Phase2";
import Phase3 from "./Phase3";

const CaseOngoing = ({ caseDetails, currentPhase }) => {
    const axiosPrivate = useAxiosPrivate();
    const [isPhase1Open, setIsPhase1Open] = useState(false);
    const [isPhase2Open, setIsPhase2Open] = useState(false);
    const [isPhase3Open, setIsPhase3Open] = useState(false);

    const togglePhase1 = () => {
        setIsPhase1Open((prevState) => !prevState);
    };
    const togglePhase2 = () => {
        setIsPhase2Open((prevState) => !prevState);
    };
    const togglePhase3 = () => {
        setIsPhase3Open((prevState) => !prevState);
    };



    if (!caseDetails) return <Loading />;

    return (
        <div>
            <div className="p-6 bg-gray-50 min-h-screen">
                <ProgressBar step={4 + currentPhase} />
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        CaseID: <span className="text-primary">{caseDetails.caseid}</span>
                    </h1>
                    <p className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold">Child's Name:</span>{" "}
                        {caseDetails.child.name}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold">Parent's Name:</span>{" "}
                        {caseDetails.parent.username}
                    </p>
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Assigned Social Worker:</span>{" "}
                        {caseDetails.socialworker.username}
                    </p>
                </div>

                {/* Phase 1*/}
                <div className="bg-white shadow-lg rounded-lg mb-5">
                    <button
                        className="flex justify-between items-center w-full p-10 text-primary text-2xl font-bold bg-white rounded-t-lg focus:outline-none"
                        onClick={togglePhase1}>
                        <span className="flex items-center">
                            Phase 1 : Documentation

                            {caseDetails.phase1 === 'Completed' && <span className="ml-2 px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-full">
                                Approved
                            </span>}

                        </span>

                        <FontAwesomeIcon
                            icon={isPhase1Open ? faChevronUp : faChevronDown}
                        />
                    </button>
                    {isPhase1Open && (
                        <div className="px-10 py-5 bg-white">
                            {currentPhase <= 1 && <Phase1 caseId={caseDetails.caseid} caseDetails={caseDetails} />}
                        </div>
                    )}
                </div>

                {/* Phase 2*/}
                <div className="bg-white shadow-lg rounded-lg mb-5">
                    <button
                        className="flex justify-between items-center w-full p-10 text-primary text-2xl font-bold bg-white rounded-t-lg focus:outline-none"
                        onClick={togglePhase2}
                    >
                        <span className="flex items-center">
                            Phase 2 : something

                            {caseDetails.phase2 === 'Completed' && <span className="ml-2 px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-full">
                                Approved
                            </span>}

                        </span>

                        <FontAwesomeIcon
                            icon={isPhase2Open ? faChevronUp : faChevronDown}
                        />
                    </button>
                    {isPhase2Open && (
                        <div className="px-10 py-5 bg-white">
                            {currentPhase <= 2 && <Phase2 />}
                        </div>
                    )}
                </div>

                {/* Phase 3*/}
                <div className="bg-white shadow-lg rounded-lg">
                    <button
                        className="flex justify-between items-center w-full p-10 text-primary text-2xl font-bold bg-white rounded-t-lg focus:outline-none"
                        onClick={togglePhase3}
                    >
                        <span className="flex items-center">
                            Phase 3 : something

                            {caseDetails.phase3 === 'Completed' && <span className="ml-2 px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-full">
                                Approved
                            </span>}

                        </span>

                        <FontAwesomeIcon
                            icon={isPhase3Open ? faChevronUp : faChevronDown}
                        />
                    </button>
                    {isPhase3Open && (
                        <div className="px-10 py-5 bg-white">
                            {currentPhase <= 3 && <Phase3 />}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CaseOngoing