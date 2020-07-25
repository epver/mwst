import {TestServerClose, TestServerStart} from '../mock';
import {ApiProducts} from './index';

const api = new ApiProducts({SellerId: 'MOCK_ID', MWSAuthToken: 'MOCK_TOKEN'});
api.ConfigureArea('TEST');

beforeAll(() => TestServerStart());
afterAll(() => TestServerClose());

describe('ApiProducts', () => {
  test('api.information', () => {
    expect(api).toBeInstanceOf(ApiProducts);
    expect(api.Path).toBe('Products');
    expect(api.Version).toBe('2011-10-01');
  });

  test('api.GetServiceStatus', async () => {
    const result = await api.GetServiceStatus();

    expect(result).toHaveProperty('Status');
    expect(result).toHaveProperty('Timestamp');
  });

  test('api.ListMatchingProducts', async () => {
    const result = await api.ListMatchingProducts({Query: 'harry potter dvd'});
    expect(result).toHaveProperty('Products');
    expect(result.Products).toEqual(expect.any(Array))
  });

  test('api.GetMatchingProduct', async () => {
    const result = await api.GetMatchingProduct({ASINList: ['String']});
    expect(result).toHaveProperty('Products');
    expect(result.Products).toEqual(expect.any(Array))
  });

  test('api.GetCompetitivePricingForSKU', async () => {
    const result = await api.GetCompetitivePricingForSKU({SellerSKUList: ['String']});
    expect(result).toHaveProperty('Products');
    expect(result.Products).toEqual(expect.any(Array))
  });

  test('api.GetCompetitivePricingForASIN', async () => {
    const result = await api.GetCompetitivePricingForASIN({ASINList: ['String']});
    expect(result).toHaveProperty('Products');
    expect(result.Products).toEqual(expect.any(Array))
  });

  test('api.GetLowestOfferListingsForSKU', async () => {
    const result = await api.GetLowestOfferListingsForSKU({});
    expect(result).toBeNull();
  });

  test('api.GetLowestOfferListingsForASIN', async () => {
    const result = await api.GetLowestOfferListingsForASIN({});
    expect(result).toBeNull();
  });

  test('api.GetLowestPricedOffersForSKU', async () => {
    const result = await api.GetLowestPricedOffersForSKU({});
    expect(result).toBeNull();
  });

  test('api.GetLowestPricedOffersForASIN', async () => {
    const result = await api.GetLowestPricedOffersForASIN({});
    expect(result).toBeNull();
  });

  test('api.GetMyFeesEstimate', async () => {
    const result = await api.GetMyFeesEstimate({FeesEstimateRequestList: []});
    expect(result).toHaveProperty('FeesEstimateResultList');
  });

  test('api.GetMyPriceForSKU', async () => {
    const result = await api.GetMyPriceForSKU({});
    expect(result).toBeNull();
  });

  test('api.GetMyPriceForASIN', async () => {
    const result = await api.GetMyPriceForASIN({});
    expect(result).toBeNull();
  });

  test('api.GetProductCategoriesForSKU', async () => {
    const result = await api.GetProductCategoriesForSKU({});
    expect(result).toBeNull();
  });

  test('api.GetProductCategoriesForASIN', async () => {
    const result = await api.GetProductCategoriesForASIN({});
    expect(result).toBeNull();
  });

});