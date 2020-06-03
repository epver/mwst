// http://docs.developer.amazonservices.com/en_US/fba_outbound/FBAOutbound_Datatypes.html

import { IAddress, IWeight } from '../Core';

/**
 * The COD (Cash On Delivery) charges that you associate with a COD fulfillment order.
 * Note that COD fulfillment orders are available only in China (CN) and Japan (JP).
 * --------
 *
 */
export interface ICODSettings {
  IsCODRequired?: 'true' | 'false'; // Type:xs:boolean
  CODCharge?: ICurrency; // Type:Currency
  CODChargeTax?: ICurrency; // Type:Currency
  ShippingCharge?: ICurrency; // Type:Currency
  ShippingChargeTax?: ICurrency; // Type:Currency
}

/**
 * Item information for creating a fulfillment order.
 * --------
 *
 */
export interface ICreateFulfillmentOrderItem {
  SellerSKU: string; // Type:xs:string
  SellerFulfillmentOrderItemId: string; // Type:xs:string
  Quantity: number; // Type:xs:int
  GiftMessage?: string; // Type:xs:string
  DisplayableComment?: string; // Type:xs:string
  FulfillmentNetworkSKU?: string; // Type:xs:string
  PerUnitDeclaredValue?: ICurrency; // Type:Currency
  PerUnitPrice?: ICurrency; // Type:Currency
  PerUnitTax?: ICurrency; // Type:Currency
}

/**
 * An item to be returned.
 * --------
 *
 */
export interface ICreateReturnItem {
  SellerReturnItemId: string; // Type:xs:string
  SellerFulfillmentOrderItemId: string; // Type:xs:string
  AmazonShipmentId: string; // Type:xs:string
  ReturnReasonCode: string; // Type:xs:string
  ReturnComment?: string; // Type:xs:string
}

/**
 * Currency type and amount.
 * --------
 *
 */
export interface ICurrency {
  CurrencyCode: string; // Type:xs:string
  Value: string; // Type:xs:string
}

/**
 * The time range within which your Scheduled Delivery fulfillment order should be delivered.
 * --------
 *
 */
export interface IDeliveryWindow {
  StartDateTime: string; // Type:xs:dateTime
  EndDateTime: string; // Type:xs:dateTime
}

/**
 * Fee type and cost.
 * --------
 *
 */
export interface IFee {
  Name: 'FBAPerUnitFulfillmentFee' | 'FBAPerOrderFulfillmentFee' | 'FBATransportationFee' | 'FBAFulfillmentCODFee'; // Type:xs:string
  Amount: ICurrency; // Type:Currency
}

/**
 * General information about a fulfillment order, including its status.
 * --------
 *
 */
export interface IFulfillmentOrder {
  SellerFulfillmentOrderId: string; // Type:xs:string
  MarketplaceId: string; // Type:xs:string
  DisplayableOrderId: string; // Type:xs:string
  DisplayableOrderDateTime: string; // Type:xs:dateTime
  DisplayableOrderComment: string; // Type:xs:string
  ShippingSpeedCategory: 'Standard' | 'Expedited' | 'Priority' | 'ScheduledDelivery'; // Type:xs:string
  DeliveryWindow?: IDeliveryWindow; // Type:DeliveryWindow
  DestinationAddress: IAddress; // Type:Address
  FulfillmentAction?: 'Ship' | 'Hold'; // Type:xs:string
  FulfillmentPolicy?: 'FillOrKill' | 'FillAll' | 'FillAllAvailable'; // Type:xs:string
  ReceivedDateTime: string; // Type:xs:dateTime
  // tslint:disable-next-line:max-line-length
  FulfillmentOrderStatus: 'RECEIVED' | 'INVALID' | 'PLANNING' | 'PROCESSING' | 'CANCELLED' | 'COMPLETE' | 'COMPLETE_PARTIALLED' | 'UNFULFILLABLE'; // Type:xs:string
  StatusUpdatedDateTime: string; // Type:xs:dateTime
  NotificationEmailList?: string; // Type:xs:string
  CODSettings?: ICODSettings; // Type:CODSettings
}

/**
 * Item information for a fulfillment order.
 * --------
 *
 */
export interface IFulfillmentOrderItem {
  SellerSKU: string; // Type:xs:string
  SellerFulfillmentOrderItemId: string; // Type:xs:string
  Quantity: number; // Type:xs:int
  GiftMessage?: string; // Type:xs:string
  DisplayableComment?: string; // Type:xs:string
  FulfillmentNetworkSKU?: string; // Type:xs:string
  CancelledQuantity: number; // Type:xs:int
  UnfulfillableQuantity: number; // Type:xs:int
  EstimatedShipDateTime?: string; // Type:xs:dateTime
  EstimatedArrivalDateTime?: string; // Type:xs:dateTime
  PerUnitDeclaredValue?: ICurrency; // Type:Currency
  PerUnitPrice?: ICurrency; // Type:Currency
  PerUnitTax?: ICurrency; // Type:Currency
}

