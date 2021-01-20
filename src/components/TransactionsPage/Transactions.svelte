<script>
	import TransactionList from "./TransactionList.svelte"
	import { tick, onMount, onDestroy, createEventDispatcher } from 'svelte';

	export let Up;
	export let AccountID;
	export let FocusedTransactionID;

	const dispatch = createEventDispatcher();
	let el = (elId) => { return document.getElementById(elId) }

	// days is a list of (date, transaction-list) tuples
	let dailyTransactionList = [];
	let prevTransactions = {}
	let numTransactions = 0;
	let currentlyLoading = true;

	$: if (AccountID) {
		let res = Up.getTransactions(AccountID);
		createDailyTransactionList(res);
		currentlyLoading = false;
	}

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
				dateISO: dateISO,
				text: transaction.description,
				value: transaction.amount.valueInBaseUnits,
				index: id
			});
		}

		dailyTransactionList = [];
		for (let dateISO in transactionDates) {
			dailyTransactionList.push({
				date: dateISO,
				transactions: transactionDates[dateISO]
			})
		}

		tick().then(() => {
			if (FocusedTransactionID != -1) {
				focusTransaction(FocusedTransactionID);
			}	
		})
	}

	function loadMoreTransactions() {
		let res = Up.getNextTransactions(AccountID)
		createDailyTransactionList(prevTransactions.concat(res));
		currentlyLoading = false;
	}

	function focusTransaction(id) {
		if (id != -1) {
			let transactionEl = el("transaction-" + id);
			if (transactionEl) {
				transactionEl.focus();
			}	
		}

		dispatch("focus-changed", {
			id: id
		})
	}

	function requestLoadMoreTransactions() {
		if (!currentlyLoading) {
			currentlyLoading = true;
			let newId = prevTransactions.length;

			tick().then(() => {
				window.scrollTo(0, document.body.scrollHeight);
			});

			loadMoreTransactions();

			tick().then(() => {
				focusTransaction(newId);
			});
		}
	}

	function navigateTransactions(direction) {
		let currentIndex = document.activeElement.tabIndex;
		let next = currentIndex + direction;

		let curEl = el("transaction-" + currentIndex);
		let nextEl = el("transaction-" + next);
		if (nextEl) {
			focusTransaction(next);
			nextEl.scrollIntoView(direction === -1);
		} else if (direction == -1 && curEl) {
			curEl.blur();
			window.scrollTo(0, 0);
			focusTransaction(-1);
		} else if (direction == 1) {
			requestLoadMoreTransactions();
		}
	}

	function handleKeydown(e) {
		switch (e.key) {
			case "ArrowUp":
				navigateTransactions(-1);
				break;
			case "ArrowDown":
				navigateTransactions(1);
				break;
		}
	}

	onMount(() => {
		document.body.addEventListener("keydown", handleKeydown);
	});

	onDestroy(() => {
		document.body.removeEventListener("keydown", handleKeydown);
	});

</script>

<div id="transactions">
	{#each dailyTransactionList as { date, transactions }, i}
		<div class="transaction-list" id="transaction-list-{date}">
			<TransactionList date={date} transactions={transactions} />
		</div>
	{/each}

	{#if currentlyLoading}
		<div id="loading-transactions">
			<span>Loading...</span>
		</div>
	{/if}
</div>

<style type="text/css">
	.transaction-list {
		margin-top: 6px;
	}

	#loading-transactions span {
		font-size: 14px;
	}

	#loading-transactions {
		margin-top: 6px;
	}
</style>