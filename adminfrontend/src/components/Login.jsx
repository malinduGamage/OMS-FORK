import React, { useEffect, useRef, useState } from 'react'
import useAuth from '../hooks/useAuth'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'
import axios, { axiosPrivate } from '../api/axios'
import { jwtDecode } from 'jwt-decode'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
const ROLES ={
  'User':1010,
  'Head':1910,
  'SocialWorker':2525,
  'Admin':7788
}

const Login = () => {


    

    const {setAuth} = useAuth()

    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location=useLocation()
    const from = location.state?.from?.pathname ||'/'


    const emailRef = useRef();
    const errRef= useRef();

    const [email,setEmail] = useLocalStorage('email','')
    const [password,setPassword] = useState('')

    const [formError,setFormError] = useState('')

    useEffect(()=>{
        emailRef.current.focus()
    },[])

    useEffect(()=>{
        setFormError('')
    },[email,password])



    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post('/login', JSON.stringify({ email, password }), {
              headers: {
                  'Content-Type': 'application/json'
              },
              withCredentials: true
          });
  
          // Debug log for response data
          console.log(JSON.stringify(response?.data));
  
          const accessToken = response?.data?.accessToken;
          const decoded = jwtDecode(accessToken);
          const roles = decoded?.UserInfo?.roles || [];
          const userId = decoded?.UserInfo?.userId
         
  
          setAuth({ accessToken, roles });
          setEmail('');
          setPassword('');
  
          // Check roles to navigate
          if (roles.includes(ROLES.Admin)) {
              navigate('/admin', { replace: true });
          } else if (roles.includes(ROLES.Head)) {

            try {

              const orphanageResponse = await axiosPrivate.get(`/orphanage/byHead`)
              // Extract the orphanageId from the response
              const orphanageId = orphanageResponse?.data?.orphanageId;
              
              // Navigate to the new route with the obtained orphanageId
              navigate(`/orphanage/${orphanageId}`, { replace: true });
              
              
            } catch (error) {

              console.error('Failed to fetch orphanage:', error);
        setFormError('Failed to fetch orphanage information');

              
              
            }


          } else {
              navigate(from, { replace: true });
          }
  
      } catch (err) {
          if (!err?.response) {
              setFormError('No Server Response');
          } else if (err.response?.status === 400) {
              setFormError('Missing Username or Password');
          } else if (err.response?.status === 401) {
              setFormError('Unauthorized');
          } else {
              setFormError('Login Failed');
          }
          errRef.current.focus();
      }
  };



  return (
   <section className='mt-10'>
    <p ref={errRef} className={formError ? 'font-semibold text-md':'absolute left:[-9999px]'}>{formError}</p>

    <h1 className="text-center text-lg font-bold text-primary mb-5">
            Log In
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 mx-20">
            <div className="flex flex-col w-full">
              <label className="text-md font-semibold mb-3" htmlFor="email">
                Email:
              </label>
              <input
                className="w-full bg-gray-100 h-[40px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
                type="email"
                ref={emailRef}
                autoComplete='off'
                onChange={(e)=>setEmail(e.target.value)}
                id="email"
                
                value={email}
                required
              />
            </div>

            <div className="flex flex-col w-full">
              <label className="text-md font-semibold mb-3" htmlFor="password">
                Password:
              </label>
              <input
                className="w-full bg-gray-100 h-[40px] rounded-md px-4 py-3 border-none focus-visible:ring-primary !important"
                type="password"
                onChange={(e)=>setPassword(e.target.value)}
                id="password"
              
                value={password}
                required
              />
            </div>

            <div className="flex justify-between ">
              <button
                type="submit"
                className="bg-primary text-white font-semibold mb-10 w-1/4 py-3 hover:bg-white hover:border-2 hover:border-primary hover:text-primary transition-all duration-300"
              >
                Log in
              </button>

              <div>
                Don't have an account?{" "}
                <span
                 
                  className="text-primary underline cursor-pointer"
                >
                 <Link to={'/register'}>Sign Up</Link>
                </span>
              </div>
            </div>
          </form>


   </section>
  )
}

export default Login
