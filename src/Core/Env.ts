import dotenv from 'dotenv';
import {IHeaders, ISetting} from './CoreTypes';

dotenv.config();

export const defaultSetting: ISetting = {
  Convert: process.env.API_CONVERT === 'XML' ? 'JSON' : 'JSON',
  Timeout: Number(process.env.API_TIMEOUT) || 90,
  Retrying: Number(process.env.API_RETRYING) || 3,
  Throttled: Number(process.env.API_THROTTLED) || 0
};

export const defaultHeaders: IHeaders = {
  'User-Agent': process.env.API_USER_AGENT || 'MWST/1.0 (language=TypeScript)',
};
