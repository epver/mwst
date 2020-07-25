import {ApiFulfillmentInventory} from './index';
import {TestServerStart, TestServerClose, TestTiming} from '../mock';

beforeAll(() => TestServerStart());
afterAll(() => TestServerClose());

describe('ApiFulfillmentInventory', () => {
  const api = new ApiFulfillmentInventory({SellerId: 'MOCK_ID', MWSAuthToken: 'MOCK_TOKEN'});
  api.ConfigureArea('TEST');

  test('api.information', () => {
    expect(api).toBeInstanceOf(ApiFulfillmentInventory);
    expect(api.Path).toBe('FulfillmentInventory');
    expect(api.Version).toBe('2010-10-01');
  });

  test('api.GetServiceStatus', async () => {
    const result = await api.GetServiceStatus();
    expect(result).toHaveProperty('Status');
    expect(result).toHaveProperty('Timestamp');
  });

  test('api.ListInventorySupply--SellerSkus', async () => {
    const result = await api.ListInventorySupply({SellerSkus: ['String']});
    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['MarketplaceId', 'InventorySupplyList', 'NextToken'])
    )
    expect(result.InventorySupplyList).toEqual(expect.any(Array))
  });

  test('api.ListInventorySupply--QueryStartDateTime', async () => {
    const result = await api.ListInventorySupply({QueryStartDateTime: TestTiming('subtract', 2)});
    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['MarketplaceId', 'InventorySupplyList', 'NextToken'])
    )
    expect(result.InventorySupplyList).toEqual(expect.any(Array))
  });

  test('api.ListInventorySupplyByNextToken', async () => {
    const result = await api.ListInventorySupplyByNextToken({NextToken: 'String'});

    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['MarketplaceId', 'InventorySupplyList'])
    )
    expect(result.InventorySupplyList).toEqual(expect.any(Array))
  });

  test('api.ListInventorySupplyContinue', async () => {
    const result = await api.ListInventorySupplyContinue({QueryStartDateTime: TestTiming('subtract', 2)});

    expect(Object.keys(result)).toEqual(
      expect.arrayContaining(['MarketplaceId', 'InventorySupplyList'])
    )
  });
});
