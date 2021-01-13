<script>
	import TransactionList from "./TransactionList.svelte"

	export let Up;
	export let AccountID;

	// days is a list of (date, transaction-list) tuples
	let dailyTransactionList = [];

	function createDailyTransactionList(transactions) {
		console.log(transactions);
		let transactionDates = {};
		for (let id in transactions["data"]) {
			let transaction = transactions["data"][id]["attributes"];
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

	$: if (AccountID) {
		Up.getTransactions(AccountID).then(createDailyTransactionList);
	}
</script>

<div id="transactions">
	{#each dailyTransactionList as { date, transactions }, i}
		<div class="transaction-list">
			<TransactionList date={date} transactions={transactions} />
		</div>
	{/each}
</div>

<style type="text/css">
	.transaction-list {
		margin-top: 6px;
	}
</style>