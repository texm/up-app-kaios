<script>
	import Header from "./components/Header.svelte"
	import Balance from "./components/Balance.svelte"
	import Transactions from "./components/Transactions.svelte"
	
	export let Up;
	let accountID;

	function accountLoadedEvent(event) {
		accountID = event.detail.id;
	}
</script>

<main>
	<Header />
	<Balance Up={Up} on:account-loaded={accountLoadedEvent}/>
	<hr />
	<Transactions Up={Up} AccountID={accountID}/>
</main>

<style>

</style>