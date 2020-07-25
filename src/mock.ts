import {join} from 'path';
import {createServer} from 'http';
import {existsSync, readFileSync} from 'fs';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import {testingPort} from './Core/Env';

export const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.all('/:path/:version', (req, res) => {
  const {path, version} = req.params;
  const data = req.method === 'GET' ? {...req.query} : {...req.body};
  const file = join(__dirname, path, '__mocks__', `${data.Action}Response.xml`);
  if (existsSync(file)) {
    const content = readFileSync(file);
    res.send(content);
  } else {
    res.send('<?xml version="1.0"?>\n' +
      `<ErrorResponse xmlns="https://mws.amazonservices.com/${path}/${version}">\n` +
      '  <Error>\n' +
      '    <Type>Sender</Type>\n' +
      '    <Code>NotFoundFile</Code>\n' +
      `   <Message>Not found file: ${file}</Message>\n` +
      '  </Error>\n' +
      '  <RequestID>string</RequestID>\n' +
      '</ErrorResponse>\n');
  }
});

let server;
export const TestServerStart = () => {
  server = createServer(app).listen(testingPort);
};
export const TestServerClose = () => {
  if (server) server.close();
};
