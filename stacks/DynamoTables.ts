
import { StackContext, Table } from 'sst/constructs';

export function DynamoTables(sc: StackContext) {

    const profilesTable = new Table(sc.stack, 'Profiles', {
        fields: {
            userAddress: 'string',
            challenge: 'string'
        },
        primaryIndex: { partitionKey: 'userAddress' },
        globalIndexes: {
            byChallenge: { partitionKey: 'challenge' },
        }
    });

    const sharedMessagesTable = new Table(sc.stack, 'SharedMessages', {
        fields: {
            id: "string",
            fromAddress: 'string',
            toPublicKey: 'string',
            message: 'string',
            date: 'number'
        },
        primaryIndex: { partitionKey: 'id', sortKey: 'date' },
        globalIndexes: {
            byFromAddress: { partitionKey: 'fromAddress', sortKey: 'date' },
            byToPublicKey: { partitionKey: 'toPublicKey', sortKey: 'date' },
            byDate: { partitionKey: 'date' },
        }
    });

    return {
        profilesTable,
        sharedMessagesTable
    };
}
