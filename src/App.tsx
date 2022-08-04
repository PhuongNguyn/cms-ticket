import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import Dashboard from './pages/Dashboard/Dashboard';
import MainLayout from './layouts/Main/MainLayout';
import ManageTicket from './pages/ManageTicket/ManageTicket';
import LoadingBar from 'react-redux-loading-bar'
import { useEffect } from 'react';
import { getServices } from './redux/action/service';
import {useDispatch} from 'react-redux'
import { Dispatch } from 'redux';
import CheckTicket from './pages/CheckTicket/CheckTicket';
import TicketCheckLayout from './layouts/TicketCheckLayout/TicketCheckLayout';
import Service from './pages/Service/Service';
import 'antd/dist/antd.css';
import toast, { Toaster } from 'react-hot-toast';



function App() {
  const dispatch:Dispatch = useDispatch()
  return (
    <div className="App">
       <Toaster />
      <LoadingBar style={{ backgroundColor: '#FF7506', height: '2px', position: 'fixed', top: '0', zIndex: '50' }}/>
      <Routes>
          <Route path = '/' element = {<MainLayout/>}>
             <Route path = 'dashboard' element = {<Dashboard/>}/>
             <Route path = 'ticket-management' element = {<ManageTicket/>} />
             <Route path = 'setting/service' element = {<Service/>}/>
          </Route>
          <Route path = '/check-ticket' element = {<TicketCheckLayout/>}>
            <Route index element = {<CheckTicket/>}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
