import {defaultHeaders, defaultSetting} from './Env';
import {IHeaders, ISetting, TMethod} from './CoreTypes';

export function API(path: string, version: string) {
  return function <T extends new(...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      Path = path;
      Version = version;
      Method = '';
      Action = '';
      Setting = {...defaultSetting};
      Headers = {...defaultHeaders};
    };
  };
}

export function API_METHOD(method: TMethod, setting?: ISetting, headers?: IHeaders) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function () {
      this.Method = method;
      this.Action = propertyKey;
      this.Setting = {...defaultSetting, ...setting};
      this.Headers = {...defaultHeaders, ...headers};
      return oldValue.apply(this, arguments);
    };
  };
}
