type TReportType = '_report_type_'
  // Listing
  | '_GET_FLAT_FILE_OPEN_LISTINGS_DATA_'
  | '_GET_MERCHANT_LISTINGS_ALL_DATA_'
  | '_GET_MERCHANT_LISTINGS_DATA_'
  | '_GET_MERCHANT_LISTINGS_INACTIVE_DATA_'
  | '_GET_MERCHANT_LISTINGS_DATA_BACK_COMPAT_'
  | '_GET_MERCHANT_LISTINGS_DATA_LITE_'
  | '_GET_MERCHANT_LISTINGS_DATA_LITER_'
  | '_GET_MERCHANT_CANCELLED_LISTINGS_DATA_'
  | '_GET_CONVERGED_FLAT_FILE_SOLD_LISTINGS_DATA_'
  | '_GET_MERCHANT_LISTINGS_DEFECT_DATA_'
  | '_GET_PAN_EU_OFFER_STATUS_'
  | '_GET_MFN_PAN_EU_OFFER_STATUS_'
  // Orders
  | '_GET_FLAT_FILE_ACTIONABLE_ORDER_DATA_'
  | '_GET_ORDERS_DATA_'
  | '_GET_FLAT_FILE_ORDERS_DATA_'
  | '_GET_CONVERGED_FLAT_FILE_ORDER_REPORT_DATA_'
  // Order Tracking
  | '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_'
  | '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_'
  | '_GET_XML_ALL_ORDERS_DATA_BY_LAST_UPDATE_'
  | '_GET_XML_ALL_ORDERS_DATA_BY_ORDER_DATE_'
  // Pending Orders
  | '_GET_FLAT_FILE_PENDING_ORDERS_DATA_'
  | '_GET_PENDING_ORDERS_DATA_'
  | '_GET_CONVERGED_FLAT_FILE_PENDING_ORDERS_DATA_'
  // Performance Reports
  | '_GET_SELLER_FEEDBACK_DATA_'
  | '_GET_V1_SELLER_PERFORMANCE_REPORT_'
  // Settlement Reports
  | '_GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_'
  | '_GET_V2_SETTLEMENT_REPORT_DATA_XML_'
  | '_GET_V2_SETTLEMENT_REPORT_DATA_FLAT_FILE_V2_'
  // FBA Reports
  | '_GET_AMAZON_FULFILLED_SHIPMENTS_DATA_'
  | '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_'
  | '_GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_'
  | '_GET_XML_ALL_ORDERS_DATA_BY_LAST_UPDATE_'
  | '_GET_XML_ALL_ORDERS_DATA_BY_ORDER_DATE_'
  | '_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_SALES_DATA_'
  | '_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_PROMOTION_DATA_'
  | '_GET_FBA_FULFILLMENT_CUSTOMER_TAXES_DATA_'
  | '_GET_AFN_INVENTORY_DATA_'
  | '_GET_AFN_INVENTORY_DATA_BY_COUNTRY_'
  | '_GET_FBA_FULFILLMENT_CURRENT_INVENTORY_DATA_'
  | '_GET_FBA_FULFILLMENT_MONTHLY_INVENTORY_DATA_'
  | '_GET_FBA_FULFILLMENT_INVENTORY_RECEIPTS_DATA_'
  | '_GET_RESERVED_INVENTORY_DATA_'
  | '_GET_FBA_FULFILLMENT_INVENTORY_SUMMARY_DATA_'
  | '_GET_FBA_FULFILLMENT_INVENTORY_ADJUSTMENTS_DATA_'
  | '_GET_FBA_FULFILLMENT_INVENTORY_HEALTH_DATA_'
  | '_GET_FBA_MYI_UNSUPPRESSED_INVENTORY_DATA_'
  | '_GET_FBA_MYI_ALL_INVENTORY_DATA_'
  | '_GET_RESTOCK_INVENTORY_RECOMMENDATIONS_REPORT_'
  | '_GET_FBA_FULFILLMENT_INBOUND_NONCOMPLIANCE_DATA_'
  | '_GET_STRANDED_INVENTORY_UI_DATA_'
  | '_GET_STRANDED_INVENTORY_LOADER_DATA_'
  | '_GET_FBA_INVENTORY_AGED_DATA_'
  | '_GET_EXCESS_INVENTORY_DATA_'
  | '_GET_FBA_ESTIMATED_FBA_FEES_TXT_DATA_'
  | '_GET_FBA_REIMBURSEMENTS_DATA_'
  | '_GET_FBA_FULFILLMENT_CUSTOMER_RETURNS_DATA_'
  | '_GET_FBA_FULFILLMENT_CUSTOMER_SHIPMENT_REPLACEMENT_DATA_'
  | '_GET_FBA_RECOMMENDED_REMOVAL_DATA_'
  | '_GET_FBA_FULFILLMENT_REMOVAL_ORDER_DETAIL_DATA_'
  | '_GET_FBA_FULFILLMENT_REMOVAL_SHIPMENT_DETAIL_DATA_'
  // Tax Reports
  | '_GET_FLAT_FILE_SALES_TAX_DATA_'
  | '_SC_VAT_TAX_REPORT_'
  | '_GET_VAT_TRANSACTION_DATA_'
  // Browse Tree reports
  | '_GET_XML_BROWSE_TREE_DATA_'
  // Returns reports
  | '_GET_XML_RETURNS_DATA_BY_RETURN_DATE_'
  | '_GET_FLAT_FILE_RETURNS_DATA_BY_RETURN_DATE_'
  | '_GET_XML_MFN_PRIME_RETURNS_REPORT_'
  | '_GET_CSV_MFN_PRIME_RETURNS_REPORT_'
  | '_GET_XML_MFN_SKU_RETURN_ATTRIBUTES_REPORT_'
  | '_GET_FLAT_FILE_MFN_SKU_RETURN_ATTRIBUTES_REPORT_'
  | '_GET_FLAT_FILE_OFFAMAZONPAYMENTS_SANDBOX_SETTLEMENT_DATA_';

