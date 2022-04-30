export enum HTTPStatusCode {
  OK = 200,
  BAD_REQUEST = 401,
}

export interface APIError {
  error: any;
  code: HTTPStatusCode;
}

export class APIError implements APIError {
  constructor(public code: HTTPStatusCode, public error: any) {}
}
