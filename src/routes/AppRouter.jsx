import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home.jsx';
import Professional from '../pages/Professional.jsx';

const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/professionals/:id" element={<Professional />} />
  </Routes>
);

export default AppRouter;


