export declare class CustomizeError extends Error {
    code: number;
    constructor(code: number, message: string);
    getCode(): number;
}
export declare const errors: {
    ErrInvalidParams: CustomizeError;
    ErrInvalidChannel: CustomizeError;
    ErrInvalidChannelOrder: CustomizeError;
    ErrInvalidSignature: CustomizeError;
    ErrInvalidGame: CustomizeError;
    ErrChannelDataException: CustomizeError;
    ErrRepeatOrder: CustomizeError;
    ErrOrderFailed: CustomizeError;
    ErrOrderNotExist: CustomizeError;
};
