// http://docs.developer.amazonservices.com/en_US/fba_inbound/FBAInbound_Datatypes.html

import {IAddress, IWeight} from 'src/Core';

type TShipmentStatus = 'WORKING'
  | 'SHIPPED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'CHECKED_IN'
  | 'RECEIVING'
  | 'CLOSED'
  | 'CANCELLED'
  | 'DELETED'
  | 'ERROR';

/**
 * The fees for Amazon to prep goods for shipment.
 * --------
 *
 */
export interface IAmazonPrepFeesDetails {
  PrepInstruction: string; // Type:xs:string
  FeePerUnit: IAmount; // Type:Amount
}

/**
 * The currency code and value.
 * --------
 *
 */
export interface IAmount {
  CurrencyCode: 'USD' | 'GBP'; // Type:xs:string
  Value: string; // Type:xs:string
}

/**
 * Reasons why a given ASIN is not recommended for shipment to Amazon's fulfillment network.
 * --------
 *
 */
export interface IASINInboundGuidance {
  ASIN: string; // Type:xs:string
  InboundGuidance: IInboundGuidance; // Type:InboundGuidance
  GuidanceReasonList?: IGuidanceReason[]; // Type:List of GuidanceReason
}

/**
 * Item preparation instructions to help with item sourcing decisions.
 * --------
 *
 */
export interface IASINPrepInstructions {
  ASIN?: string; // Type:xs:string
  BarcodeInstruction?: 'RequiresFNSKULabel' | 'MustProvideSellerSKU'; // Type:xs:string
  PrepGuidance?: 'ConsultHelpDocuments' | 'NoAdditionalPrepRequired' | 'SeePrepInstructionsList'; // Type:xs:string
  PrepInstructionList?: IPrepInstruction[]; // Type:List of PrepInstruction
}

/**
 * The manual processing fee per unit and total fee for a shipment.
 * --------
 *
 */
export interface IBoxContentsFeeDetails {
  TotalUnits?: number; // Type:xs:int
  FeePerUnit?: IAmount; // Type:Amount
  TotalFee?: IAmount; // Type:Amount
}

/**
 * Where the seller provided box contents information for a shipment.This element is used only in the US marketplace.
 * --------
 *
 */
// tslint:disable-next-line:no-empty-interface
export interface IBoxContentsSource {
}

/**
 * Contact information for the person in your organization who is responsible for a Less Than Truckload/Full Truckload (LTL/FTL) shipment.
 * --------
 *
 */
export interface IContact {
  Name: string; // Type:xs:string
  Phone: string; // Type:xs:string
  Email: string; // Type:xs:string
  Fax: string; // Type:xs:string
}

/**
 * The dimension values and unit of measurement.
 * --------
 *
 */
export interface IDimensions {
  Unit: 'inches' | 'centimeters'; // Type:xs:string
  Length: number; // Type:xs:decimal
  Width: number; // Type:xs:decimal
  Height: number; // Type:xs:decimal
}

/**
 * A reason for the current inbound guidance for an item.
 * --------
 *
 */
// tslint:disable-next-line:no-empty-interface
export interface IGuidanceReason {
}

/**
 * Specific inbound guidance for an item.
 * --------
 *
 */
// tslint:disable-next-line:no-empty-interface
export interface IInboundGuidance {
}

/**
 * Inbound shipment information used to create and update inbound shipments.
 * --------
 *
 */
export interface IInboundShipmentHeader {
  ShipmentName: string; // Type:xs:string
  ShipFromAddress: IAddress; // Type:Address
  DestinationFulfillmentCenterId: string; // Type:xs:string
  LabelPrepPreference: 'SELLER_LABEL' | 'AMAZON_LABEL_ONLY' | 'AMAZON_LABEL_PREFERRED'; // Type:xs:string
  AreCasesRequired?: boolean; // Type:xs:boolean
  ShipmentStatus: 'WORKING' | 'SHIPPED' | 'CANCELLED'; // Type:xs:string
  IntendedBoxContentsSource?: IIntendedBoxContentsSource; // Type:IntendedBoxContentsSource
}

