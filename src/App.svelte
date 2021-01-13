<script>
	import Header from "./components/Header.svelte"
	import Balance from "./components/Balance.svelte"
	export let Up;
	console.log(Up);
	//let accs = Up.getAccounts()
	//console.log(accs);
	//console.log(Up.getTransactions(accs["data"][0]["id"]))
</script>

<main>
	<Header />
	<Balance />
</main>

<style>

</style>