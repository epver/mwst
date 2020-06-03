// http://docs.developer.amazonservices.com/en_US/recommendations/Recommendations_Datatypes.html
/**
 * A recommendation for advertising your products andfor using the sponsored products program.This datatype is used in all marketplaces exceptBrazil.
 * --------
 */
export interface IAdvertisingRecommendation {
  RecommendationId?: string; // Type:xs:string
  RecommendationReason?: string; // Type:xs:string
  LastUpdated?: string; // Type:xs:dateTime
  ItemIdentifier?: IProductIdentifier; // Type:ProductIdentifier
  ItemName?: string; // Type:xs:string
  BrandName?: string; // Type:xs:string
  ProductCategory?: string; // Type:xs:string
  SalesRank?: number; // Type:xs:int
  YourPricePlusShipping?: IPrice; // Type:Price
  LowestPricePlusShipping?: IPrice; // Type:Price
  AvailableQuantity?: number; // Type:xs:int
  SalesForTheLast30Days?: number; // Type:xs:int
}

/**
 * A category-specific filter that you can specify to narrow downthe types of recommendations returned for each category.
 * --------
 */
export interface ICategoryQuery {
  RecommendationCategory: 'Selection' | 'Fulfillment' | 'ListingQuality' | 'GlobalSelling' | 'Advertising'; //
  FilterOptions: string;
}

/**
 * Dimension unit and amount
 * --------
 */
export interface IDimensionMeasure {
  Value?: number; // Type:xs:decimal
  Unit?: string; // Type:xs:string
}

/**
 * A recommendation for the top products to fulfillthrough Fulfillment by Amazon (FBA).This datatype is used in all marketplaces exceptBrazil.
 * --------
 */
export interface IFulfillmentRecommendation {
  RecommendationId?: string; // Type:xs:string
  RecommendationReason?: string; // Type:xs:string
  LastUpdated?: string; // Type:xs:dateTime
  ItemIdentifier?: IProductIdentifier; // Type:ProductIdentifier
  ItemName?: string; // Type:xs:string
  BrandName?: string; // Type:xs:string
  ProductCategory?: string; // Type:xs:string
  SalesRank?: number; // Type:xs:int
  BuyboxPrice?: IPrice; // Type:Price
  NumberOfOffers?: number; // Type:xs:int
  NumberOfOffersFulfilledByAmazon?: number; // Type:xs:int
  AverageCustomerReview?: number; // Type:xs:decimal
  NumberOfCustomerReviews?: number; // Type:xs:int
  ItemDimensions?: IItemDimensions; // Type:ItemDimensions
}

/**
 * A recommendation for expanding your products tomore regions and marketplaces.
 * --------
 */
export interface IGlobalSellingRecommendation {
  RecommendationId?: string; // Type:xs:string
  RecommendationReason?: string; // Type:xs:string
  LastUpdated?: string; // Type:xs:dateTime
  ItemIdentifier?: IProductIdentifier; // Type:ProductIdentifier
  ItemName?: string; // Type:xs:string
  BrandName?: string; // Type:xs:string
  ProductCategory?: string; // Type:xs:string
  SalesRank?: number; // Type:xs:int
  BuyboxPrice?: IPrice; // Type:Price
  NumberOfOffers?: number; // Type:xs:int
  NumberOfOffersFulfilledByAmazon?: number; // Type:xs:int
  AverageCustomerReview?: number; // Type:xs:decimal
  NumberOfCustomerReviews?: number; // Type:xs:int
  ItemDimensions?: IItemDimensions; // Type:ItemDimensions
}

/**
 * A recommendation for restocking low or out-of-stockitems in your inventory.
 * --------
 *
 */
export interface IInventoryRecommendation {
  RecommendationId?: string; // Type:xs:string
  RecommendationReason?: string; // Type:xs:string
  LastUpdated?: string; // Type:xs:dateTime
  ItemIdentifier?: IProductIdentifier; // Type:ProductIdentifier
  ItemName?: string; // Type:xs:string
  FulfillmentChannel?: 'MFNIndicatesthatyouarefulfillingtheitem.' | 'AFNIndicatesthatAmazonisfulfillingtheitem.'; // Type:xs:string
  AvailableQuantity?: number; // Type:xs:int
  DaysUntilStockRunsOut?: number; // Type:xs:int
  DaysOutOfStockLast30Days?: number; // Type:xs:int
}

/**
 * The dimensions of an item.
 * --------
 */
