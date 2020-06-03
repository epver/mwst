import {Api, API, API_METHOD, IAccess, ISeller} from '../Core';

@API('Feeds', '2009-01-01')
export class ApiFeeds extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }

  @API_METHOD('POST')
  public async SubmitFeed() {
    return null;
  }

  @API_METHOD('POST')
  public async GetFeedSubmissionList() {
    return null;
  }

  @API_METHOD('POST')
  public async GetFeedSubmissionListByNextToken() {
    return null;
  }

  @API_METHOD('POST')
  public async GetFeedSubmissionCount() {
    return null;
  }

  @API_METHOD('POST')
  public async CancelFeedSubmissions() {
    return null;
  }

  @API_METHOD('POST')
  public async GetFeedSubmissionResult() {
    return null;
  }
}