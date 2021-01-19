<script>
	export let AccountName = "";
	export let AccountBalance = "";
</script>

<div class="balance-container">
	<span class="balance-text">{AccountName}</span>
	<br />
	<span class="balance-balance">${AccountBalance}</span>
</div>

<style type="text/css">
	.balance-container {
		margin: 15px;
		margin-bottom: 0;
	}

	.balance-text {
		font-size: 18px;
	}

	.balance-balance {
		color: #ED806A;
		font-size: 28px;
		font-weight: 450;
	}
</style>