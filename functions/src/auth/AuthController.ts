import { ApiHandler, usePathParam, useQueryParams } from 'sst/node/api';
import {getAddress} from "@ethersproject/address";
import {createProfile, findProfileByAddress, updateProfileChallenge} from "../profiles/ProfilesService";
import {successResponse} from "../common/ApiUtils";
import {generateChallenge} from "./AuthUtils";

export const challenge = ApiHandler(async () => {
    let address = usePathParam('userAddress');
    console.log(`Getting challenge for userAddress: ${address}`);
    address = address ? getAddress(address) : undefined;

    // validate if address is not valid
    if (!address) {
        console.log(`Invalid user address ${address}`);
        return {
            statusCode: 400,
            body: JSON.stringify({ errorCode: 'INVALID_USER_ADDRESS' })
        }
    }

    const userProfile = await findProfileByAddress(address);
    const challengeResponse = generateChallenge(address);

    if (userProfile) {

        console.log(
            `Assigning challenge ${challengeResponse.challenge} to ${address}.`
        );
        // I assign challenge to user
        await updateProfileChallenge(address, challengeResponse.challenge);
    } else {
        console.log(
            `Creating profile to ${address} with challenge ${challengeResponse.challenge}.`
        );
        // I create a new user profile and assign the challenge
        await createProfile({
            userAddress: address,
            challenge: challengeResponse.challenge,
        });
    }

    // return message to sign along with unique challenge
    return successResponse(challengeResponse);
});
