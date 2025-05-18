# n8n-nodes-enginemailer

Custom [n8n](https://n8n.io) nodes to integrate with the [Enginemailer](https://www.enginemailer.com/) REST API.

## 📦 Features

This package includes custom resource nodes for:

- 📧 Transactional Email API
  - Send transactional email
  - Export CSV report
  - Check export status

- 👥 Subscriber Management API
  - Insert / delete / activate / retrieve subscribers
  - Batch update subscribers
  - Get custom fields, subcategories
  - Create / update categories

- 📢 Campaign Management API
  - Create, update, delete campaigns
  - Assign / remove recipient lists
  - Pause, schedule, send campaigns
  - Get category/subcategory lists
  - List campaigns

---

## 🔐 Authentication

All API calls require an **API Key**.  
To get your API key:

1. Log into [Enginemailer Portal](https://portal.enginemailer.com/)
2. Go to **User Profile**
3. Copy the `APIKey` and save it in the credential section of this node.

---

## 🧰 Usage

1. Install the custom node using `n8n-node-dev`:

```bash
npm install
npm run build
n8n-node-dev link
```

2. In the n8n UI:
   - Create new credentials of type: **Enginemailer API**
   - Add the `Enginemailer` node to your workflow
   - Select `Resource` and `Operation`
   - Provide required JSON body fields under `Parameters (JSON)`

---

## 🧪 Testing

You can test the node with this simple operation:

- **Resource**: `transactional`
- **Operation**: `sendTransactionalEmail`
- **Parameters**:

```json
{
  "UserKey": "your_user_key",
  "ToEmail": "test@example.com",
  "Subject": "Test",
  "SenderEmail": "your_verified_email@yourdomain.com",
  "SubmittedContent": "Hello from n8n!",
  "SenderName": "n8n Bot"
}
```

---

## 🛠 Maintained by

Built with ❤️ by [N8N A.I Assistant (by Nskha)](https://n8n.io).