/**
 * Information about a fulfillment order preview, including delivery and fee information based on shipping method.
 * --------
 *
 */
export interface IFulfillmentPreview {
  ShippingSpeedCategory: 'Standard' | 'Expedited' | 'Priority' | 'ScheduledDelivery'; // Type:xs:string
  IsFulfillable: 'true' | 'false'; // Type:xs:boolean
  IsCODCapable: 'true' | 'false'; // Type:xs:boolean
  MarketplaceId: string; // Type:xs:string
  EstimatedShippingWeight?: IWeight; // Type:Weight
  EstimatedFees?: IFee[]; // Type:List of Fee
  FulfillmentPreviewShipments?: IFulfillmentPreviewShipment[]; // Type:List of FulfillmentPreviewShipment
  UnfulfillablePreviewItems?: IUnfulfillablePreviewItem[]; // Type:List of UnfulfillablePreviewItem
  OrderUnfulfillableReasons?: string; // Type:Listoftype:xs:string
  ScheduledDeliveryInfo?: IScheduledDeliveryInfo; // Type:ScheduledDeliveryInfo
}

/**
 * Item information for a shipment in a fulfillment order preview.
 * --------
 *
 */
export interface IFulfillmentPreviewItem {
  SellerSKU: string; // Type:xs:string
  SellerFulfillmentOrderItemId: string; // Type:xs:string
  Quantity: number; // Type:xs:int
  EstimatedShippingWeight?: IWeight; // Type:Weight
  ShippingWeightCalculationMethod?: 'Package' | 'Dimensional'; // Type:xs:string
}

/**
 * Delivery and item information for a shipment in a fulfillment order preview.
 * --------
 *
 */
export interface IFulfillmentPreviewShipment {
  EarliestShipDate: string; // Type:xs:dateTime
  LatestShipDate: string; // Type:xs:dateTime
  EarliestArrivalDate: string; // Type:xs:dateTime
  LatestArrivalDate: string; // Type:xs:dateTime
  FulfillmentPreviewItems: IFulfillmentPreviewItem[]; // Type:List of FulfillmentPreviewItem
}

/**
 * Delivery and item information for a shipment in a fulfillment order.
 * --------
 *
 */
export interface IFulfillmentShipment {
  AmazonShipmentId: string; // Type:xs:string
  FulfillmentCenterId: string; // Type:xs:string
  FulfillmentShipmentStatus: 'PENDING' | 'SHIPPED' | 'CANCELLED_BY_FULFILLER' | 'CANCELLED_BY_SELLER'; // Type:xs:string
  ShippingDateTime?: string; // Type:xs:dateTime
  EstimatedArrivalDateTime?: string; // Type:xs:dateTime
  FulfillmentShipmentItem: IFulfillmentShipmentItem[]; // Type:List of FulfillmentShipmentItem
  FulfillmentShipmentPackage?: IFulfillmentShipmentPackage[]; // Type:List of FulfillmentShipmentPackage
}

/**
 * Item information for a shipment in a fulfillment order.
 * --------
 *
 */
export interface IFulfillmentShipmentItem {
  SellerSKU?: string; // Type:xs:string
  SellerFulfillmentOrderItemId: string; // Type:xs:string
  Quantity: number; // Type:xs:int
  PackageNumber?: number; // Type:xs:int
}

/**
 * Package information for a shipment in a fulfillment order.
 * --------
 *
 */
export interface IFulfillmentShipmentPackage {
  PackageNumber: number; // Type:xs:int
  CarrierCode: string; // Type:xs:string
  TrackingNumber?: string; // Type:xs:string
  EstimatedArrivalDateTime?: string; // Type:xs:dateTime
}

/**
 * Item information for a fulfillment order preview.
 * --------
 *
 */
export interface IGetFulfillmentPreviewItem {
  SellerSKU: string; // Type:xs:string
  SellerFulfillmentOrderItemId: string; // Type:xs:string
  Quantity: number; // Type:xs:int
}

/**
 * The reason that the item is invalid for return.
 * --------
 *
 */
export interface IInvalidItemReason {
  InvalidItemReasonCode: IInvalidItemReasonCode; // Type:InvalidItemReasonCode
  Description: string; // Type:xs:string
}

/**
 * A code for why the item is invalid for return.
 * --------
 *
 */
// tslint:disable-next-line:no-empty-interface
export interface IInvalidItemReasonCode {
}

/**
 * An item that is invalid for return.
 * --------
 *
 */
