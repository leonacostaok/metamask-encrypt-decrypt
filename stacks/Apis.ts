import { Api, StackContext, use } from 'sst/constructs';

import {buildApiDomainName, HOSTED_ZONE} from './Constants';
import { DynamoTables } from './DynamoTables';

export function Apis(sc: StackContext) {

    const {
        profilesTable,
        sharedMessagesTable,
    } = use(DynamoTables);

    // Create the HTTP API
    const api = new Api(sc.stack, 'MetaMaskEncryptDecryptApi', {
        customDomain: {
            domainName: buildApiDomainName(sc.stack),
            hostedZone: HOSTED_ZONE
        },
        defaults: {
            function: {
                memorySize: 512,
                runtime: 'nodejs18.x',
                timeout: '10 seconds'
            }
        },
        routes: {
            // authorization and authentication APIs
            'GET /auth/{userAddress}': {
                function: {
                    functionName: n(sc, 'GET /auth/{userAddress}'),
                    handler:
                        'functions/src/auth/AuthController.challenge',
                    bind: [profilesTable]
                }
            },
            'GET /auth/{challenge}/{signature}': {
                function: {
                    functionName: n(sc, 'GET /auth/{challenge}/{signature}'),
                    handler: 'functions/src/auth/AuthController.login',
                    bind: [profilesTable]
                }
            },

            'GET /shared-messages': {
                function: {
                    functionName: n(sc, 'GET /shared-messages'),
                    handler: 'functions/src/shared-messages/SharedMessagesController._get',
                    bind: [profilesTable, sharedMessagesTable]
                }
            },

            'POST /shared-messages': {
                function: {
                    functionName: n(sc, 'POST /shared-messages'),
                    handler: 'functions/src/shared-messages/SharedMessagesController._post',
                    bind: [profilesTable, sharedMessagesTable]
                }
            },
        },
        cors: {
            allowMethods: ['GET', 'POST']
        },
        accessLog: {
            retention: 'one_week'
        }
    });

    // Show the URLs in the output
    sc.stack.addOutputs({
        ApiEndpoint: api.url
    });
    return { api };
}

// build readable api name
export const n = ({ app, stack }: StackContext, route: string) => {
    return (
        app.name +
        '-' +
        stack.stage +
        '-' +
        route
            .replace(' ', '')
            .replace(/[/]/g, '-')
            .replace(/[{]/g, '')
            .replace(/[}]/g, '')
    );
};

