import { formatJSONResponse } from "@libs/apiGw";
import { APIGatewayProxyEvent } from "aws-lambda";
import { dynamo } from "@libs/dynamo";

export async function handler(event: APIGatewayProxyEvent) {
    try {
        const tableName = process.env?.URL_TABLE;
        // const baseUrl = process.env?.BASE_URL;

        if (!tableName) throw Error('Table name value cannot be found!')

        const { code } = event.pathParameters || {};

        if (!code) {
            return formatJSONResponse({
                statusCode: 400,
                data: {
                    message: 'Missing code in path'
                }
            })
        }

        const record = await dynamo.get(code, tableName);

        const { url } = record || {}

        return formatJSONResponse({
            data: {
            }, statusCode: 301, headers: {
                location: url
            }
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