import {errorResponse, RequestStatus, successResponse, ValidateChallengeApiHandler} from "../common/ApiUtils";
import {useJsonBody, useQueryParam} from "sst/node/api";
import {
    createSharedMessage,
    findSharedMessagesBySender,
    findSharedMessagesByToPublicKey
} from "./SharedMessagesService";
import {v4} from "uuid";
import moment from 'moment';

export const _post = ValidateChallengeApiHandler(async (userAddress) => {
    const {toPublicKey, message, ttl} = useJsonBody()

    if (!toPublicKey || !message)
        return errorResponse(
            `toPublicKey and message are required.`,
            RequestStatus.BAD_REQUEST
        );

    await createSharedMessage({
        id: v4(),
        fromAddress: userAddress,
        toPublicKey: toPublicKey,
        message,
        date: moment().unix(),
    }, ttl)

    return successResponse('message shared successfully')
});

export const _get = ValidateChallengeApiHandler(async (userAddress) => {
    const toPublicKey = useQueryParam('toPublicKey')

    const sent = await findSharedMessagesBySender(userAddress)

    const received = toPublicKey ? await findSharedMessagesByToPublicKey(toPublicKey) : []

    return successResponse({sent,received})
});
