import "./App.css";
import { Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Navbar from "./components/Navbar";
import ProtectRoute from "./components/ProtectRoute";
import ProfileBusinessPage from "./pages/ProfileBusinessPage";
import BusinessCreateOffer from "./pages/BusinessCreateOffer";
import JobsPage from "./pages/JobsPage";
import JobDetailPage from "./pages/JobDetailPage";
import HomePage from "./pages/HomePage";
import EditOffer from "./pages/EditOffer";
import JobDetailPublic from "./pages/JobDetailPublic";

function App() {
   return (
      <div className="bg-gray-100 min-h-screen">
         <Navbar />
         <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <Routes>
               {/* Rotas que não devem ser protegidas */}
               <Route path="/" element={<HomePage />} />
               <Route path="/login" element={<LoginPage />} />
               <Route path="/signup" element={<SignupPage />} />
               <Route path="/jobs/public/:id_job" element={<JobDetailPublic />} />


               {/* Rota protegida */}
               <Route
                  path="/profile"
                  element={<ProtectRoute Component={ProfilePage} />}
               />
               <Route
                  path="/profile-business"
                  element={<ProtectRoute Component={ProfileBusinessPage} />}
               />
               <Route
                  path="/business/criar-vaga"
                  element={<ProtectRoute Component={BusinessCreateOffer} />}
               />

               <Route
                  path="/business/editar-vaga/:id_job"
                  element={<ProtectRoute Component={EditOffer} />}
               />

               <Route
                  path="/jobs"
                  element={<ProtectRoute Component={JobsPage} />}
               />

               <Route
                  path="/jobs/:id_job"
                  element={<ProtectRoute Component={JobDetailPage} />}
               />
            </Routes>
         </div>
      </div>
   );
}

export default App;
