import {API, Api, IAccess, ISeller} from '../Core';

@API('OffAmazonPayments', '2015-06-01')
export class ApiOffAmazonPayments extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }
}
