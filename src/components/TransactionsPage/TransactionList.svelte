<script>
	import Transaction from "./Transaction.svelte"

	const months = ["January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December"];

	const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

	function nicelyFormattedDate(dateISO) {
		let date = new Date(dateISO);
		let weekday = weekdays[date.getDay()];

		return weekday + ", " 
			+ date.getDate() 
			+ " " + months[date.getMonth()];
	}

	export let transactions;
	export let date;
</script>

<div class="transaction-day">
	<div class="transaction-day-date">
		<span>{nicelyFormattedDate(date)}</span>
	</div>

	<ul>
		{#each transactions as details, i}
			<li>
				<Transaction details={details} />
			</li>
			{#if (i+1) != transactions.length }
				<hr />
			{/if}
		{/each}
	</ul>
</div>

<style type="text/css">
	.transaction-day-date {
		background: rgb(180, 180, 180);
		padding-bottom: 4px;
	}

	.transaction-day-date span {
		font-size: 10px;
		margin-left: 6px;
		margin-bottom: 2px;
		color: rgb(30, 30, 30);
	}

	ul {
		list-style-type: none;
		background: rgb(220, 220, 220);
		margin: 0;
		padding: 0;
		padding-bottom: 2px;
		padding-top: 2px;
	}

	hr {
		margin-bottom: 0px;
		margin-top: 2px;
		color: rgb(220, 220, 220);
		margin-left: 6px;
		margin-right: 6px;
	}
</style>