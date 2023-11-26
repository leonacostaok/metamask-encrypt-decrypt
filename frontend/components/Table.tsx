import RCTable from "rc-table";
import {SharedMessage} from "../models/SharedMessage";
import { useWeb3React } from '@web3-react/core';
import * as React from 'react';
import RevealableMessage from './RevealableMessage';
import moment from 'moment'
import styled from 'styled-components';

interface TableProps {
    data: SharedMessage[]
}

export const Table = ({data}: TableProps) => {
    const {account} = useWeb3React()
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
            render(value: string) {
                return <RevealableMessage encryptedMessage={value} />
            }
        },
        {
            title:'Date',
            dataIndex: 'date',
            key:'date',
            width: 100,
            render(value: number) {
                return moment.unix(value).format('yyyy-MM-DD HH:mm:ss')
            }
        },
    ]
    return (
        <TableWrapper>
            <RCTable columns={columns}
                     data={data}
                     rowKey={'id'}
                     emptyText={"No Data"}
            />
        </TableWrapper>
    )
}
const TableWrapper = styled.div`
  width: 100%;

  table {
    width: 100%;
    caption-side: top;
    color: white;
    border: none;
    border-collapse: collapse;

    td,
    th {
      text-align: center;
      padding: 5px 10px;
    }

    td {
      text-align: center;
      padding: 5px 10px;
    }

    tbody tr {
      border: solid 1px rgba(255, 255, 255, 0.27);
      border-radius: 10px 10px 0 0;

      &:hover {
        border: solid 1px rgba(255, 255, 255, 0.40);
      }
    }

    thead > tr {
      font-weight: 900;
      background: rgba(255, 255, 255, 0.16);
      border: solid 1px rgba(255, 255, 255, 0.27);
      border-radius: 10px 10px 0 0;

      &:hover {
        border: solid 1px rgba(255, 255, 255, 0.59);
      }
    }

    caption {
      font-size: 0.9em;
      padding: 5px;
      font-weight: bold;
    }
  }
`;
