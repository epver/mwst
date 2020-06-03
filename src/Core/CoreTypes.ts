export type TMethod = 'GET' | 'POST';

export type TConvert = 'JSON' | 'XML';

export type TArea = 'BR' | 'CA' | 'MX' | 'AE' | 'DE' | 'ES' | 'FR' | 'GB' | 'IN' | 'IT' | 'TR' | 'AU' | 'JP' | 'CN' | 'US';

export interface IArea {
  Id: string;
  Host: string;
}

export interface IObject {
  [key: string]: any;
}

export interface IAccess {
  AWSAccessKeyId: string;
  AWSAccessSecret: string
}

export interface ISeller {
  Mark?: string;
  Area?: TArea;
  SellerId: string;
  MWSAuthToken: string;
}

export interface ISetting {
  Convert?: TConvert;
  Timeout?: number;
  Retrying?: number;
  Throttled?: number;
  IsMerchant?: boolean;
}

export interface IHeaders extends IObject {
}

export interface IApi {
  Path?: string;
  Version?: string;
  Method?: TMethod;
  Action?: string;
  Setting?: ISetting;
  Headers?: IHeaders;

  Area: IArea;
  Access: IAccess;
  Seller: ISeller;
}
