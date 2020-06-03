import {API, Api, IAccess, ISeller} from '../Core';

@API('ShipmentInvoicing', '2015-06-01')
export class ApiShipmentInvoicing extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }
}
