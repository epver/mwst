// http://docs.developer.amazonservices.com/en_US/finances/Finances_Datatypes.html

/**
 * An adjustment to your account.
 * --------
 */
export interface IAdjustmentEvent {
  AdjustmentType?: 'FBAInventoryReimbursement'
    | 'ReserveEvent'
    | 'PostageBilling'
    | 'PostageRefund'
    | 'LostOrDamagedReimbursement'
    | 'CanceledButPickedUpReimbursement'
    | 'ReimbursementClawback'
    | 'SellerRewards'; // Type:xs:string
  AdjustmentAmount?: ICurrencyAmount; // Type:CurrencyAmount
  AdjustmentItemList?: IAdjustmentItem[]; // Type:List of AdjustmentItem
  PostedDate?: string; // Type:xs:dateTime
}

/**
 * An item of an adjustment to your account.
 * --------
 */
export interface IAdjustmentItem {
  Quantity?: string; // Type:xs:string
  PerUnitAmount?: ICurrencyAmount; // Type:CurrencyAmount
  TotalAmount?: ICurrencyAmount; // Type:CurrencyAmount
  SellerSKU?: string; // Type:xs:string
  FnSKU?: string; // Type:xs:string
  ProductDescription?: string; // Type:xs:string
  ASIN?: string; // Type:xs:string
}

/**
 * An expense related to an affordability promotion.
 * --------
 */
export interface IAffordabilityExpenseEvent {
  PostedDate?: string; // Type:xs:dateTime
  TransactionType?: 'Charge' | 'Refund'; // Type:xs:string
  AmazonOrderId?: string; // Type:xs:string
  BaseExpense?: ICurrencyAmount; // Type:CurrencyAmount
  TotalExpense?: ICurrencyAmount; // Type:CurrencyAmount
  TaxTypeIGST: ICurrencyAmount; // Type:CurrencyAmount
  TaxTypeCGST: ICurrencyAmount; // Type:CurrencyAmount
  TaxTypeSGST: ICurrencyAmount; // Type:CurrencyAmount
  MarketplaceId?: string; // Type:xs:string
}

/**
 * An expense refund related to an affordability promotion.
 * --------
 */
export interface IAffordabilityExpenseReversalEvent {
  PostedDate?: string; // Type:xs:dateTime
  TransactionType?: 'Charge' | 'Refund'; // Type:xs:string
  AmazonOrderId?: string; // Type:xs:string
  BaseExpense?: ICurrencyAmount; // Type:CurrencyAmount
  TotalExpense?: ICurrencyAmount; // Type:CurrencyAmount
  TaxTypeIGST: ICurrencyAmount; // Type:CurrencyAmount
  TaxTypeCGST: ICurrencyAmount; // Type:CurrencyAmount
  TaxTypeSGST: ICurrencyAmount; // Type:CurrencyAmount
  MarketplaceId?: string; // Type:xs:string
}

/**
 * A charge on the seller's account.
 * --------
 */
