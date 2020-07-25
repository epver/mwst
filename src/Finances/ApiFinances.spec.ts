import {ApiFinances} from './index';
import {TestServerStart, TestServerClose} from '../mock';

const api = new ApiFinances({SellerId: 'MOCK_ID', MWSAuthToken: 'MOCK_TOKEN'});
api.ConfigureArea('TEST');

beforeAll(() => {
  TestServerStart();
});

afterAll(() => {
  TestServerClose();
});
describe('ApiFinances', () => {
  test('api.information', () => {
    expect(api).toBeInstanceOf(ApiFinances);
    expect(api.Path).toBe('Finances');
    expect(api.Version).toBe('2015-06-01');
  });
});
