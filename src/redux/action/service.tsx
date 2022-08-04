import { showLoading, hideLoading } from "react-redux-loading-bar";
import db from '../../firebase/config'
import { collection, getDocs, query, startAt, endAt, orderBy, limit} from "firebase/firestore"; 
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import { Dispatch } from "redux";
import IService from "../../interface/IService";
import toast from 'react-hot-toast'

export const getServices:(page:number) => any = (page) => async (dispatch:Dispatch) =>{
    try {
        dispatch(showLoading())
        const q = query(collection(db, 'service'))
        const queryResult:QuerySnapshot<DocumentData> = await getDocs(q)
        let result:any = []
        queryResult.forEach((item) => result.push(item.data()))
        dispatch({type: 'getServices', payload: result})
    } catch (error) {
        console.log(error)
    } finally{
        dispatch(hideLoading())
    }
}

export const addService:(formData:IService) => any = (formData) => async (dispatch:Dispatch) =>{
    try {
        dispatch(showLoading())
    } catch (error) {
        console.log(error)
    } finally{
        dispatch(hideLoading())
    }
}