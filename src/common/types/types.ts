export type FieldError = {
  error: string
  field: string
}

export type BaseResponse<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: D
}
export type BaseTaskResponse<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldError[]
  data: {
    item: D
  }
}