type TReportProcessingStatus = '_SUBMITTED_' | '_IN_PROGRESS_' | '_CANCELLED_' | '_DONE_' | '_DONE_NO_DATA_';

// http://docs.developer.amazonservices.com/en_US/reports/Reports_Datatypes.html
/**
 * Detailed information about a report.
 * --------
 */
export interface IReportInfo {
  ReportId?: string; // Type:xs:string
  ReportType?: TReportType; // Type:xs:string
  ReportRequestId?: string; // Type:xs:string
  AvailableDate?: string; // Type:xs:dateTime
  Acknowledged?: boolean; // Type:xs:boolean
  AcknowledgedDate?: string; // Type:xs:dateTime
}

/**
 * Detailed information about a report request.
 * --------
 */
export interface IReportRequestInfo {
  ReportRequestId?: string; // Type:xs:string
  ReportType?: TReportType; // Type:xs:string
  StartDate?: string; // Type:xs:dateTime
  EndDate?: string; // Type:xs:dateTime
  Scheduled?: boolean; // Type:xs:boolean
  SubmittedDate?: string; // Type:xs:dateTime
  ReportProcessingStatus?: TReportProcessingStatus; // Type:xs:string
  GeneratedReportId?: string; // Type:xs:string
  StartedProcessingDate?: string; // Type:xs:dateTime
  CompletedDate?: string; // Type:xs:dateTime
}

/**
 * Detailed information about a report schedule.
 * --------
 */
