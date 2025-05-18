
import {
  ICredentialType,
  INodeProperties,
} from 'n8n-workflow';

export class EnginemailerApi implements ICredentialType {
  name = 'enginemailerApi';
  displayName = 'Enginemailer API';
  documentationUrl = 'https://enginemailer.zendesk.com/hc/en-us/sections/360000204772-REST-API';
  properties: INodeProperties[] = [
    {
      displayName: 'API Key',
      name: 'apiKey',
      type: 'string',
      default: '',
      required: true,
    },
  ];
}
