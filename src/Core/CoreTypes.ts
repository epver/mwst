export type TMethod = 'GET' | 'POST';

export type TConvert = 'JSON' | 'XML';

export interface ISetting {
  Convert?: TConvert;
  Timeout?: number;
  Retrying?: number;
  Throttled?: number;
}

export interface IHeaders {
  [key: string]: string;
}
