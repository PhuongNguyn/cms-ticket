import IAction from "../../interface/IAction";
import IService from "../../interface/IService";

export default (state:IService[] = [], action:IAction) =>{
    switch(action.type){
        case 'getServices':
            return action.payload
        default:
            return state
    }
}