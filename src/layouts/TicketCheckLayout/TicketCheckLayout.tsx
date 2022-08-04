import './TicketCheckLayout.css'
import { Outlet, useLocation } from 'react-router'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'

const TicketCheckLayout:React.FC = () =>{
  
    return (
        <div className = 'ticket-check-layout'>
            <div className = 'main-layout__sidebar'>
                <Sidebar/>
            </div>
            <div className = 'ticket-chect-layout__main-content'>
                <Header/>
                <div className = 'main-content__ticket-check-outlet'>
                   <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default TicketCheckLayout