/**
 * Information about your inbound shipments. Returned by the ListInboundShipments operation.
 * --------
 *
 */
export interface IInboundShipmentInfo {
  ShipmentId?: string; // Type:xs:string
  ShipmentName?: string; // Type:xs:string
  ShipFromAddress: IAddress; // Type:Address
  DestinationFulfillmentCenterId?: string; // Type:xs:string
  LabelPrepType?: 'NO_LABEL' | 'SELLER_LABEL' | 'AMAZON_LABEL'; // Type:xs:string
  ShipmentStatus?: 'WORKING' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN'
    | 'RECEIVING' | 'CLOSED' | 'CANCELLED' | 'DELETED' | 'ERROR'; // Type:xs:string
  AreCasesRequired: boolean; // Type:xs:boolean
  ConfirmedNeedByDate?: string; // Type:xs:string
  BoxContentsSource?: IBoxContentsSource; // Type:BoxContentsSource
  EstimatedBoxContentsFee?: IBoxContentsFeeDetails; // Type:BoxContentsFeeDetails
}

/**
 * Item information for an inbound shipment. Submitted with a call to the CreateInboundShipment or UpdateInboundShipment operation.
 * --------
 *
 */
export interface IInboundShipmentItem {
  ShipmentId?: string; // Type:xs:string
  SellerSKU: string; // Type:xs:string
  FulfillmentNetworkSKU?: string; // Type:xs:string
  QuantityShipped: number; // Type:xs:int
  QuantityReceived?: number; // Type:xs:int
  QuantityInCase?: number; // Type:xs:int
  PrepDetailsList?: IPrepDetails[]; // Type:List of PrepDetails
  ReleaseDate?: string; // Type:xs:string
}

/**
 * Inbound shipment information used to create an inbound shipment. Returned by the CreateInboundShipmentPlan operation.
 * --------
 *
 */
export interface IInboundShipmentPlan {
  ShipmentId: string; // Type:xs:string
  DestinationFulfillmentCenterId: string; // Type:xs:string
  ShipToAddress: IAddress; // Type:Address
  LabelPrepType: 'NO_LABEL' | 'SELLER_LABEL' | 'AMAZON_LABEL'; // Type:xs:string
  Items: IInboundShipmentPlanItem; // Type:InboundShipmentPlanItem
  EstimatedBoxContentsFee?: IBoxContentsFeeDetails; // Type:BoxContentsFeeDetails
}

/**
 * Item information used to create an inbound shipment. Returned by the CreateInboundShipmentPlan operation.
 * --------
 *
 */
export interface IInboundShipmentPlanItem {
  SellerSKU: string; // Type:xs:string
  FulfillmentNetworkSKU: string; // Type:xs:string
  Quantity: number; // Type:xs:int
  PrepDetailsList?: IPrepDetails[]; // Type:List of PrepDetails
}

/**
 * Item information for creating an inbound shipment plan. Submitted with a call to the CreateInboundShipmentPlan operation.
 * --------
 *
 */
export interface IInboundShipmentPlanRequestItem {
  SellerSKU: string; // Type:xs:string
  ASIN?: string; // Type:xs:string
  Condition?: 'NewItem' | 'NewWithWarranty' | 'NewOEM' | 'NewOpenBox' | 'UsedLikeNew'
    | 'UsedVeryGood' | 'UsedGood' | 'UsedAcceptable' | 'UsedPoor' | 'UsedRefurbished'
    | 'CollectibleLikeNew' | 'CollectibleVeryGood' | 'CollectibleGood'
    | 'CollectibleAcceptable' | 'CollectiblePoor' | 'RefurbishedWithWarranty'
    | 'Refurbished' | 'Club'; // Type:xs:string
  Quantity: number; // Type:xs:int
  QuantityInCase?: number; // Type:xs:int
  PrepDetailsList?: IPrepDetails[]; // Type:List of PrepDetails
}