export interface IReportSchedule {
  ReportType?: TReportType; // Type:xs:string
  Schedule?: string; // Type:xs:string
  ScheduledDate?: string; // Type:xs:dateTime
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReport.html
export interface IReqGetReport {
  ReportId: string; // Type:xs:string
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportCount.html
export interface IReqGetReportCount {
  ReportTypeList?: TReportType[]; // Type:xs:string
  Acknowledged?: boolean; // Type:xs:boolean
  AvailableFromDate?: string; // Type:xs:dateTime
  AvailableToDate?: string; // Type:xs:dateTime
}

export interface IResGetReportCount {
  Count: number;
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportList.html
export interface IReqGetReportList {
  MaxCount?: number; // Type:xs:nonNegativeInteger
  ReportTypeList?: TReportType[]; // Type:xs:string
  Acknowledged?: boolean; // Type:xs:boolean
  ReportRequestIdList?: string[]; // Type:xs:string
  AvailableFromDate?: string; // Type:xs:dateTime
  AvailableToDate?: string; // Type:xs:dateTime
}

export interface IResGetReportList {
  NextToken?: string; // Type:xs:string
  HasNext?: boolean; // Type:xs:boolean
  ReportInfo?: IReportInfo | IReportInfo[]; // Type:ReportInfo
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportListByNextToken.html
export interface IReqGetReportListByNextToken {
  NextToken: string; // Type:xs:string
}

// tslint:disable-next-line:no-empty-interface
export interface IResGetReportListByNextToken extends IResGetReportList {
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportRequestCount.html
export interface IReqGetReportRequestCount {
  ReportTypeList?: TReportType[]; // Type:xs:string
  ReportProcessingStatusList?: TReportProcessingStatus[]; // Type:xs:string
  RequestedFromDate?: string; // Type:xs:dateTime
  RequestedToDate?: string; // Type:xs:dateTime
}

export interface IResGetReportRequestCount {
  Count?: number; // Type:xs:nonNegativeInteger
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportRequestList.html
export interface IReqGetReportRequestList {
  ReportRequestIdList?: string[]; // Type:xs:string
  ReportTypeList?: TReportType[]; // Type:xs:string
  ReportProcessingStatusList?: TReportProcessingStatus[]; // Type:xs:string
  MaxCount?: number; // Type:xs:nonNegativeInteger
  RequestedFromDate?: string; // Default: 90 days ago
  RequestedToDate?: string; // Type:xs:dateTime
}

export interface IResGetReportRequestList {
  NextToken?: string; // Type:xs:string
  HasNext?: boolean; // Type:xs:boolean
  ReportRequestInfo?: IReportRequestInfo | IReportRequestInfo[]; // Type:ReportRequestInfo
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportRequestListByNextToken.html
export interface IReqGetReportRequestListByNextToken {
  NextToken: string; // Type:xs:string
}

// tslint:disable-next-line:no-empty-interface
export interface IResGetReportRequestListByNextToken extends IResGetReportRequestList {
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportScheduleCount.html
export interface IReqGetReportScheduleCount {
  ReportTypeList?: TReportType[]; // Type:xs:string
}

export interface IResGetReportScheduleCount {
  Count?: number; // Type:xs:nonNegativeInteger
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_GetReportScheduleList.html
export interface IReqGetReportScheduleList {
  ReportTypeList?: TReportType[]; // Type:xs:string
}

export interface IResGetReportScheduleList {
  NextToken?: string; // Type:xs:string
  HasNext?: boolean; // Type:xs:boolean
  ReportSchedule?: IReportSchedule; // Type:ReportSchedule
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_ManageReportSchedule.html
export interface IReqManageReportSchedule {
  ReportType: TReportType;
  Schedule: string; // Type:xs:string
  ScheduleDate?: string; // Type:xs:dateTime
}

export interface IResManageReportSchedule {
  Count?: number; // Type:xs:nonNegativeInteger
  ReportSchedule?: IReportSchedule; // Type:ReportSchedule
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_CancelReportRequests.html
export interface IReqCancelReportRequests {
  ReportRequestIdList?: string[]; // Type:List of Type:xs:string
  ReportTypeList?: TReportType[]; // Type:List of Type:xs:string
  ReportProcessingStatusList?: TReportProcessingStatus[]; // Type:List of Type:xs:string
  RequestedFromDate?: string; // Type:xs:dateTime
  RequestedToDate?: string; // Type:xs:dateTime
}

export interface IResCancelReportRequests {
  Count?: number; // Type:xs:nonNegativeInteger
  ReportRequestInfo?: IReportRequestInfo | IReportRequestInfo[]; // Type:ReportRequestInfo
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_RequestReport.html
export interface IReqRequestReport {
  ReportType: TReportType;
  StartDate?: string; // Type:xs:dateTime
  EndDate?: string; // Type:xs:dateTime
  ReportOptions?: string; // Type:xs:string
  MarketplaceIdList?: string[]; // Type:List of Type:xs:string
}

export interface IResRequestReport {
  ReportRequestInfo?: IReportRequestInfo; // Type:ReportRequestInfo
}

export interface IReqRequestReportOptions {
  IsParser?: boolean;
  Filename?: string;
}

// http://docs.developer.amazonservices.com/en_US/reports/Reports_UpdateReportAcknowledgements.html
export interface IReqUpdateReportAcknowledgements {
  ReportIdList: string[]; // Type:xs:string
  Acknowledged?: boolean; // Type:xs:boolean
}

export interface IResUpdateReportAcknowledgements {
  Count: number; // Type: xs:nonNegativeInteger
  ReportInfo: IReportInfo | IReportInfo[]; // Type:ReportInfo
}
