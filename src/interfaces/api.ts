import Express from 'express'

export type ApiMethodTypes = "POST" | "GET" | "PUT" | "DELETE" | "OPTIONS"

export type ApiController = {
    [method in ApiMethodTypes]: ApiMethod
}
export type ApiMethod = {
    [api: string]: (req: ApiRequest, res: ApiResponse) => Promise<ApiResponse>
}

export interface ApiRequest extends Express.Request {
    user: null
}
export interface ApiResponse extends Express.Response {

}