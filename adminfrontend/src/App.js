import AdminDash from "./components/AdminDash";

import OrphanageForm from "./components/OrphanageForm";
import Orphanage from "./components/Orphanage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";
import PersistLogin from "./components/PersistLogin";
import UserDash from "./components/UserDash";
import MoreInfo from "./components/MoreInfo";

import Inbox from "./components/Inbox";

import Child from "./components/Child";
import { Toaster } from 'react-hot-toast';


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
        <Route path='/' element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path='/register' element={<Register />} />
        <Route path='/moreinfo' element={<MoreInfo />} />

        {/* Protected Routes */}

        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path='/admin' element={<AdminDash />} />
            <Route path="/addOrphanage" element={<OrphanageForm />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Head, ROLES.SocialWorker, ROLES.Staff]} />}>
            <Route path='/orphanage/:id' element={<Orphanage />} />
            <Route path='/orphanage/:id/child/:childid' element={<Child />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[ROLES.Head, ROLES.SocialWorker, ROLES.Staff, ROLES.User]} />} >
            <Route path='/userdash' element={<UserDash />} />
          </Route>





          <Route element={<RequireAuth allowedRoles={[ROLES.Head, ROLES.SocialWorker]} />}>

            <Route path='/orphanage/:id' element={<Orphanage />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Head, ROLES.Head, ROLES.SocialWorker, ROLES.User, ROLES.Staff]} />} >
            <Route path='/userdash' element={<UserDash />} />
            <Route path='/inbox' element={<Inbox />} />
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
