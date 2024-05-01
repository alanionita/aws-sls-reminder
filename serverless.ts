import type { AWS } from '@serverless/typescript';

import functions from './serverless/functions';
import dynamoResources from './serverless/dynamo';

const serverlessConfiguration: AWS = {
  service: 'reminder',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild', 'serverless-iam-roles-per-function'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    profile: 'sls',
    region: 'eu-west-2',
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: 'dynamodb:*',
      Resource: [
        'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.reminderTable}', 
        'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.reminderTable}/index/index1']
    }],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      REMINDER_TABLE: '${self:custom.reminderTable}',
      SES_ADDR: '${self:custom.secrets.SES_ADDR}'
    },
  },
  // import the function via paths
  functions: functions,
  resources: {
    Resources: {
      ...dynamoResources
    },
    Outputs: {}
  },
  package: { individually: true },
  custom: {
    reminderTable: '${sls:stage}-reminder-table',
    secrets: '${file(.secrets/${sls:stage}.json)}',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
};

module.exports = serverlessConfiguration;
