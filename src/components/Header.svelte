<script>
	export let ActivePage;
</script>

<div class="header">
	<div class="page-title" class:page-active={ActivePage==0}>
		<span>Up</span>
	</div>
	<div class="page-title" class:page-active={ActivePage==1}>
		<span>Activity</span>
	</div>
	<div class="page-title" class:page-active={ActivePage==2}>
		<span>Savers</span>
	</div>
</div>

<style type="text/css">
	.header {
		display: flex;
	}

	.page-title {
		flex: 1;
		text-align: center;
	}

	.page-title>span {
		font-size: 10px;
		font-weight: 500;
		color: #A3A3A3;
	}

	.page-active {
		flex: 2;
	}

	.page-active span {
		color: #E8E8E8;
		font-weight: bold;
	}
</style>