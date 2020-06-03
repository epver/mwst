import {API, Api, IAccess, ISeller} from '../Core';

@API('Subscriptions', '2013-07-01')
export class ApiSubscriptions extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }
}
