import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate } from 'react-router-dom'

import SplashScreen from './pages/SplashScreen.jsx'
import LoginPage from './pages/LoginPage.jsx'
import FeedPage from './pages/FeedPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import FacultyGroupPage from "./pages/FacultyGroupPage.jsx";
import CareerGroupPage from "./pages/CareerGroupPage.jsx";
import ClassGroupPage from "./pages/ClassGroupPage.jsx";
import PlanGroupPage from "./pages/PlanGroupPage.jsx";
import MisPublicacionesPage from "./pages/MisPublicacionesPage.jsx";

export default function App(){

  // 🔹 estado global para datos del backend
  const [uv, setUv] = useState(null);

  // 🔹 llamada a la API
useEffect(() => {
  fetch("http://localhost:8080/api/uv")
    .then(res => res.json())
    .then(data => {
      console.log("DATOS OK:", data);
      setUv(data);
    })
    .catch(err => console.error("Error API UV:", err));
}, []);




  return (
    <>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/crear-cuenta" element={<RegisterPage />} />

        {/* PASAMOS DATOS AL FEED */}
        <Route path="/feed" element={<FeedPage uv={uv} />} />

        <Route path="/mis-publicaciones" element={<MisPublicacionesPage />} />
        <Route path="/perfil" element={<ProfilePage />} />
        <Route path="/upload" element={<UploadPage />} />

        {/* GRUPOS */}
        <Route path="/grupo-facultad" element={<FacultyGroupPage />} />
        <Route path="/grupo-carrera" element={<CareerGroupPage />} />
        <Route path="/grupo-salon" element={<ClassGroupPage />} />
        <Route path="/grupo-plan" element={<PlanGroupPage />} />

        {/* DEFAULT */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
