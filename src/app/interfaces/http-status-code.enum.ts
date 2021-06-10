export function httpStatusCodeFromValue(value: number): HttpStatusCode {
  const possibleCodes: HttpStatusCode[] = HttpStatusCodes.filter(x => x.value == value)
  return (possibleCodes.length == 1) ? possibleCodes[0] : null;
}

export interface HttpStatusCode {
  name: string;
  value: number;
}

export interface HttpStatusCodeCollection {
  [key: number]: HttpStatusCode;
}

export const HttpStatusCodes: HttpStatusCode[] = [
  { name: 'Continue', value: 100 },
  { name: 'SwitchingProtocols', value: 101 },
  { name: 'Processing', value: 102 },
  { name: 'EarlyHints', value: 103 },
  { name: 'Ok', value: 200 },
  { name: 'Created', value: 201 },
  { name: 'Accepted', value: 202 },
  { name: 'NonAuthoritativeInformation', value: 203 },
  { name: 'NoContent', value: 204 },
  { name: 'ResetContent', value: 205 },
  { name: 'PartialContent', value: 206 },
  { name: 'MultiStatus', value: 207 },
  { name: 'AlreadyReported', value: 208 },
  { name: 'ImUsed', value: 226 },
  { name: 'MultipleChoices', value: 300 },
  { name: 'MovedPermanently', value: 301 },
  { name: 'Found', value: 302 },
  { name: 'SeeOther', value: 303 },
  { name: 'NotModified', value: 304 },
  { name: 'UseProxy', value: 305 },
  { name: 'Unused', value: 306 },
  { name: 'TemporaryRedirect', value: 307 },
  { name: 'PermanentRedirect', value: 308 },
  { name: 'BadRequest', value: 400 },
  { name: 'Unauthorized', value: 401 },
  { name: 'PaymentRequired', value: 402 },
  { name: 'Forbidden', value: 403 },
  { name: 'NotFound', value: 404 },
  { name: 'MethodNotAllowed', value: 405 },
  { name: 'NotAcceptable', value: 406 },
  { name: 'ProxyAuthenticationRequired', value: 407 },
  { name: 'RequestTimeout', value: 408 },
  { name: 'Conflict', value: 409 },
  { name: 'Gone', value: 410 },
  { name: 'LengthRequired', value: 411 },
  { name: 'PreconditionFailed', value: 412 },
  { name: 'PayloadTooLarge', value: 413 },
  { name: 'UriTooLong', value: 414 },
  { name: 'UnsupportedMediaType', value: 415 },
  { name: 'RangeNotSatisfiable', value: 416 },
  { name: 'ExpectationFailed', value: 417 },
  { name: 'ImATeapot', value: 418 },
  { name: 'MisdirectedRequest', value: 421 },
  { name: 'UnprocessableEntity', value: 422 },
  { name: 'Locked', value: 423 },
  { name: 'FailedDependency', value: 424 },
  { name: 'TooEarly', value: 425 },
  { name: 'UpgradeRequired', value: 426 },
  { name: 'PreconditionRequired', value: 428 },
  { name: 'TooManyRequests', value: 429 },
  { name: 'RequestHeaderFieldsTooLarge', value: 431 },
  { name: 'UnavailableForLegalReasons', value: 451 },
  { name: 'InternalServerError', value: 500 },
  { name: 'NotImplemented', value: 501 },
  { name: 'BadGateway', value: 502 },
  { name: 'ServiceUnavailable', value: 503 },
  { name: 'GatewayTimeout', value: 504 },
  { name: 'HttpVersionNotSupported', value: 505 },
  { name: 'VariantAlsoNegotiates', value: 506 },
  { name: 'InsufficientStorage', value: 507 },
  { name: 'LoopDetected', value: 508 },
  { name: 'NotExtended', value: 510 },
  { name: 'NetworkAuthenticationRequired', value: 511 },
];
