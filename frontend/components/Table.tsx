import RCTable from "rc-table";
import {shortenAddress} from "../utils";
import {SharedMessage} from "../models/SharedMessage";

interface TableProps {
    data: SharedMessage[]
}

export const Table = ({data}: TableProps) => {
    const columns = [
        {
            title:'From',
            dataIndex: 'fromAddress',
            key:'fromAddress',
            width: 150,
            render(value:string){
                return `${shortenAddress(value)}`
            }
        },
        {
            title:'To',
            dataIndex: 'toPublicKey',
            key:'toPublicKey',
            width: 150,
            render(value:string){
                return `${shortenAddress(value)}`
            }
        },
        {
            title:'Message',
            dataIndex: 'message',
            key:'message',
            width: 250,
        },
        {
            title:'Date',
            dataIndex: 'date',
            key:'date',
            width: 100,
        },
    ]
    return (
        <RCTable columns={columns}
                 data={data}
                 rowKey={'id'}
                 emptyText={"No Data"}
        />
    )
}
