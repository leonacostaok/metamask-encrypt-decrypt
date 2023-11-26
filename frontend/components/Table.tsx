import RCTable from "rc-table";
import {SharedMessage} from "../models/SharedMessage";
import { useWeb3React } from '@web3-react/core';
import { Button } from './Button';
import { useMemo, useState } from 'react';

interface TableProps {
    data: SharedMessage[]
}

export const Table = ({data}: TableProps) => {
    const { account, provider } = useWeb3React()
    const [revealedMessages, setRevealedMessages] = useState(new Map<string, string>())

    const handleRevealMessage = async (encryptedMessage: string, id: string) => {
        if (encryptedMessage !== "") {
            try {
                revealedMessages.set(id,
                    await provider.send('eth_decrypt', [encryptedMessage, account])
                );
                setRevealedMessages(revealedMessages);
            } catch (e) {
                console.error(e);
                revealedMessages.set(id, e.message);
                setRevealedMessages(revealedMessages);
                setTimeout(() => {
                    revealedMessages.set(id, null);
                    setRevealedMessages(revealedMessages);
                }, 3000);
            }
        } else {
            revealedMessages.set(id, "Encrypted message must have a value");
            setRevealedMessages(revealedMessages)
            setTimeout(() => {
                revealedMessages.set(id, null);
                setRevealedMessages(revealedMessages)
            })
        }
    }

    const columns = [
        {
            title:'-',
            dataIndex: 'id',
            key:'id',
            width: 40,
            render(value:string, row: any){
                return row.fromAddress === account ? 'SENT' : 'RECEIVED'
            }
        },
        {
            title:'Message',
            dataIndex: 'message',
            key:'message',
            width: 250,
            render(value:string, row: SharedMessage){
                return revealedMessages.get(row.id) ? revealedMessages.get(row.id) : <Button onClick={() => handleRevealMessage(value, row.id)}>Reveal</Button>
            }
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
