export interface Params {
    [key: string]: any;
}
export declare function signature(signSecret: string, params: Params): string;
