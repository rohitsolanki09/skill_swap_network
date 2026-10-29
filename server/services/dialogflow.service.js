/**
 * Dialogflow ES Service - Modular Intent Handlers
 *
 * This service processes parsed Dialogflow requests, executes the matching
 * business logic handler, and formats the standard Dialogflow ES response.
 *
 * Designed to easily connect to future Skill Swap Network databases,
 * authentication services, skill listings, matching algorithms, and booking APIs.
 */

// Helper to format responses adhering to Dialogflow ES webhook specifications
function formatDialogflowResponse(text, extra = {}) {
  return {
    fulfillmentText: text,
    fulfillmentMessages: [
      {
        text: {
          text: [text]
        }
      }
    ],
    source: 'skill-swap-network-backend',
    ...extra
  };
}

/**
 * 1. Test Intent Handler
 * Required test fulfillment handler to verify Dialogflow <-> Backend connectivity.
 */
function handleTestIntent({ queryText, parameters, session }) {
  const fulfillmentText = 'Hello! 👋 This response came from the Skill Swap Network backend through Dialogflow.';
  return formatDialogflowResponse(fulfillmentText);
}

/**
 * 2. Welcome Intent Handler
 * Triggered on Default Welcome Intent or initial greetings.
 */
function handleWelcomeIntent({ queryText, parameters }) {
  const welcomeText =
    'Welcome to Skill Swap Network! 👋 I can help you search skills, discover mentors, or connect with peers to trade knowledge. How can I help you today?';
  return formatDialogflowResponse(welcomeText);
}

/**
 * 3. Fallback Intent Handler
 */
function handleFallbackIntent({ queryText }) {
  const fallbackText =
    "I'm not sure how to help with that yet in Skill Swap Network. You can ask me to test the backend, search for skills, or browse categories!";
  return formatDialogflowResponse(fallbackText);
}

/**
 * 4. Modular Handler: Search Skills
 * Ready to connect with Skill Swap Network's database/APIs.
 */
function handleSkillSearch({ parameters }) {
  const query = parameters?.skill || parameters?.query || 'any';
  const responseText = `Looking for skills matching "${query}" on Skill Swap Network... Connect your database here to return live listings!`;
  return formatDialogflowResponse(responseText);
}

/**
 * 5. Modular Handler: Browse Categories
 */
function handleSkillCategories() {
  const categories = ['Programming', 'Design', 'Music', 'Cooking', 'Photography', 'Writing', 'Marketing', 'Languages'];
  const responseText = `Skill Swap Network currently offers skills in: ${categories.join(', ')}. Which one would you like to explore?`;
  return formatDialogflowResponse(responseText);
}

/**
 * 6. Generic/Dynamic Intent Handler
 * Used when an intent is registered in Dialogflow but has no dedicated handler yet.
 */
function handleGenericIntent({ intent, queryText, parameters }) {
  const text = `Hello! Received intent "${intent}" from Dialogflow. This confirms your Skill Swap Network backend webhook is active and responding.`;
  return formatDialogflowResponse(text);
}

/**
 * Intent Dispatcher Map
 * Easily register new intents as your chatbot grows.
 */
const intentHandlers = {
  // Test Intent Variations
  'test': handleTestIntent,
  'testintent': handleTestIntent,
  'test intent': handleTestIntent,
  'test_intent': handleTestIntent,
  'test webhook': handleTestIntent,
  'test_webhook': handleTestIntent,
  'webhook test': handleTestIntent,
  'webhook_test': handleTestIntent,

  // Default Dialogflow ES Intents
  'default welcome intent': handleWelcomeIntent,
  'welcome': handleWelcomeIntent,
  'default fallback intent': handleFallbackIntent,
  'fallback': handleFallbackIntent,

  // Skill Swap Network Domain Intents
  'skills.search': handleSkillSearch,
  'skills.browse': handleSkillCategories,
  'skills.categories': handleSkillCategories
};

/**
 * Main Service Entry Point
 * @param {Object} params
 * @param {string} params.intent - Intent display name from Dialogflow
 * @param {string} params.queryText - User's input text
 * @param {Object} params.parameters - Extracted entity parameters
 * @param {string} params.action - Intent action identifier
 * @param {string} params.session - Dialogflow session path
 * @param {Object} params.rawBody - Complete Dialogflow payload
 * @returns {Object} Dialogflow ES fulfillment response object
 */
async function processIntent({ intent, queryText, parameters, action, session, rawBody }) {
  const normalizedIntent = (intent || '').toLowerCase().trim();
  const normalizedAction = (action || '').toLowerCase().trim();
  const normalizedQuery = (queryText || '').toLowerCase().trim();

  // 1. Direct match in intent dispatcher map
  if (intentHandlers[normalizedIntent]) {
    return intentHandlers[normalizedIntent]({ intent, queryText, parameters, action, session, rawBody });
  }

  // 2. Action match
  if (intentHandlers[normalizedAction]) {
    return intentHandlers[normalizedAction]({ intent, queryText, parameters, action, session, rawBody });
  }

  // 3. Fallback pattern matching for test intent
  // If intent name, action, or query explicitly relates to "test"
  if (
    normalizedIntent.includes('test') ||
    normalizedAction.includes('test') ||
    normalizedQuery === 'test' ||
    normalizedQuery.startsWith('test ')
  ) {
    return handleTestIntent({ queryText, parameters, session });
  }

  // 4. Default handler for any other intents configured in Dialogflow
  return handleGenericIntent({ intent, queryText, parameters });
}

module.exports = {
  processIntent,
  handleTestIntent,
  handleWelcomeIntent,
  handleFallbackIntent,
  formatDialogflowResponse
};
