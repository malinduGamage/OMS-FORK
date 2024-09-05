import React, { useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const Lobby = () => {
  const navigate = useNavigate();
  const { caseId } = useParams(); 
  const linkRef = useRef();

  useEffect(() => {
    if (caseId) {
      linkRef.current.value = caseId; // Set the input value to roomId if it's available
    }
  }, [caseId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const inviteCode = e.target.invite_link.value;

   
    navigate(`/chatroom/${inviteCode}`, { replace: true });
  };

  return (
    <div>
      <h1 className='text-primary font-bold mt-20 text-3xl'>Video Conference</h1>
     
      <div className="p-5 max-w-[500px]">
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="invite_link"
            placeholder="Enter invite link"
            required
            ref={linkRef} 
            className="w-full p-4 mt-8 rounded-md focus:outline-none"
          />
          <input
            type="submit"
            value="Join Room"
            className="w-full text-primary border-2 border-primary font-semibold hover:text-white transition-colors duration-300 hover:bg-primary p-4 mt-4 rounded-md cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Lobby;
