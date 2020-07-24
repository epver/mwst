import {join} from 'path';
import {createServer} from 'net';
import {existsSync, readFileSync} from 'fs';
import {parse as qsParse} from 'querystring';
import fastify from 'fastify';
import {testingPort} from './Core/Env';
import {
  ApiEasyShip,
  ApiFeeds,
  ApiFinances,
  ApiFulfillmentInboundShipment,
  ApiFulfillmentInventory,
  ApiFulfillmentOutboundShipment,
  ApiMerchantFulfillment,
  ApiOrders,
  ApiProducts,
  ApiRecommendations,
  ApiReports,
  ApiSellers,
  ApiShipmentInvoicing,
  ApiSubscriptions
} from './index';

type TApi = ApiEasyShip | ApiFeeds | ApiFinances |
  ApiFulfillmentInboundShipment | ApiFulfillmentInventory | ApiFulfillmentOutboundShipment | ApiMerchantFulfillment |
  ApiOrders | ApiProducts | ApiRecommendations | ApiReports |
  ApiSellers | ApiShipmentInvoicing | ApiSubscriptions;


export function MockServer<T extends TApi>(api: TApi) {
  const mockApp = fastify();
  const mockFolder = join(__dirname, api.Path, '__mocks__');
  const ctp = (request, payload, done) => {
    let body = '';
    payload.on('data', (data) => {
      body += data;
    });
    payload.on('end', () => {
      try {
        const parsed = qsParse(body);
        done(null, parsed);
      } catch (e) {
        done(e);
      }
    });
    payload.on('error', done);
  };
  mockApp.addContentTypeParser('x-www-form-urlencoded', ctp);
  mockApp.addContentTypeParser('application/x-www-form-urlencoded', ctp);

  const fun = (request, reply) => {
    let data;
    if (request.method === 'GET') {
      data = {...request.query};
    } else {
      data = {...request.body};
    }
    const file = join(mockFolder, `${data.Action}Response.xml`);
    if (existsSync(file)) {
      const content = readFileSync(file);
      reply.send(content);
    } else {
      reply.send('<?xml version="1.0"?>\n' +
        `<ErrorResponse xmlns="https://mws.amazonservices.com/${api.Path}/${api.Version}">\n` +
        '  <Error>\n' +
        '    <Type>Sender</Type>\n' +
        '    <Code>NotFoundFile</Code>\n' +
        `   <Message>Not found file: ${file}</Message>\n` +
        '  </Error>\n' +
        '  <RequestID>string</RequestID>\n' +
        '</ErrorResponse>\n');
    }
  };
  mockApp.all(`/${api.Path}/${api.Version}`, fun);
  mockApp.listen(testingPort, (err, address) => {
    if (err) throw err;
  });

  return mockApp;
}

