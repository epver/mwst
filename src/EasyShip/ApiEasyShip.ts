import {API, Api, IAccess, ISeller} from '../Core';

@API('EasyShip', '2015-06-01')
export class ApiEasyShip extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }
}
