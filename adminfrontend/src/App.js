import AdminDash from "./components/AdminDash";

import OrphanageForm from "./components/OrphanageForm";
import Orphanage from "./components/Orphanage";
import { Route, Routes, Outlet } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import UserDash from "./components/UserDash";
import UpdateAdminDash from "./components/UpdateAdminDash";
import FosteringApplication from "./components/User Dashboard/FosteringApplication";
import FosteringApplication2 from "./components/User Dashboard/FosteringApplication2";
import FosteringApplication3 from "./components/User Dashboard/FosteringApplication3";
import FosteringMain from "./components/FosteringMain";
import Payment from "./components/Payment";

import Inbox from "./components/Inbox";

import Child from "./components/Child";
import { Toaster } from 'react-hot-toast';
import Case from "./components/Case";
import Myapplications from "./components/MoreInfo";

import UserCaseList from "./components/UserCaseList";
import CaseSW from "./components/CaseSW";

import Notification from "./components/Notification";
import LandingPage from "./components/LandingPage";
import VideoChat from "./components/VideoChat";

//user components
import UserDashboard from "./components/User Dashboard/Main";
import UserNavBar from "./components/User Dashboard/NavBar";
import Application from "./components/User Dashboard/Application";
import UserInbox from "./components/User Dashboard/Inbox";

//orphanage components
import OrphanageNavBar from "./components/Orphanage Dashboard/NavBar";
import OrphanageDashboard from "./components/Orphanage Dashboard/Main";
import SideBar from "./components/Orphanage Dashboard/SideBar";

const ROLES = {
  'User': 1010,
  'Head': 1910,
  'Staff': 5528,
  'SocialWorker': 2525,
  'Admin': 7788
}

function App() {
  return (


    <main className="App">
      <Routes>

        {/* Public Routes */}
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path='/register' element={<Register />} />
        <Route path='/donateNow' element={<Payment />} />
        <Route path='/notification' element={<Notification />} />
        <Route path='/mycases' element={<UserCaseList />} />


        {/* Protected Routes */}
        <Route element={<PersistLogin />}>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path='/admin' element={<AdminDash />} />
            <Route path="/addOrphanage" element={<OrphanageForm />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Head, ROLES.SocialWorker, ROLES.Staff, ROLES.User]} />} >
            <Route path="/chatroom/:roomId" element={<VideoChat />} />
            <Route path='/mycases' element={<UserCaseList />} />
          </Route>

          {/*orphanage routes*/}
          <Route path="/orphanage" element={<RequireAuth allowedRoles={[ROLES.Head, ROLES.SocialWorker, ROLES.Staff]} />}>
            <Route
              element={(
                <>
                  <OrphanageNavBar />
                  <Outlet />
                </>
              )}
            >
              <Route path=':id' element={<Orphanage />} />
              <Route path=':id/edit' element={<UpdateAdminDash />} />
              <Route path=':id/child/:childid' element={<Child />} />
              <Route path=':id/case/:caseId' element={<Case />} />
              <Route path=':id/edit' element={<UpdateAdminDash />} />
            </Route>
          </Route>

          {/*user routes*/}
          <Route path="/user" element={<RequireAuth allowedRoles={[ROLES.Head, ROLES.Head, ROLES.SocialWorker, ROLES.User]} />} >
            <Route
              element={(
                <>
                  <UserNavBar />
                  <Outlet />
                </>
              )}
            >
              {/*old routes : not needed*/}
              <Route path='userdash' element={<FosteringMain />} />
              <Route path='fosteringmain' element={<FosteringMain />} />
              <Route path='applications' element={<FosteringApplication />} />
              <Route path='fostering2' element={<FosteringApplication2 />} />
              <Route path='fostering3' element={<FosteringApplication3 />} />
              <Route path='myapplications' element={<Myapplications />} />
              {/*new routes*/}
              <Route path='dashboard' element={<UserDashboard />} />
              <Route path='application' element={<Application />} />
              <Route path='inbox' element={<UserInbox />} />
            </Route>
          </Route>

        </Route>


        {/* <Route path="/" element={<Authorization />} />

        <Route path="/admin" element={<AdminDash />} />

        <Route path="/admin/addOrphanage" element={<OrphanageForm />} />

        <Route path="/orphanage" element={<Orphanage />}>
          <Route path=":orphanageId" element={<Orphanage />} />
        </Route> */}
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </main>
  );
}

export default App;
