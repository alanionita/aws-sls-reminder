import { DynamoDBStreamEvent } from "aws-lambda";

export async function handler(event: DynamoDBStreamEvent) {
    try {
      
    } catch (err) {
        console.error(err.message)
        console.info(JSON.stringify(err.stack))
    }
}