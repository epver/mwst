import {config as dotConfig} from 'dotenv';
import {IAccess, IHeaders, ISeller, ISetting, TArea} from './CoreTypes';

dotConfig();

export const defaultSetting: ISetting = {
  Convert: process.env.API_CONVERT === 'XML' ? 'JSON' : 'JSON',
  Timeout: Number(process.env.API_TIMEOUT) || 360,
  Retrying: Number(process.env.API_RETRYING) || 6,
  Throttled: Number(process.env.API_THROTTLED) || 0,
  IsMerchant: false
};

export const defaultHeaders: IHeaders = {
  'User-Agent': process.env.API_USER_AGENT || 'MWST/1.0 (language=TypeScript)',
};

export const defaultAccess: IAccess = {
  AWSAccessKeyId: process.env.API_AWS_KEY || '',
  AWSAccessSecret: process.env.API_AWS_SECRET || ''
};

export const defaultSeller: ISeller = {
  Mark: process.env.API_MWS_SELLER_MARK || 'MWST',
  Area: process.env.API_MWS_SELLER_AREA as TArea || 'US',
  SellerId: '',
  MWSAuthToken: ''
};

export const testingPort: number = Number(process.env.TESTING_PORT) || 36800
