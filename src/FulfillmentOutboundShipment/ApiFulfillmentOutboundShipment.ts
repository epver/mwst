import {API, Api, IAccess, ISeller} from '../Core';

@API('FulfillmentOutboundShipment', '2010-10-01')
export class ApiFulfillmentOutboundShipment extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }
}
