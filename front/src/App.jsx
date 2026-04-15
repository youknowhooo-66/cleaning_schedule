import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";
import Bookings from "./pages/Bookings";
import Layout from "./components/Layout";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import EsqueciSenha from "./pages/EsqueciSenha";
import ResetarSenha from "./pages/ResetarSenha";

export default 
function App(){

    return(

        <BrowserRouter>
        
        <Routes>

        <Route path="/" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
        <Route path="/admin" element={<Layout><Admin/></Layout>}/>
        <Route path="/bookings" element={<Layout><Bookings/></Layout>}/>
        
        <Route path="/esqueci-senha" element={<EsqueciSenha/>}/>
        <Route path="/resetar-senha/:token" element={<ResetarSenha/>}/>

        </Routes>

        <ToastContainer position="top-right" autoClose={1500} />
        
        </BrowserRouter>
    )
}