import {createHmac} from 'crypto';
import {stringify as qsStringify} from 'querystring';
import {parse as xmlParser} from 'fast-xml-parser';
import {IApi, IHeaders, IAccess, ISeller, ISetting, TMethod, TArea, IArea, IOptions} from './CoreTypes';
import {defaultAccess, defaultSeller} from './Env';
import {CreateArea, sortObject, sleepSecond, isArray, hasKeyObject, RunRequest} from './CoreHelpers';
import {ConfigurationError, LocalExceededError, QuotaExceeded, RequestThrottled, RequestTimeoutError, UndefinedRequestError, NoOverridingError, LocalParserError} from './CoreErrors';


export class Api implements IApi {
  Path?: string;
  Version?: string;
  Method?: TMethod;
  Action?: string;
  Setting?: ISetting;
  Headers?: IHeaders;
  Area: IArea;
  Access: IAccess;
  Seller: ISeller;

  constructor(seller: ISeller, access?: IAccess) {
    this.Access = {...defaultAccess, ...access};
    if (!this.Access.AWSAccessKeyId || !this.Access.AWSAccessSecret) {
      throw new ConfigurationError('Access[AWSAccessKeyId] or Access[AWSAccessSecret] not configured');
    }

    this.Seller = {...defaultSeller, ...seller};
    if (!this.Seller.SellerId || !this.Seller.MWSAuthToken) {
      throw new ConfigurationError('Seller[SellerId] or Seller[MWSAuthToken] not empty');
    }

    const areas = ['BR', 'CA', 'MX', 'AE', 'DE', 'ES', 'FR', 'GB', 'IN', 'IT', 'TR', 'AU', 'JP', 'CN', 'US'];
    if (!areas.includes(this.Seller.Area)) {
      throw new ConfigurationError(`Seller[Area] not in [${areas.join(',')}]`);
    }
    this.Area = CreateArea(this.Seller.Area);
  }

  public ConfigureArea(area: TArea = 'US'): void {
    this.Area = CreateArea(area);
  }

  public GetArea(area: TArea = 'US'): IArea {
    return CreateArea(area);
  }

  public ConfigureSeller(seller: ISeller): void {
    this.Seller = {...defaultSeller, ...seller};
    this.Area = CreateArea(this.Seller.Area || 'US');
  }

  public async SleepSecond(second): Promise<void> {
    await sleepSecond(second);
  }

  public CreateOptions(params?: Record<string, any>, parsing?: Record<string, any>): IOptions {
    if (params && hasKeyObject(parsing)) {
      const assign = {};
      for (const key of Object.keys(parsing)) {
        const prefix = parsing[key];
        const arrays = params[key] as any[];
        if (isArray(arrays)) {
          arrays.forEach((val, inx) => assign[`${prefix}${inx + 1}`] = val);
          delete params[key];
        }
      }
      params = {...params, ...assign};
    }

    const {
      Path, Method, Action, Version, Headers,
      Area: {Id: AreaId, Host: AreaHost},
      Seller: {SellerId, MWSAuthToken},
      Setting: {IsMerchant, Timeout},
      Access: {AWSAccessKeyId, AWSAccessSecret}
    } = this;

    if (Action === 'SubmitFeed') {
      throw new NoOverridingError();
    }

    const Timestamp = (new Date()).toISOString();
    const RemotePath = `/${Path}/${Version}`;
    const PreParams = {Action, AWSAccessKeyId, MWSAuthToken, Timestamp, Version, ...params} as Record<string, any>;
    PreParams.SignatureMethod = 'HmacSHA256';
    PreParams.SignatureVersion = '2';
    IsMerchant ? PreParams.Merchant = SellerId : PreParams.SellerId = SellerId;
    PreParams.Signature = createHmac('sha256', AWSAccessSecret)
      .update([Method, AreaHost, RemotePath, qsStringify(sortObject(PreParams))].join('\n'))
      .digest('base64');

    const protocol = AreaId === 'TEST' ? 'http:' : 'https:';
    const PreOptions = {} as IOptions;

    Headers['Host'] = AreaHost;
    if (Method === 'GET') {
      PreOptions.url = `${protocol}//${AreaHost}${RemotePath}?${qsStringify(PreParams)}`;
      PreOptions.init = {
        headers: Headers,
        timeout: Timeout * 1000
      };
    } else {
      Headers['Content-Type'] = 'application/x-www-form-urlencoded';
      PreOptions.url = `${protocol}//${AreaHost}${RemotePath}`;
      PreOptions.init = {
        headers: Headers,
        timeout: Timeout * 1000,
        method: 'POST',
        body: qsStringify(PreParams)
      };
    }
    return PreOptions;
  }

  public async CreateRequest(options: IOptions): Promise<any> {
    const {Convert, Retrying, Throttled} = this.Setting;
    for (let i = 0; i < Retrying + 1; i++) {
      try {
        const body = await RunRequest(options);
        if (Convert === 'XML') {
          return body;
        } else {
          return this.CreateResponse(body);
        }
      } catch (error) {
        if (error instanceof RequestTimeoutError) {
          // timeout
        } else if (error instanceof QuotaExceeded) {
          // quota exceeded
          await this.SleepSecond(60 * 60);
        } else if (error instanceof RequestThrottled) {
          // request throttled
          await sleepSecond(Throttled);
        } else {
          throw error;
        }
      }
    }

    throw new LocalExceededError();
  }

  public CreateResponse(body: any): any {
    const {Action} = this;
    const res = xmlParser(body, {ignoreNameSpace: true, parseTrueNumberOnly: true}) as any;
    if (res.ErrorResponse) {
      throw new UndefinedRequestError(body, 600);
    } else if (!res[`${Action}Response`] || !res[`${Action}Response`][`${Action}Result`]){
      console.log(body);
      throw new LocalParserError(body, 0)
    } else {
      return res[`${Action}Response`][`${Action}Result`];
    }
  }

}
