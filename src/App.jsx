import React from "react";
import { Routes, Route, Navigate } from 'react-router-dom'
import SplashScreen from './pages/SplashScreen.jsx'
import LoginPage from './pages/LoginPage.jsx'
import FeedPage from './pages/FeedPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'

export default function App(){
  return (
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/crear-cuenta" element={<RegisterPage />} />
      <Route path="/feed" element={<FeedPage />} />
      <Route path="/perfil" element={<ProfilePage />} />
      <Route path="/upload" element={<UploadPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
