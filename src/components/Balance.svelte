<script>
	import { createEventDispatcher } from "svelte"
	export let Up;

	let balance = "";
	const dispatch = createEventDispatcher();

	let accs = Up.getAccounts();
	let spending_acc = accs["data"][0];
	balance = spending_acc["attributes"]["balance"]["value"];

	setTimeout(function() {
		dispatch("account-loaded", {
			id: spending_acc["id"]
		});
	}, 1000);
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
		font-size: 18px;
	}

	#spending-balance {
		color: #ED806A;
		font-size: 28px;
		font-weight: 450;
	}
</style>