/**
 * How the seller intends to provide box contents information for a shipment.
 * --------
 *
 */
// tslint:disable-next-line:no-empty-interface
export interface IIntendedBoxContentsSource {
}

/**
 * An invalid ASIN and the reason it is invalid.
 * --------
 *
 */
export interface IInvalidASIN {
  ASIN?: string; // Type:xs:string
  ErrorReason?: 'DoesNotExist'; //
}

/**
 * An invalid Seller SKU and the reason it is invalid.
 * --------
 *
 */
export interface IInvalidSKU {
  SellerSKU?: string; // Type:xs:string
  ErrorReason?: 'DoesNotExist'; //
}

/**
 * Information that you provide to Amazon about a Less Than Truckload/Full
 * Truckload (LTL/FTL) shipment by a carrier that has not partnered with Amazon.
 * --------
 *
 */
export interface INonPartneredLtlDataInput {
  CarrierName: 'BUSINESS_POST' | 'DHL_AIRWAYS_INC' | 'DHL_UK' | 'PARCELFORCE'
    | 'DPD' | 'TNT_LOGISTICS_CORPORATION' | 'TNT' | 'YODEL' | 'UNITED_PARCEL_SERVICE_INC' | 'OTHER'
    | 'DHL_EXPRESS_USA_INC' | 'FEDERAL_EXPRESS_CORP' | 'UNITED_STATES_POSTAL_SERVICE';
  ProNumber: string; // Type:xs:string
}

/**
 * Information returned by Amazon about a Less Than Truckload/Full Truckload (LTL/FTL)
 * shipment shipped by a carrier that has not partnered with Amazon.
 * --------
 *
 */
export interface INonPartneredLtlDataOutput {
  CarrierName: 'BUSINESS_POST' | 'DHL_AIRWAYS_INC' | 'DHL_UK' | 'PARCELFORCE'
    | 'DPD' | 'TNT_LOGISTICS_CORPORATION' | 'TNT' | 'YODEL' | 'UNITED_PARCEL_SERVICE_INC'
    | 'OTHER' | 'DHL_EXPRESS_USA_INC' | 'FEDERAL_EXPRESS_CORP'
    | 'UNITED_STATES_POSTAL_SERVICE';
  ProNumber: string; // Type:xs:string
}

/**
 * Information that you provide to Amazon about a Small Parcel shipment shipped by a carrier that has not partnered with Amazon.
 * --------
 *
 */
export interface INonPartneredSmallParcelDataInput {
  CarrierName: 'BUSINESS_POST' | 'DHL_AIRWAYS_INC' | 'DHL_UK' | 'PARCELFORCE' | 'DPD'
    | 'TNT_LOGISTICS_CORPORATION' | 'TNT' | 'YODEL' | 'UNITED_PARCEL_SERVICE_INC' | 'OTHER'
    | 'DHL_EXPRESS_USA_INC' | 'FEDERAL_EXPRESS_CORP' | 'UNITED_STATES_POSTAL_SERVICE'; // Type:xs:string
  PackageList: INonPartneredSmallParcelPackageInput[]; // Type:List of NonPartneredSmallParcelPackageInput
}

/**
 * Information returned by Amazon about a Small Parcel shipment by a carrier that has not partnered with Amazon.
 * --------
 *
 */
export interface INonPartneredSmallParcelDataOutput {
  PackageList: INonPartneredSmallParcelPackageOutput[]; // Type:List of NonPartneredSmallParcelPackageOutput
}

/**
 * The tracking number of the package, provided by the carrier.
 * --------
 *
 */
export interface INonPartneredSmallParcelPackageInput {
  TrackingId: string; // Type:xs:string
}

/**
 * Carrier, tracking number, and status information for the package.
 * --------
 *
 */
