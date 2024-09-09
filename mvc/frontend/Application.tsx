import React from 'react';
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Forms from './pages/Forms';
import Floorplan from './pages/Floorplan';

const root = ReactDOM.createRoot(document.querySelector('#application')!);
root.render( 
    <BrowserRouter>
        <Routes> 
            <Route index element = {<Home/>} />
            <Route path="/Forms" element = {<Forms/>} />
            <Route path="/Floorplan" element = {<Floorplan/>} />
        </Routes>
    </BrowserRouter>
);