export interface IItemDimensions {
  Height?: IDimensionMeasure; // Type:DimensionMeasure
  Width?: IDimensionMeasure; // Type:DimensionMeasure
  Length?: IDimensionMeasure; // Type:DimensionMeasure
  Weight?: IWeightMeasure; // Type:WeightMeasure
}

/**
 * Currency type and amount.
 * --------
 */
export interface IPrice {
  CurrencyCode?: string; // Type:xs:string
  Amount?: number; // Type:xs:decimal
}

/**
 * A recommendation to review pricing on items in yourinventory where your offer is not the lowest price.
 * --------
 */
export interface IPricingRecommendation {
  RecommendationId?: string; // Type:xs:string
  RecommendationReason?: string; // Type:xs:string
  LastUpdated?: string; // Type:xs:dateTime
  ItemIdentifier?: IProductIdentifier; // Type:ProductIdentifier
  ItemName?: string; // Type:xs:string
  Condition?: string; // Type:xs:string
  SubCondition?: string; // Type:xs:string
  FulfillmentChannel?: 'MFNIndicatesthatyouarefulfillingtheitem.' | 'AFNIndicatesthatAmazonisfulfillingtheitem.'; // Type:xs:string
  YourPricePlusShipping?: IPrice; // Type:Price
  LowestPricePlusShipping?: IPrice; // Type:Price
  PriceDifferenceToLowPrice?: IPrice; // Type:Price
  MedianPricePlusShipping?: IPrice; // Type:Price
  LowestMerchantFulfilledOfferPrice?: IPrice; // Type:Price
  LowestAmazonFulfilledOfferPrice?: IPrice; // Type:Price
  NumberOfOffers?: number; // Type:xs:int
  NumberOfMerchantFulfilledOffers?: number; // Type:xs:int
  NumberOfAmazonFulfilledOffers?: number; // Type:xs:int
}

/**
 * The ASIN, SKU, and UPC of the item.
 * --------
 */
export interface IProductIdentifier {
  Asin?: string; // Type:xs:string
  Sku?: string; // Type:xs:string
  Upc?: string; // Type:xs:string
}

/**
 * Weight unit and amount.
 * --------
 */
export interface IWeightMeasure {
  Value?: number; // Type:xs:decimal
  Unit?: string; // Type:xs:string
}

// http://docs.developer.amazonservices.com/en_US/recommendations/Recommendations_GetLastUpdatedTimeForRecommendations.html
export interface IReqGetLastUpdatedTimeForRecommendations {
  MarketplaceId: string; // Type:xs:string
}

export interface IResGetLastUpdatedTimeForRecommendations {
  InventoryRecommendationsLastUpdated?: string; // Type:xs:dateTime
  PricingRecommendationsLastUpdated?: string; // Type:xs:dateTime
  FulfillmentRecommendationsLastUpdated?: string; // Type:xs:dateTime
  GlobalSellingRecommendationsLastUpdated?: string; // Type:xs:dateTime
  AdvertisingRecommendationsLastUpdated?: string; // Type:xs:dateTime
}

// http://docs.developer.amazonservices.com/en_US/recommendations/Recommendations_ListRecommendations.html
export interface IReqListRecommendations {
  MarketplaceId: string; // Type:xs:string
  // tslint:disable-next-line:max-line-length
  RecommendationCategory?: 'Inventory' | 'Selection' | 'Pricing' | 'Fulfillment' | 'ListingQuality' | 'GlobalSelling' | 'Advertising'; // Type:xs:string
  CategoryQueryList?: ICategoryQuery[]; // Type:List of CategoryQuery
}

export interface IResListRecommendations {
  NextToken?: string; // Type:xs:string
  FulfillmentRecommendations?: IFulfillmentRecommendation[]; // Type:List of FulfillmentRecommendation
  InventoryRecommendations?: IInventoryRecommendation[]; // Type:List of InventoryRecommendation
  PricingRecommendations?: IPricingRecommendation[]; // Type:List of PricingRecommendation
  GlobalSellingRecommendations?: IGlobalSellingRecommendation[]; // Type:List of GlobalSellingRecommendation
  AdvertisingRecommendations?: IAdvertisingRecommendation[]; // Type:List of AdvertisingRecommendation
}

// http://docs.developer.amazonservices.com/en_US/recommendations/Recommendations_ListRecommendationsByNextToken.html
export interface IReqListRecommendationsByNextToken {
  NextToken: string; // Type:xs:string
}

// tslint:disable-next-line:no-empty-interface
export interface IResListRecommendationsByNextToken extends IResListRecommendations {
}
