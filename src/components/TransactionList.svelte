<script>
	import Transaction from "./Transaction.svelte"

	export let transactions;
	export let date;
</script>

<div class="transaction-day">
	<div class="transaction-day-date">
		<span>{date}</span>
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
		font-size: 12px;
		margin-left: 6px;
		margin-bottom: 2px;
		color: rgb(30, 30, 30);
	}

	ul {
		list-style-type: none;
		background: rgb(220, 220, 220);
		margin: 0;
		padding: 0;
		padding-bottom: 5px;
	}

	li:not(:last-child) {
		margin-bottom: 2px;
	}

	hr {
		margin-bottom: 0px;
		color: rgb(220, 220, 220);
		margin-left: 6px;
		margin-right: 6px;
	}
</style>