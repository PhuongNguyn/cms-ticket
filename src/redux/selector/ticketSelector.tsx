import ITicket from "../../interface/ITicket";

export default (timeFrom:string, timeTo:string, status: string, gate: string[], tickets: ITicket[])=>{
    const result:ITicket[] = []
    tickets.map((item) =>{
        let flag:boolean = true
        const timeFromArray:string[] = timeFrom.split('/')
        const timeToArray:string[] = timeTo.split('/')
        const dateUsedTicketArray:string[] = item.used_date.split('/')
        const dateFrom:Date = new Date(parseInt(timeFromArray[2]), parseInt(timeFromArray[1]), parseInt(timeFromArray[0]))
        const dateTo:Date = new Date(parseInt(timeToArray[2]), parseInt(timeToArray[1]), parseInt(timeToArray[0]))
        const dateUsedTicket = new Date(parseInt(dateUsedTicketArray[2]), parseInt(dateUsedTicketArray[1]), parseInt(dateUsedTicketArray[0]))
        console.log(dateFrom, dateTo, dateUsedTicket)
        if(timeFrom!='0/0/0000' && timeTo!='0/0/0000'){
            if(!(dateUsedTicket > dateFrom && dateUsedTicket < dateTo)){
                flag = false
            }
        }
        if(status != 'all'){
            if(status != item.status){
                flag = false
            }
        }
        if(gate[0] != 'all'){
            if(!gate.includes(item.checkin_gate)){
                flag = false
            }
        }

        if(flag)
            result.push(item)

    })

    return result
}