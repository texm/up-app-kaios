<script>
	import Balance from "../Balance.svelte"

	//export let Up;
	export let Accounts;
</script>

<div id="savings-page">
	{#each Accounts as account, i}
		<Balance AccountBalance={account.attributes.balance.valueInBaseUnits} 
		AccountName={account.attributes.displayName}/>
		{#if (i+1) != Accounts.length }
			<hr />
		{/if}
	{/each}
</div>