export interface IChargeComponent {
  ChargeType?: 'Principal' | 'Tax'
    | 'MarketplaceFacilitatorTax'
    | 'Discount'
    | 'TaxDiscount'
    | 'CODItemCharge'
    | 'CODItemTaxCharge'
    | 'CODOrderCharge'
    | 'CODOrderTaxCharge'
    | 'CODShippingCharge'
    | 'CODShippingTaxCharge'
    | 'ShippingCharge'
    | 'ShippingTax'
    | 'Goodwill'
    | 'Giftwrap'
    | 'GiftwrapTax'
    | 'RestockingFee'
    | 'ReturnShipping'
    | 'PointsFee'
    | 'GenericDeduction'
    | 'FreeReplacementReturnShipping'
    | 'PaymentMethodFee'
    | 'ExportCharge'
    | 'SAFE'
    | 'TCS'; // Type:xs:string
  ChargeAmount?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * A payment instrument.
 * --------
 */
export interface IChargeInstrument {
  Description?: string; // Type:xs:string
  Tail?: string; // Type:xs:string
  Amount?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * An event related to coupon payments.
 * --------
 */
export interface ICouponPaymentEvent {
  PostedDate?: string; // Type:xs:dateTime
  CouponId?: string; // Type:xs:string
  SellerCouponDescription?: string; // Type:xs:string
  ClipOrRedemptionCount?: number; // Type:xs:int
  PaymentEventId?: string; // Type:xs:string
  FeeComponent?: IFeeComponent; // Type:FeeComponent
  ChargeComponent?: IChargeComponent; // Type:ChargeComponent
  TotalAmount?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * A currency type and amount.
 * --------
 */
export interface ICurrencyAmount {
  CurrencyCode?: string; // Type:xs:string
  CurrencyAmount?: number; // Type:xs:decimal
}

/**
 * A debt payment or debt adjustment.
 * --------
 */
export interface IDebtRecoveryEvent {
  DebtRecoveryType?: 'DebtPayment' | 'DebtPaymentFailure' | 'DebtAdjustment'; // Type:xs:string
  RecoveryAmount?: ICurrencyAmount; // Type:CurrencyAmount
  OverPaymentCredit?: ICurrencyAmount; // Type:CurrencyAmount
  DebtRecoveryItemList?: IDebtRecoveryItem[]; // Type:List of DebtRecoveryItem
  ChargeInstrumentList?: IChargeInstrument[]; // Type:List of ChargeInstrument
}

/**
 * An item of a debt payment or debt adjustment.
 * --------
 */
export interface IDebtRecoveryItem {
  RecoveryAmount?: ICurrencyAmount; // Type:CurrencyAmount
  OriginalAmount?: ICurrencyAmount; // Type:CurrencyAmount
  GroupBeginDate?: string; // Type:xs:dateTime
  GroupEndDate?: string; // Type:xs:dateTime
}

/**
 * A payment made directly to a seller.
 * --------
 */
export interface IDirectPayment {
  DirectPaymentType?: 'StoredValueCardRevenue' | 'StoredValueCardRefund' | 'PrivateLabelCreditCardRevenue' | 'PrivateLabelCreditCardRefund' | 'CollectOnDeliveryRevenue' | 'CollectOnDeliveryRefund'; // Type:xs:string
  DirectPaymentAmount?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * A payment event for Fulfillment by Amazon (FBA) inventory liquidation. This event is used only in the US marketplace.
 * --------
 */
export interface IFBALiquidationEvent {
  PostedDate?: string; // Type:xs:dateTime
  OriginalRemovalOrderId?: string; // Type:xs:string
  LiquidationProceedsAmount?: ICurrencyAmount; // Type:CurrencyAmount
  LiquidationFeeAmount?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * A fee on the seller's account.
 * --------
 */
export interface IFeeComponent {
  FeeType?: string; // Type:xs:string
  FeeAmount?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * Contains information related to a financial event group.
 * --------
 */
export interface IFinancialEventGroup {
  FinancialEventGroupId?: string; // Type:xs:string
  ProcessingStatus?: 'Open' | 'Closed'; // Type:xs:string
  FundTransferStatus?: string; // Type:xs:string
  OriginalTotal?: ICurrencyAmount; // Type:CurrencyAmount
  ConvertedTotal?: ICurrencyAmount; // Type:CurrencyAmount
  FundTransferDate?: string; // Type:xs:dateTime
  TraceId?: string; // Type:xs:string
  AccountTail?: string; // Type:xs:string
  BeginningBalance?: ICurrencyAmount; // Type:CurrencyAmount
  FinancialEventGroupStart?: string; // Type:xs:dateTime
  FinancialEventGroupEnd?: string; // Type:xs:dateTime
}

/**
 * Contains all information related to a financial event.
 * --------
 */
export interface IFinancialEvents {
  ShipmentEventList?: IShipmentEvent[]; // Type:List of ShipmentEvent
  RefundEventList?: IShipmentEvent[]; // Type:List of ShipmentEvent
  GuaranteeClaimEventList?: IShipmentEvent[]; // Type:List of ShipmentEvent
  ChargebackEventList?: IShipmentEvent[]; // Type:List of ShipmentEvent
  PayWithAmazonEventList?: IPayWithAmazonEvent[]; // Type:List of PayWithAmazonEvent
  ServiceProviderCreditEventList?: ISolutionProviderCreditEvent[]; // Type:List of SolutionProviderCreditEvent
  RetrochargeEventList?: IRetrochargeEvent[]; // Type:List of RetrochargeEvent
  RentalTransactionEventList?: IRentalTransactionEvent[]; // Type:List of RentalTransactionEvent
  PerformanceBondRefundEventList?: IPerformanceBondRefundEvent[]; // Type:List of PerformanceBondRefundEvent
  ProductAdsPaymentEventList?: IProductAdsPaymentEvent[]; // Type:List of ProductAdsPaymentEvent
  ServiceFeeEventList?: IServiceFeeEvent[]; // Type:List of ServiceFeeEvent
  DebtRecoveryEventList?: IDebtRecoveryEvent[]; // Type:List of DebtRecoveryEvent
  LoanServicingEventList?: ILoanServicingEvent[]; // Type:List of LoanServicingEvent
  AdjustmentEventList?: IAdjustmentEvent[]; // Type:List of AdjustmentEvent
  CouponPaymentEventList?: ICouponPaymentEvent[]; // Type:List of CouponPaymentEvent
  SAFETReimbursementEventList?: ISAFETReimbursementEvent[]; // Type:List of SAFETReimbursementEvent
  SellerReviewEnrollmentPaymentEventList?: ISellerReviewEnrollmentPaymentEvent[]; // Type:List of SellerReviewEnrollmentPaymentEvent
  FBALiquidationEventList?: IFBALiquidationEvent[]; // Type:List of FBALiquidationEvent
  ImagingServicesFeeEventList?: IImagingServicesFeeEvent[]; // Type:List of ImagingServicesFeeEvent
  AffordabilityExpenseEventList?: IAffordabilityExpenseEvent[]; // Type:List of AffordabilityExpenseEvent
  AffordabilityExpenseReversalEventList?: IAffordabilityExpenseReversalEvent[]; // Type:List of AffordabilityExpenseReversalEvent
  NetworkComminglingTransactionEventList?: INetworkComminglingTransactionEvent[]; // Type:List of NetworkComminglingTransactionEvent
}

/**
 * An event related to Amazon Imaging services.
 * --------
 */
export interface IImagingServicesFeeEvent {
  ImagingRequestBillingItemID?: string; // Type:xs:string
  ASIN?: string; // Type:xs:string
  PostedDate?: string; // Type:xs:dateTime
  FeeList?: IFeeComponent[]; // Type:List of FeeComponent
}

/**
 * A loan advance, loan payment, or loan refund.
 * --------
 */
export interface ILoanServicingEvent {
  LoanAmount?: ICurrencyAmount; // Type:CurrencyAmount
  SourceBusinessEventType?: 'LoanAdvance' | 'LoanPayment' | 'LoanRefund'; // Type:xs:string
}

/**
 * A network commingling transaction event.
 * --------
 */
export interface INetworkComminglingTransactionEvent {
  PostedDate?: string; // Type:xs:dateTime
  NetCoTransactionID?: string; // Type:xs:string
  SwapReason?: string; // Type:xs:string
  TransactionType?: 'NetCo' | 'ComminglingVAT'; // Type:xs:string
  ASIN?: string; // Type:xs:string
  MarketplaceId?: string; // Type:xs:string
  TaxExclusiveAmount?: ICurrencyAmount; // Type:CurrencyAmount
  TaxAmount?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * An event related to your Pay with Amazon account.
 * --------
 */
export interface IPayWithAmazonEvent {
  SellerOrderId?: string; // Type:xs:string
  TransactionPostedDate?: string; // Type:xs:dateTime
  BusinessObjectType?: 'PaymentContract'; // Type:xs:string
  SalesChannel?: string; // Type:xs:string
  Charge?: IChargeComponent; // Type:ChargeComponent
  FeeList?: IFeeComponent[]; // Type:List of FeeComponent
  PaymentAmountType?: 'Sales'; // Type:xs:string
  AmountDescription?: string; // Type:xs:string
  FulfillmentChannel?: 'AFN' | 'MFN'; // Type:xs:string
  StoreName?: string; // Type:xs:string
}

/**
 * A refund of a seller performance bond that is issued when a seller in China stops selling in certain categories.
 * --------
 */
export interface IPerformanceBondRefundEvent {
  MarketplaceCountryCode?: string; // Type:xs:string
  Amount?: ICurrencyAmount; // Type:CurrencyAmount
  ProductGroupList?: string; // Type:Listofxs:string
}

/**
 * A Sponsored Products payment event.
 * --------
 */
export interface IProductAdsPaymentEvent {
  postedDate?: string; // Type:xs:dateTime
  transactionType?: 'charge' | 'refund'; // Type:xs:string
  invoiceId?: string; // Type:xs:string
  baseValue?: ICurrencyAmount; // Type:CurrencyAmount
  taxValue?: ICurrencyAmount; // Type:CurrencyAmount
  transactionValue?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * A promotion applied to an item.
 * --------
 */
export interface IPromotion {
  PromotionType?: string; // Type:xs:string
  PromotionId?: string; // Type:xs:string
  PromotionAmount?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * An event related to a rental transaction.
 * --------
 */
export interface IRentalTransactionEvent {
  AmazonOrderId?: string; // Type:xs:string
  RentalEventType?: 'RentalCustomerPayment'
    | 'RentalCustomerRefund'
    | 'RentalHandlingFee'
    | 'RentalChargeFailureReimbursement'
    | 'RentalLostItemReimbursement'; // Type:xs:string
  ExtensionLength?: number; // Type:xs:int
  PostedDate?: string; // Type:xs:dateTime
  RentalChargeList?: IChargeComponent[]; // Type:List of ChargeComponent
  RentalFeeList?: IFeeComponent[]; // Type:List of FeeComponent
  MarketplaceName?: string; // Type:xs:string
  RentalInitialValue?: ICurrencyAmount; // Type:CurrencyAmount
  RentalReimbursement?: ICurrencyAmount; // Type:CurrencyAmount
  RentalTaxWithheldList?: ITaxWithheldComponent[]; // Type:List of TaxWithheldComponent
}

/**
 * A retrocharge or retrocharge reversal.
 * --------
 */
export interface IRetrochargeEvent {
  RetrochargeEventType?: 'Retrocharge'
    | 'RetrochargeReversal'; // Type:xs:string
  AmazonOrderId?: string; // Type:xs:string
  PostedDate?: string; // Type:xs:dateTime
  BaseTax?: ICurrencyAmount; // Type:CurrencyAmount
  ShippingTax?: ICurrencyAmount; // Type:CurrencyAmount
  MarketplaceName?: string; // Type:xs:string
  RetrochargeTaxWithheldComponentList?: ITaxWithheldComponent[]; // Type:List of TaxWithheldComponent
}

/**
 * A SAFE-T claim reimbursement on your account.
 * --------
 */
export interface ISAFETReimbursementEvent {
  PostedDate?: string; // Type:xs:dateTime
  SAFETClaimId?: string; // Type:xs:string
  ReimbursedAmount?: ICurrencyAmount; // Type:CurrencyAmount
  SAFETReimbursementItemList?: ISAFETReimbursementItem[]; // Type:List of SAFETReimbursementItem
}

/**
 * An item from a SAFE-T claim reimbursement.
 * --------
 */
export interface ISAFETReimbursementItem {
  ItemChargeList?: IChargeComponent[]; // Type:List of ChargeComponent
}

/**
 * A fee payment event for the Early Reviewer Program. This element is used only in the US marketplace.
 * --------
 */
export interface ISellerReviewEnrollmentPaymentEvent {
  PostedDate?: string; // Type:xs:dateTime
  EnrollmentId?: string; // Type:xs:string
  ParentASIN?: string; // Type:xs:string
  FeeComponent?: IFeeComponent[]; // Type:List of FeeComponent
  ChargeComponent?: IChargeComponent[]; // Type:List of ChargeComponent
  TotalAmount?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * A service fee on your account.
 * --------
 */
export interface IServiceFeeEvent {
  AmazonOrderId?: string; // Type:xs:string
  FeeReason?: string; // Type:xs:string
  FeeList?: IFeeComponent[]; // Type:List of FeeComponent
  SellerSKU?: string; // Type:xs:string
  FnSKU?: string; // Type:xs:string
  FeeDescription?: string; // Type:xs:string
  ASIN?: string; // Type:xs:string
}

/**
 * A shipment, refund, guarantee claim, or chargeback.
 * --------
 */
export interface IShipmentEvent {
  AmazonOrderId?: string; // Type:xs:string
  SellerOrderId?: string; // Type:xs:string
  MarketplaceName?: string; // Type:xs:string
  OrderChargeList?: IChargeComponent[]; // Type:List of ChargeComponent
  OrderChargeAdjustmentList?: IChargeComponent[]; // Type:List of ChargeComponent
  ShipmentFeeList?: IFeeComponent[]; // Type:List of FeeComponent
  ShipmentFeeAdjustmentList?: IFeeComponent[]; // Type:List of FeeComponent
  OrderFeeList?: IFeeComponent[]; // Type:List of FeeComponent
  OrderFeeAdjustmentList?: IFeeComponent[]; // Type:List of FeeComponent
  DirectPaymentList?: IDirectPayment[]; // Type:List of DirectPayment
  PostedDate?: string; // Type:xs:dateTime
  ShipmentItemList?: IShipmentItem[]; // Type:List of ShipmentItem
  ShipmentItemAdjustmentList?: IShipmentItem[]; // Type:List of ShipmentItem
}

/**
 * An item of a shipment, refund, guarantee claim, or chargeback.
 * --------
 */
export interface IShipmentItem {
  SellerSKU?: string; // Type:xs:string
  OrderItemId?: string; // Type:xs:string
  OrderAdjustmentItemId?: string; // Type:xs:string
  QuantityShipped?: number; // Type:xs:int
  ItemChargeList?: IChargeComponent[]; // Type:List of ChargeComponent
  ItemTaxWithheldList?: ITaxWithheldComponent[]; // Type:List of TaxWithheldComponent
  ItemChargeAdjustmentList?: IChargeComponent[]; // Type:List of ChargeComponent
  ItemFeeList?: IFeeComponent[]; // Type:List of FeeComponent
  ItemFeeAdjustmentList?: IFeeComponent[]; // Type:List of FeeComponent
  PromotionList?: IPromotion[]; // Type:List of Promotion
  PromotionAdjustmentList?: IPromotion[]; // Type:List of Promotion
  CostOfPointsGranted?: ICurrencyAmount; // Type:CurrencyAmount
  CostOfPointsReturned?: ICurrencyAmount; // Type:CurrencyAmount
}

/**
 * A credit given to a solution provider.
 * --------
 */
export interface ISolutionProviderCreditEvent {
  ProviderTransactionType?: 'ProviderCredit' | 'ProviderCreditReversal'; // Type:xs:string
  SellerOrderId?: string; // Type:xs:string
  MarketplaceId?: string; // Type:xs:string
  MarketplaceCountryCode?: string; // Type:xs:string
  SellerId?: string; // Type:xs:string
  SellerStoreName?: string; // Type:xs:string
  ProviderId?: string; // Type:xs:string
  ProviderStoreName?: string; // Type:xs:string
}

/**
 * Information about the taxes withheld.
 * --------
 */
export interface ITaxWithheldComponent {
  TaxCollectionModel?: 'MarketplaceFacilitator' | 'Standard'; // Type:xs:string
  TaxesWithheld?: IChargeComponent[]; // Type:List of IChargeComponent
}

// http://docs.developer.amazonservices.com/en_US/finances/Finances_ListFinancialEventGroups.html

export interface IReqListFinancialEventGroups {
  MaxResultsPerPage?: number; // Type:xs:int
  FinancialEventGroupStartedAfter: string; // Type:xs:dateTime
  FinancialEventGroupStartedBefore?: string; // Type:xs:dateTime
}

export interface IResListFinancialEventGroups {
  NextToken?: string; // Type:xs:string
  FinancialEventGroupList?: IFinancialEventGroup[]; // Type:List of FinancialEventGroup
}

// http://docs.developer.amazonservices.com/en_US/finances/Finances_ListFinancialEventGroupsByNextToken.html
export interface IReqListFinancialEventGroupsByNextToken {
  NextToken: string; // Type:xs:string
}

// tslint:disable-next-line:no-empty-interface
export interface IResListFinancialEventGroupsByNextToken extends IResListFinancialEventGroups {
}

// http://docs.developer.amazonservices.com/en_US/finances/Finances_ListFinancialEvents.html
export interface IReqListFinancialEvents {
  MaxResultsPerPage?: number; // Type:xs:int
  AmazonOrderId?: string; // Type:xs:string
  FinancialEventGroupId?: string; // Type:xs:string
  PostedAfter?: string; // Type:xs:dateTime
  PostedBefore?: string; // Type:xs:dateTime
}

export interface IResListFinancialEvents {
  NextToken?: string; // Type:xs:string
  FinancialEvents?: IFinancialEvents; // Type:FinancialEvents
}

// http://docs.developer.amazonservices.com/en_US/finances/Finances_ListFinancialEventsByNextToken.html
export interface IReqListFinancialEventsByNextToken {
  NextToken: string; // Type:xs:string
}

// tslint:disable-next-line:no-empty-interface
export interface IResListFinancialEventsByNextToken extends IResListFinancialEvents {
}
