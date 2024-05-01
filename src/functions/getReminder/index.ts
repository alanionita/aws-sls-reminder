import { formatJSONResponse } from "@libs/apiGw";
import { APIGatewayProxyEvent } from "aws-lambda";
import { ulid } from 'ulid'
import { dynamo } from "@libs/dynamo";

export async function handler(event: APIGatewayProxyEvent) {
    try {
        const tableName = process.env?.REMINDER_TABLE;

        if (!tableName) throw Error('Table name value cannot be found!')

        const body = JSON.parse(event.body);


        return formatJSONResponse({
            data: {
            
            },
        })
    } catch (err) {
        console.error(err.message)
        console.info(JSON.stringify(err.stack))
        return formatJSONResponse({
            statusCode: 502,
            data: {
                message: err.message
            }
        })
    }
}
