/**
 * Dialogflow Controller
 *
 * Handles HTTP requests for:
 * - GET  /api/dialogflow/health
 * - POST /api/dialogflow/webhook
 */

const dialogflowService = require('../services/dialogflow.service');

/**
 * Sanitizes parameters for logging to prevent leaking sensitive information
 * (passwords, tokens, keys, authorization headers)
 */
function sanitizeParameters(params) {
  if (!params || typeof params !== 'object') return params;
  const sanitized = { ...params };
  const sensitiveKeys = ['password', 'token', 'secret', 'apikey', 'api_key', 'auth', 'credit_card', 'pin'];
  for (const key of Object.keys(sanitized)) {
    if (sensitiveKeys.some(s => key.toLowerCase().includes(s))) {
      sanitized[key] = '[REDACTED]';
    }
  }
  return sanitized;
}

/**
 * GET /api/dialogflow/health
 * Simple health check endpoint for local testing
 */
function healthCheck(req, res) {
  return res.status(200).json({
    status: 'ok',
    service: 'dialogflow-webhook',
    timestamp: new Date().toISOString()
  });
}

/**
 * POST /api/dialogflow/webhook
 * Main webhook handler receiving fulfillment requests from Dialogflow ES
 */
async function handleWebhook(req, res, next) {
  try {
    // 1. Optional Auth Token Check (via DIALOGFLOW_AUTH_TOKEN in .env)
    const configuredToken = process.env.DIALOGFLOW_AUTH_TOKEN;
    if (configuredToken) {
      const incomingAuth = req.headers['authorization'];
      if (!incomingAuth || incomingAuth !== configuredToken) {
        console.warn('[Dialogflow Webhook] Unauthorized request rejected (invalid Authorization header)');
        return res.status(401).json({ error: 'Unauthorized webhook request' });
      }
    }

    // 2. Validate Request Body
    if (!req.body || typeof req.body !== 'object' || !req.body.queryResult) {
      console.warn('[Dialogflow Webhook] Warning: Received malformed or missing queryResult in body');
      return res.status(200).json({
        fulfillmentText: 'Skill Swap Network Webhook received a request with missing queryResult.',
        fulfillmentMessages: [
          {
            text: {
              text: ['Skill Swap Network Webhook received a request with missing queryResult.']
            }
          }
        ],
        source: 'skill-swap-network-backend'
      });
    }

    const { queryResult, session } = req.body;
    const intent = queryResult.intent?.displayName || 'Unknown Intent';
    const queryText = queryResult.queryText || '';
    const parameters = queryResult.parameters || {};
    const action = queryResult.action || '';

    // 3. Structured Logging for Development
    console.log('\n============================================================');
    console.log(' [Dialogflow Webhook] Request Received');
    console.log(` Timestamp:  ${new Date().toISOString()}`);
    console.log(` Intent:     "${intent}"`);
    console.log(` Query Text: "${queryText}"`);
    if (action) console.log(` Action:     "${action}"`);
    console.log(' Parameters:', JSON.stringify(sanitizeParameters(parameters), null, 2));
    if (session) {
      const sessionId = session.split('/').pop();
      console.log(` Session ID: ${sessionId}`);
    }
    console.log('============================================================');

    // 4. Process Intent via Service
    const fulfillmentResponse = await dialogflowService.processIntent({
      intent,
      queryText,
      parameters,
      action,
      session,
      rawBody: req.body
    });

    // 5. Log Response Returned
    console.log('[Dialogflow Webhook] Response Returned:');
    console.log(` Fulfillment Text: "${fulfillmentResponse.fulfillmentText}"`);
    console.log('============================================================\n');

    // 6. Return standard Dialogflow ES JSON response
    return res.status(200).json(fulfillmentResponse);

  } catch (error) {
    console.error('[Dialogflow Webhook] Error during webhook processing:', error);
    // Ensure the webhook never crashes or breaks Dialogflow communication
    return res.status(200).json({
      fulfillmentText: 'Skill Swap Network backend encountered an issue processing this intent.',
      fulfillmentMessages: [
        {
          text: {
            text: ['Skill Swap Network backend encountered an issue processing this intent.']
          }
        }
      ],
      source: 'skill-swap-network-backend'
    });
  }
}

module.exports = {
  healthCheck,
  handleWebhook
};
