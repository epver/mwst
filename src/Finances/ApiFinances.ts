import {Api, API, isObject, isArray, listTakeOffLayer, ISeller, IAccess, API_METHOD, IGetServiceStatus, CheckParameterError} from '../Core';
import {
  IReqListFinancialEventGroups, IResListFinancialEventGroups,
  IReqListFinancialEventGroupsByNextToken, IResListFinancialEventGroupsByNextToken,
  IReqListFinancialEvents, IResListFinancialEvents,
  IReqListFinancialEventsByNextToken, IResListFinancialEventsByNextToken,
} from './DataTypes';

function disposeFinancialEventGroup(ct: any) {
  if (isObject(ct.FinancialEventGroupList)) {
    if (isArray(ct.FinancialEventGroupList.FinancialEventGroup)) {
      ct.FinancialEventGroupList = ct.FinancialEventGroupList.FinancialEventGroup;
    } else {
      ct.FinancialEventGroupList = [ct.FinancialEventGroupList.FinancialEventGroup];
    }
  } else {
    ct.FinancialEventGroupList = [];
  }
  return ct;
}

function disposeFinancialEvents(ct: any) {
  if (!isObject(ct.FinancialEvents)) {
    return ct.FinancialEvents = {};
  }
  const events = { ...ct.FinancialEvents };
  Object.keys(ct.FinancialEvents).forEach(key => {
    if (events[key] === '' || !events[key]) {
      return delete events[key];
    }
    // 第一层
    events[key] = listTakeOffLayer(key, events[key]);

    // 第二层
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < events[key].length; i++) {
      Object.keys(events[key][i]).forEach(sKey => {
        events[key][i][sKey] = listTakeOffLayer(sKey, events[key][i][sKey]);

        if (!isArray(events[key][i][sKey])) {
          return;
        }
        // 第三层
        // tslint:disable-next-line:prefer-for-of
        for (let j = 0; j < events[key][i][sKey].length; j++) {
          Object.keys(events[key][i][sKey][j]).forEach(ssKey => {
            events[key][i][sKey][j][ssKey] = listTakeOffLayer(ssKey, events[key][i][sKey][j][ssKey]);
          });
        }
      });
    }
  });
  return { ...ct, FinancialEvents: events };
}

function mergeFinancialEvents(cto: IResListFinancialEvents, ctn: IResListFinancialEvents) {
  let keys;
  if (Object.keys(cto.FinancialEvents).length >= ctn) {
    keys = Object.keys(cto.FinancialEvents);
  } else {
    keys = Object.keys(ctn.FinancialEvents);
  }

  keys.forEach((key) => {
    if (isArray(cto.FinancialEvents[key])) {
      cto.FinancialEvents[key] = [...cto.FinancialEvents[key], ...ctn.FinancialEvents[key]];
    } else {
      cto.FinancialEvents[key] = [...ctn.FinancialEvents[key]];
    }
  });
  return cto;
}

@API('Finances', '2015-05-01')
export class ApiFinances extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }

  @API_METHOD('POST')
  public async GetServiceStatus(): Promise<IGetServiceStatus> {
    return await this.CreateRequest(this.CreateOptions());
  }

  /**
   * 最大请求配额    : 30/max
   * 恢复率         : 0.5/sec
   * 每小时请求配额   : 1800/hour
   */
  @API_METHOD('POST', { Throttled: 0.5 })
  public async ListFinancialEventGroups(params: IReqListFinancialEventGroups): Promise<IResListFinancialEventGroups> {
    const options = this.CreateOptions(params)
    return disposeFinancialEventGroup(await this.CreateRequest(options));
  }

  @API_METHOD('POST', { Throttled: 0.5 })
  public async ListFinancialEventGroupsByNextToken(params: IReqListFinancialEventGroupsByNextToken): Promise<IResListFinancialEventGroupsByNextToken> {
    const options = this.CreateOptions(params)
    return disposeFinancialEventGroup(await this.CreateRequest(options));
  }

  public async ListFinancialEventGroupsContinue(params: IReqListFinancialEventGroups): Promise<IResListFinancialEventGroups> {
    const tempRs = await this.ListFinancialEventGroups(params);
    if (!tempRs.NextToken) {
      return tempRs;
    }
    let NextToken = tempRs.NextToken;
    while (NextToken) {
      const nextRs = await this.ListFinancialEventGroupsByNextToken({ NextToken });
      tempRs.FinancialEventGroupList = [...tempRs.FinancialEventGroupList, ...nextRs.FinancialEventGroupList];
      NextToken = nextRs.NextToken;
    }
    return tempRs;
  }

  @API_METHOD('POST', { Throttled: 0.5 })
  public async ListFinancialEvents(params: IReqListFinancialEvents): Promise<IResListFinancialEvents> {
    if (!params.AmazonOrderId && !params.FinancialEventGroupId && !params.PostedAfter) {
      throw new CheckParameterError('local check parameter error.');
    }
    const options = this.CreateOptions(params)
    return disposeFinancialEvents(await this.CreateRequest(options));
  }

  @API_METHOD('POST', { Throttled: 0.5 })
  public async ListFinancialEventsByNextToken(params: IReqListFinancialEventsByNextToken): Promise<IResListFinancialEventsByNextToken> {
    const options = this.CreateOptions(params)
    return disposeFinancialEvents(await this.CreateRequest(options));
  }

  public async ListFinancialEventsContinue(params: IReqListFinancialEvents): Promise<IResListFinancialEvents> {
    let tempRs = await this.ListFinancialEvents(params);
    if (!tempRs.NextToken) {
      return tempRs;
    }

    let NextToken = tempRs.NextToken;
    while (NextToken) {
      const nextRs = await this.ListFinancialEventsByNextToken({ NextToken });
      tempRs = mergeFinancialEvents(tempRs, nextRs);
      NextToken = nextRs.NextToken;
    }
    return tempRs;
  }
}
