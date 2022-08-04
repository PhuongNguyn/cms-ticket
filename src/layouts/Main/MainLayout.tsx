import Sidebar from "../../components/Sidebar/Sidebar"
import { Outlet } from "react-router"
import './MainLayout.css'
import Header from "../../components/Header/Header"
import { useLocation } from "react-router"

const MainLayout:React.FC = () =>{
    const path = useLocation().pathname
    const url:string = path.split('/')[path.split('/').length - 1]
    const urlTitle:{[key:string]:string} = {
        'dashboard': 'Thống kê',
        'ticket-management':'Danh sách vé',
        'check-ticket': 'Đối soát vé',
        'service': 'Danh sách gói vé'
    }

    return (
        <div className = 'main-layout'>
            <div className = 'main-layout__sidebar'>
                <Sidebar/>
            </div>
            <div className = 'main-layout__main-content'>
                <Header/>
                <div className = 'main-content__outlet'>
                    <h1 className = 'main-content__outlet--title'>{urlTitle[url]}</h1>
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default MainLayout