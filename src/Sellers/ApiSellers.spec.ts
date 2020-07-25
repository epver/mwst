import {ApiSellers} from './index';
import {TestServerStart, TestServerClose} from '../mock';

beforeAll(() => TestServerStart());
afterAll(() => TestServerClose());

describe('ApiSellers', () => {
  const api = new ApiSellers({SellerId: 'MOCK_ID', MWSAuthToken: 'MOCK_TOKEN'});
  api.ConfigureArea('TEST');

  test('api.information', () => {
    expect(api).toBeInstanceOf(ApiSellers);
    expect(api.Path).toBe('Sellers');
    expect(api.Version).toBe('2011-07-01');
  });

  test('api.GetServiceStatus', async () => {
    const result = await api.GetServiceStatus();
    expect(result).toHaveProperty('Status');
    expect(result).toHaveProperty('Timestamp');
  });

  test('api.ListMarketplaceParticipations', async () => {
    const result = await api.ListMarketplaceParticipations();
    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['ListParticipations', 'ListMarketplaces'])
    )
    expect(result.ListParticipations).toEqual(expect.any(Array))
    expect(result.ListMarketplaces).toEqual(expect.any(Array))
  });

  test('api.ListMarketplaceParticipationsByNextToken', async () => {
    const result = await api.ListMarketplaceParticipationsByNextToken({NextToken: 'String'});

    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['ListParticipations', 'ListMarketplaces'])
    )
    expect(result.ListParticipations).toEqual(expect.any(Array))
    expect(result.ListMarketplaces).toEqual(expect.any(Array))
  });

  test('api.ListMarketplaceParticipationsContinue', async () => {
    const result = await api.ListMarketplaceParticipationsContinue();

    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['ListParticipations', 'ListMarketplaces'])
    )
    expect(result.ListParticipations).toEqual(expect.any(Array))
    expect(result.ListMarketplaces).toEqual(expect.any(Array))
  });
});
