import React, { useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";


const ApplicationModalAdmin = ({ application, closeModal }) => {
  const axiosPrivate = useAxiosPrivate();

  const handleAccept = async () => {
    try {
      const response = await axiosPrivate.put(
         `/application?applicationid=${application.applicationid}&status=Accepted`
      );
      // Handle response if needed
    } catch (error) {
      console.error("Failed to accept application:", error);
    }
    closeModal();
  };

  const handleReject = async () => {
    
    try{
      console.log("Inide the Try Block in Reject")
      const response = await axiosPrivate.put(
        `/application?applicationid=${application.applicationid}&status=Rejected`
      )
    }catch(err){
      console.error('Failed to reject application:',err)
    }
    closeModal();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm">
      <div
        id="scrollview"
        className="bg-white rounded shadow-lg w-[95%] h-[95vh]"
      >
       <div id="report" className="w-full bg-gray-50 h-[80vh] overflow-y-auto p-6">
  <h2 className="mb-4 text-2xl font-semibold text-gray-800">Personal Details of Applicant:</h2>

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">First Name:</p>
      <p className="text-gray-600">{application.firstname}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Last Name:</p>
      <p className="text-gray-600">{application.lastname}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Email Address:</p>
      <p className="text-gray-600">{application.emailaddress}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Date of Birth:</p>
      <p className="text-gray-600">{application.dob}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Gender:</p>
      <p className="text-gray-600">{application.gender}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">NIC:</p>
      <p className="text-gray-600">{application.nic}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Occupation:</p>
      <p className="text-gray-600">{application.occupation}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Nationality:</p>
      <p className="text-gray-600">{application.nationality}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Religion:</p>
      <p className="text-gray-600">{application.religion}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Number of Family Members:</p>
      <p className="text-gray-600">{application.nooffamilymembers}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Monthly Income:</p>
      <p className="text-gray-600">
    {application.monthlyincome !== null && application.monthlyincome !== undefined
      ? application.monthlyincome.toFixed(2)
      : "N/A"}
  </p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Home Address:</p>
      <p className="text-gray-600">{application.homeaddress}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">City:</p>
      <p className="text-gray-600">{application.city}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Province:</p>
      <p className="text-gray-600">{application.province}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Postal Code:</p>
      <p className="text-gray-600">{application.postalcode}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Telephone Number:</p>
      <p className="text-gray-600">{application.telphonenum}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Cellphone Number:</p>
      <p className="text-gray-600">{application.cellphonenum}</p>
    </div>
  </div>

  <h2 className="mt-8 mb-4 text-2xl font-semibold text-gray-800">Preference Details:</h2>

  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Gender of Child:</p>
      <p className="text-gray-600">{application.genderofchild}</p>
    </div>
    <div className="p-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Age Range:</p>
      <p className="text-gray-600">{application.agerange.join("-")}</p>
    </div>
    
  </div>
  <div className="p-4 my-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Reason for Fostering:</p>
      <p className="text-gray-600">{application.reasonforfostering}</p>
    </div>
    <div className="p-4 my-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Specific Needs:</p>
      <p className="text-gray-600">{application.specificneeds}</p>
    </div>
    <div className="p-4 my-4 bg-white rounded-lg shadow-sm">
      <p className="font-medium text-gray-700">Additional Comments:</p>
      <p className="text-gray-600">{application.additionalcomments}</p>
    </div>
</div>

        <div className="flex justify-start p-4 mb-4">
          <button
            onClick={handleAccept}
            className="px-4 py-2 mr-2 text-white rounded bg-primary"
          >
            Accept
          </button>
          <button
            onClick={handleReject}
            className="px-4 py-2 mr-2 text-white bg-gray-300 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModalAdmin;
