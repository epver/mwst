import {IAccess, IArea, ISeller, TArea} from './Core';
import {ApiEasyShip} from './EasyShip';
import {ApiFeeds} from './Feeds';
import {ApiFinances} from './Finances';
import {ApiFulfillmentInboundShipment} from './FulfillmentInboundShipment';
import {ApiFulfillmentInventory} from './FulfillmentInventory';
import {ApiFulfillmentOutboundShipment} from './FulfillmentOutboundShipment';
import {ApiMerchantFulfillment} from './MerchantFulfillment';
import {ApiOffAmazonPayments} from './OffAmazonPayments';
import {ApiOrders} from './Orders';
import {ApiProducts} from './Products';
import {ApiRecommendations} from './Recommendations';
import {ApiReports} from './Reports';
import {ApiSellers} from './Sellers';
import {ApiShipmentInvoicing} from './ShipmentInvoicing';

export class Amazon {
  public apiEasyShip: ApiEasyShip;
  public apiFeeds: ApiFeeds;
  public apiFinances: ApiFinances;
  public apiFulfillmentInboundShipment: ApiFulfillmentInboundShipment;
  public apiFulfillmentInventory: ApiFulfillmentInventory;
  public apiFulfillmentOutboundShipment: ApiFulfillmentOutboundShipment;
  public apiMerchantFulfillment: ApiMerchantFulfillment;
  public apiOffAmazonPayments: ApiOffAmazonPayments;
  public apiOrders: ApiOrders;
  public apiProducts: ApiProducts;
  public apiRecommendations: ApiRecommendations;
  public apiReports: ApiReports;
  public apiSellers: ApiSellers;
  public apiShipmentInvoicing: ApiShipmentInvoicing;

  constructor(seller: ISeller, access?: IAccess) {
    this.apiEasyShip = new ApiEasyShip(seller, access);
    this.apiFeeds = new ApiFeeds(seller, access);
    this.apiFinances = new ApiFinances(seller, access);
    this.apiFulfillmentInboundShipment = new ApiFulfillmentInboundShipment(seller, access);
    this.apiFulfillmentInventory = new ApiFulfillmentInventory(seller, access);
    this.apiFulfillmentOutboundShipment = new ApiFulfillmentOutboundShipment(seller, access);
    this.apiMerchantFulfillment = new ApiMerchantFulfillment(seller, access);
    this.apiOffAmazonPayments = new ApiOffAmazonPayments(seller, access);
    this.apiOrders = new ApiOrders(seller, access);
    this.apiProducts = new ApiProducts(seller, access);
    this.apiRecommendations = new ApiRecommendations(seller, access);
    this.apiReports = new ApiReports(seller, access);
    this.apiSellers = new ApiSellers(seller, access);
    this.apiShipmentInvoicing = new ApiShipmentInvoicing(seller, access);
  }

  public ConfigureArea(area: TArea = 'US'): void {
    for (const property of Object.keys(this)) {
      this[property].ConfigureArea(area);
    }
  }

  public ConfigureSeller(seller: ISeller): void {
    for (const property of Object.keys(this)) {
      this[property].ConfigureSeller(seller);
    }
  }
}
