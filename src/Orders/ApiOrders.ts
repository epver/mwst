import {Api, API, API_METHOD, IAccess, IGetServiceStatus, ISeller, splitArray, isObject, isArray} from '../Core';
import {
  IReqGetOrder, IResGetOrder,
  IReqListOrders, IResListOrders,
  IReqListOrdersByNextToken, IResListOrdersByNextToken,
  IReqListOrderItems, IResListOrderItems,
  IReqListOrderItemsByNextToken, IResListOrderItemsByNextToken,
} from './DataTypes';

function disposeOrders(ct: any) {
  if (isObject(ct.Orders)) {
    if (isArray(ct.Orders.Order)) {
      ct.Orders = ct.Orders.Order;
    } else {
      ct.Orders = [ct.Orders.Order];
    }
  } else {
    ct.Orders = [];
  }
  return ct;
}

function disposeOrderItems(ct: any) {
  if (isObject(ct.OrderItems)) {
    if (isArray(ct.OrderItems.OrderItem)) {
      ct.OrderItems = ct.OrderItems.OrderItem;
    } else {
      ct.OrderItems = [ct.OrderItems.OrderItem];
    }
  } else {
    ct.OrderItems = [];
  }
  return ct;
}

@API('Orders', '2013-09-01')
export class ApiOrders extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }

  @API_METHOD('GET')
  public async GetServiceStatus(): Promise<IGetServiceStatus> {
    return await this.CreateRequest(this.CreateOptions());
  }

  /**
   * 最大请求配额    : 6/max
   * 恢复率         : 1/min
   * 每小时请求配额   : 1800/hour
   */
  @API_METHOD('GET', {Throttled: 60})
  public async GetOrder(params: IReqGetOrder): Promise<IResGetOrder> {
    if (params.AmazonOrderIds.length === 0) {
      return {Orders: []};
    }
    if (params.AmazonOrderIds.length > 50) {
      const parts = splitArray(params.AmazonOrderIds, 50);
      let partRs = null;
      for (const part of parts) {
        const tempRs = await this.GetOrder({AmazonOrderIds: part});
        if (!partRs) {
          partRs = tempRs;
        } else {
          partRs.Orders = [...partRs.Orders, ...tempRs.Orders];
        }
      }
      return partRs;
    }
    const options = this.CreateOptions(params, {AmazonOrderIds: 'AmazonOrderId.Id.'});
    return disposeOrders(await this.CreateRequest(options));
  }

  @API_METHOD('GET', {Throttled: 60})
  public async ListOrders(params: IReqListOrders): Promise<IResListOrders> {
    // TODO Currently support single marketplace
    params['MarketplaceId.Id.1'] = this.Area.Id;
    delete params.MarketplaceId;
    const options = this.CreateOptions(params);
    return disposeOrders(await this.CreateRequest(options));
  }

  @API_METHOD('GET', {Throttled: 60})
  public async ListOrdersByNextToken(params: IReqListOrdersByNextToken): Promise<IResListOrdersByNextToken> {
    const options = this.CreateOptions(params);
    return disposeOrders(await this.CreateRequest(options));
  }

  public async ListOrdersContinue(params: IReqListOrders): Promise<IResListOrders> {
    const tempRs = await this.ListOrders(params);
    if (!tempRs.NextToken) {
      return tempRs;
    }
    let NextToken = tempRs.NextToken;
    while (NextToken) {
      const nextRs = await this.ListOrdersByNextToken({NextToken});
      tempRs.Orders = [...tempRs.Orders, ...nextRs.Orders];
      NextToken = nextRs.NextToken;
    }
    return tempRs;
  }

  /**
   * 最大请求配额    : 30/max
   * 恢复率         : 2/sec
   * 每小时请求配额   : null/hour
   */
  @API_METHOD('GET', {Throttled: 2, Timeout: 30})
  public async ListOrderItems(params: IReqListOrderItems): Promise<IResListOrderItems> {
    const options = this.CreateOptions(params);
    return disposeOrderItems(await this.CreateRequest(options));
  }

  @API_METHOD('GET', {Throttled: 2, Timeout: 30})
  public async ListOrderItemsByNextToken(params: IReqListOrderItemsByNextToken): Promise<IResListOrderItemsByNextToken> {
    const options = this.CreateOptions(params);
    return disposeOrderItems(await this.CreateRequest(options));
  }

  public async ListOrderItemsContinue(params: IReqListOrderItems): Promise<IResListOrderItems> {
    const tempRs = await this.ListOrderItems(params);
    if (!tempRs.NextToken) {
      return tempRs;
    }
    let NextToken = tempRs.NextToken;
    while (NextToken) {
      const nextRs = await this.ListOrderItemsByNextToken({NextToken});
      tempRs.OrderItems = [...tempRs.OrderItems, ...nextRs.OrderItems];
      NextToken = nextRs.NextToken;
    }
    return tempRs;
  }

}