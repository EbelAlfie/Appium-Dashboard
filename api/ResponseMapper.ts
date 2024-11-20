import { AxiosResponse } from "axios";

export function ResponseMapper<type extends Object>(result: AxiosResponse<any, any>): type {
    const responseBody = result.data as type
    return responseBody 
}