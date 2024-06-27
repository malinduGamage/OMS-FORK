import AdminDash from "./components/AdminDash";

import OrphanageForm from "./components/OrphanageForm";
import Orphanage from "./components/Orphanage";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import RequireAuth from "./components/RequireAuth";
import Unauthorized from "./components/Unauthorized";


const ROLES ={
  'User':1010,
  'Head':1910,
  'SocialWorker':2525,
  'Admin':7788
}

function App() {
  return (
    <main className="App">
      <Routes>

        {/* Public Routes */}
        <Route path='/' element={<Login/>}/>
        <Route path="/unauthorized" element={<Unauthorized/>}/>
        <Route path='/register' element={<Register/>}/>

        {/* Protected Routes */}

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}/>}>
        
          <Route path='/admin' element={<AdminDash/>}/>
          <Route path="/addOrphanage" element={<OrphanageForm/>}/>
        </Route>


        <Route element={<RequireAuth allowedRoles={[ROLES.Head]}/>}>
        
        <Route path='/orphanage/:id' element={<Orphanage/>}/>
      </Route>









        {/* <Route path="/" element={<Authorization />} />

        <Route path="/admin" element={<AdminDash />} />

        <Route path="/admin/addOrphanage" element={<OrphanageForm />} />

        <Route path="/orphanage" element={<Orphanage />}>
          <Route path=":orphanageId" element={<Orphanage />} />
        </Route> */}
      </Routes>
    </main>
  );
}

export default App;
