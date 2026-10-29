/**
 * Dialogflow Routes
 *
 * Exposes:
 * GET  /api/dialogflow/health   - Connectivity check for local setup
 * POST /api/dialogflow/webhook  - Webhook endpoint called by Dialogflow ES
 */

const express = require('express');
const router = express.Router();
const dialogflowController = require('../controllers/dialogflow.controller');

// Health check endpoint
router.get('/health', dialogflowController.healthCheck);

// Webhook fulfillment endpoint
router.post('/webhook', dialogflowController.handleWebhook);

module.exports = router;
