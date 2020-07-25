// http://docs.developer.amazonservices.com/en_US/fba_inventory/FBAInventory_Datatypes.html

/**
 * General information about the availability of inventory for a single SKU.
 * --------
 * ListInventorySupply
 * ListInventorySupplyByNextToken
 */
export interface IInventorySupply {
  SellerSKU?: string; // Type:xs:string
  FNSKU: string; // Type:xs:string
  ASIN?: string; // Type:xs:string
  Condition?: 'NewItem' | 'NewWithWarranty' | 'NewOEM' | 'NewOpenBox' | 'UsedLikeNew' | 'UsedVeryGood' | 'UsedGood' | 'UsedAcceptable' | 'UsedPoor' | 'UsedRefurbished' | 'CollectibleLikeNew' | 'CollectibleVeryGood' | 'CollectibleGood' | 'CollectibleAcceptable' | 'CollectiblePoor' | 'RefurbishedWithWarranty' | 'Refurbished' | 'Club'; // Type:xs:string
  TotalSupplyQuantity: number; // Type:xs:int
  InStockSupplyQuantity: number; // Type:xs:int
  EarliestAvailability?: number; // Type:Timepoint
  SupplyDetail?: IInventorySupplyDetail[]; // Type:List of InventorySupplyDetail
}

/**
 * Specific information about the availability of inventory for a single SKU,
 * including the number of units that are in an Amazon fulfillment center,
 * in an inbound shipment, or being transferred between fulfillment centers.
 * --------
 * ListInventorySupply
 * ListInventorySupplyByNextToken
 */
export interface IInventorySupplyDetail {
  Quantity: number; // Type:xs:int
  SupplyType: 'InStock' | 'Inbound' | 'Transfer'; // Type:xs:string
  EarliestAvailableToPick: ITimepoint; // Type:Timepoint
  LatestAvailableToPick: ITimepoint; // Type:Timepoint
}

/**
 * Indicates whether inventory is immediately available for picking,
 * whether inventory availability is unknown, or whether inventory is expected to be available for picking by a specific date.
 * --------
 * ListInventorySupply
 * ListInventorySupplyByNextToken
 */
export interface ITimepoint {
  TimepointType: 'Immediately' | 'DateTime' | 'Unknown'; // Type:xs:string
  DateTime?: string; // Type:xs:dateTime
}

// http://docs.developer.amazonservices.com/en_US/fba_inventory/FBAInventory_ListInventorySupply.html
export interface IReqListInventorySupply {
  SellerSkus?: string[]; // Type:xs:string 50 max
  QueryStartDateTime?: string; // Type:xs:dateTime
  ResponseGroup?: 'Basic' | 'Detailed'; // Type:xs:string
  MarketplaceId?: string; // Type:xs:string
}

export interface IResListInventorySupply {
  MarketplaceId?: string; // Type:xs:string
  NextToken?: string; // Type:xs:string
  InventorySupplyList: IInventorySupply[]; // Type:List of InventorySupply
}

// http://docs.developer.amazonservices.com/en_US/fba_inventory/FBAInventory_ListInventorySupplyByNextToken.html
export interface IReqListInventorySupplyByNextToken {
  NextToken: string; // Type:xs:string
}

export interface IResListInventorySupplyByNextToken {
  NextToken?: string; // Type:xs:string
  InventorySupplyList?: IInventorySupply[]; // Type:List of InventorySupply
}
