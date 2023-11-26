export interface SharedMessageEntity {
    id: string;
    fromAddress: string;
    toPublicKey: string;
    message: string;
    date: number;
}