export interface INonPartneredSmallParcelPackageOutput {
  CarrierName: 'BUSINESS_POST' | 'DHL_AIRWAYS_INC' | 'DHL_UK' | 'PARCELFORCE' | 'DPD' | 'TNT_LOGISTICS_CORPORATION' | 'TNT' | 'YODEL' | 'UNITED_PARCEL_SERVICE_INC' | 'OTHER' | 'DHL_EXPRESS_USA_INC' | 'FEDERAL_EXPRESS_CORP' | 'UNITED_STATES_POSTAL_SERVICE'; // Type:xs:string
  TrackingId: string; // Type:xs:string
  PackageStatus: 'SHIPPED.' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN' | 'RECEIVING' | 'CLOSED'; // Type:xs:string
}

/**
 * Pallet information.
 * --------
 *
 */
export interface IPallet {
  Dimensions: IDimensions; // Type:Dimensions
  Weight?: IWeight; // Type:Weight
  IsStacked: boolean; // Type:xs:boolean
}

/**
 * The estimated shipping cost for a shipment using an Amazon-partnered carrier.
 * --------
 *
 */
export interface IPartneredEstimate {
  Amount?: IAmount; // Type:Amount
  ConfirmDeadline?: string; // Type:xs:dateTime
  VoidDeadline?: string; // Type:xs:dateTime
}

/**
 * Information that is required by an Amazon-partnered carrier to ship a Less Than Truckload/Full Truckload (LTL/FTL) inbound shipment.
 * --------
 *
 */
export interface IPartneredLtlDataInput {
  Contact: IContact; // Type:Contact
  BoxCount: number; // Type:xs:int
  SellerFreightClass?: string; // Type:xs:string
  FreightReadyDate: string; // Type:xs:string
  PalletList?: IPallet[]; // Type:List of Pallet
  TotalWeight?: IWeight; // Type:Weight
  SellerDeclaredValue?: IAmount; // Type:Amount
}

/**
 * Information returned by Amazon about a Less Than Truckload/Full Truckload (LTL/FTL) shipment by an Amazon-partnered carrier.
 * --------
 *
 */
export interface IPartneredLtlDataOutput {
  Contact: IContact; // Type:Contact
  BoxCount: number; // Type:xs:int
  SellerFreightClass?: string; // Type:xs:string
  FreightReadyDate: string; // Type:xs:string
  PalletList: IPallet[]; // Type:List of Pallet
  TotalWeight: IWeight; // Type:Weight
  SellerDeclaredValue?: IAmount; // Type:Amount
  AmazonCalculatedValue?: IAmount; // Type:Amount
  PreviewPickupDate: string; // Type:xs:dateTime
  PreviewDeliveryDate: string; // Type:xs:dateTime
  PreviewFreightClass: string; // Type:xs:string
  AmazonReferenceId: string; // Type:xs:string
  IsBillOfLadingAvailable: boolean; // Type:xs:boolean
  PartneredEstimate?: IPartneredEstimate; // Type:PartneredEstimate
  CarrierName: 'DHL_EXPRESS_USA_INC'
    | 'FEDERAL_EXPRESS_CORP'
    | 'UNITED_STATES_POSTAL_SERVICE'
    | 'UNITED_PARCEL_SERVICE_INC'
    | 'OTHER'; // Type:xs:string
}

/**
 * Information that is required by an Amazon-partnered carrier to ship a Small Parcel inbound shipment.
 * --------
 *
 */
export interface IPartneredSmallParcelDataInput {
  CarrierName?: 'UNITED_PARCEL_SERVICE_INC' | 'DHL_STANDARD'; // Type:xs:string
  PackageList: IPartneredSmallParcelPackageInput[]; // Type:List of PartneredSmallParcelPackageInput
}

/**
 * Information returned by Amazon about a Small Parcel shipment by an Amazon-partnered carrier.
 * --------
 *
 */
