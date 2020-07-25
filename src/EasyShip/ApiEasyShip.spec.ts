import {ApiEasyShip} from './index';
import {TestServerStart, TestServerClose} from '../mock';

const api = new ApiEasyShip({SellerId: 'MOCK_ID', MWSAuthToken: 'MOCK_TOKEN'});
api.ConfigureArea('TEST');

beforeAll(() => {
  TestServerStart();
});

afterAll(() => {
  TestServerClose();
});
describe('ApiEasyShip', () => {
  test('api.information', () => {
    expect(api).toBeInstanceOf(ApiEasyShip);
    expect(api.Path).toBe('EasyShip');
    expect(api.Version).toBe('2015-06-01');
  });
});
