/**
 * Global Error Handler Middleware
 *
 * Ensures errors in Dialogflow webhook requests return a valid Dialogflow ES
 * fulfillment JSON structure rather than a generic HTML error page or raw stack trace.
 */

function errorHandler(err, req, res, next) {
  // Safe server-side error logging
  console.error('[Skill Swap Network Server Error]', {
    timestamp: new Date().toISOString(),
    path: req.originalUrl || req.url,
    method: req.method,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // If the error occurred during a Dialogflow webhook request, return a valid Dialogflow response
  if (req.originalUrl && req.originalUrl.includes('/api/dialogflow/webhook')) {
    return res.status(200).json({
      fulfillmentText: 'Skill Swap Network backend encountered an internal error. Please try again.',
      fulfillmentMessages: [
        {
          text: {
            text: ['Skill Swap Network backend encountered an internal error. Please try again.']
          }
        }
      ],
      source: 'skill-swap-network-backend'
    });
  }

  // Generic fallback for other routes
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    error: 'Internal Server Error',
    message: err.message || 'An unexpected error occurred'
  });
}

module.exports = errorHandler;
