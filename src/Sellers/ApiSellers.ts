import { IResListMarketplaceParticipations } from './DataTypes';
import {Api, API, API_METHOD, IAccess, IGetServiceStatus, ISeller, listTakeOffLayer} from '../Core';

function disposeMarketplaceParticipations(ct: any) {
  Object.keys(ct).forEach(key => {
    ct[key] = listTakeOffLayer(key, ct[key]);
  });
  return ct;
}

@API('Sellers', '2011-07-01')
export class ApiSellers extends Api {

  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }

  @API_METHOD('POST')
  public async GetServiceStatus(): Promise<IGetServiceStatus> {
    const options= this.CreateOptions();
    return await this.CreateRequest(options);
  }

  @API_METHOD('POST')
  public async ListMarketplaceParticipations(): Promise<IResListMarketplaceParticipations> {
    const options= this.CreateOptions();
    return disposeMarketplaceParticipations(await this.CreateRequest(options));
  }

  @API_METHOD('POST')
  public async ListMarketplaceParticipationsByNextToken(params: { NextToken: string }): Promise<IResListMarketplaceParticipations> {
    const options= this.CreateOptions(params);
    return disposeMarketplaceParticipations(await this.CreateRequest(options));
  }

  public async ListMarketplaceParticipationsContinue(): Promise<IResListMarketplaceParticipations> {
    const tempRs = await this.ListMarketplaceParticipations();
    if (!tempRs.NextToken) {
      return tempRs;
    }
    let NextToken = tempRs.NextToken;
    while (NextToken) {
      const nextRs = await this.ListMarketplaceParticipationsByNextToken({ NextToken });
      tempRs.ListParticipations = [...tempRs.ListParticipations, ...nextRs.ListParticipations];
      tempRs.ListMarketplaces = [...tempRs.ListMarketplaces, ...nextRs.ListMarketplaces];
      NextToken = nextRs.NextToken;
    }
    return tempRs;
  }
}
