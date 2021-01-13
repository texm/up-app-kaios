import App from './App.svelte';
import config from "./config"
import UpApi from "./api"

const app = new App({
	target: document.body,
	props: {
		Up: new UpApi(config.API_URL_ROOT, config.UP_TOKEN),
	}
});

export default app;