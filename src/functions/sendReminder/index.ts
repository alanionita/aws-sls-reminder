import { DynamoDBStreamEvent } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb"
import { AttributeValue } from "@aws-sdk/client-dynamodb";

export async function handler(event: DynamoDBStreamEvent) {
    try {
        const reminderPromises = event.Records.map(async record => {
            const data = unmarshall(record.dynamodb.OldImage as Record<string, AttributeValue>)
            const { email, phoneNo, reminder } = data;
            if (phoneNo) {
                await sendSMS(phoneNo, reminder);
            }
            if (email) {
                await sendEmail(email, reminder);
            }
        })
        await Promise.all(reminderPromises)
    } catch (err) {
        console.error(err.message)
        console.info(JSON.stringify(err.stack))
    }
}