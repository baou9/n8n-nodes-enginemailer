
import {
  IExecuteFunctions,
} from 'n8n-core';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';

export class Enginemailer implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Enginemailer',
    name: 'enginemailer',
    group: ['output'],
    version: 1,
    description: 'Interact with Enginemailer API',
    defaults: {
      name: 'Enginemailer',
    },
    inputs: ['main'],
    outputs: ['main'],
    credentials: [
      {
        name: 'enginemailerApi',
        required: true,
      },
    ],
    properties: [
      {
        displayName: 'Resource',
        name: 'resource',
        type: 'options',
        options: [
          {
            name: 'Campaign',
            value: 'campaign',
          },
          {
            name: 'Subscriber',
            value: 'subscriber',
          },
          {
            name: 'Transactional Email',
            value: 'transactional',
          },
        ],
        default: 'campaign',
      },
      {
        displayName: 'Operation',
        name: 'operation',
        type: 'string',
        default: '',
        description: 'The operation to perform.',
      },
      {
        displayName: 'Parameters (JSON)',
        name: 'params',
        type: 'json',
        default: '',
        description: 'Request body parameters as JSON',
      },
    ],
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    const credentials = this.getCredentials('enginemailerApi') as { apiKey: string };

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter('resource', i) as string;
      const operation = this.getNodeParameter('operation', i) as string;
      const params = this.getNodeParameter('params', i, {}) as object;

      const endpoints: Record<string, string> = {
        // Campaign
        'campaign:createCampaign': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/CreateCampaign',
        'campaign:updateCampaign': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/UpdateCampaign',
        'campaign:deleteCampaign': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/DeleteCampaign',
        'campaign:assignRecipientList': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/AssignRecipientList',
        'campaign:deleteRecipientList': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/DeleteRecipientList',
        'campaign:pauseCampaign': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/PauseCampaign',
        'campaign:sendCampaign': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/SendCampaign',
        'campaign:scheduleCampaign': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/ScheduleCampaign',
        'campaign:getCategoryList': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/GetCategoryList',
        'campaign:getSubCategoryList': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/GetSubCategoryList',
        'campaign:listCampaigns': 'https://api.enginemailer.com/restapi/Campaign/EMCampaign/ListCampaign',

        // Subscriber
        'subscriber:insertSubscriber': 'https://api.enginemailer.com/restapi/subscriber/emsubscriber/insertSubscriber',
        'subscriber:deleteSubscriber': 'https://api.enginemailer.com/restapi/subscriber/emsubscriber/deleteSubscriber',
        'subscriber:getSubscriber': 'https://api.enginemailer.com/restapi/subscriber/emsubscriber/getSubscriber',
        'subscriber:activateSubscriber': 'https://api.enginemailer.com/restapi/subscriber/emsubscriber/activateSubscriber',
        'subscriber:batchUpdateSubscribers': 'https://api.enginemailer.com/restapi/subscriber/emsubscriber/batchUpdateSubscribers',
        'subscriber:batchUpdateStatus': 'https://api.enginemailer.com/restapi/subscriber/emsubscriber/batchUpdateStatus',
        'subscriber:getCustomField': 'https://api.enginemailer.com/restapi/subscriber/emsubscriber/getCustomField',
        'subscriber:getSubCategory': 'https://api.enginemailer.com/restapi/subscriber/emsubscriber/getSubCategory',
        'subscriber:updateCategory': 'https://api.enginemailer.com/restapi/subscriber/emsubscriber/updateCategory',

        // Transactional
        'transactional:sendTransactionalEmail': 'https://api.enginemailer.com/RESTAPI/V2/Submission/SendEmail',
        'transactional:exportCSVReport': 'https://api.enginemailer.com/RESTAPI/V2/Submission/Report/Export',
        'transactional:checkExportStatus': 'https://api.enginemailer.com/RESTAPI/V2/Submission/Report/CheckExport',
      };

      const endpointKey = `${resource}:${operation}`;
      const url = endpoints[endpointKey];
      if (!url) throw new Error(`Unsupported resource/operation: ${endpointKey}`);

      const response = await this.helpers.request({
        method: 'POST',
        url,
        headers: {
          'Content-Type': 'application/json',
          'APIKey': credentials.apiKey,
        },
        body: params,
        json: true,
      });

      returnData.push({ json: response });
    }

    return [returnData];
  }
}
