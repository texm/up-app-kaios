<script>
	import Balance from "../Balance.svelte"
	import Transactions from "./Transactions.svelte"

	export let Up;
	export let Account;

	let AccountID = Account["id"];
	let AccountBalance = Account["attributes"]["balance"]["value"]
</script>

<div id="transactions-page">
	<Balance {AccountBalance} AccountName="Spending"/>
	<hr />
	<Transactions {Up} {AccountID}/>
</div>