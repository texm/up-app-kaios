<script>
	import TransactionList from "./TransactionList.svelte"

	export let Up;
	export let AccountID;

	// days is a list of (date, transaction-list) tuples
	let dailyTransactionList = [];
	let prevTransactions = {}

	function createDailyTransactionList(transactions) {
		prevTransactions = transactions;

		let transactionDates = {};
		for (let id in transactions) {
			let transaction = transactions[id]["attributes"];
			let date = new Date(transaction.createdAt);

			// love timezones
			const offset = date.getTimezoneOffset()
			let offsetDate = new Date(date.getTime() - (offset * 60 * 1000))

			let dateISO = offsetDate.toISOString().split('T')[0]

			if (!(dateISO in transactionDates)) {
				transactionDates[dateISO] = [];
			}

			transactionDates[dateISO].push({
				timestamp: date,
				text: transaction.description,
				value: transaction.amount.valueInBaseUnits
			})
		}

		dailyTransactionList = [];
		for (let dateISO in transactionDates) {
			dailyTransactionList.push({
				date: dateISO,
				transactions: transactionDates[dateISO]
			})
		}
	}

	function loadMoreTransactions() {
		let res = Up.getNextTransactions(AccountID)
		createDailyTransactionList(prevTransactions.concat(res["data"]));
	}

	$: if (AccountID) {
		let res = Up.getTransactions(AccountID)
		createDailyTransactionList(res["data"])
	}
</script>

<div id="transactions">
	{#each dailyTransactionList as { date, transactions }, i}
		<div class="transaction-list">
			<TransactionList date={date} transactions={transactions} />
		</div>
	{/each}
</div>

<button id="load-more-button" on:click={loadMoreTransactions}>Load More</button>

<style type="text/css">
	.transaction-list {
		margin-top: 6px;
	}

	#load-more-button {
		width: 80%;
		margin-top: 6px;
		margin-left: 10%;
		color: #E8E8E8;
		background: #33333E;
		border: 1px solid #363636; 
		border-radius: 2px;
		font-weight: 500;
		font-size: 12px;
	}
</style>