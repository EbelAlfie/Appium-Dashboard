//type declaration
type Loading = { type: "loading" }
type Success<dataType> = { type: "success", data: dataType }
type Failed = { type: "failed", error: Error }

//setter
export const Loading: Loading = { type: "loading" }
export const Success = <dataType>(data: dataType): Success<dataType> => {
    return { type: "success", data: data }
}
export const Failed = (error: Error): Failed => {
    return { type: "failed", error: error }
}

//Base ui state
export type UiState<dataType> = Loading| Success<dataType>| Failed