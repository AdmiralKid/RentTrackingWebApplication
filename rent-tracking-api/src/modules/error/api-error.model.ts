export enum HTTPStatusCode {
  OK = 200,
  UNAUTHORIZED = 401,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
}

export interface APIError {
  error: any;
  code: HTTPStatusCode;
}

export class APIError implements APIError {
  constructor(public code: HTTPStatusCode, public error: any) {}
}
