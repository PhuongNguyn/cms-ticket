import './ManageTicket.css'
import { BiSearch } from 'react-icons/bi'
import {FiFilter} from 'react-icons/fi'
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
import { AiOutlineCaretRight, AiOutlineCaretLeft, AiOutlineCalendar } from 'react-icons/ai'
import ITicket from '../../interface/ITicket'
import { BiDotsVertical } from 'react-icons/bi'
import {BsDot} from 'react-icons/bs'
import ticketSelector from '../../redux/selector/ticketSelector'
import CalendarComponent from '../../components/Calendar/Calendar'
import { useDispatch } from 'react-redux'
import { getTicket } from '../../redux/action/ticket'
import { Dispatch } from 'redux'

const ManageTicket:React.FC = () =>{
    const dispatch:Dispatch = useDispatch()
    const [radioButtonFilter, setRadioButtonFilter] = useState<string>('all')
    const [gateFilter, setGateFilter] = useState<string[]>(['all'])
    const [filterBox, setFilterBox] = useState<boolean>(false)
    const [timeFrom, setTimeFrom] = useState<string>('0/0/0000')
    const [calendarTimeFrom, setCalendarTimeFrom] = useState<boolean>(false)
    const [calendarTimeTo, setCalendarTimeTo] = useState<boolean>(false)
    const [timeTo, setTimeTo] = useState<string>('0/0/0000')
    const data:ITicket[] = useSelector((state:any) => state.ticket)
    const tickets = ticketSelector(timeFrom, timeTo, radioButtonFilter, gateFilter, data)
    const [optionBox, setOptionBox] = useState<string[]>([])
    const [currentPage, setCurrenPage] = useState<number>(1)
    const itemPerPage:number = 8
    const pagesLength:number = tickets.length % itemPerPage == 0 ? tickets.length / itemPerPage : tickets.length / itemPerPage + 1
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

    const handleRightPageClick:(e:React.SyntheticEvent)=>void = (e:React.SyntheticEvent) =>{
        if(currentPage == pages[pages.length - 1]){
            e.preventDefault()
        }else{
            setCurrenPage(currentPage + 1)
        }
    }

    const handleClickOptionDot:(code:string) => void = (code:string) =>{
        if(optionBox.includes(code)){
            setOptionBox(optionBox.filter((item) => item != code))
        }else{
            setOptionBox([...optionBox, code])
        }
    }

    let statusStyle:{
        border: string,
        backgroundColor: string,
        color: string,
        padding: string,
        borderRadius: string,
        fontSize: string,
        lineHeight: string,
    } = {
        border: '',
        backgroundColor: '',
        color: '',
        padding: '8px 12px',
        borderRadius: '4px',
        fontSize: '12px',
        lineHeight: '15px',
    }

    const statusList:{[key: string]:string} = {
        'all': 'Tất cả',
        'used': 'Đã sử dụng',
        'notused': 'Chưa sử dụng',
        'expired': 'Hết hạn'
    }


    const handleRadioCheck:(value:string) => void = (value:string) =>{
        setRadioButtonFilter(value)
    }

    const handleGateFilter:(value:string) => void = (value:string) =>{
        if(value == 'all'){
            if(gateFilter.includes(value)){
                setGateFilter(gateFilter.filter((item) => item != value))
            }else{
                setGateFilter([...gateFilter, value])
            }
        }else{
            if(gateFilter.includes(value)){
                setGateFilter(gateFilter.filter((item) => item != value))
            }else{
                setGateFilter([...gateFilter, value])
            }
        }
    }

    const handleFilterClick:() => void = () =>{
        setFilterBox(false)
    }

    useEffect(()=>{
        dispatch(getTicket(currentPage))
    },[currentPage])

    return (
        <div className = "manage-ticket">
            {filterBox && <div className = 'manage-ticket__filter'>
                <div className = 'manage-ticket__filter-wrapper'>
                    <h1 className = 'manage-ticket__filter--title'>Lọc vé</h1>
                    <div className ='manage-ticket__filter-date'>
                        <div className ='manage-ticket__filter-date-from'>
                            <p className = 'manage-ticket__filter-date-from--title'>Từ ngày</p>
                            <div className = 'dashboard__chart-header-calendar'>
                                <p>{timeFrom} <AiOutlineCalendar onClick = {()=>setCalendarTimeFrom(!calendarTimeFrom)}  style = {{color: '#FF993C', verticalAlign: '-4px', marginLeft: '6px', cursor: 'pointer'}} size = {20}/></p>
                            </div>
                            {calendarTimeFrom && <CalendarComponent setStateFunc = {setTimeFrom}/>}
                        </div>
                        <div className ='manage-ticket__filter-date-to'>
                            <p className = 'manage-ticket__filter-date-to--title'>Đến ngày</p>
                            <div className = 'dashboard__chart-header-calendar'>
                                <p>{timeTo} <AiOutlineCalendar onClick = {()=>setCalendarTimeTo(!calendarTimeTo)} style = {{color: '#FF993C', verticalAlign: '-4px', marginLeft: '6px', cursor: 'pointer'}} size = {20}/></p>
                            </div>
                            {calendarTimeTo && <CalendarComponent setStateFunc = {setTimeTo}/>}
                        </div>
                    </div>
                    <div className = 'manage-ticket__filter__status'>
                        <p className = 'manage-ticket__filter__status--title'>
                            Tình trạng sử dụng
                        </p>
                        <div className = 'manage-ticket__filter-status-option'>
                            <input type='radio' value='all' id = 'all' checked = {radioButtonFilter == 'all'} onClick = {()=>handleRadioCheck('all') }/>
                            <label htmlFor='all'>Tất cả</label>
                            <input type='radio' value='used' id = 'used' checked = {radioButtonFilter == 'used'} onClick = {()=>handleRadioCheck('used')}/>
                            <label htmlFor='notused' >Đã sử dụng</label>
                            <input type='radio' value='notused' id = 'notused' checked = {radioButtonFilter == 'notused'} onClick = {()=>handleRadioCheck('notused')}/>
                            <label htmlFor='used'>Chưa sử dụng</label>
                            <input type='radio' value='expired' onClick = {()=>handleRadioCheck('expired')} checked = {radioButtonFilter == 'expired'} id = 'expired'/>
                            <label htmlFor='expired'>Đã hết hạn</label>
                        </div>
                    </div>
                    <div className = 'manage-ticket__filter-gate'>
                        <p className = 'manage-ticket__filter-gate--title'>Cổng check - in</p>
                        <div className = 'manage-ticket__filter-gate-option'>
                            <div className = 'manage-ticket__filter-gate-option-group1'>
                                <input type = 'checkbox' onClick = {()=>handleGateFilter('all')} checked = {gateFilter.includes('all')}/>
                                <label>Tất cả</label>
                                <input type = 'checkbox' onClick = {()=>handleGateFilter('Cổng 1')} disabled = {gateFilter[0] == 'all'} checked = {gateFilter.includes('Cổng 1')}/>
                                <label>Cổng 1</label>
                                <input type = 'checkbox' onClick = {()=>handleGateFilter('Cổng 2')} disabled = {gateFilter[0] == 'all'} checked = {gateFilter.includes('Cổng 2')}/>
                                <label>Cổng 2</label>
                            </div>
                           <div className = 'manage-ticket__filter-gate-option-group2'>
                                <input type = 'checkbox' onClick = {()=>handleGateFilter('Cổng 3')} disabled = {gateFilter[0] == 'all'} checked = {gateFilter.includes('Cổng 3')}/>
                                <label>Cổng 3</label>
                                <input type = 'checkbox' onClick = {()=>handleGateFilter('Cổng 4')} disabled = {gateFilter[0] == 'all'} checked = {gateFilter.includes('Cổng 4')}/>
                                <label>Cổng 4</label>
                                <input type = 'checkbox' onClick = {()=>handleGateFilter('Cổng 5')} disabled = {gateFilter[0] == 'all'} checked = {gateFilter.includes('Cổng 5')}/>
                                <label>Cổng 5</label>
                           </div>
                        </div>
                    </div>
                    <div className = 'button__filter'>
                            <button onClick = {()=>handleFilterClick()}>Lọc</button>
                        </div>
                </div>
            </div>}
            <div className = 'manage-ticket__header'>
                <div className = 'header__search'>
                    <input type = "text" placeholder='Tìm bảng số vé'/>
                    <BiSearch size = {24} className='header__search--icon'/>
                </div>
                <div className = 'manage-ticket__header-option'  style = {{marginLeft: '4px', }}>
                    <div onClick = {()=>setFilterBox(true)} className = 'manage-ticket__header-option-filter'>
                        <FiFilter size = {17} style = {{verticalAlign: '-3px'}}/>
                        <span >Lọc vé</span>
                    </div>
                    <div className = 'manage-ticket__header-option-export'>
                        <span>Xuất file (.csv)</span>
                    </div>
                </div>
            </div>
            <div className = 'manage-ticket__content'>
                <div className = 'manage-ticket__content-table'>
                    <table>
                        <thead>
                            <tr>
                                <td width={60}>STT</td>
                                <td width={150}>Booking code</td>
                                <td width={150}>Số vé</td>
                                <td width={220}>Tình trạng sử dụng</td>
                                <td width={150}>Ngày sử dụng</td>
                                <td width={150}>Ngày xuất vé</td>
                                <td width={150}>Cổng check - in</td>
                                <td  width={30}></td>
                            </tr>
                        </thead>
                        <tbody>
                          {tickets.slice((currentPage - 1) * 8, itemPerPage * (currentPage)).map((item, index) => {
                                if(item.status == 'used')
                                    statusStyle = {
                                        ...statusStyle,
                                        border: '1px solid #919DBA',
                                        backgroundColor: '#EAF1F8',
                                        color: '#919DBA'
                                    }
                                if(item.status == 'expired'){
                                    statusStyle = {
                                        ...statusStyle,
                                        border: '1px solid #FD5959',
                                        backgroundColor: '#F8EBE8',
                                        color: '#FD5959',
                                    }
                                }
                                if(item.status == 'notused'){
                                    statusStyle = {
                                        ...statusStyle,
                                        border: '1px solid #03AC00',
                                        backgroundColor: '#DEF7E0',
                                        color: '#03AC00',
                                    }
                                }
                                let key:string = item.code
                                return(
                                    <tr style = {{position: 'relative'}}>
                                        <td width={50}>{index + (currentPage - 1) * itemPerPage + 1}</td>
                                        <td width={150}>{item.code}</td>
                                        <td width={150}>{item.number}</td>
                                        <td width={230}><span style = {statusStyle}><BsDot size = {25} style = {{verticalAlign: '-8px'}}/>{statusList[item.status]}</span></td>
                                        <td width={150}>{item.used_date}</td>
                                        <td width={150}>{item.export_date}</td>
                                        <td width={160}>{item.checkin_gate}</td>
                                        <td style = {{paddingLeft: '5px'}} width={30}>
                                        {item.status == 'notused' && <BiDotsVertical onClick = {()=>handleClickOptionDot(item.code)} size = {18} style = {{verticalAlign: '-3px', cursor: 'pointer'}}/>}
                                        </td>
                                            {item.status == 'notused' && optionBox.includes(item.code) && <div className = 'manage-ticket__option-box'>
                                                <p>Sử dụng vé</p>
                                                <p>Đổi ngày sử dụng</p>
                                            </div>}
                                    </tr>
                                )
                            }
                          )}
                        </tbody>
                    </table>
                 <div/>
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
            </div>
        </div>
    )
}

export default ManageTicket