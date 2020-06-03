import { API, Api, API_METHOD, ISeller } from '../Core';
import { sleepSecond } from '../Core/CoreHelpers';
import {
  IReqRequestReport, IResRequestReport,
  IReportRequestInfo, IReqRequestReportOptions,
  IReqGetReportRequestList, IResGetReportRequestList,
  IReqGetReportRequestListByNextToken, IResGetReportRequestListByNextToken,
  IReqGetReportRequestCount, IResGetReportRequestCount,
  IReqGetReportList, IResGetReportList,
  IReqGetReportListByNextToken, IResGetReportListByNextToken,
  IReqGetReportCount, IResGetReportCount,
  IReqGetReport,
  IReqManageReportSchedule, IResManageReportSchedule,
  IReqGetReportScheduleList, IResGetReportScheduleList,
  IResGetReportScheduleCount, IReqGetReportScheduleCount,
  IReqCancelReportRequests, IResCancelReportRequests,
  IReqUpdateReportAcknowledgements, IResUpdateReportAcknowledgements,
} from './DataTypes';
import { writeFileSync } from 'fs';
import csvToJson from 'csvtojson';

@API('Reports', '2009-01-01')
export class ApiReports extends Api {
  constructor(mark: string, seller: ISeller) {
    super(mark, seller);
  }

  async FetchReportContinue(params: IReqRequestReport, options: IReqRequestReportOptions = {}): Promise<any[] | string | void> {
    const { Filename = '', IsParser = true } = options;
    const rsSubmit = await this.RequestReport(params);

    let flag = true;
    let rsStatusInfo = null;
    this.logger.info(`sleep [ 5 * 60 ]s, for next step.`); // tslint:disable-line
    await sleepSecond(5 * 60);
    while (flag) {
      const rsStatus = await this.GetReportRequestList({ ReportRequestIdList: [rsSubmit.ReportRequestInfo.ReportRequestId] });
      rsStatusInfo = rsStatus.ReportRequestInfo as IReportRequestInfo;
      switch (rsStatusInfo.ReportProcessingStatus) {
        case '_CANCELLED_':
        case '_DONE_NO_DATA_':
          this.logger.info(`${rsStatusInfo.ReportProcessingStatus}, no data or cancel.`); // tslint:disable-line
          return null;
        case '_DONE_':
          flag = false;
          break;
        default:
          // _SUBMITTED_
          // _IN_PROGRESS_
          this.logger.info(`${rsStatusInfo.ReportProcessingStatus}, and sleep [ 2*60 ]s retry it.`); // tslint:disable-line
          await sleepSecond(2 * 60);
          break;
      }
    }

    const rsReport = await this.GetReport({ ReportId: rsStatusInfo.GeneratedReportId });

    if (Filename) {
      writeFileSync(Filename, rsReport, { encoding: 'utf-8' });
    }

    if (IsParser) {
      const rsListing = csvToJson({ delimiter: '\t' }).fromString(rsReport);
      return rsListing as unknown as any[];
    }
    return rsReport;
  }

  @API_METHOD('POST', { Restore: 60 })
  async RequestReport(params: IReqRequestReport): Promise<IResRequestReport> {
    const options: IRequest = CreateOptions(this, params, { MarketplaceIdList: 'MarketplaceIdList.Id.' });
    return await this.Request(options);
  }

  @API_METHOD('POST', { Restore: 60 })
  async GetReportRequestList(params: IReqGetReportRequestList): Promise<IResGetReportRequestList> {
    const parsing = {
      ReportTypeList: 'ReportTypeList.Type.',
      ReportRequestIdList: 'ReportRequestIdList.Id.',
      ReportProcessingStatusList: 'ReportProcessingStatusList.Status.',
    };
    const options: IRequest = CreateOptions(this, params, parsing);
    return await this.Request(options);
  }

  @API_METHOD('POST', { Restore: 60 })
  async GetReportRequestListByNextToken(params: IReqGetReportRequestListByNextToken): Promise<IResGetReportRequestListByNextToken> {
    const options: IRequest = CreateOptions(this, params);
    return await this.Request(options);
  }

