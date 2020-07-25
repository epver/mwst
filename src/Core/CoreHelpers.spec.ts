import * as helper from './CoreHelpers';
import {testingPort} from './Env';

describe('CoreHelpers', () => {
  test('.isUndefined', () => {
    expect(helper.isUndefined(undefined)).toBe(true);
    expect(helper.isUndefined(0)).toBe(false);
  });

  test('.isNil', () => {
    expect(helper.isNil(null)).toBe(true);
    expect(helper.isNil(0)).toBe(false);
  });

  test('.isString', () => {
    expect(helper.isString('string')).toBe(true);
  });

  test('.isObject', () => {
    expect(helper.isObject('string')).toBe(false);
    expect(helper.isObject({})).toBe(true);
  });

  test('.isArray', () => {
    expect(helper.isArray([''])).toBe(true);
  });

  test('.isFunction', () => {
    expect(helper.isFunction(() => null)).toBe(true);
  });

  test('.isEmptyObject', () => {
    expect(helper.isEmptyObject({})).toBe(true);
    expect(helper.isEmptyObject({a: 1})).toBe(false);
  });

  test('.sortObject', () => {
    const test = helper.sortObject({b: 1, a: 1});
    expect(Object.keys(test)).toEqual(['a', 'b']);
  });

  test('.splitArray', () => {
    const test = [1, 2, 3, 4];
    const rest = helper.splitArray(test, 2);
    expect(rest.length).toEqual(Math.ceil(test.length / 2));
    expect(rest).toEqual([[1, 2], [3, 4]]);
  });

  test('.sleepSecond', async () => {
    const start = Date.now();
    await helper.sleepSecond(2);
    const ended = Math.floor((Date.now() - start) / 1000);
    expect(ended).toEqual(2);
  });

  test('.dumpObject', () => {
    expect(helper.dumpObject({})).toBe(undefined);
  });

  test('.listTakeOffLayer', () => {
    // empty
  });

  test('.CreateArea', () => {
    const test = helper.CreateArea('TEST')
    expect(test).toEqual({Id: 'TEST', Host: `127.0.0.1:${testingPort}`})
  });
});