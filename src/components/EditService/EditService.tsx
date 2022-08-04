import {useState} from 'react'
import CalendarComponent from '../Calendar/Calendar'
import {AiOutlineCalendar} from 'react-icons/ai'
import {TimePicker} from 'antd'
import IService from '../../interface/IService'

interface IProps{
    setStateFunc: React.Dispatch<React.SetStateAction<{isOpen: boolean, service: IService}>>
    state: {isOpen: boolean, service: IService}
}

const EditService:React.FC<IProps> = ({setStateFunc, state}) =>{
        const [name, setName] = useState<string>('')
        const [dateFrom, setDateFrom] = useState<string>('dd/mm/yy')
        const [dateTo, setDateTo] = useState<string>('dd/mm/yy')
        const [timeFrom, setTimeFrom] = useState<string>('00:00:00')
        const [timeTo, setTimeTo] = useState<string>('')
        const [calendarFrom, setCalendarFrom] = useState<boolean>(false)
        const [calendarTo, setCalendarTo] = useState<boolean>(false)
        const [checkPrice, setCheckPrice] = useState<boolean>(false)
        const [checkPriceCombo, setCheckPriceCombo] = useState<boolean>(false)
        const [price, setPrice] = useState<string>('')
        const [priceCombo, setPriceCombo] = useState<string>('')
        const [status, setStatus] = useState<string>('')

        const handleCloseClick:() => any = () =>{
            setStateFunc({...state, isOpen: false})
        }
        return (
            <div className = 'service-form'>
                <div className = 'service-form__wrapper'>
                    <p className = 'service-form--title'>Cập nhật thông tin gói vé</p>
                    <div className = 'service-form__input'>
                        <div className = 'service-form__input-name'>
                            <p className = 'service-form__input-name--title'>Tên gói vé <span style = {{color: 'red'}}>*</span></p>
                            <input type = 'text' placeholder='Nhập tên gói vé' value={name || state.service.name} onChange = {(e) => setName(e.target.value)}/>
                        </div>
                        <div className = 'service-form__input-date'>
                            <div className = 'service-form__input-date-use'>
                                <p className = 'service-form__input-date-use--title'>Ngày áp dụng</p>
                                <div className = 'service-form__input-date-use-date-and-time'>
                                    <div className = 'service-form__input-date-use-date'>
                                        <div className = 'dashboard__chart-header-calendar'>
                                            <p>{dateFrom != 'dd/mm/yy' || state.service.date_used} <AiOutlineCalendar onClick = {()=>setCalendarFrom(!calendarFrom)}  style = {{color: '#FF993C', verticalAlign: '-4px', marginLeft: '6px', cursor: 'pointer'}} size = {20}/></p>
                                        </div>
                                        {calendarFrom && <CalendarComponent setStateFunc = {setDateFrom}/>}
                                    </div>
                                    <div className = 'service-form__input-date-use-time'>
                                        <TimePicker onChange = {(timeMoment, timeString)=>setTimeFrom(timeString)}/>
                                    </div>
                                </div>
                            </div>
                            <div className = 'service-form__input-date-expire'>
                                <p className = 'service-form__input-date-use--title'>Ngày hết hạn</p>
                                <div className = 'service-form__input-date-expire-date-and-time'>
                                        <div className = 'service-form__input-date-expire-date'>
                                            <div className = 'dashboard__chart-header-calendar'>
                                                <p>{dateTo != 'dd/mm/yy'|| state.service.expired_date} <AiOutlineCalendar onClick = {()=>setCalendarTo(!calendarTo)}  style = {{color: '#FF993C', verticalAlign: '-4px', marginLeft: '6px', cursor: 'pointer'}} size = {20}/></p>
                                            </div>
                                            {calendarTo && <CalendarComponent setStateFunc = {setDateTo}/>}
                                        </div>
                                        <div className = 'service-form__input-date-use-time'>
                                            <TimePicker onChange = {(timeMoment, timeString)=>setTimeTo(timeString)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className = 'service-form__input-price'>
                        <p className = 'service-form__input-price--title'>Giá vé áp dụng</p>
                        <div className = 'service-form__input-price-option'>
                            <p className = 'service-form__input-price-option-price'>
                                <input checked = {checkPrice} className = 'check-box-input' type = 'checkbox' onClick = {()=> setCheckPrice(!checkPrice)} />
                                <span>Vé lẻ (vnđ/vé) với giá</span>
                                <input placeholder='Giá vé' value={price || state.service.price} type = 'text' onChange = {(e)=>setPrice(e.target.value)} disabled = {!checkPrice}/>
                                <span> / Vé</span>
                            </p>
                            <p className = 'service-form__input-price-option-price'>
                                <input checked = {checkPriceCombo}  className = 'check-box-input' type = 'checkbox' onClick = {()=> setCheckPriceCombo(!checkPriceCombo)} />
                                <span>Combo vé với giá</span>
                                <input placeholder='Giá vé' type = 'text' disabled = {!checkPriceCombo} value = {state.service.price_combo}  onChange = {(e)=>setPrice(e.target.value)}/>
                                <span> / </span>
                                <input disabled = {!checkPriceCombo} type = 'text' placeholder='Số vé'/>
                                <span>Vé</span>
                            </p>
                        </div>
                    </div>
                    <div className = 'service-form__input-status'>
                        <p className = 'service-form__input-status--title'>Tình trạng</p>
                        <select value = {status || (state.service.status == true ? 'true' : 'false')} onChange = {(e)=>setStatus(e.target.value)}>
                            <option value = 'false'>Tắt</option>
                            <option value = 'true'>Đang hoạt động</option>
                        </select>
                    </div>
                    <p className = 'service-form--note'><span style = {{color: 'red'}}>*</span> là thông tin bắt buộc</p>
                    <div className = 'service-form__button'>
                        <button onClick = {handleCloseClick} className = 'service-form__button-button-close'>Huỷ</button>
                        <button className = 'service-form__button-button-save'>Lưu</button>
                    </div>
                </div>
            </div>
    )
}

export default EditService