import './CheckTicket.css'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import {useSelector} from 'react-redux'
import ITicket from '../../interface/ITicket'
import { AiOutlineCaretLeft, AiOutlineCaretRight, AiOutlineCalendar } from 'react-icons/ai'
import CalendarComponent from '../../components/Calendar/Calendar'
import checkTicketSelector from '../../redux/selector/checkTicketSelector'
import { Dispatch } from 'redux'
import { getTicket } from '../../redux/action/ticket';
import {useDispatch} from 'react-redux'

interface IFilter{
    timeFrom:string,
    timeTo:string,
    check: string,
}

const CheckTicket:React.FC = () =>{
    const dispatch:Dispatch = useDispatch()
    const [timeFrom, setTimeFrom] = useState<string>('0/0/0000')
    const [calendarTimeFrom,setCalendarTimeFrom] = useState<boolean>(false)
    const [timeTo, setTimeTo] = useState<string>('0/0/0000')
    const [calendarTimeTo,setCalendarTimeTo] = useState<boolean>(false)
    const [currentPage, setCurrenPage] = useState<number>(1)
    const [filter, setFilter] = useState<IFilter>({
        timeFrom: '',
        timeTo: '',
        check: 'all'
    })
    const path = useLocation().pathname
    const url:string = path.split('/')[path.split('/').length - 1]
    const urlTitle:{[key:string]:string} = {
        'check-ticket': 'Đối soát vé'
    }
    const [check, setCheck] = useState<string>('all')
    const checkKey:{[key:string]:string} = {
        'notcheck': ' Chưa đối soát',
        'check': 'Đã đối soát',
        'all': 'Tất cả'
    }

    useEffect(()=>{
        dispatch(getTicket(currentPage))
    },[currentPage])
    const data:ITicket[] = useSelector((state:any) => state.ticket)
    const tickets:ITicket[] = checkTicketSelector(filter.check, filter.timeFrom, filter.timeTo, data)
    const itemPerpage:number = 8
    const pagesLength:number = tickets.length % itemPerpage == 0 ? tickets.length / itemPerpage : tickets.length / itemPerpage + 1
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

    const handleFilterClick:() => void = () => {
        setFilter({...filter, check: check, timeFrom: timeFrom, timeTo: timeTo})
    }
    return (
        <div className = 'check-ticket'>
            <div className = 'ticket-check-outlet__table'>
                <h1 className = 'main-content__outlet--title'>{urlTitle[url]}</h1>
                <div className = 'main-content__outlet-header'>
                    <div className = 'main-content__outlet-header-search'>
                        <input type = 'text' placeholder='Tìm bảng số vé'/>
                    </div>
                    {check == 'notcheck'? <div className='main-content__outlet-header-btn-check'>
                        <button>
                            Chốt đối soát
                        </button>
                    </div> : 
                    <div className= 'main-content__outlet-header-btn-export'>
                        <button>Xuất file (.csv)</button>
                    </div>}
                </div>
                <div className = 'ticket-check-outlet__table-content'>
                    <table>
                        <thead>
                            <tr>
                                <td width={50}>STT</td>
                                <td width={80}>Số vé</td>
                                <td width={200}>Tên sự kiện</td>
                                <td width={80}>Loại vé</td>
                                <td width={130}>Ngày sử dụng</td>
                                <td width={130}>Cổng check in</td>
                                <td width={80}></td>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.slice((currentPage - 1) * 8, 8 * (currentPage)).map((item, index) =>{
                                return (
                                    <tr>
                                        <td width={50}>{index + (currentPage - 1) * 8 + 1}</td>
                                        <td width={80}>{item.number}</td>
                                        <td width={200}>{item.event_name}</td>
                                        <td width={80}>Vé cổng</td>
                                        <td width={130}>{item.used_date}</td>
                                        <td width={130}>{item.checkin_gate}</td>
                                        <td width={80}>{item.check ? 'Đối soát' : 'Chưa đối soát'}</td>
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
            <div className = 'ticket-check-outlet__filter'>
                <p className = 'ticket-check-outlet__filter--title'>Lọc vé</p>
                <div className = 'ticket-check-outlet__filter-option'>
                    <div className = 'ticket-checkt-outlet__filter-option-status'>
                        <p className = 'ticket-checkt-outlet__filter-option-status--title'>Tình trạng đối soát</p>
                        <div className = 'ticket-checkt-outlet__filter-option-status-input'>
                            <div className = 'filter-option-status-input__all'>
                                <input type = 'radio' checked = {check == 'all'} onClick = {()=>setCheck('all')}/>
                                <label>Tất cả</label>
                            </div>
                            <div className = 'filter-option-status-input__check'>
                                <input type = 'radio' checked = {check == 'check'} onClick = {()=>setCheck('check')}/>
                                <label>Đã đối soát</label>
                            </div>
                            <div className = 'filter-option-status-input__notcheck'>
                                <input type = 'radio' checked = {check == 'notcheck'} onClick = {()=>setCheck('notcheck')}/>
                                <label>Chưa đối soát</label>
                            </div>
                        </div>
                    </div>
                    <div className = 'ticket-check-outlet__ticket-type'>
                        <p>Loại vé<span>Vé cổng</span></p>
                    </div>
                    <div className = 'ticket-check-outlet__date-from'>
                        <p className = 'ticket-check-outlet__date-from--title'>Từ ngày</p>
                        <div className = 'ticket-check-outlet__date-from-calendar'>
                            <p>{timeFrom}<AiOutlineCalendar onClick = {()=>setCalendarTimeFrom(!calendarTimeFrom)}  style = {{color: '#FF993C', verticalAlign: '-4px', marginLeft: '6px', cursor: 'pointer'}} size = {20}/></p>
                        </div>
                        {calendarTimeFrom && <CalendarComponent setStateFunc = {setTimeFrom}/>}
                    </div>
                    <div className = 'ticket-check-outlet__date-to'>
                        <p className = 'ticket-check-outlet__date-to--title'>Đến ngày</p>
                        <div className = 'ticket-check-outlet__date-to-calendar'>
                            <p>{timeTo}<AiOutlineCalendar onClick = {()=>setCalendarTimeTo(!calendarTimeTo)}  style = {{color: '#FF993C', verticalAlign: '-4px', marginLeft: '6px', cursor: 'pointer'}} size = {20}/></p>
                        </div>
                        {calendarTimeTo && <CalendarComponent setStateFunc = {setTimeTo}/>}
                    </div>
                </div>
                <div className = 'button__filter'>
                    <button onClick = {()=>handleFilterClick()}>Lọc</button>
                </div>
            </div>
        </div>
    )
}

export default CheckTicket