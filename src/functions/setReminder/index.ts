import { formatJSONResponse } from "@libs/apiGw";
import { APIGatewayProxyEvent } from "aws-lambda";
import { dynamo } from "@libs/dynamo";

export async function handler(event: APIGatewayProxyEvent) {
    try {
        const tableName = process.env?.REMINDER_TABLE;

        if (!tableName) throw Error('Table name value cannot be found!')

        const body = JSON.parse(event.body);

        // TODO: validate email and phoneNo
        const { email, phoneNo, reminder, reminderDate } = body

        if (!email && !phoneNo) {
            return formatJSONResponse({
                statusCode: 400,
                data: {
                    message: 'Email or Phone Number required!'
                }
            })
        }

        if (!reminder) {
            return formatJSONResponse({
                statusCode: 400,
                data: {
                    message: 'Reminder required!'
                }
            })
        }

        if (!reminderDate) {
            return formatJSONResponse({
                statusCode: 400,
                data: {
                    message: 'Reminder date required!'
                }
            })
        }

        const ddbData = {

        }

        await dynamo.write(ddbData, tableName);

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