export interface IInvalidReturnItem {
  SellerReturnItemId: string; // Type:xs:string
  SellerFulfillmentOrderItemId: string; // Type:xs:string
  InvalidItemReason: IInvalidItemReason; // Type:InvalidItemReason
}

/**
 * A return reason code, a description, and an optional description translation.
 * --------
 *
 */
export interface IReasonCodeDetails {
  ReturnReasonCode: string; // Type:xs:string
  Description: string; // Type:xs:string
  TranslatedDescription?: string; // Type:xs:string
}

/**
 * Return authorization information for items accepted for return.
 * --------
 *
 */
export interface IReturnAuthorization {
  ReturnAuthorizationId: string; // Type:xs:string
  FulfillmentCenterId: string; // Type:xs:string
  ReturnToAddress: IAddress; // Type:Address
  AmazonRmaId: string; // Type:xs:string
  RmaPageURL: string; // Type:xs:string
}

/**
 * An item that Amazon accepted for return.
 * --------
 *
 */
export interface IReturnItem {
  SellerReturnItemId: string; // Type:xs:string
  SellerFulfillmentOrderItemId: string; // Type:xs:string
  AmazonShipmentId: string; // Type:xs:string
  SellerReturnReasonCode: string; // Type:xs:string
  ReturnComment?: string; // Type:xs:string
  AmazonReturnReasonCode?: string; // Type:xs:string
  Status: IStatus; // Type:Status
  StatusChangedDate: string; // Type:xs:dateTime
  ReturnAuthorizationId?: string; // Type:xs:string
  ReturnReceivedCondition?: IReturnReceivedCondition; // Type:ReturnReceivedCondition
  FulfillmentCenterId?: string; // Type:xs:string
}

/**
 * The condition that the return item was received by an Amazon fulfillment center.
 * --------
 *
 */
// tslint:disable-next-line:no-empty-interface
export interface IReturnReceivedCondition {
}

/**
 * Delivery information for a Scheduled Delivery.
 * --------
 *
 */
export interface IScheduledDeliveryInfo {
  DeliveryTimeZone: string; // Type:xs:string
  DeliveryWindows: IDeliveryWindow[]; // Type:List of DeliveryWindow
}

/**
 * Indicates if the return item has been processed by an Amazon fulfillment center.
 * --------
 *
 */
// tslint:disable-next-line:no-empty-interface
export interface IStatus {
}

/**
 * Address information for tracking the package.
 * --------
 *
 */
export interface ITrackingAddress {
  City: string; // Type:xs:string
  State: string; // Type:xs:string
  Country: string; // Type:xs:string
}

/**
 * Information for tracking package deliveries.
 * --------
 *
 */
export interface ITrackingEvent {
  EventDate: string; // Type:xs:dateTime
  EventAddress: ITrackingAddress; // Type:TrackingAddress
  // tslint:disable-next-line:max-line-length
  EventCode: 'EVENT_101' | 'EVENT_102' | 'EVENT_201' | 'EVENT_202' | 'EVENT_203' | 'EVENT_204' | 'EVENT_205' | 'EVENT_206' | 'EVENT_301' | 'EVENT_302' | 'EVENT_304' | 'EVENT_306' | 'EVENT_307' | 'EVENT_308' | 'EVENT_309' | 'EVENT_401' | 'EVENT_402' | 'EVENT_403' | 'EVENT_404' | 'EVENT_405' | 'EVENT_406' | 'EVENT_407' | 'EVENT_408' | 'EVENT_409' | 'EVENT_411' | 'EVENT_412' | 'EVENT_413' | 'EVENT_414' | 'EVENT_415' | 'EVENT_416' | 'EVENT_417' | 'EVENT_418' | 'EVENT_419'; // Type:xs:string
}

/**
 * Information about unfulfillable items in a fulfillment order preview.
 * --------
 *
 */
export interface IUnfulfillablePreviewItem {
  SellerSKU: string; // Type:xs:string
  SellerFulfillmentOrderItemId: string; // Type:xs:string
  Quantity: number; // Type:xs:int
  ItemUnfulfillableReasons?: 'InventoryUnavailable' | 'NoDeliveryOption'; // Type:xs:string
}

/**
 * Item information for updating a fulfillment order.
 * --------
 *
 */
export interface IUpdateFulfillmentOrderItem {
  SellerFulfillmentOrderItemId: string; // Type:xs:string
  Quantity: number; // Type:xs:int
  GiftMessage?: string; // Type:xs:string
  DisplayableComment?: string; // Type:xs:string
  PerUnitDeclaredValue?: ICurrency; // Type:Currency
  PerUnitPrice?: ICurrency; // Type:Currency
  PerUnitTax?: ICurrency; // Type:Currency
}
