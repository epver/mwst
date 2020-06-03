/* tslint:disable:max-classes-per-file */
import {isObject, isString} from './CoreHelpers';

class MwsException extends Error {
  constructor(private readonly response: string | Record<string, any>) {
    super();
    this.initMessage();
  }

  public initMessage() {
    if (isObject(this.response) && this.constructor) {
      this.message = this.constructor.name
        .match(/[A-Z][a-z]+|[0-9]+/g)
        .join(' ');
    } else if (isString(this.response)) {
      this.message = this.response as string;
    } else {
      this.message = 'Undefined exception.';
    }
  }

  public getXml(): string {
    if (isObject(this.response) && !Array.isArray(this.response) && (this.response as Record<string, any>).body) {
      return (this.response as Record<string, any>).body;
    } else {
      return this.message;
    }
  }

  public getResponse(): string | object {
    return this.response;
  }

  public static create(objectOrError: object | string, description?: string) {
    if (isObject(objectOrError) && !Array.isArray(objectOrError)) {
      return objectOrError;
    } else if (isString(objectOrError)) {
      return `${objectOrError}`;
    } else {
      return `${description}`;
    }
  }
}

// request exception
export class InputStreamDisconnected extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[400] There was an error reading the input stream.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class InvalidParameterValue extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[400] An invalid parameter value was used, or the request size exceeded the maximum accepted size, or the request expired.') {
    super(MwsException.create(objectOrError, description));
  }

}

export class AccessDenied extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[401] Access was denied.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class InvalidAccessKeyId extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[403] An invalid AWSAccessKeyId value was used.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class SignatureDoesNotMatch extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[403] The signature used does not match the server\'s calculated signature value.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class InvalidAddress extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[404] An invalid API section or operation value was used, or an invalid path was used.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class InternalError extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[500] There was an internal service failure.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class QuotaExceeded extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[503] The total number of requests in an hour was exceeded.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class RequestThrottled extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[503] The frequency of requests was greater than allowed.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class UndefinedRequestError extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[600] undefined request error.') {
    super(MwsException.create(objectOrError, description));
  }
}

// execute exception
export class ConfigurationError extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[600] config error.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class LocalRequestError extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[0] Local request timeout, please retry it.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class RequestTimeoutError extends MwsException {
  constructor(objectOrError?: string | object | any, description = '[0] Local request error, please network or other.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class LocalExceededError extends MwsException{
  constructor(objectOrError?: string | object | any, description = '[0] Local request timeout exceed.') {
    super(MwsException.create(objectOrError, description));
  }
}

export class CheckParameterError extends MwsException {
}

export class NoOverridingError extends MwsException {
}
