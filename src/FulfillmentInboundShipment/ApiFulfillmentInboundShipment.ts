import {Api, API, API_METHOD, CheckParameterError, isArray, ISeller, isEmptyObject, isObject, IAccess} from '../Core';
import {
  IReqGetPreorderInfo, IResGetPreorderInfo,
  IReqListInboundShipments, IResListInboundShipments,
  IReqListInboundShipmentsByNextToken,
  IReqListInboundShipmentItems, IResListInboundShipmentItems,
  IReqListInboundShipmentItemsByNextToken,
} from './DataTypes';

function disposeListInboundShipments(ct: any) {
  if (isObject(ct.ShipmentData)) {
    if (isArray(ct.ShipmentData.member)) {
      ct.ShipmentData = ct.ShipmentData.member;
    } else {
      ct.ShipmentData = [ct.ShipmentData.member];
    }
  } else {
    ct.ShipmentData = [];
  }
  return ct as IResListInboundShipments;
}

function disposeListInboundShipmentItems(ct: any) {
  if (isObject(ct.ItemData)) {
    if (isArray(ct.ItemData.member)) {
      ct.ItemData = ct.ItemData.member;
    } else {
      ct.ItemData = [ct.ItemData.member];
    }
  } else {
    ct.ItemData = [];
  }

  ct.ItemData = ct.ItemData.map(member => {
    delete member.PrepDetailsList;
    return member;
  });
  return ct as IResListInboundShipmentItems;
}

@API('FulfillmentInboundShipment', '2010-10-01')
export class ApiFulfillmentInboundShipment extends Api {
  constructor(seller: ISeller, access?: IAccess) {
    super(seller, access);
  }

  @API_METHOD('GET')
  async GetPreorderInfo(params: IReqGetPreorderInfo): Promise<IResGetPreorderInfo> {
    const options = this.CreateOptions(params);
    return await this.CreateRequest(options);
  }

  @API_METHOD('GET')
  async ListInboundShipments(params: IReqListInboundShipments): Promise<IResListInboundShipments> {
    const parsing = {ShipmentStatusList: 'ShipmentStatusList.member.', ShipmentIdList: 'ShipmentIdList.member.'};
    const options = this.CreateOptions(params, parsing);
    return disposeListInboundShipments(await this.CreateRequest(options));
  }

  @API_METHOD('GET')
  async ListInboundShipmentsByNextToken(params: IReqListInboundShipmentsByNextToken): Promise<IResListInboundShipments> {
    const options = this.CreateOptions(params);
    return disposeListInboundShipments(await this.CreateRequest(options));
  }

  async ListInboundShipmentsContinue(params: IReqListInboundShipments): Promise<IResListInboundShipments> {
    const tempRs = await this.ListInboundShipments(params);
    if (!tempRs.NextToken) {
      return tempRs;
    }
    let NextToken = tempRs.NextToken;
    while (NextToken) {
      const nextRs = await this.ListInboundShipmentsByNextToken({NextToken});
      tempRs.ShipmentData = [...tempRs.ShipmentData, ...nextRs.ShipmentData];
      NextToken = nextRs.NextToken;
    }
    return tempRs;
  }

  @API_METHOD('GET')
  async ListInboundShipmentItems(params: IReqListInboundShipmentItems): Promise<IResListInboundShipmentItems> {
    if (isEmptyObject(params)) {
      throw new CheckParameterError('local params error, ShipmentId or LastUpdatedAfter,LastUpdatedBefore');
    }
    const options = this.CreateOptions(params);
    return disposeListInboundShipmentItems(await this.CreateRequest(options));
  }

  @API_METHOD('GET')
  async ListInboundShipmentItemsByNextToken(params: IReqListInboundShipmentItemsByNextToken): Promise<IResListInboundShipmentItems> {
    const options = this.CreateOptions(params);
    return disposeListInboundShipmentItems(await this.CreateRequest(options));
  }

  async ListInboundShipmentItemsContinue(params: IReqListInboundShipmentItems): Promise<IResListInboundShipmentItems> {
    const tempRs = await this.ListInboundShipmentItems(params);
    if (!tempRs.NextToken) {
      return tempRs;
    }
    let NextToken = tempRs.NextToken;
    while (NextToken) {
      const nextRs = await this.ListInboundShipmentItemsByNextToken({NextToken});
      tempRs.ItemData = [...tempRs.ItemData, ...nextRs.ItemData];
      NextToken = nextRs.NextToken;
    }
    return tempRs;
  }

  @API_METHOD('GET')
  async CreateInboundShipmentPlan(params) {
    const options = this.CreateOptions(params);
    return await this.CreateRequest(options);
  }

  @API_METHOD('GET')
  async GetPrepInstructionsForSKU(params) {
    const options = this.CreateOptions(params);
    return await this.CreateRequest(options);
  }
}
