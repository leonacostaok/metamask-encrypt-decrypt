import {ApiHandler, useHeaders} from "sst/node/api";
import {findProfileByChallenge, updateProfileChallenge} from "../profiles/ProfilesService";
import { verifyMessage } from '@ethersproject/wallet';
import {AUTH_MESSAGE} from "../auth/AuthConstants";
import {getAddress} from "@ethersproject/address";

export enum RequestStatus {
    OK = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
}

export const successResponse = (
    body?: object | string,
    statusCode?: RequestStatus
) => {
    return {
        statusCode: Number(statusCode ?? RequestStatus.OK),
        body: body ? JSON.stringify(body) : undefined
    };
};

export const errorResponse = (message: string, statusCode: RequestStatus) => {
    return {
        statusCode: Number(statusCode),
        body: JSON.stringify({ errorCode: statusCode, message })
    };
};

// middleware: validates if the challenge belongs to this address signing the request before continuing
export const ValidateChallengeApiHandler = (
    impl: (
        userAddress: string,
        event: Parameters<Parameters<typeof ApiHandler>[0]>[0],
        context: Parameters<Parameters<typeof ApiHandler>[0]>[1]
    ) => ReturnType<Parameters<typeof ApiHandler>[0]>
) => {
    return ApiHandler(async (event, context) => {
        const {challenge, signature} = useHeaders();

        // requires challenge and signature to have values
        if (!challenge || !signature)
            return errorResponse(
                `${challenge} or ${signature} are required.`,
                RequestStatus.BAD_REQUEST
            );

        // checks if a profile with the challenge attached exists
        const profileItem = await findProfileByChallenge(challenge);

        if (profileItem) {
            // gets signature verified signer
            const verifiedUserAddress = verifyMessage(
                AUTH_MESSAGE + challenge,
                signature
            );

            // checks whether the message signer is the one with the challenge attached
            if (verifiedUserAddress === profileItem.userAddress) {
                await updateProfileChallenge(
                    verifiedUserAddress,
                    undefined
                );
                // continues execution of the API
                return impl(getAddress(verifiedUserAddress), event, context);
            } else
                return errorResponse(
                    `Challenge ${challenge} not verified for user ${verifiedUserAddress}.`,
                    RequestStatus.FORBIDDEN
                );
        } else {
            return errorResponse(
                `Challenge ${challenge} not found in database.`,
                RequestStatus.UNAUTHORIZED
            );
        }
    });
};

