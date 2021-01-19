<script>
	import Header from "./components/Header.svelte"
	import TransactionsPage from "./components/TransactionsPage/TransactionsPage.svelte"
	import SavingsPage from "./components/SavingsPage/SavingsPage.svelte"
	
	export let Up;

	const pages = {
		SETTINGS: 0,
		TRANSACTIONS: 1,
		SAVINGS: 2
	}

	let ActivePage = pages.TRANSACTIONS;
	function navigatePages(direction) {
		let newPage = Math.min(pages.SAVINGS, 
			Math.max(pages.SETTINGS, ActivePage + direction));
		
		if (newPage != ActivePage) {
			ActivePage = newPage;
		}
	}

	function handleKeydown(e) {
		switch (e.key) {
			case "ArrowLeft":
				navigatePages(-1);
				break;
			case "ArrowRight":
				navigatePages(1);
				break;
		}
	}
	document.activeElement.addEventListener("keydown", handleKeydown);

	let accountData = Up.getAccounts();
	let TransactionAccount = accountData.shift();
	let SavingsAccounts = accountData;
</script>

<main>
	<Header {ActivePage}/>

	{#if ActivePage == pages.SETTINGS}
		<span>Settings</span>
	{:else if ActivePage == pages.TRANSACTIONS}
		<TransactionsPage {Up} Account={TransactionAccount}/>
	{:else if ActivePage == pages.SAVINGS}
		<SavingsPage Accounts={SavingsAccounts} />
	{/if}
</main>

<style>

</style>