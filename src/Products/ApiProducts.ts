import {
  IReqListMatchingProducts, IResListMatchingProducts,
  IReqGetMatchingProduct, IResGetMatchingProduct,
  IReqGetMatchingProductForId, IResGetMatchingProductForId,
  TIdType, IProduct, IReqGetMyFeesEstimate, IResGetMyFeesEstimate,
} from './DataTypes';
import {Api, API, API_METHOD, IAccess, IGetServiceStatus, ISeller, splitArray, isArray} from '../Core';

@API('Products', '2011-10-01')
export class ApiProducts extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }


  @API_METHOD('POST')
  async GetServiceStatus(): Promise<IGetServiceStatus> {
    return await this.CreateRequest(this.CreateOptions());
  }

  /**
   * 最大请求配额    : 20/max
   * 恢复率         : 5/sec
   * 每小时请求配额   : 720/hour
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async ListMatchingProducts(params: IReqListMatchingProducts): Promise<IResListMatchingProducts> {
    const options = this.CreateOptions(params);
    const result = await this.CreateRequest(options);
    return {Products: result.Products.Product};
  }

  /**
   * 最大请求配额    : 20/max
   * 恢复率         : 0.5/sec
   * 每小时请求配额   : 7200/hour
   */

  @API_METHOD('POST', {Throttled: 0.5})
  async GetMatchingProduct(params: IReqGetMatchingProduct): Promise<IResGetMatchingProduct> {
    const options = this.CreateOptions(params, {ASINList: 'ASINList.ASIN.'});
    const result = await this.CreateRequest(options);
    if (isArray(result)) {
      // @ts-ignore
      return {Products: result.map(item => ({...item.Product}))};
    } else {
      return {Products: [result.Product]};
    }
  }

  /**
   * 最大请求配额    : 20/max
   * 恢复率         : 0.2/sec
   * 每小时请求配额   : 18000/hour
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetMatchingProductForId(params: IReqGetMatchingProductForId): Promise<IResGetMatchingProductForId> {
    params.MarketplaceId = params.MarketplaceId || this.Area.Id;
    if (params.IdList.length > 5) {
      const parts = splitArray(params.IdList, 5);
      let partRs = null;
      for (const part of parts) {
        const tempRs = await this.GetMatchingProductForId({...params, IdList: part});
        if (!partRs) {
          partRs = tempRs;
        } else {
          partRs.Products = [...partRs.Products, ...tempRs.Products];
        }
      }
      return partRs;
    }
    const options = this.CreateOptions(params, {IdList: 'IdList.Id.'});
    const result = await this.CreateRequest(options);
    if (isArray(result)) {
      return {
        // @ts-ignore
        Products: result.map(item => {
          if (item.Error) {
            return {Error: item.Error};
          }
          return {...item.Products.Product};
        }),
      };
    } else {
      if (result.Error) {
        return {Products: [{Error: result.Error}]};
      }
      return {Products: [result.Products.Product]};
    }
  }

  @API_METHOD('POST', {Throttled: 0.2})
  async GetMatchingProductForIdOne(id: string, type: TIdType = 'SellerSKU'): Promise<IProduct> {
    const options = this.CreateOptions({
      MarketplaceId: this.Area.Id,
      IdType: type,
      'IdList.Id.1': id
    });
    this.Action = 'GetMatchingProductForId';
    const result = await this.CreateRequest(options);
    if (result.Error) {
      return null;
    }
    return result.Products.Product;
  }

  // ==================== 以下暂时用不到 ====================
  /**
   * 最大请求配额    : 20/max
   * 恢复率         : 0.1/sec
   * 每小时请求配额   : 36000/hour
   * @deprecated standing off
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetCompetitivePricingForSKU(params: any): Promise<any> {
    return null;
  }

  /**
   * 最大请求配额    : 20/max
   * 恢复率         : 0.1/sec
   * 每小时请求配额   : 36000/hour
   * @deprecated standing off
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetCompetitivePricingForASIN(params: any): Promise<any> {
    return null;
  }

  /**
   * 最大请求配额    : 20/max
   * 恢复率         : 0.1/sec
   * 每小时请求配额   : 36000/hour
   * @deprecated standing off
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetLowestOfferListingsForSKU(params: any): Promise<any> {
    return null;
  }

  /**
   * 最大请求配额    : 20/max
   * 恢复率         : 0.1/sec
   * 每小时请求配额   : 36000/hour
   * @deprecated standing off
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetLowestOfferListingsForASIN(params: any): Promise<any> {
    return null;
  }

  /**
   * 最大请求配额    : 10/max
   * 恢复率         : 0.2/sec
   * 每小时请求配额   : 200/hour
   * @deprecated standing off
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetLowestPricedOffersForSKU(params: any): Promise<any> {
    return null;
  }

  /**
   * 最大请求配额    : 10/max
   * 恢复率         : 0.2/sec
   * 每小时请求配额   : 200/hour
   * @deprecated standing off
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetLowestPricedOffersForASIN(params: any): Promise<any> {
    return null;
  }

  /**
   * 最大请求配额    : 10/max
   * 恢复率         : 0.1/sec
   * 每小时请求配额   : 36000/hour
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetMyFeesEstimate(params: IReqGetMyFeesEstimate): Promise<IResGetMyFeesEstimate> {

    const marketplace = this.Area.Id;
    const updates: { [key: string]: any } = {};
    const feeslist = params.FeesEstimateRequestList;

    for (let i = 0; i < Object.keys(feeslist).length; i++) {
      // const argument = arguments[i];
      const prefix = `FeesEstimateRequestList.FeesEstimateRequest.${i + 1}.`;
      const current = feeslist[i];
      updates[`${prefix}MarketplaceId`] = current.MarketplaceId || marketplace;

      updates[`${prefix}IdType`] = current.IdType;
      updates[`${prefix}IdValue`] = current.IdValue;
      updates[`${prefix}IsAmazonFulfilled`] = current.IsAmazonFulfilled || true;
      updates[`${prefix}Identifier`] = current.Identifier || `request__${i + 1}`;
      updates[`${prefix}PriceToEstimateFees.ListingPrice.CurrencyCode`] = current.PriceToEstimateFees.ListingPrice.CurrencyCode;
      updates[`${prefix}PriceToEstimateFees.ListingPrice.Amount`] = current.PriceToEstimateFees.ListingPrice.Amount;

      if (current.PriceToEstimateFees.Shipping) {
        updates[`${prefix}PriceToEstimateFees.Shipping.CurrencyCode`] = current.PriceToEstimateFees.Shipping.CurrencyCode;
        updates[`${prefix}PriceToEstimateFees.Shipping.Amount`] = current.PriceToEstimateFees.Shipping.Amount;
      }

      if (current.PriceToEstimateFees.Points) {
        updates[`${prefix}PriceToEstimateFees.Points.PointsNumber`] = current.PriceToEstimateFees.Points.PointsNumber;
      }
    }
    const options = this.CreateOptions(updates);
    return await this.CreateRequest({...options});
  }

  /**
   * 最大请求配额    : 10/max
   * 恢复率         : 0.1/sec
   * 每小时请求配额   : 36000/hour
   * @deprecated standing off
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetMyPriceForSKU(params: any): Promise<any> {
    return null;
  }

  /**
   * 最大请求配额    : 10/max
   * 恢复率         : 0.1/sec
   * 每小时请求配额   : 36000/hour
   * @deprecated standing off
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetMyPriceForASIN(params: any): Promise<any> {
    return null;
  }

  /**
   * 最大请求配额    : 20/max
   * 恢复率         : 0.2/sec
   * 每小时请求配额   : 720/hour
   * @deprecated standing off
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetProductCategoriesForSKU(params: any): Promise<any> {
    return null;
  }

  /**
   * 最大请求配额    : 20/max
   * 恢复率         : 0.2/sec
   * 每小时请求配额   : 720/hour
   * @deprecated standing off
   */
  @API_METHOD('POST', {Throttled: 0.2})
  async GetProductCategoriesForASIN(params: any): Promise<any> {
    return null;
  }
}
