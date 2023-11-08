# MetaMask encrypt and decrypt project
This code repository introduces the smallest example to encrypt/decrypt messages making use of MetaMask.

There are 4 important screens:
1. Connect wallet
2. Request public key (so we can encrypt a message and send it to the user that is requesting it)
3. Encrypt message (using the public key of the user we want to send information)
4. Decrypt message (using our metamask account)

## About the code
The code has been created using NextJS framework and Web3-React libraries from Uniswap team as a base.
You will be able to find the implementation in `example`.

## Installation
1. You must have installed node 18 > (use of NextJS)
2. Execute `yarn install`

## Running
1. Execute `yarn start`

## Deployment to AWS via Serverless Stack
Execute `sudo sst deploy` to deploy the static site to AWS
> Note: To do so you will need to have installed aws-cli and set up the credentials with a profile `metamask-encrypt-decrypt`, you can change this from `sst.config.ts`

## Troubleshooting

If you have any questions, send them along with a hi to [hello@dandelionlabs.io](mailto:hello@dandelionlabs.io).
