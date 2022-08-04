import './Header.css'
import { BiSearch } from 'react-icons/bi'
import { AiOutlineMail } from 'react-icons/ai'
import {IoNotificationsOutline} from 'react-icons/io5'

const Header:React.FC = () =>{
    return (
        <div className = 'header'>
            <div className = 'header--wrapper'>
                <div className = 'header__search'>
                    <input type = "text" placeholder='Search'/>
                    <BiSearch size = {24} className='header__search--icon'/>
                </div>
                <div className = 'header__option'>
                    <AiOutlineMail size = {24} style = {{cursor: 'pointer'}}/>
                    <IoNotificationsOutline size = {24} style = {{cursor: 'pointer', marginLeft: '24px'}}/>
                    <div className = 'header__option-avatar' style={{background:'url("/images/user-avatar.png")'}}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header