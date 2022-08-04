import ITicket from "../../interface/ITicket";

export default (check:string, timeFrom:string, timeTo:string, tickets:ITicket[]) =>{
    const results:ITicket[] = []
    
    tickets.map((ticket) => {
        const timeFromArray:string[] = timeFrom.split('/')
        const timeToArray:string[] = timeTo.split('/')
        const dateUsedTicketArray:string[] = ticket.used_date.split('/')
        const dateFrom:Date = new Date(parseInt(timeFromArray[2]), parseInt(timeFromArray[1]), parseInt(timeFromArray[0]))
        const dateTo:Date = new Date(parseInt(timeToArray[2]), parseInt(timeToArray[1]), parseInt(timeToArray[0]))
        const dateUsedTicket = new Date(parseInt(dateUsedTicketArray[2]), parseInt(dateUsedTicketArray[1]), parseInt(dateUsedTicketArray[0]))
        let flag = true;
        if(check != 'all'){
            if(check == 'check'){
                if(ticket.check == false)
                    flag = false
            }
            if(check == 'notcheck'){
                if(ticket.check == true){
                    flag = false
                }
            }
        }

        if(timeFrom != '' && timeFrom != '0/0/0000' && timeTo != '' && timeTo != '0/0/0000'){
            if(!(dateUsedTicket > dateFrom && dateUsedTicket < dateTo)){
                flag = false
            }
        }

        if(flag)
            results.push(ticket)
    })

    return results
}