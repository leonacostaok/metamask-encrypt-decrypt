import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
    DynamoDBDocumentClient,
    GetCommand,
    PutCommand,
    QueryCommand,
    UpdateCommand
} from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

import { translateConfig } from '../common/DatabaseUtils';
import {ProfileEntity} from "./ProfileEntity";

const client = new DynamoDBClient({});
const dynamoDb = DynamoDBDocumentClient.from(client, translateConfig);

export const createProfile = async (profile: ProfileEntity) => {
    return await dynamoDb.send(
        new PutCommand({
            TableName: Table.Profiles.tableName,
            Item: profile
        })
    );
};

export const updateProfileChallenge = async (
    userAddress: string,
    challenge?: string
) => {
    return await dynamoDb.send(
        new UpdateCommand({
            TableName: Table.Profiles.tableName,
            Key: { userAddress },
            UpdateExpression: `set challenge = :challenge`,
            ExpressionAttributeValues: {
                ':challenge': challenge ?? '-'
            }
        })
    );
};

export const findProfileByAddress = async (userAddress: string) => {
    const result = await dynamoDb.send(
        new GetCommand({
            TableName: Table.Profiles.tableName,
            Key: { userAddress }
        })
    );
    return result?.Item ? result?.Item as ProfileEntity : null
};

export const findProfileByChallenge = async (challenge: string) => {
    const result = await dynamoDb.send(
        new QueryCommand({
            TableName: Table.Profiles.tableName,
            IndexName: 'byChallenge',
            KeyConditionExpression: 'challenge = :challenge',
            ExpressionAttributeValues: {
                ':challenge': challenge
            }
        })
    );
    return result?.Items && result.Items.length > 0 ? result?.Items[0] as ProfileEntity : null
};
