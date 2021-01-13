<script>
	export let details;

	let positive = details.value > 0;
	let abs_amount = Math.abs(details.value / 100);
</script>

<div class="transaction">
	<span class="transaction-vendor">{details.text}</span>
	<span class="transaction-amount" class:positive>${abs_amount}</span>
</div>

<style type="text/css">
	.transaction-vendor {
		font-size: 12px;
		color: rgb(30, 30, 30);
		margin-left: 6px;
	}
	
	.transaction-amount {
		font-size: 12px;
		font-weight: bold;
		color: rgb(190, 60, 60);
		float: right;
		margin-right: 6px;
		margin-top: 5px;
	}

	.transaction-amount.positive {
		color: rgb(80, 150, 80);
	}
</style>