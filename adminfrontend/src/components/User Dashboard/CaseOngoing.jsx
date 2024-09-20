import React from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import Loading from "../Loading";
import ProgressBar from "./ProgressBar";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import Phase3 from "./Phase3";

const CaseOngoing = ({ caseDetails, currentPhase }) => {
    const axiosPrivate = useAxiosPrivate();

    if (!caseDetails) return <Loading />;

    // Determine progress bar value and phase visibility
    let progressValue = 6;
    let isPhase1Visible = false;
    let isPhase2Visible = false;
    let isPhase3Visible = false;

    if (caseDetails.phase1 === "Ongoing") {
        isPhase1Visible = true;
    } else if (caseDetails.phase1 === "Completed") {
        progressValue = 6;  // Adjust progress value as needed
        isPhase2Visible = true;
    }

    if (caseDetails.phase2 === "Completed") {
        isPhase2Visible = false;
        isPhase3Visible = true;
    }

    return (
        <div>
            <div className="p-6 bg-gray-50 min-h-screen">
                <ProgressBar step={progressValue} />
                <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">
                        CaseID: <span className="text-primary">{caseDetails.caseid}</span>
                    </h1>
                    <p className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold">Child's Name:</span> {caseDetails.child.name}
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                        <span className="font-semibold">Parent's Name:</span> {caseDetails.parent.username}
                    </p>
                    <p className="text-lg text-gray-700">
                        <span className="font-semibold">Assigned Social Worker:</span> {caseDetails.socialworker.username}
                    </p>
                </div>

                {/* Phase 1 */}
                {isPhase1Visible && (
                    <div className="bg-white shadow-lg rounded-lg mb-5">
                        <div className="flex justify-between items-center w-full p-10 text-primary text-2xl font-bold bg-white rounded-t-lg">
                            <span className="flex items-center">
                                Phase 1: Documentation
                                {caseDetails.phase1 === "Completed" && (
                                    <span className="ml-2 px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-full">
                                        Approved
                                    </span>
                                )}
                            </span>
                            {caseDetails.phase1 === "Completed" && (
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                            )}
                        </div>
                        <div className="px-10 py-5 bg-white">
                            <Phase1 caseId={caseDetails.caseid} caseDetails={caseDetails} />
                        </div>
                    </div>
                )}

                {/* Phase 2 */}
                {isPhase2Visible && (
                    <div className="bg-white shadow-lg rounded-lg mb-5">
                        <div className="flex justify-between items-center w-full p-10 text-primary text-2xl font-bold bg-white rounded-t-lg">
                            <span className="flex items-center">
                                Phase 2: Video Conferencing
                                {caseDetails.phase2 === "Completed" && (
                                    <span className="ml-2 px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-full">
                                        Approved
                                    </span>
                                )}
                            </span>
                            {caseDetails.phase2 === "Completed" && (
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                            )}
                        </div>
                        <div className="px-10 py-5 bg-white">
                            <Phase2 caseId={caseDetails.caseid} />
                        </div>
                    </div>
                )}

                {/* Phase 3 */}
                {isPhase3Visible && (
                    <div className="bg-white shadow-lg rounded-lg">
                        <div className="flex justify-between items-center w-full p-10 text-primary text-2xl font-bold bg-white rounded-t-lg">
                            <span className="flex items-center">
                                Phase 3: something
                                {caseDetails.phase3 === "Completed" && (
                                    <span className="ml-2 px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-full">
                                        Approved
                                    </span>
                                )}
                            </span>
                            {caseDetails.phase3 === "Completed" && (
                                <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
                            )}
                        </div>
                        <div className="px-10 py-5 bg-white">
                            <Phase3 />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CaseOngoing;
