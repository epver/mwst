import {API, Api, IAccess, ISeller} from '../Core';

@API('Recommendations', '2013-09-01')
export class ApiRecommendations extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }
}