  @API_METHOD('POST', { Restore: 60 })
  async GetReportRequestCount(params: IReqGetReportRequestCount): Promise<IResGetReportRequestCount> {
    const parsing = { ReportTypeList: 'ReportTypeList.Type.', ReportProcessingStatusList: 'ReportProcessingStatusList.Status.' };
    const options: IRequest = CreateOptions(this, params, parsing);
    return await this.Request(options);
  }

  /**
   * 最大请求配额    : 10/max
   * 恢复率         : 1/45.sec
   * 每小时请求配额   : 80/hour
   */
  @API_METHOD('POST', { Restore: 60 })
  async CancelReportRequests(params: IReqCancelReportRequests): Promise<IResCancelReportRequests> {
    const parsing = {
      ReportTypeList: 'ReportTypeList.Type.',
      ReportRequestIdList: 'ReportRequestIdList.Id.',
      ReportProcessingStatusList: 'ReportProcessingStatusList.Status.',
    };
    const options: IRequest = CreateOptions(this, params, parsing);
    return await this.Request(options);
  }

  /**
   * 最大请求配额    : 10/max
   * 恢复率         : 1/min
   * 每小时请求配额   : 60/hour
   */
  @API_METHOD('POST', { Restore: 60 })
  async GetReportList(params: IReqGetReportList): Promise<IResGetReportList> {
    const parsing = { ReportTypeList: 'ReportTypeList.Type.', ReportRequestIdList: 'ReportRequestIdList.Id.' };
    const options: IRequest = CreateOptions(this, params, parsing);
    return await this.Request(options);
  }

  @API_METHOD('POST', { Restore: 60 })
  async GetReportListByNextToken(params: IReqGetReportListByNextToken): Promise<IResGetReportListByNextToken> {
    const options: IRequest = CreateOptions(this, params);
    return await this.Request(options);
  }

  /**
   * 最大请求配额    : 10/max
   * 恢复率         : 1/45.sec
   * 每小时请求配额   : 80/hour
   */
  @API_METHOD('POST', { Restore: 60 })
  async GetReportCount(params: IReqGetReportCount): Promise<IResGetReportCount> {
    const options: IRequest = CreateOptions(this, params, { ReportTypeList: 'ReportTypeList.Type.' });
    return await this.Request(options);
  }

  /**
   * 最大请求配额    : 15/max
   * 恢复率         : 1/min
   * 每小时请求配额   : 60/hour
   */
  @API_METHOD('POST', { Restore: 60, Convert: false, Timeout: 180 })
  async GetReport(params: IReqGetReport): Promise<string> {
    const options: IRequest = CreateOptions(this, params);
    options.Headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
    };
    return await this.Request(options);
  }

  /**
   * 最大请求配额    : 10/max
   * 恢复率         : 1/45.sec
   * 每小时请求配额   : 80/hour
   */
  @API_METHOD('POST', { Restore: 60 })
  async ManageReportSchedule(params: IReqManageReportSchedule): Promise<IResManageReportSchedule> {
    const options: IRequest = CreateOptions(this, params);
    return await this.Request(options);
  }

  @API_METHOD('POST', { Restore: 60 })
  async GetReportScheduleList(params: IReqGetReportScheduleList): Promise<IResGetReportScheduleList> {
    const options: IRequest = CreateOptions(this, params, { ReportTypeList: 'ReportTypeList.Type.' });
    return await this.Request(options);
  }

  @API_METHOD('POST', { Restore: 60 })
  async GetReportScheduleListByNextToken(params: { NextToken: string }): Promise<IResGetReportScheduleList> {
    const options: IRequest = CreateOptions(this, params);
    return await this.Request(options);
  }

  @API_METHOD('POST', { Restore: 60 })
  async GetReportScheduleCount(params: IReqGetReportScheduleCount): Promise<IResGetReportScheduleCount> {
    const options: IRequest = CreateOptions(this, params, { ReportTypeList: 'ReportTypeList.Type.' });
    return await this.Request(options);
  }

  @API_METHOD('POST', { Restore: 60 })
  async UpdateReportAcknowledgements(params: IReqUpdateReportAcknowledgements): Promise<IResUpdateReportAcknowledgements> {
    const options: IRequest = CreateOptions(this, params, { ReportIdList: 'ReportIdList.Id.' });
    return await this.Request(options);
  }
}
