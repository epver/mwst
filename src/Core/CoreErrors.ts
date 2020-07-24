/* tslint:disable:max-classes-per-file */

export class CoreException extends Error {
  constructor(
    private readonly error: { status: number, message: string, error?: any }
  ) {
    super();
    this.name = this.constructor.name;
    this.message = error.message;
  }

  public static create(body?: string | any, status: number = 0, message: string = '') {
    if (typeof body === 'object' && !Array.isArray(body)) {
      return {status, message, error: body};
    } else if (typeof body === 'string') {
      return {status, message, error: body};
    } else {
      return {status, message};
    }
  }
}

// request exception
export class InputStreamDisconnected extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[400] there was an error reading the input stream.'));
  }
}

export class InvalidParameterValue extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[400] an invalid parameter value was used, or the request size exceeded the maximum accepted size, or the request expired.'));
  }

}

export class AccessDenied extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[401] access was denied.'));
  }
}

export class InvalidAccessKeyId extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[403] an invalid AWSAccessKeyId value was used.'));
  }
}

export class SignatureDoesNotMatch extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[403] the signature used does not match the server\'s calculated signature value.'));
  }
}

export class InvalidAddress extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[404] an invalid api section or operation value was used, or an invalid path was used.'));
  }
}

export class InternalError extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[500] there was an internal service failure.'));
  }
}

export class QuotaExceeded extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[503] the total number of requests in an hour was exceeded.'));
  }
}

export class RequestThrottled extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[503] the frequency of requests was greater than allowed.'));
  }
}

export class UndefinedRequestError extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[600] undefined request error.'));
  }
}

// execute exception
export class ConfigurationError extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[0] local config error.'));
  }
}

export class LocalRequestError extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[0] local request error, please check network.'));
  }
}

export class RequestTimeoutError extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[0] local request error, please network or other.'));
  }
}

export class LocalExceededError extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[0] local request timeout exceed.'));
  }
}

export class CheckParameterError extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[0] local check parameter error.'));
  }
}

export class NoOverridingError extends CoreException {
  constructor(body?: string | any, status: number = 0) {
    super(CoreException.create(body, status, '[0] no overriding error.'));
  }
}
