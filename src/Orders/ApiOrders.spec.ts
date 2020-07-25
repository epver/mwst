import * as moment from 'moment';
import {TestServerClose, TestServerStart} from '../mock';
import {ApiOrders} from './index';

const api = new ApiOrders({SellerId: 'MOCK_ID', MWSAuthToken: 'MOCK_TOKEN'});
api.ConfigureArea('TEST');

beforeAll(() => {
  TestServerStart();
});

afterAll(() => {
  TestServerClose();
});

describe('ApiOrders', () => {
  test('api.information', () => {
    expect(api).toBeInstanceOf(ApiOrders);
    expect(api.Path).toBe('Orders');
    expect(api.Version).toBe('2013-09-01');
  });

  test('api.GetServiceStatus', async () => {
    const orders = await api.GetServiceStatus();

    expect(orders).toHaveProperty('Status');
    expect(orders).toHaveProperty('Timestamp');
  });

  test('api.GetOrder', async () => {
    const orders = await api.GetOrder({AmazonOrderIds: ['id']});
    expect(orders).toHaveProperty('Orders');
  });


  test('api.ListOrders', async () => {
    const orders = await api.ListOrders({CreatedAfter: moment().utc().format()});
    expect(orders).toHaveProperty('Orders');
    expect(orders).toHaveProperty('CreatedBefore');
    expect(orders).toHaveProperty('NextToken');
  });

  test('api.ListOrdersByNextToken', async () => {
    const orders = await api.ListOrdersByNextToken({NextToken: 'token'});
    expect(orders).toHaveProperty('Orders');
    expect(orders).toHaveProperty('CreatedBefore');
    expect(orders).toHaveProperty('NextToken');
  });

  test('api.ListOrderItems', async () => {
    const orders = await api.ListOrderItems({AmazonOrderId: 'id'});
    expect(orders).toHaveProperty('NextToken');
    expect(orders).toHaveProperty('AmazonOrderId');
    expect(orders).toHaveProperty('OrderItems');
  });

  test('api.ListOrderItems', async () => {
    const orders = await api.ListOrderItemsByNextToken({NextToken: 'token'});
    expect(orders).toHaveProperty('NextToken');
    expect(orders).toHaveProperty('AmazonOrderId');
    expect(orders).toHaveProperty('OrderItems');
  });
});