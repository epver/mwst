// http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_Datatypes.html

import {IAddress, IMoney} from '../Core';

type TOrderStatus = 'PendingAvailability'
  | 'Pending'
  | 'Unshipped'
  | 'PartiallyShipped'
  | 'Shipped'
  | 'Canceled'
  | 'Unfulfillable';

/**
 * Buyer information for custom orders from the Amazon Custom program.
 * --------
 * ListOrderItems
 * ListOrderItemsByNextToken
 */
export interface IBuyerCustomizedInfo {
  CustomizedURL: string; // Type:xs:string
}

/**
 * Tax information about the buyer.
 * --------
 * ListOrders
 * ListOrdersByNextToken
 * GetOrder
 */
export interface IBuyerTaxInfo {
  CompanyLegalName?: string; // Type:xs:string
  TaxingRegion?: string; // Type:xs:string
  TaxClassifications?: ITaxClassification[]; // Type:List of TaxClassification
}

/**
 * Invoice information.This datatype is used only in the China marketplace.
 * --------
 * ListOrderItems
 * ListOrderItemsByNextToken
 */
export interface IInvoiceData {
  InvoiceRequirement?: string; // Type:xs:string
  BuyerSelectedInvoiceCategory?: string; // Type:xs:string
  InvoiceTitle?: string; // Type:xs:string
  InvoiceInformation?: string; // Type:xs:string
}

/**
 * Order information.
 * --------
 * ListOrders
 * ListOrdersByNextToken
 * GetOrder
 */
export interface IOrder {
  AmazonOrderId: string; // Type:xs:string
  SellerOrderId?: string; // Type:xs:string
  PurchaseDate: string; // Type:xs:dateTime
  LastUpdateDate: string; // Type:xs:dateTime
  OrderStatus: TOrderStatus; // Type:xs:string
  FulfillmentChannel?: string; // Type:xs:string
  SalesChannel?: string; // Type:xs:string
  OrderChannel?: string; // Type:xs:string
  ShipServiceLevel?: string; // Type:xs:string
  ShippingAddress?: IAddress; // Type:Address
  OrderTotal?: IMoney; // Type:Money
  NumberOfItemsShipped?: number; // Type:xs:int
  NumberOfItemsUnshipped?: number; // Type:xs:int
  PaymentExecutionDetail?: IPaymentExecutionDetailItem[]; // Type:List of PaymentExecutionDetailItem
  PaymentMethod?: 'COD' | 'CVS' | 'Other'; // Type:xs:string
  PaymentMethodDetails?: IPaymentMethodDetails; // Type:PaymentMethodDetails
  IsReplacementOrder?: boolean; // Type:xs:boolean
  ReplacedOrderId?: string; // Type:xs:string
  MarketplaceId?: string; // Type:xs:string
  BuyerEmail?: string; // Type:xs:string
  BuyerName?: string; // Type:xs:string
  BuyerCounty?: string; // Type:xs:string
  BuyerTaxInfo?: IBuyerTaxInfo; // Type:BuyerTaxInfo
  ShipmentServiceLevelCategory?: string; // Type:xs:string
  ShippedByAmazonTFM?: boolean; // Type:xs:boolean
  TFMShipmentStatus?: string; // Type:xs:string
  EasyShipShipmentStatus?: string; // Type:xs:string
  OrderType?: string; // Type:xs:string
  EarliestShipDate?: string; // Type:xs:dateTime
  LatestShipDate?: string; // Type:xs:dateTime
  EarliestDeliveryDate?: string; // Type:xs:dateTime
  LatestDeliveryDate?: string; // Type:xs:dateTime
  IsBusinessOrder?: boolean; // Type:xs:boolean
  PurchaseOrderNumber?: string; // Type:xs:string
  IsPrime?: boolean; // Type:xs:boolean
  IsPremiumOrder?: boolean; // Type:xs:boolean
  PromiseResponseDueDate?: string; // Type:xs:dateTime
  IsEstimatedShipDateSet?: boolean; // Type:xs:boolean
}

/**
 * OrderItem information.
 * --------
 * ListOrderItems
 * ListOrderItemsByNextToken
 */
