// http://docs.developer.amazonservices.com/en_US/sellers/Sellers_Datatypes.html

/**
 * Detailed information about an Amazon market where a seller can listitems for sale and customers can view and purchase items.
 * --------
 */
export interface IMarketplace {
  MarketplaceId?: string; // Type:xs:string
  Name?: string; // Type:xs:string
  DefaultCountryCode?: string; // Type:xs:string
  DefaultCurrencyCode?: string; // Type:xs:string
  DefaultLanguageCode?: string; // Type:xs:string
  DomainName?: string; // Type:xs:string
}

/**
 * Detailed information that is specific to a seller in aMarketplace.
 * --------
 */
export interface IParticipation {
  MarketplaceId?: string; // Type:xs:string
  SellerId?: string; // Type:xs:string
  HasSellerSuspendedListings?: string; // Type:xs:RestrictedString
}

// http://docs.developer.amazonservices.com/en_US/sellers/Sellers_ListMarketplaceParticipations.html
// http://docs.developer.amazonservices.com/en_US/sellers/Sellers_ListMarketplaceParticipationsByNextToken.html
export interface IResListMarketplaceParticipations {
  NextToken?: string; // Type:xs:string
  ListParticipations?: IParticipation[]; // Type:List of Participation
  ListMarketplaces?: IMarketplace[]; // Type:List of Marketplace
}

// http://docs.developer.amazonservices.com/en_US/sellers/Sellers_GetServiceStatus.html
