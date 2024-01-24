export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

export type ResponseType<T = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: T
}

export type ErrorType = {
  statusCode: number
  messages: string[]
  error: string
}
