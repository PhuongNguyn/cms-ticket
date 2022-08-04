import './Calendar.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';


const CalendarComponent:React.FC<any> = (props) =>{
    const handleChangeDate:(value:any) => void = (value) =>{
        const date = new Date(value)
        const stringDate = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`
        console.log(stringDate)
        props.setStateFunc(stringDate)
    } 
    return (
        <div className = 'cms-calendar'>
              <Calendar
                locale="en-GB"
                onChange = {(value:any) => handleChangeDate(value)}
              />
        </div>
    )
}

export default CalendarComponent