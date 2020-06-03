import {Api, API, API_METHOD, IAccess, IGetServiceStatus, ISeller, splitArray, isObject, isArray} from '../Core';
import {
  IReqListInventorySupply, IReqListInventorySupplyBySkus, IResListInventorySupply,
  IReqListInventorySupplyByNextToken, IResListInventorySupplyByNextToken,
} from './DataTypes';

function disposeInventorySupply(ct: any) {
  if (isObject(ct.InventorySupplyList)) {
    if (isArray(ct.InventorySupplyList.member)) {
      ct.InventorySupplyList = ct.InventorySupplyList.member;
    } else {
      ct.InventorySupplyList = [ct.InventorySupplyList.member];
    }
  } else {
    ct.InventorySupplyList = [];
  }
  return ct;
}

@API('FulfillmentInventory', '2010-10-01')
export class ApiFulfillmentInventory extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }

  @API_METHOD('GET')
  public async GetServiceStatus(): Promise<IGetServiceStatus> {
    const options = this.CreateOptions(this);
    return await this.CreateRequest(options);
  }

  /**
   * 最大请求配额    : 30/sec
   * 恢复率         : 2/sec
   * 每小时请求配额   : 1800/hour
   */
  @API_METHOD('GET', {Throttled: 2})
  public async ListInventorySupply(params: IReqListInventorySupply): Promise<IResListInventorySupply> {
    const options = this.CreateOptions(params);
    return disposeInventorySupply(await this.CreateRequest(options));
  }

  @API_METHOD('GET', {Throttled: 2})
  public async ListInventorySupplyBySkus(params: IReqListInventorySupplyBySkus): Promise<IResListInventorySupply> {
    if (params.SellerSkus.length > 50) {
      const parts = splitArray(params.SellerSkus, 50);
      let partRs = null;
      for (const part of parts) {
        const tempRs = await this.ListInventorySupplyBySkus({SellerSkus: part});
        if (!partRs) {
          partRs = tempRs;
        } else {
          partRs.InventorySupplyList = [...partRs.InventorySupplyList, ...tempRs.InventorySupplyList];
        }
      }
      return partRs;
    }
    const options = this.CreateOptions(params, {SellerSkus: 'SellerSkus.member.'});
    this.Action = 'ListInventorySupply';
    return disposeInventorySupply(await this.CreateRequest(options));
  }

  @API_METHOD('GET', {Throttled: 2})
  public async ListInventorySupplyByNextToken(params: IReqListInventorySupplyByNextToken): Promise<IResListInventorySupplyByNextToken> {
    const options = this.CreateOptions(params);
    return disposeInventorySupply(await this.CreateRequest(options));
  }

  public async ListInventorySupplyContinue(params: IReqListInventorySupply): Promise<IResListInventorySupply> {
    const tempRs = await this.ListInventorySupply(params);
    if (!tempRs.NextToken) {
      return tempRs;
    }
    let NextToken = tempRs.NextToken;
    while (NextToken) {
      const nextRs = await this.ListInventorySupplyByNextToken({NextToken});
      tempRs.InventorySupplyList = [...tempRs.InventorySupplyList, ...nextRs.InventorySupplyList];
      NextToken = nextRs.NextToken;
    }
    return tempRs;
  }
}
