namespace HttpType{
  declare interface Res {
    code: number
    message?: string
    error?: string
    data?: any
    timestamp?: string
    path?: string
  }
}
