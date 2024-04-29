import { formatJSONResponse } from "@libs/apiGw";
import { APIGatewayProxyEvent } from "aws-lambda";
import { ulid } from 'ulid';
import { dynamo } from "@libs/dynamo";

export async function handler(event: APIGatewayProxyEvent) {
    try {
        const SHORTCODE_LEN = 8;
        const tableName = process.env?.URL_TABLE;
        const baseUrl = process.env?.BASE_URL;

        if (!tableName) throw Error('Table name value cannot be found!')

        const body = JSON.parse(event.body);

        const { url } = body;

        const code = ulid().slice(0, SHORTCODE_LEN);

        const shortUrl = `${baseUrl}/${code}`;

        const ddbData = {
            id: code,
            shortUrl,
            url
        }

        await dynamo.write(ddbData, tableName);

        return formatJSONResponse({
            data: {
                shortUrl, url
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