export interface IOrderItem {
  ASIN: string; // Type:xs:string
  OrderItemId: string; // Type:xs:string
  SellerSKU?: string; // Type:xs:string
  BuyerCustomizedInfo?: IBuyerCustomizedInfo; // Type:BuyerCustomizedInfo
  Title?: string; // Type:xs:string
  QuantityOrdered: number; // Type:xs:int
  QuantityShipped?: number; // Type:xs:int
  PointsGranted?: IPointsGranted; // Type:PointsGranted
  ProductInfo?: IProductInfo; // Type:ProductInfo
  ItemPrice?: IMoney; // Type:Money
  ShippingPrice?: IMoney; // Type:Money
  GiftWrapPrice?: IMoney; // Type:Money
  TaxCollection?: ITaxCollection; // Type:TaxCollection
  ItemTax?: IMoney; // Type:Money
  ShippingTax?: IMoney; // Type:Money
  GiftWrapTax?: IMoney; // Type:Money
  ShippingDiscount?: IMoney; // Type:Money
  PromotionDiscount?: IMoney; // Type:Money
  PromotionIds?: string; // Type:Listofxs:string
  CODFee?: IMoney; // Type:Money
  CODFeeDiscount?: IMoney; // Type:Money
  IsGift?: boolean; // Type:xs:boolean
  GiftMessageText?: string; // Type:xs:string
  GiftWrapLevel?: string; // Type:xs:string
  InvoiceData?: IInvoiceData; // Type:InvoiceData
  ConditionNote?: string; // Type:xs:string
  ConditionId?: string; // Type:xs:string
  ConditionSubtypeId?: string; // Type:xs:string
  ScheduledDeliveryStartDate?: string; // Type:xs:string
  ScheduledDeliveryEndDate?: string; // Type:xs:string
  PriceDesignation?: string; // Type:xs:string
  IsTransparency?: boolean; // Type:xs:boolean
  SerialNumberRequired?: boolean; // Type:xs:boolean
}

/**
 * Information about a sub-payment method used to pay for a COD order.
 * --------
 * ListOrders
 * ListOrdersByNextToken
 * GetOrder
 */
export interface IPaymentExecutionDetailItem {
  Payment: IMoney; // Type:Money
  PaymentMethod: string; // Type:xs:string
}

/**
 * A list of payment methods for the order.
 * --------
 * ListOrders
 * ListOrdersByNextToken
 * GetOrder
 */
export interface IPaymentMethodDetails {
  PaymentMethodDetail?: string; // Type:xs:string
}

/**
 * Product information for the item.This datatype is used only in the US, Spain,UK, France, Germany, Italy, India, and Japan marketplaces.
 * --------
 * ListOrderItems
 * ListOrderItemsByNextToken
 */
export interface IProductInfo {
  NumberOfItems?: number; // Type:xs:int
}

/**
 * The number and value of Amazon Points granted with the purchase of an item.This datatype is used only in the Japan marketplace.
 * --------
 * ListOrderItems
 * ListOrderItemsByNextToken
 */
export interface IPointsGranted {
  PointsNumber?: number; // Type:xs:int
  PointsMonetaryValue?: IMoney; // Type:Money
}

/**
 * A tax type and identifier.
 * --------
 * ListOrderItems
 * ListOrderItemsByNextToken
 */
export interface ITaxClassification {
  Name: string; // Type:xs:string
  Value: string; // Type:xs:string
}

/**
 * Information about withheld taxes.
 * --------
 * ListOrderItems
 * ListOrderItemsByNextToken
 */
export interface ITaxCollection {
  Model: string; // Type:xs:string
  ResponsibleParty: string; // Type:xs:string
}

// http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_GetOrder.html
export interface IReqGetOrder {
  AmazonOrderIds: string[]; // Type:xs:string
}

export interface IResGetOrder {
  Orders: IOrder[]; // Type:List of Order
}

// http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_ListOrderItems.html
export interface IReqListOrderItems {
  AmazonOrderId: string; // Type:xs:string
}

export interface IResListOrderItems {
  NextToken?: string; // Type:xs:string
  AmazonOrderId: string; // Type:xs:string
  OrderItems: IOrderItem[]; // Type:List of OrderItem
}

// http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_ListOrderItemsByNextToken.html
export interface IReqListOrderItemsByNextToken {
  NextToken: string; // Type:xs:string
}

// tslint:disable-next-line:no-empty-interface
export interface IResListOrderItemsByNextToken extends IResListOrderItems {
}

// http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_ListOrders.html
export interface IReqListOrders {
  CreatedAfter?: string; // Type:xs:dateTime
  CreatedBefore?: string; // Type:xs:dateTime
  LastUpdatedAfter?: string; // Type:xs:dateTime
  LastUpdatedBefore?: string; // Type:xs:dateTime
  OrderStatus?: string; // Type:xs:string
  MarketplaceId?: string | string[]; // Type:xs:string
  FulfillmentChannel?: string; // Type:xs:string
  PaymentMethod?: string; // Type:xs:string
  BuyerEmail?: string; // Type:xs:string
  SellerOrderId?: string; // Type:xs:string
  MaxResultsPerPage?: number; // Type:xs:positiveInteger
  TFMShipmentStatus?: string; // Type:xs:string
  EasyShipShipmentStatus?: string; // Type:xs:string
}

export interface IResListOrders {
  NextToken?: string; // Type:xs:string
  LastUpdatedBefore?: string; // Type:xs:dateTime
  CreatedBefore?: string; // Type:xs:dateTime
  Orders?: IOrder[]; // Type:List of Order
}

// http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/Orders_ListOrdersByNextToken.html
export interface IReqListOrdersByNextToken {
  NextToken: string; // Type:xs:string
}

// tslint:disable-next-line:no-empty-interface
export interface IResListOrdersByNextToken extends IResListOrders {
}

// http://docs.developer.amazonservices.com/en_US/orders-2013-09-01/MWS_GetServiceStatus.html
