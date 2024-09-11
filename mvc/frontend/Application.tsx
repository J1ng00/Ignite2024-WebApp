import React from 'react';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Forms from './pages/Forms';
import Floorplan from './pages/Floorplan';

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector('#application');
    console.log(container);  // Log after DOM is ready
  
    if (!container) {
      throw new Error('Root container `#application` not found!');
    }
  
    const root = ReactDOM.createRoot(container);
    root.render( 
        <BrowserRouter>
            <Routes> 
                <Route index element = {<Home/>} />
                <Route path="/Forms" element = {<Forms/>} />
                <Route path="/Floorplan" element = {<Floorplan/>} />
            </Routes>
        </BrowserRouter>
    )
  });