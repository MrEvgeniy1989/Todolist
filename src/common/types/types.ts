export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type FieldErrorType = {
  field: string
  error: string
}
export type BaseResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldErrorType[]
  data: D
}

export type ErrorType = {
  statusCode: number
  messages: string[]
  error: string
}
