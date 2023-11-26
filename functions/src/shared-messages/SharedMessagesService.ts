import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    PutCommand,
    QueryCommand,
    DeleteCommand
} from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

import { translateConfig } from '../common/DatabaseUtils';
import {SharedMessageEntity} from "./SharedMessageEntity";

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client, translateConfig);

export const MAX_TIME_TO_LIVE = 60 * 60 * 24 * 7;

/**
 * Creates a new shared message, by default and max will be saved for 7 days
 *
 * @parameter ttl indicates the time to live of the record
 */
export const createSharedMessage = async (sharedMessage: SharedMessageEntity, ttl?: number) => {
    return await dynamoDb.send(
        new PutCommand({
            TableName: Table.SharedMessages.tableName,
            Item: {...sharedMessage, ttl: ttl && ttl < MAX_TIME_TO_LIVE ? ttl : MAX_TIME_TO_LIVE},
        })
    );
};

export const findSharedMessagesBySender = async (userAddress: string) => {
    const result = await dynamoDb.send(
        new QueryCommand({
            TableName: Table.SharedMessages.tableName,
            IndexName: 'byFromAddress',
            KeyConditionExpression: 'fromAddress = :fromAddress',
            ExpressionAttributeValues: {
                ':fromAddress': userAddress
            }
        })
    );
    return result?.Items && result.Items.length > 0 ? result?.Items as SharedMessageEntity[] : []
};

export const findSharedMessagesByToPublicKey = async (publicKey: string) => {
    const result = await dynamoDb.send(
        new QueryCommand({
            TableName: Table.SharedMessages.tableName,
            IndexName: 'byToPublicKey',
            KeyConditionExpression: 'toPublicKey = :toPublicKey',
            ExpressionAttributeValues: {
                ':toPublicKey': publicKey
            }
        })
    );
    return result?.Items && result.Items.length > 0 ? result?.Items as SharedMessageEntity[] : []
};


