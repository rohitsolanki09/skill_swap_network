# 🤖 Dialogflow ES Webhook Integration Guide

This guide details how to run the **Skill Swap Network** backend locally, expose it securely via **ngrok**, and link it to **Google Dialogflow ES** for webhook fulfillment.

---

## 🏗️ Architecture Overview

```
User (Chat / Simulator)
       │
       ▼
Google Dialogflow ES
       │
       ▼ (HTTP POST Webhook)
ngrok HTTPS Tunnel (e.g. https://xxxxx.ngrok-free.app)
       │
       ▼
Skill Swap Network Local Backend (http://localhost:5000)
       │
       ▼ (Fulfillment Response JSON)
Dialogflow ES ──► User
```

---

## A. How to Start the Skill Swap Network Backend

Open a terminal in the project directory (`.../Web`) and run:

```bash
npm run server
```

*(Alternatively, you can run `npm start` or `node server/index.js`)*

To run the React frontend at the same time in a second terminal:
```bash
npm run dev
```

---

## B. How to Identify the Backend Port

1. When the backend starts, it outputs the active port directly in the terminal banner:
   ```
   ============================================================
   🚀 Skill Swap Network Backend is running!
   📡 Local Port:         5000
   🌐 Base URL:           http://localhost:5000
   🩺 Health Check URL:   http://localhost:5000/api/dialogflow/health
   🤖 Dialogflow Webhook: http://localhost:5000/api/dialogflow/webhook
   ============================================================
   ```
2. The port is controlled by the `PORT` variable in [`.env`](file:///c:/Rohitwork/My%20projects/skill%20swap%20network/main/Web/.env). By default, it is **`5000`**.
3. You can verify it is running in your browser or curl by visiting:
   ```
   http://localhost:5000/api/dialogflow/health
   ```
   Expected response:
   ```json
   {
     "status": "ok",
     "service": "dialogflow-webhook"
   }
   ```

---

## C. How to Start ngrok

Open a **separate terminal** window (leaving the backend running) and start ngrok on port `5000`:

```bash
ngrok http 5000
```

> **Note:** If you haven't installed ngrok yet, install it from [ngrok.com](https://ngrok.com) or run `npm install -g ngrok` / `choco install ngrok` / `winget install ngrok`.

---

## D. How to Obtain the HTTPS ngrok URL

In the ngrok terminal window, look for the **Forwarding** line:

```text
Session Status                online
Account                       Your Name (Plan: Free)
Version                       3.x.x
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://a1b2-c3d4-e5f6.ngrok-free.app -> http://localhost:5000
```

Copy the **HTTPS** forwarding address (e.g., `https://a1b2-c3d4-e5f6.ngrok-free.app`).

---

## E. Webhook URL to Paste into Dialogflow ES

1. Open your agent in the [Dialogflow ES Console](https://dialogflow.cloud.google.com/).
2. In the left navigation sidebar, click **Fulfillment**.
3. Toggle the **Webhook** switch to **ENABLED**.
4. In the **URL** field, append `/api/dialogflow/webhook` to your HTTPS ngrok domain:

   ```
   https://YOUR-NGROK-DOMAIN/api/dialogflow/webhook
   ```

   *Example:*
   ```
   https://a1b2-c3d4-e5f6.ngrok-free.app/api/dialogflow/webhook
   ```

5. Leave **Headers** and **Basic Auth** empty (unless you configured `DIALOGFLOW_AUTH_TOKEN` in [`.env`](file:///c:/Rohitwork/My%20projects/skill%20swap%20network/main/Web/.env)).
6. Scroll down to the bottom and click **Save**.

---

## F. How to Enable Webhook Fulfillment for an Individual Intent

By default in Dialogflow ES, intents do **not** call the webhook unless explicitly enabled:

1. In the Dialogflow ES left sidebar, click **Intents**.
2. Click an existing intent (or create a new intent named **`TestIntent`**).
3. In the **Training phrases** section, add phrases such as:
   - `test`
   - `test webhook`
   - `run test`
4. Scroll all the way to the bottom of the intent page to the **Fulfillment** section.
5. Click **Enable Fulfillment**.
6. Turn **ON** the toggle: **"Enable webhook call for this intent"**.
7. Click **Save** at the top of the intent editor.

---

## G. How to Test the Integration

1. On the right side of the Dialogflow ES console, locate the **"Try it now"** testing panel.
2. Type:
   ```
   test
   ```
   *(or any phrase you added to the test intent)* and press **Enter**.
3. Dialogflow will query your backend via ngrok.
4. **Expected Chatbot Response:**
   ```
   Hello! 👋 This response came from the Skill Swap Network backend through Dialogflow.
   ```
5. You can also click **"DIAGNOSTIC INFO"** in Dialogflow to inspect the raw `Fulfillment Response` JSON:
   ```json
   {
     "fulfillmentText": "Hello! 👋 This response came from the Skill Swap Network backend through Dialogflow.",
     "fulfillmentMessages": [
       {
         "text": {
           "text": [
             "Hello! 👋 This response came from the Skill Swap Network backend through Dialogflow."
           ]
         }
       }
     ],
     "source": "skill-swap-network-backend"
   }
   ```

---

## H. Successful Backend Console Output

When Dialogflow sends a request to your backend, your server terminal will log structured information:

```text
============================================================
 [Dialogflow Webhook] Request Received
 Timestamp:  2026-10-26T15:09:13.773Z
 Intent:     "TestIntent"
 Query Text: "test"
 Action:     "test.intent"
 Parameters: {}
 Session ID: abcde-12345
============================================================
[Dialogflow Webhook] Response Returned:
 Fulfillment Text: "Hello! 👋 This response came from the Skill Swap Network backend through Dialogflow."
============================================================
```

---

## 🧩 Modular Intent Handlers (Extending in the Future)

All intent handlers are isolated in [`server/services/dialogflow.service.js`](file:///c:/Rohitwork/My%20projects/skill%20swap%20network/main/Web/server/services/dialogflow.service.js).

To connect new intents (e.g. database search, bookings, user profile matching):
1. Define a function in `server/services/dialogflow.service.js`:
   ```javascript
   function handleSkillSearch({ parameters }) {
     const skillName = parameters.skill;
     // Query your database or Skill Swap Network models here
     return formatDialogflowResponse(`Here are mentors offering ${skillName}...`);
   }
   ```
2. Add your intent name to `intentHandlers`:
   ```javascript
   const intentHandlers = {
     'test': handleTestIntent,
     'skill.search': handleSkillSearch,
     // ...
   };
   ```
