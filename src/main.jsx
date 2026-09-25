import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import App from './App.jsx';
import './styles/theme.css';

import * as Sentry from '@sentry/react';

Sentry.init({
	dsn: 'https://7431f9d5e8a2376a6486ed4f3cc9e3a8@o4512102269059072.ingest.de.sentry.io/4512102287147088',
	environment: import.meta.env.MODE,
	/*dataCollection: {
		// To disable sending user data and HTTP bodies, uncomment the lines below. For more info visit:
		// https://docs.sentry.io/platforms/javascript/guides/react/configuration/options/#dataCollection
		// userInfo: false,
		// httpBodies: []
	},*/
	integrations: [
		Sentry.browserTracingIntegration(),
		Sentry.replayIntegration(),
	],

	allowUrls: [/https:\/\/keepercal\.github\.io\/street-plotter/],

	// Tracing
	tracesSampleRate: 1.0, //  capture 100% of the transactions
	tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/], // set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled

	// Session Replay
	replaysSessionSampleRate: 0.1, // this sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
	replaysOnErrorSampleRate: 1.0, // if you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<App />
	</StrictMode>
);
