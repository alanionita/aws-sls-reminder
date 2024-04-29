import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { GetCommand, GetCommandInput, PutCommand, PutCommandInput } from "@aws-sdk/lib-dynamodb"

const ddbClient = new DynamoDBClient({});

export const dynamo = {
    write: async (data: Record<string, any>, tableName: string) => {
        
        const putParams: PutCommandInput = {
            TableName: tableName,
            Item: data
        };
        
        const command = new PutCommand(putParams);

        await ddbClient.send(command);

        return data;
    },
    get: async (id: string, tableName: string) => {
        
        const getParams: GetCommandInput = {
            TableName: tableName,
            Key: {
                id: id
            }
        };
        
        const command = new GetCommand(getParams);

        const res = await ddbClient.send(command);

        return res.Item;
    }
}