export interface IPartneredSmallParcelDataOutput {
  PackageList: IPartneredSmallParcelPackageOutput[]; // Type:List of PartneredSmallParcelPackageOutput
  PartneredEstimate?: IPartneredEstimate; // Type:PartneredEstimate
}

/**
 * Dimension and weight information for the package.
 * --------
 *
 */
export interface IPartneredSmallParcelPackageInput {
  Dimensions: IDimensions; // Type:Dimensions
  Weight: IWeight; // Type:Weight
}

/**
 * Dimension, weight, and shipping information for the package.
 * --------
 *
 */
export interface IPartneredSmallParcelPackageOutput {
  Dimensions: IDimensions; // Type:Dimensions
  Weight: IWeight; // Type:Weight
  TrackingId: string; // Type:xs:string
  PackageStatus: 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'CHECKED_IN' | 'RECEIVING' | 'CLOSED'; // Type:xs:string
  CarrierName: string; // Type:xs:string
}

/**
 * A preparation instruction, and who is responsible for that preparation.
 * --------
 *
 */
export interface IPrepDetails {
  PrepInstruction: string; // Type:xs:string
  PrepOwner: 'AMAZON' | 'SELLER'; // Type:xs:string
}

/**
 * Preparation instructions for shipping an item to Amazon's fulfillment network.
 * --------
 *
 */
export interface IPrepInstruction {
  PrepInstruction?: 'Polybagging' | 'BubbleWrapping' | 'Taping' | 'BlackShrinkWrapping' | 'Labeling' | 'HangGarment'; // Type:xs:string
}

/**
 * Reasons why a given Seller SKU is not recommended for shipment to Amazon's fulfillment network
 * --------
 *
 */
export interface ISKUInboundGuidance {
  SellerSKU: string; // Type:xs:string
  ASIN: string; // Type:xs:string
  InboundGuidance: IInboundGuidance; // Type:InboundGuidance
  GuidanceReasonList?: IGuidanceReason[]; // Type:List of GuidanceReason
}

/**
 * Labeling requirements and item preparation instructions to help you prepare items for shipment to Amazon's fulfillment network.
 * --------
 *
 */
export interface ISKUPrepInstructions {
  SellerSKU?: string; // Type:xs:string
  ASIN?: string; // Type:xs:string
  BarcodeInstruction?: 'RequiresFNSKULabel' | 'CanUseOriginalBarcode'; // Type:xs:string
  PrepGuidance?: 'ConsultHelpDocuments' | 'NoAdditionalPrepRequired' | 'SeePrepInstructionsList'; // Type:xs:string
  PrepInstructionList?: IPrepInstruction[]; // Type:List of PrepInstruction
  AmazonPrepFeesDetails?: IAmazonPrepFeesDetails[]; // Type:List of AmazonPrepFeesDetails
}

/**
 * Inbound shipment information, including carrier details,
 * shipment status, and the workflow status for a request for shipment with an Amazon-partnered carrier.
 * --------
 *
 */
export interface ITransportContent {
  TransportHeader: ITransportHeader; // Type:TransportHeader
  TransportDetails: ITransportDetailOutput; // Type:TransportDetailOutput
  TransportResult: ITransportResult; // Type:TransportResult
}

/**
 * Information required to create an Amazon-partnered carrier shipping estimate,
 * or to alert the Amazon fulfillment center to the arrival of an inbound shipment by a non-Amazon-partnered carrier.
 * --------
 *
 */
export interface ITransportDetailInput {
  PartneredSmallParcelData: IPartneredSmallParcelDataInput; // Type:PartneredSmallParcelDataInput
  NonPartneredSmallParcelData: INonPartneredSmallParcelDataInput; // Type:NonPartneredSmallParcelDataInput
  PartneredLtlData: IPartneredLtlDataInput; // Type:PartneredLtlDataInput
  NonPartneredLtlData: INonPartneredLtlDataInput; // Type:NonPartneredLtlDataInput
}

/**
 * Inbound shipment information, including carrier details and shipment status.
 * --------
 *
 */
