import { showLoading, hideLoading } from "react-redux-loading-bar";
import db from '../../firebase/config'
import { collection, getDocs, query, startAt, endAt, orderBy, limit} from "firebase/firestore"; 

import { QuerySnapshot, DocumentData } from "firebase/firestore";
import { Dispatch } from "redux";

export const getTicket:(page:number) => any = (page) =>  async (dispatch:Dispatch) =>{
    try {
        dispatch(showLoading())
        const q = query(collection(db, 'ticket'))
        const queryResult:QuerySnapshot<DocumentData> = await getDocs(q)
        let result:any = []
        queryResult.forEach((item) => result.push(item.data()))
        dispatch({type: 'getTickets', payload: 
            result,
        })
    } catch (error) {
        console.log(error)        
    } finally{
        dispatch(hideLoading())
    }
}