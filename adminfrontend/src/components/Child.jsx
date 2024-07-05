// Child.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import ChildEditForm from './ChildEditForm';

const Child = () => {

  const getAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (age > 0 && (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))) {
      return age - 1;
    }
    return age;
  }

  const getDob = (dob) => {
    const date = new Date(dob);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const getBasicInfo = (child) => {
    return {
      'Full Name': child.name,
      'Date of Birth': getDob(child.date_of_birth),
      'Age as of today': getAge(child.date_of_birth),
      'Gender': child.gender,
      'Nationality': child.nationality,
      'Religion': child.religion,
      'Medical Details': child.medicaldetails,
      'Educational Details': child.educationaldetails,
    }
  }

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate()
  const [child, setChild] = useState({})
  const [formVisibility, setFormVisibility] = useState(false);
  const { id, childid } = useParams('')
  const [imageURL, setImageURL] = useState('')
  const [basicInfo, setBasicInfo] = useState(getBasicInfo(child))

  const getChild = async () => {
    try {
      const response = await axiosPrivate.get(`/child/${childid}`);
      setChild(response.data.child)
      setImageURL(`https://avatar.iran.liara.run/public/${response.data.child.gender === 'Male' ? 'boy' : 'girl'}?username=${response.data.child.name.split(' ').join('')}`)
    } catch (error) {
      console.error("Failed to fetch child:", error);
    }
  }

  useEffect(() => {
    console.log('setBasic')
    setBasicInfo(getBasicInfo(child))
  }, [child]);

  useEffect(() => {
    getChild()
  }, []);

  return (
    <div>
      <button onClick={() => navigate(`/orphanage/${id}`, { replace: true })} className="m-3 items-end bg-transparent hover:bg-orange-600 text-orange-600 font-normal hover:text-white py-2 px-4 border border-orange-600 hover:border-transparent rounded">
        Back
      </button>
      <div className="mx-auto relative flex flex-col lg:flex-row mt-6 text-gray-700 bg-orange-100 shadow-md bg-clip-border rounded-xl w-2/3">
        <img className="w-64 my-auto p-10 rounded-full md:rounded-full mx-auto" src={imageURL} alt="ERROR" />

        <div className="p-6 m-auto text-center lg:text-left">
          <h5 className="block mb-2 font-sans text-4xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            {child.name}
          </h5>
          <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-white bg-orange-600 uppercase mb-2">
            Some Orphanage
          </span>
          <p className="block font-sans text-base antialiased font-normal leading-relaxed text-inherit">
            {child.gender} &#183; {getAge(child.date_of_birth)} years old
          </p>
          <div>
            <button onClick={() => setFormVisibility(true)} className="m-3 mt-4 ml-0 items-end bg-transparent hover:bg-orange-600 text-orange-600 font-normal hover:text-white py-2 px-4 border border-orange-600 hover:border-transparent rounded">
              Edit Profile
            </button>
            <button className="m-3 items-end bg-transparent hover:bg-orange-600 text-orange-600 font-normal hover:text-white py-2 px-4 border border-orange-600 hover:border-transparent rounded">
              Upload Documents
            </button>
          </div>
        </div>
      </div>


      <div className="mx-auto relative mt-6 text-black shadow-md bg-clip-border rounded-xl w-2/3 divide-y">

        <div className="p-6 m-auto text-left ">
          <h5 className="block mb-4 font-sans text-4xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
            Basic Information
          </h5>

          <div className='block font-sans text-m md:text-2xl antialiased font-light leading-relaxed text-inherit ml-5'>
            <table >
              <thead>

              </thead>
              <tbody className='divide-y-0'>
                {Object.entries(basicInfo).map(([key, value]) => (
                  <tr key={key} className="bg-white">
                    <th scope="row" className="font-light">
                      {key}
                    </th>
                    <td className='pl-5 flex'>
                      : <p className='ml-5'> {value}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        <div>
          <div className="p-6 m-auto text-left ">
            <h5 className="block mb-4 font-sans text-4xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Documents
            </h5>
          </div>
        </div>
      </div>

      {formVisibility ? <ChildEditForm setFormVisibility={setFormVisibility} child={child} setChild={setChild} imageURL={imageURL} setImageURL={setImageURL} /> : null}

    </div>


  );
};

export default Child;
