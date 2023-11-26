import {useWeb3React} from "@web3-react/core";
import axios from 'axios'

const apiUrl = process.env.apiUrl

export const useChallengeAuthenticatedApi = ()=> {
    const { account, provider } = useWeb3React();

    const get = async (uri) => {
        return new Promise((resolve, reject) => {
            try {
                // asks backend to challenge the current account
                axios.get(`${apiUrl}/auth/${account}`).then((challengeResponse) => {
                    // signs the challenge
                    const signer = provider.getSigner()
                    if (signer) {
                        signer.signMessage(`${challengeResponse.data.purpose}${challengeResponse.data.challenge}`).then((signature) => {
                            resolve(axios.get(`${apiUrl}/${uri}`, {headers: {challenge: challengeResponse.data.challenge, signature}}))
                        })
                    } else reject(new Error('provider not available'))
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    const post = async (uri, data) => {
        return new Promise((resolve, reject) => {
            try {
                // asks backend to challenge the current account
                axios.get(`${apiUrl}/auth/${account}`).then((challengeResponse) => {
                    // signs the challenge
                    const signer = provider.getSigner()
                    if (signer) {
                        signer.signMessage(`${challengeResponse.data.purpose}${challengeResponse.data.challenge}`).then((signature) => {
                            resolve(axios.post(`${apiUrl}/${uri}`, data, {headers: {challenge: challengeResponse.data.challenge, signature}}))
                        })
                    } else reject(new Error('provider not available'))
                })
            } catch (e) {
                reject(e)
            }
        })
    }

    return { get, post }
}
