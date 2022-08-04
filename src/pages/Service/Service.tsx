import './Service.css'
import { BiSearch } from 'react-icons/bi'
import {useSelector, useDispatch} from 'react-redux'
import IService from '../../interface/IService'
import {useState} from 'react'
import {AiOutlineCaretLeft , AiOutlineCaretRight} from 'react-icons/ai'
import { BsDot } from 'react-icons/bs'
import {FiEdit} from 'react-icons/fi'
import { useEffect } from 'react'
import { getServices } from '../../redux/action/service'
import { Dispatch } from 'redux'
import AddService from '../../components/AddService/AddService'
import EditService from '../../components/EditService/EditService'

const Service:React.FC = () => {
    const dispatch:Dispatch = useDispatch()
    const [addServiceBox, setAddServiceBox] = useState<boolean>(false)
    const [editBox, setEditBox] = useState<{isOpen: boolean, service: IService}>({isOpen: false, service: {
        code: '',
        date_used:'',
        expired_date: '',
        price: '',
        price_combo:'',
        name: '',
        status: false,
        time_expired: '',
        time_used: ''
    }})
    const [currentPage, setCurrenPage] = useState<number>(1)
    const services:IService[] = useSelector((state:any) => state.service)
    const itemPerPage:number = 8
    const pagesLength:number = services.length % itemPerPage == 0 ? services.length / itemPerPage : services.length / itemPerPage + 1
    let pages:number[] = []
    for(let i:number = 1; i <= pagesLength; i++){
        pages.push(i)
    }
    const handleLeftPageClick:(e:React.SyntheticEvent)=>void = (e:React.SyntheticEvent) =>{
        if(currentPage == 1){
            e.preventDefault()
        }else{
            setCurrenPage(currentPage - 1)
        }
    }

    useEffect(()=>{
        dispatch(getServices(currentPage))
    },[currentPage])

    const handleRightPageClick:(e:React.SyntheticEvent)=>void = (e:React.SyntheticEvent) =>{
        if(currentPage == pages[pages.length - 1]){
            e.preventDefault()
        }else{
            setCurrenPage(currentPage + 1)
        }
    }
    return (
        <div className = 'service'>
            {addServiceBox && <AddService setStateFunc = {setAddServiceBox}/>}
            {editBox.isOpen && <EditService setStateFunc= {setEditBox} state = {editBox}/>}
            <div className = 'service__header'>
                <div className = 'service__header-search-bar'>
                    <input type = 'text' placeholder='Tìm bảng số vé'/>
                    <BiSearch className = 'service__header-search-bar--icon' size={24}/>
                </div>
                <div className = 'service__header-option'  style = {{marginLeft: '4px', }}>
                    <div className = 'service__header-option-export'>
                        <span>Xuất file (.csv)</span>
                    </div>
                    <div onClick={()=>setAddServiceBox(true)} className = 'service__header-option-add-service'>
                        <span >Thêm gói vé</span>
                    </div>
                </div>
            </div>
            <div className = 'service__table'>
                <table>
                    <thead>
                        <tr>
                            <td width={50}>STT</td>
                            <td width={100}>Mã gói</td>
                            <td width={100}>Tên gói vé</td>
                            <td width={150}>Ngày áp dụng</td>
                            <td width={150}>Ngày hết hạn</td>
                            <td width={150}>Giá vé (VNĐ/Vé)</td>
                            <td width={170}>Giá combo (VNĐ/Vé)</td>
                            <td width={170}>Tình trạng</td>
                            <td width={130}></td>
                        </tr>
                    </thead>
                    <tbody>
                       {
                        services.slice((currentPage - 1) * 8, itemPerPage * (currentPage)).map((item, index) => {
                            return (
                                <tr>
                                    <td width={50}>{index + (currentPage - 1) * itemPerPage + 1}</td>
                                    <td width={100}>{item.code}</td>
                                    <td width={100}>{item.name}</td>
                                    <td width={150}>
                                        <p style = {{marginBottom: '4px'}}>{item.date_used}</p>
                                        <p style = {{marginBottom: '4px'}}>{item.time_used}</p>
                                    </td>
                                    <td width={150}>
                                        <p style = {{marginBottom: '4px'}}>{item.expired_date}</p>
                                        <p style = {{marginBottom: '4px'}}>{item.time_expired}</p>
                                    </td>
                                    <td width={150}>{item.price} VNĐ</td>
                                    <td width={170}>{item.price_combo} VNĐ</td>
                                    <td width={170}><span className = {item.status ? 'service-table--service-status-open' : 'service-table--service-status-close'}><BsDot size = {25} style = {{verticalAlign: '-8px'}}/>{item.status ? 'Đang sử dụng': 'Tắt'}</span></td>
                                    <td width={130}><span onClick = {()=> setEditBox({...editBox, isOpen: true, service: item})} className = 'service-table--edit-service'><FiEdit size = {16} style = {{verticalAlign: '-3px'}} /> Cập nhật</span></td>
                                </tr>
                            )
                        })
                       }
                    </tbody>
                </table>
            </div>
            <div className = "dividePage">
                <ul>
                    <li onClick = {(e)=>handleLeftPageClick(e)}><AiOutlineCaretLeft style = {{verticalAlign: '-2.5px'}}/></li>
                    {pages.map((page)=>
                        <li onClick = {()=>setCurrenPage(page)} style = {currentPage == page ? {border: '1px solid #FF7506'}: {}}>{page}</li>
                    )}
                    <li onClick = {(e)=>handleRightPageClick(e)}><AiOutlineCaretRight style = {{verticalAlign: '-2.5px'}}/></li>
                </ul>
            </div>
        </div>
    )
}

export default Service