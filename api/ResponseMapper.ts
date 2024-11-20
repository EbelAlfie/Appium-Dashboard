import { AxiosResponse } from "axios";

export function ResponseMapper<type extends Object>(result: AxiosResponse<any, any>) {
    const responseBody = result.data as Object
    
}