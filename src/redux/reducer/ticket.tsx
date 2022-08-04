import IAction from "../../interface/IAction";
import ITicket from "../../interface/ITicket";

export default (state:ITicket[] = [], action:IAction) => {
    switch(action.type){
        case 'getTickets':
            return action.payload
        default:
            return state
    }
}