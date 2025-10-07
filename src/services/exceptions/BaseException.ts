export default class BaseException extends Error {
  private _status: number
  private _message: string
  private _url: string

  constructor(status: number, message: string, url: string) {
    super(message)
    this._status = status
    this._message = message
    this._url = url
  }

  // Format error string
  getFormattedErrorString(): string {
    return `Status: ${this._status}. Message: ${this._message} ${
      __DEV__ ? `URL: ${this._url}` : ''
    }`
  }

  getJsonError(): {status: number; message: string} {
    return {
      status: this._status,
      message: this._message,
    }
  }
}

export interface IErrorApp extends Error {
  getFormattedErrorString: () => string
  getJsonError: () => object
}
