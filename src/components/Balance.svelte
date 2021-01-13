<script>
	import { createEventDispatcher } from "svelte"
	export let Up;

	let balance = "";
	const dispatch = createEventDispatcher();

	Up.getAccounts().then(accs => {
		let spending_acc = accs["data"][0];
		balance = spending_acc["attributes"]["balance"]["value"];

		dispatch("account-loaded", {
			id: spending_acc["id"]
		})
	})
</script>

<div id="spending-container">
	<span id="spending-text">Spending</span>
	<br />
	<span id="spending-balance">${balance}</span>
</div>

<style type="text/css">
	#spending-container {
		margin: 15px;
		margin-bottom: 0;
	}

	#spending-text {
		font-size: 20px;
	}

	#spending-balance {
		color: #ED806A;
	}
</style>