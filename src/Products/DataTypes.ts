// http://docs.developer.amazonservices.com/en_US/products/Products_Datatypes.html

import {IError} from '../Core';
// USD(United States dollar) | EUR(European euro) | GBP(Great Britain pounds) | RMB(Chinese yuan) | INR(Indian rupee) | JPY(Japanese yen) | CAD(Canadian dollar) | MXN(Mexican peso);
export type TCurrencyCode = 'USD' | 'EUR' | 'GBP' | 'RMB' | 'INR' | 'JPY' | 'CAD' | 'MXN';
export type TFeeType =
  'ReferralFee'
  | 'VariableClosingFee'
  | 'PerItemFee'
  | 'FBAFees'
  | 'FBAPickAndPack'
  | 'FBAWeightHandling'
  | 'FBAOrderHandling'
  | 'FBADeliveryServicesFee';
export type TFulfillmentChannelType = 'Amazon' | 'Merchant';
export type TIdType = 'ASIN' | 'GCID' | 'SellerSKU' | 'UPC' | 'EAN' | 'ISBN' | 'JAN';

/**
 * Indicates whether the item isavailable for shipping now, or on a known or an unknown datein the future.
 * --------
 */
export interface IAvailabilityType {
  values: 'NOW' | 'FUTURE_WITHOUT_DATE' | 'FUTURE_WITH_DATE';
}

/**
 * The price of an item that is displayed in the Buy Box.
 * --------
 */
export interface IBuyBoxPrice {
  condition: string; // Type:xs:string
  LandedPrice: IMoneyType; // Type:MoneyType
  ListingPrice: IMoneyType; // Type:MoneyType
  Shipping: IMoneyType; // Type:MoneyType
  Points?: IPoints; // Type:Points
}

/**
 * The time range in which an item will likely beshipped once an order has been placed.
 * --------
 */
export interface IDetailedShippingTimeType {
  minimumHours?: number; // Type:xs:short
  maximumHours?: number; // Type:xs:short
  availableDate?: string; // Type:xs:dateTime
  availabilityType?: IAvailabilityType; // Type:AvailabilityType
}

/**
 * The type of fee, fee amount, and other details.
 * --------
 */
export interface IFeeDetail {
  FeeType: TFeeType; // Type:FeeType
  FeeAmount: IMoneyType; // Type:MoneyType
  FeePromotion?: IMoneyType; // Type:MoneyType
  TaxAmount?: IMoneyType; // Type:MoneyType
  FinalFee: IMoneyType; // Type:MoneyType
  IncludedFeeDetailList?: IFeeDetail[]; // Type:List of FeeDetail
}

/**
 * The total estimated fees for a product and a list ofdetails.
 * --------
 */
export interface IFeesEstimate {
  TotalFeesEstimate: IMoneyType; // Type:MoneyType
  FeeDetailList: IFeeDetail[]; // Type:List of FeeDetail
}

/**
 * A product identifier, marketplace, time of request,and other details that identify an estimate.
 * --------
 */
export interface IFeesEstimateIdentifier {
  MarketplaceId: string; // Type:MarketplaceType
  IdType: string; // Type:xs:string
  IdValue: string; // Type:xs:string
  PriceToEstimateFees: IPriceToEstimateFees; // Type:PriceToEstimateFees
  IsAmazonFulfilled: boolean; // Type:xs:boolean
  SellerInputIdentifier: string; // Type:xs:string
  TimeOfFeesEstimation: string; // Type:xs:dateTime
}

/**
 * A product, marketplace, and proposed price used torequest estimated fees.
 * --------
 */
export interface IFeesEstimateRequest {
  MarketplaceId?: string; // Type:MarketplaceType
  IdType: string; // Type:xs:string
  IdValue: string; // Type:xs:string
  PriceToEstimateFees: IPriceToEstimateFees; // Type:PriceToEstimateFees
  Identifier?: string; // Type:xs:string
  IsAmazonFulfilled?: boolean; // Type:xs:boolean
}

/**
 * A product identifier and the estimated fees for thatproduct.
 * --------
 */
export interface IFeesEstimateResult {
  FeesEstimateIdentifier: IFeesEstimateIdentifier; // Type:FeesEstimateIdentifier
  FeesEstimate?: IFeesEstimate; // Type:FeesEstimate
  Status: string; // Type:xs:string
  Error?: IError; // Type:Error
}

/**
 * The lowest price of an item.
 * --------
 */
export interface ILowestPrice {
  condition: string; // Type:xs:string
  fulfillmentChannel: TFulfillmentChannelType; // Type:FulfillmentChannelType
  LandedPrice: IMoneyType; // Type:MoneyType
  ListingPrice: IMoneyType; // Type:MoneyType
  Shipping: IMoneyType; // Type:MoneyType
  Points?: IPoints; // Type:Points
}

/**
 * An amount of money in a specified currency.
 * --------
 */
