import './Sidebar.css'
import {NavLink} from 'react-router-dom'
import {BiHomeAlt} from 'react-icons/bi'
import {HiOutlineTicket} from 'react-icons/hi'
import {IoNewspaperOutline} from 'react-icons/io5'
import {AiOutlineSetting} from 'react-icons/ai'

const Sidebar:React.FC = () =>{
    return (
        <div className = 'side-bar'>
            <div className = 'side-bar--logo'>
                <img src = '/images/logo-sidebar.png'/>
            </div>
            <div className = 'side-bar__option'>
                <ul>
                    <li>
                        <NavLink style = {({isActive})=>{if(isActive){return {backgroundColor: '#FFB800', color: 'white'}}else{return {}}}} to = '/dashboard'><BiHomeAlt size = {22} style = {{verticalAlign: '-3px', marginRight: '10px'}}/>Trang chủ</NavLink>
                    </li>
                    <li>
                        <NavLink style = {({isActive})=>{if(isActive){return {backgroundColor: '#FFB800', color: 'white'}}else{return {}}}} to = '/ticket-management'><HiOutlineTicket size = {22} style = {{verticalAlign: '-5px', marginRight: '10px'}}/>Quản lý vé</NavLink>
                    </li>
                    <li>
                        <NavLink style = {({isActive})=>{if(isActive){return {backgroundColor: '#FFB800', color: 'white'}}else{return {}}}} to = '/check-ticket'><IoNewspaperOutline size = {22} style = {{verticalAlign: '-3px', marginRight: '10px'}}/>Đối soát vé</NavLink>
                    </li>
                    <li>
                        <NavLink style = {({isActive})=>{if(isActive){return {backgroundColor: '#FFB800', color: 'white', pointerEvents: 'none'}}else{return {pointerEvents: 'none'}}}}  to = '/setting'><AiOutlineSetting size = {22} style = {{verticalAlign: '-3px', marginRight: '10px'}}/>Càt đặt</NavLink>
                        <div className = 'sub-navlink'>
                            <NavLink style ={{padding: '0'}} to = '/setting/service'>Gói dịch vụ</NavLink>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar