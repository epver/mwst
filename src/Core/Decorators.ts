import {defaultHeaders, defaultSetting} from './Env';
import {IHeaders, ISetting, TMethod} from './CoreTypes';

export function API(path: string, version: string) {
  return function <T extends new(...args: any[]) => {}>(constructor: T) {
    return class extends constructor {
      path = path;
      version = version;
      method = '';
      action = '';
      setting = {...defaultSetting};
      headers = {...defaultHeaders};
    };
  };
}

export function API_METHOD(method: TMethod, setting?: ISetting, headers?: IHeaders) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const oldValue = descriptor.value;
    descriptor.value = function () {
      this.method = method;
      this.action = propertyKey;
      this.setting = {...defaultSetting, ...setting};
      this.headers = {...defaultHeaders, ...headers};
      return oldValue.apply(this, arguments);
    };
  };
}