export interface IMoneyType {
  Amount?: number; // Type:xs:decimal
  CurrencyCode?: TCurrencyCode; // Type:xs:string
}

/**
 * The number of offers in a fulfillment channel that meet aspecific condition.
 * --------
 */
export interface IOfferCount {
  condition: string; // Type:xs:string
  fulfillmentChannel: TFulfillmentChannelType; // Type:FulfillmentChannelType
}

/**
 * The total number of offers for the specified condition andfulfillment channel.
 * --------
 */
export interface IOfferCountType {
  OfferCount?: IOfferCount; // Type:OfferCount
}

/**
 * The number of Amazon Points offered with thepurchase of an item. The Amazon Points program is only available in Japan.
 * --------
 */
export interface IPoints {
  PointsNumber: number; // Type:xs:int
}

/**
 * Price information for a product, used to estimatefees.
 * --------
 */
export interface IPriceToEstimateFees {
  ListingPrice: IMoneyType; // Type:MoneyType
  Shipping?: IMoneyType; // Type:MoneyType
  Points?: IPoints; // Type:Points
}

/**
 * Information about theseller's feedback, including the percentage of positivefeedback, and the total count of feedbackreceived.
 * --------
 */
export interface ISellerFeedbackRating {
  SellerPositiveFeedbackRating?: number; // Type:xs:double
  FeedbackCount: number; // Type:xs:long
}

/**
 * The state and country from where theitem is shipped.
 * --------
 */
export interface IShipsFrom {
  State?: string; // Type:xs:string
  Country?: string; // Type:xs:string
}

interface Identifiers {
  MarketplaceASIN?: { MarketplaceId: string, ASIN: string };
  SKUIdentifier?: { MarketplaceId: string, SellerId: string, SellerSKU: string };
}

interface AttributeSets {
  ItemAttributes: {
    Brand?: string;
    Model?: string; // sku
    Color?: string;
    Size?: string;
    Binding?: string;
    Department?: string;
    MaterialType?: string;
    ItemDimensions?: { Height?: number; Length?: number; Width?: number; };
    PackageDimensions?: { Height?: number; Length?: number; Width?: number; Weight?: number; };
    ProductGroup?: string;
    ProductTypeName: string;
    SmallImage: { URL: string; Height: number; Width: number; };
    Title: string;
    [name: string]: any;
  };
}

interface Relationships {
  VariationParent: { Identifiers: Identifiers };
}

interface SalesRankings {
  SalesRank: { ProductCategoryId: string; Rank: number }[];
}

interface CompetitivePricing {
  CompetitivePrices: any;
  NumberOfOfferListings: any;
}

export interface IProduct {
  Identifiers?: Identifiers;
  AttributeSets?: AttributeSets;
  Relationships?: Relationships;
  SalesRankings?: SalesRankings;
  Error?: IError;
}

export interface ICompetitivePricing extends IProduct {
  CompetitivePricing?: CompetitivePricing;
}

// http://docs.developer.amazonservices.com/en_US/products/Products_ListMatchingProducts.html
export interface IReqListMatchingProducts {
  MarketplaceId?: string;
  QueryContextId?: string;
  Query: string;
}

export interface IResListMatchingProducts {
  Products: {
    Identifiers?: Identifiers;
    AttributeSets?: AttributeSets;
    Relationships?: Relationships;
    SalesRankings?: SalesRankings;
  }[];
}

// http://docs.developer.amazonservices.com/en_US/products/Products_GetMatchingProduct.html
export interface IReqGetMatchingProduct {
  MarketplaceId?: string;
  ASINList: string[];
}

export interface IResGetMatchingProduct {
  Products: IProduct[];
}

// http://docs.developer.amazonservices.com/en_US/products/Products_GetMatchingProductForId.html
export interface IReqGetMatchingProductForId {
  MarketplaceId?: string; // Type:MarketplaceType
  IdType: TIdType; // Type:xs:string
  IdList: string[]; // Type:List of xs:string
}

export interface IResGetMatchingProductForId {
  Products: IProduct[];
}

// http://docs.developer.amazonservices.com/en_US/products/Products_GetCompetitivePricingForSKU.html
export interface IReqGetCompetitivePricingForSKU {
  MarketplaceId?: string;
  SellerSKUList: string[];
}

export interface IResGetCompetitivePricingForSKU {
  Products: ICompetitivePricing[];
}

// http://docs.developer.amazonservices.com/en_US/products/Products_GetCompetitivePricingForASIN.html
export interface IReqGetCompetitivePricingForASIN {
  MarketplaceId?: string;
  ASINList: string[];
}

export interface IResGetCompetitivePricingForASIN {
  Products: ICompetitivePricing[];
}

// http://docs.developer.amazonservices.com/en_US/products/Products_GetMyFeesEstimate.html
export interface IReqGetMyFeesEstimate {
  FeesEstimateRequestList: IFeesEstimateRequest[];
}

export interface IResGetMyFeesEstimate {
  FeesEstimateResultList: IFeesEstimateResult[];
}
