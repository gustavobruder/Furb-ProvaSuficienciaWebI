export interface FetchResultGeneric {
    status: string;
    message: string;
}

export interface FetchResult<T> extends FetchResultGeneric {
    data: T | null;
}
