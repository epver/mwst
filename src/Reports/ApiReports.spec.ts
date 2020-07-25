import {TestServerClose, TestServerStart} from '../mock';
import {ApiReports} from './index';

const api = new ApiReports({SellerId: 'MOCK_ID', MWSAuthToken: 'MOCK_TOKEN'});
api.ConfigureArea('TEST');

beforeAll(() => TestServerStart());
afterAll(() => TestServerClose());

describe('ApiReports', () => {
  test('api.information', () => {
    expect(api).toBeInstanceOf(ApiReports);
    expect(api.Path).toBe('Reports');
    expect(api.Version).toBe('2009-01-01');
  });

  test('api.RequestReport', async () => {
    const result = await api.RequestReport({ReportType: '_GET_AFN_INVENTORY_DATA_'});
    expect(result).toHaveProperty('ReportRequestInfo');
  });

  test('api.GetReportRequestList', async () => {
    const result1 = await api.GetReportRequestList({ReportRequestIdList: ['string']});
    expect(result1).toHaveProperty('ReportRequestInfo');

    const result2 = await api.GetReportRequestList({ReportTypeList: ['_GET_AFN_INVENTORY_DATA_']});
    expect(result2).toHaveProperty('ReportRequestInfo');
  });

  test('api.GetReportRequestListByNextToken', async () => {
    const result = await api.GetReportRequestListByNextToken({NextToken: 'string'});
    expect(result).toHaveProperty('ReportRequestInfo');
  });

  test('api.GetReportRequestCount', async () => {
    const result = await api.GetReportRequestCount({ReportTypeList: ['_GET_AFN_INVENTORY_DATA_']});
    expect(result).toHaveProperty('Count');
  });
});