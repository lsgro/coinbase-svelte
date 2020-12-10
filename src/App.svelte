<script lang="ts">
	import { coinbase_full } from "./coinbase_full_readable";
	export let name: string;
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<p>Here is the last received order:</p>
	<table>
		<tr>
			<td>Time</td><td>{$coinbase_full?.time}</td>
		</tr>
		<tr>
			<td>Order ID</td><td>{$coinbase_full?.order_id}</td>
		</tr>
		<tr>
			<td>Order Type</td><td>{$coinbase_full?.order_type}</td>
		</tr>
		<tr>
			<td>Side</td><td>{$coinbase_full?.side}</td>
		</tr>
		<tr>
			<td>Size</td><td>{$coinbase_full?.size}</td>
		</tr>
		<tr>
			<td>Funds</td><td>{$coinbase_full?.funds ? $coinbase_full?.funds : ''}</td>
		</tr>
		<tr>
			<td>Price</td><td>{$coinbase_full?.price ? $coinbase_full?.price : ''}</td>
		</tr>
	</table>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>