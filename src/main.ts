import App from './App.svelte';
import { WsClient } from '../../coinbase-ts/lib/ws_client.js';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;