// http://docs.developer.amazonservices.com/en_US/feeds/Feeds_Datatypes.html
/**
 * Detailed information about a feed submission.
 * --------
 */
export interface IFeedSubmissionInfo {
  FeedSubmissionId?: string; // Type:xs:string
  FeedType?: string; // Type:xs:string
  SubmittedDate?: string; // Type:xs:dateTime
  FeedProcessingStatus?: string; // Type:xs:string
  StartedProcessingDate?: string; // Type:xs:dateTime
  CompletedProcessingDate?: string; // Type:xs:dateTime
}
