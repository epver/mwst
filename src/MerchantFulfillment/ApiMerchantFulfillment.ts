import {API, Api, IAccess, ISeller} from '../Core';

@API('MerchantFulfillment', '2015-06-01')
export class ApiMerchantFulfillment extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }
}
