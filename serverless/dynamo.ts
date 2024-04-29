import type { AWS } from '@serverless/typescript';

const dynamoResources: AWS['resources']['Resources'] = {
    reminderTable: {
        Type: 'AWS::DynamoDB::Table',
        Properties: {
            TableName: '${self:custom.reminderTable}',
            AttributeDefinitions: [{
                AttributeName: 'id',
                AttributeType: 'S'
            }],
            KeySchema: [
                {
                    AttributeName: 'id',
                    KeyType: 'HASH'
                }
            ],
            BillingMode: 'PAY_PER_REQUEST',
            TimeToLiveSpecification: {
                AttributeName: 'TTL',
                Enabled: true
            },
            Tags: [{ Key: 'For', Value: 'sam-course' }, { Key: 'Date', Value: '2024-04-29' }, { Key: 'CanIDelete', Value: 'Yes' }, { Key: 'Author', Value: 'Alan' }]
        }
    },
}

export default dynamoResources;