export interface ITransportDetailOutput {
  PartneredSmallParcelData: IPartneredSmallParcelDataOutput; // Type:PartneredSmallParcelDataOutput
  NonPartneredSmallParcelData: INonPartneredSmallParcelDataOutput; // Type:NonPartneredSmallParcelDataOutput
  PartneredLtlData: IPartneredLtlDataOutput; // Type:PartneredLtlDataOutput
  NonPartneredLtlData: INonPartneredLtlDataOutput; // Type:NonPartneredLtlDataOutput
}

/**
 * The PDF document data and checksum for printing package labels and bills of lading.
 * --------
 *
 */
export interface ITransportDocument {
  PdfDocument: string; // Type:xs:string
  Checksum: string; // Type:xs:string
}

/**
 * The shipping Id, information about whether the shipment is by an Amazon-partnered carrier,
 * and information about whether the shipment is Small Parcel or Less Than Truckload/Full Truckload (LTL/FTL).
 * --------
 *
 */
export interface ITransportHeader {
  SellerId: string; // Type:xs:string
  ShipmentId: string; // Type:xs:string
  IsPartnered: boolean; // Type:xs:boolean
  ShipmentType: 'SP' | 'LTL'; // Type:xs:string
}

/**
 * The workflow status for a shipment with an Amazon-partnered carrier.
 * --------
 *
 */
export interface ITransportResult {
  TransportStatus: 'WORKING' | 'ERROR_ON_ESTIMATING' | 'ESTIMATING' | 'ESTIMATED' | 'ERROR_ON_CONFIRMING' | 'CONFIRMING' | 'CONFIRMED' | 'VOIDING' | 'VOIDED' | 'ERROR_IN_VOIDING'; // Type:xs:string
}

// http://docs.developer.amazonservices.com/en_US/fba_inbound/FBAInbound_GetPreorderInfo.html
export interface IReqGetPreorderInfo {
  ShipmentId: string; // Type:xs:string
}

export interface IResGetPreorderInfo {
  ShipmentContainsPreorderableItems?: boolean; // Type:xs:boolean
  NeedByDate?: string; // Type:xs:string
  ConfirmedFulfillableDate?: string; // Type:xs:string
  ShipmentConfirmedForPreorder?: boolean; // Type:xs:boolean
}

// http://docs.developer.amazonservices.com/en_US/fba_inbound/FBAInbound_ListInboundShipments.html
export interface IReqListInboundShipments {
  ShipmentStatusList?: TShipmentStatus[]; // Type:List of type:xs:string
  ShipmentIdList?: string[]; // Type:List of type:xs:string
  LastUpdatedAfter?: string; // Type:xs:dateTime
  LastUpdatedBefore?: string; // Type:xs:dateTime
}

export interface IResListInboundShipments {
  NextToken?: string; // Type:xs:string
  ShipmentData?: IInboundShipmentInfo[]; // Type:InboundShipmentInfo
}

// http://docs.developer.amazonservices.com/en_US/fba_inbound/FBAInbound_ListInboundShipmentsByNextToken.html
export interface IReqListInboundShipmentsByNextToken {
  NextToken: string; // Type:xs:string
}

// http://docs.developer.amazonservices.com/en_US/fba_inbound/FBAInbound_ListInboundShipmentItems.html
export interface IReqListInboundShipmentItems {
  ShipmentId?: string; // Type:xs:string
  LastUpdatedAfter?: string; // Type:xs:dateTime
  LastUpdatedBefore?: string; // Type:xs:dateTime
}

export interface IResListInboundShipmentItems {
  NextToken?: string; // Type:xs:string
  ItemData?: IInboundShipmentItem[]; // Type:InboundShipmentItem
}

// http://docs.developer.amazonservices.com/en_US/fba_inbound/FBAInbound_ListInboundShipmentItemsByNextToken.html
export interface IReqListInboundShipmentItemsByNextToken {
  NextToken: string; // Type:xs:string
}
