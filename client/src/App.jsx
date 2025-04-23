import React from "react";
import LandingPage from "./components/LandingPage/LandingPage";
import VideoPlayer from "./components/UI/VideoPlayer/VideoPlayer";
import { Route, Routes } from "react-router-dom"
import LoginPage from "./components/LoginPage/LoginPage";
import SignUpPage from "./components/SignUpPage/SignUpPage";
import MainPage from "./components/MainPage/MainPage";
import PricingPage from "./components/PricingPage/PricingPage";
import DownloadsPage from "./components/DownloadsPage/DownloadsPage";
import { Analytics } from '@vercel/analytics/react';
import HeyPage from "./components/LoginPage/GradientBackground";

const App = () => {

  return (
    <div>
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<MainPage />} path="/mainPage" />
      {/* <Route element={<PricingPage />} path="/pricing" /> */}
      <Route element={<DownloadsPage />} path="/downloads" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<SignUpPage />} path="/signup" />
        <Route element={<HeyPage />} path="/login2" />
      </Routes>
      {/* <LandingPage /> */}
      <Analytics />

      {/* <VideoPlayer src="https://pub-70afb9dcfa934980b35e0d79bfed253a.r2.dev/minecraft-parkur-53a8a156-489b-46e7-85f4-c891be033525.mp4" /> */}
    </div>
  );
};

export default App;