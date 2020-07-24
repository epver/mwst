export type TMethod = 'GET' | 'POST';

export type TConvert = 'JSON' | 'XML';

export type TArea = 'BR' | 'CA' | 'MX' | 'AE' | 'DE' | 'ES' | 'FR' | 'GB' | 'IN' | 'IT' | 'TR' | 'AU' | 'JP' | 'CN' | 'US' | 'TEST';

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

export interface IOptions {
  url: string;
  init: {
    headers: Record<string, string>;
    timeout: number
    method?: 'GET' | 'POST';
    body?: any;
  }
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


// amazon
export interface IGetServiceStatus {
  Status?: 'GREEN' | 'YELLOW' | 'RED'; // Type:xs:string
  Timestamp?: string; // Type:xs:dateTime
  [message: string]: string; // messages
}

export interface IAddress {
  Name: string; // Type:xs:string
  Line1: string; // Type:xs:string
  Line2?: string; // Type:xs:string
  Line3?: string; // Type:xs:string
  DistrictOrCounty?: string; // Type:xs:string
  City?: string; // Type:xs:string
  StateOrProvinceCode: string; // Type:xs:string
  CountryCode: string; // Type:xs:string
  PostalCode?: string; // Type:xs:string
  PhoneNumber?: string; // Type:xs:string
}

export interface IWeight {
  Unit: 'KG' | 'LB'; // Type:xs:string
  Value: string; // Type:xs:string
}

export interface IError {
  Code: string;
  Type: string;
  Message: string;
  Detail?: string;
}

