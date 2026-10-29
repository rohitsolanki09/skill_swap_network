/**
 * Skill Swap Network - Backend Server
 *
 * Entry point for the backend server providing API endpoints and
 * Dialogflow ES Webhook Fulfillment for conversational AI interactions.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dialogflowRoutes = require('./routes/dialogflow.routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable Cross-Origin Resource Sharing
app.use(cors());

// Parse JSON request payloads (standard Dialogflow payload parser)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true, limit: '2mb' }));

// Root informational endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'Skill Swap Network API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/dialogflow/health'
  });
});

// Mount Dialogflow ES routes under /api/dialogflow
app.use('/api/dialogflow', dialogflowRoutes);

// Catch-all for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.originalUrl}`
  });
});

// Centralized Error Handling Middleware
app.use(errorHandler);

// Start server listening
const server = app.listen(PORT, () => {
  console.log('============================================================');
  console.log(`🚀 Skill Swap Network Backend is running!`);
  console.log(`📡 Local Port:         ${PORT}`);
  console.log(`🌐 Base URL:           http://localhost:${PORT}`);
  console.log(`🩺 Health Check URL:   http://localhost:${PORT}/api/dialogflow/health`);
  console.log(`🤖 Dialogflow Webhook: http://localhost:${PORT}/api/dialogflow/webhook`);
  console.log('============================================================');
});

module.exports = { app, server };
